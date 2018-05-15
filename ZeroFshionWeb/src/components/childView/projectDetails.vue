<template>
	<div class="wrapper">
	<div class="divbox scroll">
	<div class="gather">
		<div class="boxGather">
			<div class="gatherImg">
				<div class="imgHead"></div>
				<div class="showImg">
					<img v-for="item in data.CombineImg" :src="item" />
				</div>
				<div class="imgFooter"><img src="./projectView/0-FASHION.png" alt="" /></div>

			</div>
		</div>

		<div class="detailsSelect">
			<div class="detailsList" v-for="(item,ind) in listTmpGroup">
				<p>{{ind+1}}</p>
				<img :src="img" alt="" v-for="img in getArrMark(item.Data,'img')" />
				<h4>{{getArrMark(item.Data,'txt')}}</h4>
			</div>
		</div>
		<img class="projectShow" src="./projectView/danpinzhanshi.png">
		
		
		<div class="imgAll" style="padding-bottom: 9vh;">
			<template v-for="(item,ind) in Pdata">
				<div :class="ind%2?'imgRight':'imgLeft'" @click="jmpDetail(ind)">
					<div :style={backgroundImage:getimgurl(item.CollocationImg)} class="imgback"></div>
				</div>
			</template>
		</div>

		
	</div>

	</div>
		<footer id="footerMenuProject">
			<!--<div class="menu" v-on:click="">
				<img src="./projectView/projectView/kefu.png" alt="" />
				<p>客服</p>
			</div>-->
			<div class="menu">
				<img src="./sigleProduct/img/xihuan.png" alt="" />
				<p>{{data.PageViews}}</p>
			</div>
			<!--<div class="menu" @click="colletbox">
				<img src="./sigleProduct/img/shoucang.png" alt="" v-if="!iscollect"/>
				<img src="./image/shoucang1.png" alt=""  v-if="iscollect"/>
				<p>收藏</p>
			</div>-->
			<!--<div class="menu order" @click="dialogHint" >-->
			<div class="menu order" @click="colletbox" >
				<p>加入心愿清单</p>
			</div>
		</footer>
		</div>
</template>

<script>
	import types from "@/store/types.js"
	export default {
		data() {
			return {
				data: {},
				Pdata: [],
				iscollect:false,
				scrollBox:".divbox",
				scrollContent:".gather",
			}
		},
		activated() {
				this.getPlan();
				this.srcoll();
			
		},
		created: function() {
				this._getLess("components","projectDetails");
			
//		   require("@/template/"+this.templates+"/components/projectDetails/index.less");
		},
		mounted() {
				this.getPlan();
				this.srcoll();
		},
		methods: {
			srcoll() {
				var that = this;
				//先阻止微信的拖动页面事件，再给需要的元素解锁
				var overscroll = function(el) {
					el.addEventListener('touchstart', function() {
						var top = el.scrollTop;
						var totalScroll = el.scrollHeight;
						var currentScroll = top + el.offsetHeight;
						if(top === 0) {
							el.scrollTop = 1;
						} else if(currentScroll === totalScroll) {
							el.scrollTop = top - 1;
						}
					});
					el.addEventListener('touchmove', function(evt) {
						if(el.offsetHeight < el.scrollHeight) {
							evt._isScroller = true;
						}
					});
				}
				//哪里需要可以局部滚动，添加一个“scroll”的class 
				for(var i = 0; i < document.querySelectorAll('.scroll').length; i++) {
					overscroll(document.querySelectorAll('.scroll')[i]);
				}
				document.getElementsByClassName("divbox")[0].addEventListener('touchmove', function(evt) {
					if(!evt._isScroller) {
						evt.preventDefault();
					}
				});
			},
			getPlan(){
					let palnId = parseInt(this.$route.query.planId);
						var self = this;
						$.ajax({
							type: "post",
							url: types.HOST+'/Api/Stores/CollocationPlan/GetTemplateDetail',
							data: {
								PlanId: palnId,
								MemberId: localStorage.MemberId,
								U_Num: localStorage.u_num,
							},
							success: function(da) {
								if(da.ResultType == '3') {
									var data = da.Data;
									self.data = data;
									if(data.IsCollect)self.iscollect=true;
									self.getProductInfo();
								}
							}
						});
			},
			getimgurl(url) {
				return "url(" + url + ")";
			},
			colletbox(){
				var that=this;
				let palnId = parseInt(this.$route.query.planId);
				$.fashion.validate(that,{
							login: true,
						}, function(that) {
							$.ajax({
								type: "post",
								url: types.ADDMEMBERCOLLECTBOX,
								data: {
									MemberId: localStorage.MemberId,
									U_Num: localStorage.u_num,
									PlanId: palnId
								},
								success: function(data) {
									if(data.ResultType == 3) {
										layer.open({
											content: "收藏成功",
											skin: 'msg',
											time: 2
										});
//										that.hideSelect();
//										that.animate(".imginfo", ".mybox", 1000);
									} else if(data.ResultType == 6) {
										$.fashion.tip({
											content: data.Message,
											ok: function() {
												that.$router.replace({
													path: '/login',
													query: {
														orgpath: that.$route.fullPath
													}
												})
											}
										});
									} else if(data.ResultType == 7) {
										layer.open({
											content: "已经收藏过了",
											skin: 'msg',
											time: 2
										});
									}
								}
							})
						})
			},
			
			//预约此Box 判断是否登陆，做过风格测试，绑定手机号
			dialogHint() {
				var that = this;
				$.fashion.validate(that,{login:true},function(){
				let palnId = parseInt(that.$route.query.planId);
				var yuyue = localStorage.yuyue;
				var tixing = localStorage.tixing;
				if(tixing!=yuyue){
	        		layer.open({content: '与您测试风格报告体型不符合，不可预约',skin: 'msg',time: 2});
				}else{
					that.$router.push({
						path: '/payment',
						query: {
							palnId: palnId
						}
				    })
				}
		      })
			},
			jmpDetail(ind) {
				var da = this.Pdata[ind];
				 this.$router.push({
		            path: '/singleChild', 
		            query: { 
		                BigProdNum:da.BigProdNum
		            }
	        })
			},
			getProductInfo() {
				var me = this;
				var strnums = this.getArrMark(this.listTempNotGroup, 'pronums');
				if(strnums) {
					var reg = new RegExp("[,，]");
					var listpnums = strnums.split(reg);
					if(listpnums.length > 0) {
						$.post(types.GET_MUTIPLE_PRODUCT_INFO, {
							ProductNumbers: listpnums
						}, function(da) {
							if(da.ResultType == 3) {
								me.Pdata = da.Data;
							}
						});
					}
				}else{
						me.Pdata =[];
				}
			},
			//获取listTmpGroup下指定GroupId下的Data中的Mark的值
			getArrMark(arr, mark) {
				var data = arr.filter(function(item) {
					return item.Mark == mark;
				});
				if(data.length > 0) {
					data = data[0];
				}
				if(mark.indexOf('img') > -1) {
					return data.Text.split(",");
				}
				return data.Text;
			},
		},
		computed: {
			//过滤得到TempDetails下GroupId不为空的数据
			listTmpGroup() {
				if(!this.data.TempDetails) return [];
				return this.data.TempDetails.filter(function(item) {
					return item.GroupId;
				});
			},
			listTempNotGroup() {
				if(!this.data.TempDetails) return [];
				var list = this.data.TempDetails.filter(function(item) {
					return !item.GroupId;
				});
				if(list.length > 0) return list[0].Data;
				return [];
			}
		},
	}
</script>

