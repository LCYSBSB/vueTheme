(function($) {
	$.fashion = {
		ver: "1.0.0"
	};
	/*
	 * 收藏，加入box需要登录权限，预约box和立即预约需要登录+风格测试+手机号+绑定店铺权限
	 * $.fashion.validate第二个参数可以接收：login,test,phone,store 四种
	 * fn为回调方法,failfn失败回调
	 */
})(jQuery);

(function($) {
	var hostPro = "";
	var hostProApi = "";
	var hostDev = "";
	var hostDevApi = "";
//	var hostDev = ";
//	var hostDevApi = "";
	//我把地址删了，嘿嘿哈哈
	var IsDev =false;//正式环境
//	var IsDev =true;//测试环境
	
	/*------------------------------*/
	var HOST = IsDev?hostDev:hostPro;
	var HOSTAPI = IsDev?hostDevApi:hostProApi;

	$.fashion = {
		
		ajax:function(op){
			var hosttype = (op.hosttype||"api").toLowerCase()=="api"?1:0;
			var hosturl = hosttype ? HOSTAPI : HOST;
			op.url = (op.url||"").toLowerCase().startsWith("http")?op.url:hosturl+op.url;
			op.data = $.extend({
				MemberId:localStorage.MemberId,
				U_Num:localStorage.u_num,
				OpenId:localStorage.openId,
			},op.data||{});
			$.ajax({
				url:op.url,
				data:op.data,
				type:op.type||"POST",
				beforeSend:function(){
					if($.isFunction(op.beforeSend)){
						return op.beforeSend();
					}
					if(op.lockBtn) $(op.lockBtn).prop("disabled",true);
				},
				complete:function(){
					if(op.lockBtn) $(op.lockBtn).prop("disabled",false);
					if($.isFunction(op.complete))op.complete();
				},
				success:function(da){
					if(da&&typeof da=="object"){
						if(da.ResultType==3){
							if($.isFunction(op.success))op.success(da.Data,da);
						}else if(da.ResultType==1001){
							//需要发送短信验证码绑定
//						layer.open({
//						   anim: false,
//						   content: '您还没有绑定您的手机号',
//					       btn: ['绑定手机号','取消'], //按钮
//						    yes: function(index){
//						  	  layer.closeAll();
//							vm.$store.commit('changeloginfalg',true);
//							},
//						});
						}else if(da.ResultType==1002){
//					layer.open({
//						   anim: false,
//						   content: '您还没有绑定您的归属店铺',
//					       btn: ['选择店铺','取消'], //按钮
//						    yes: function(index){
//						  	 layer.closeAll();
//						  	 vm.$store.commit('changeStorefalg',true);;
//							},
//						});
						}else{
							//弹窗da.Message
							if($.isFunction(op.fail)){op.fail(da);}else{
							   $.fashion.tip({
									content: da.Message,
									btn:["确定"],
								});
							}
						}
					}else{
						if($.isFunction(op.success))op.success(da);
					}
				},
				error:function(){
					//弹窗访问错误提示
				}
			});
		},
		tip: function(options) {
			if(typeof(options)=='string'){
				layer.open({
					content:options,
					skin: 'msg',
					time: 2
				});
			}else{
				layer.open({
				title: options.title||"温馨提示",
				content: options.content,
				btn: options.btn||['确定', '取消'],
				shadeClose:options.shadeClose||false,
				yes: function(index) {
					layer.closeAll();
					if(typeof options.ok == "function") options.ok();
				},
				no:function(){
					if(typeof options.no == "function") options.no();
				}
			 });
			}
			
		},
		checkTest: function(that) {
			var istest = window.localStorage.isTest=="true";
			if(!istest) {
				$.fashion.tip({
					content: '请先提交您的测试报告',
					ok: function() {
							that.$router.push({
							path: '/fenggeceshi',
						})
					}
				});
			}
			return !!istest;
		},
		checkLogin: function(that) {
			var MemberId = window.localStorage.MemberId;
			var U_num = window.localStorage.u_num;
			var openId = localStorage.openId;
			if((!MemberId || !U_num) && !openId) {
				$.fashion.tip({
					content: '您还没有登录，是否现在登录?',
					ok: function() {
						that.$router.replace({
							path: '/login',
							query: {
								orgpath: that.$route.fullPath
							}
						})
					}
				});
			}
			return(MemberId || U_num) || !!openId;
		},
		checkPhone: function(that) {
			
			var openId = window.localStorage.openId;
			if(!!openId) {
				$.fashion.tip({
					content: '请绑定您的手机号',
					ok: function() {
						that.$store.commit('changeloginfalg', true);
					}
				});
			}
			return !openId;
		},
		checkStore: function(that, fn,failfn) {
			var storeId = window.localStorage.storeId;
			if(storeId==36){
					$.fashion.tip({
					content:"您当前的归属店铺为默认旗舰店，建议选择距离您较近的门店预约,不影响预约。",
					btn:['打开地图', '取消'],
						ok: function() {
							that.$router.push({
								path: "/BindSotreMap"
							})
						}
					});
				}
			if(!storeId) {
				$.post(HOSTAPI+"/api/Members/MemberInfo/GetMemberStore", {
					MemberId: localStorage.MemberId,
					U_Num: localStorage.u_num
				}, function(da) {
					if(da.ResultType == 3) {
						var liststore = $(da.Data).filter(function(ind,item) {
							return !item.IsMainStore;
						});
						if(liststore.length > 0) {
							var mystore = liststore[0];
							localStorage.storeId = mystore.Id;
							if(mystore.Id==36){
								$.fashion.tip({
								content:"您当前的归属店铺为默认旗舰店，建议选择距离您较近的门店预约",
								btn:['打开地图', '取消'],
									ok: function() {
										that.$router.push({
											path: "/BindSotreMap"
										})
									}
								});
							}else{
								fn();
							}
//							fn(that);
						}else{
							$.fashion.tip({
							content:"请先绑定您的归属店铺",
							ok: function() {
							   	that.$router.push({
											path: "/BindSotreMap"
							     })
							}
							});
						}
					}else if(da.ResultType == 6){
						$.fashion.tip({
							content:da.Message,
							ok: function() {
								that.$router.replace({
									path: '/login',
									query: {
										orgpath: that.$route.fullPath
									}
								})
							}
						});
					}
				});
			} else {
				fn();
			}
		},
		validate: function(that, options, fn,failfn) {
			typeof fn == "function"?fn=fn:fn=function(){};
			typeof failfn == "function"?failfn=failfn:failfn=function(){};
			var isvalid = true;
			function islogined(options) {
				if(!options.login) {
					isvalid = $.fashion.checkLogin(that);
				}
				return isvalid;
			}
			if(options.login) {
				isvalid = $.fashion.checkLogin(that);
				
			}
			if(options.test && islogined(options)) {
				isvalid = $.fashion.checkTest(that);
			}
			if(options.phone && islogined(options)) {
				isvalid = $.fashion.checkPhone(that);
			}
			if(options.store) {
				if(islogined(options) && $.fashion.checkPhone(options)) {
					$.fashion.checkStore(that, fn,failfn);
				}
			} else {
				isvalid?fn(that):failfn(that);
			}
		}

	}
})(jQuery);