<template>
	<div class="product_details_box">
		<div class="scHeader">

			<div class="TagPrice">￥{{TagPrice}}</div>
			<!--<router-link to='/myBoxList'>
				<div class="mybox">
					<img src="./sigleProduct/img/hezi.png" alt="" />
					<span id="myboxCount">{{myboxCount}}</span>
				</div>
			</router-link>-->
		</div>
		<div class="scDeatils">

		</div>

		<div class="scFooter">
			<ul>
				<!--<li>
					<img src="./sigleProduct/img/kefu.png" alt="" />
					<p>客服</p>
				</li>-->
				<li>
					<img src="./sigleProduct/img/xihuan.png" alt="" />
					<p>{{PageViews}}</p>
				</li>
				<!--<li style="margin-right:auto" @click="collect">
					<img src="./sigleProduct/img/shoucang.png" alt="" v-if="!iscollect"/>
					<img src="./image/shoucang1.png" alt="" v-if="iscollect"/>
					<p>收藏</p>
				</li>-->

				<div class="addbox" @click="collect" >
					加入心愿清单
				</div>
				<!--<img class="queryAppointment" @click="queryAppointment" src="./sigleProduct/img/queryAppointMent.png">-->

			</ul>
		</div>
		<!--颜色和尺码-->
		<div class="selectColorSize" style="z-index:999999">
			<div class="imginfo">
				<img src="" class="activeImg" alt="" />
			</div>
			<div class="TagPrice"></div>
			<div class="colorSize">
				<span>颜色:</span><span id="select_color">待选</span>&nbsp&nbsp
				<span>尺码:</span><span id="select_size">待选</span>
			</div>
			<div class="allcolorsize">

			</div>
			<div class="confrim">
				<div id="confrim" @click="confrim()">确认</div>
			</div>
			<img class="closebtn" src="./sigleProduct/img/gb@2x.png" alt="" @click="hideSelect" />
		</div>
		<div class="mask"></div>
	</div>

</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import types from "@/store/types.js"
	export default {
		data() {
			return {
				productId: null,
				BigProdNum: null,
				TagPrice: null,
				confrimtype: null, //用于判断是收藏还是加入box （加入box最多15个,收藏无限）
				allcolorsizelist: [],
				PageViews: 0, //浏览量
				iscollect:false
			}

		},
		created: function() {
				this._getLess("components","singleChild");
			
//		   require("@/template/"+this.templates+"/components/singleChild/index.less");
		},
		computed: {
			...mapGetters([
				'myboxCount'
			])
		},
		mounted() {
			this.getParams();
			this.getData();
			this.getMybox();
		},
		methods: {
			...mapActions([
				"addMyBoxCount"
			]),
			hideSelect() {
				$(".mask").hide();
				$(".selectColorSize").animate({
					opacity: 'show',
					bottom: '-800px',
				}, 500);
				$(".selectColorSize").hide();
			},
			confrim() { //type=1:收藏，type=2 加入box
				var that = this;
				var finalColor = $(".active_color").attr('color-data');
				var finalSize = $(".active_size").text();
				console.log(finalColor, finalSize);
				var list = $(that.allcolorsizelist).filter(function(ind, item) {
					return item.ColorName == finalColor && item.SizeName == finalSize
				});
				if(list.length > 0) {
					that.productId = list[0].ProductId;
					if(that.confrimtype == 1) {
						$.fashion.validate(that, {
							login: true,
						}, function(that) {
							$.ajax({
								type: "post",
								url: types.PRODUCT_COLLET_ADD,
								data: {
									MemberId: localStorage.MemberId,
									U_Num: localStorage.u_num,
									ProductId: that.productId,
								},
								success: function(data) {
									if(data.ResultType == 3) {
										layer.open({
											content: "收藏成功",
											skin: 'msg',
											time: 2
										});
										that.hideSelect();
										that.animate(".imginfo", ".mybox", 1000);
										that.iscollect=true;
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
					} else if(that.confrimtype == 2) {
						$.fashion.validate(that, {
							login: true
						}, function(that) {

							$.ajax({
								type: "post",
								url: types.PRODUCT_BOX_ADD,
								data: {
									MemberId: window.localStorage.MemberId,
									U_Num: window.localStorage.u_num,
									ProductId: that.productId,
								},
								success: function(data) {
									if(data.ResultType == 3) {

										layer.open({
											content: "添加成功",
											skin: 'msg',
											time: 2
										});
										that.addMyBoxCount();
										that.hideSelect();
										that.animate(".imginfo", ".mybox", 1000);
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
									} else {
										layer.open({
											content: data.Message,
											skin: 'msg',
											time: 2
										});
									}
								}
							});
						});
					}
				} else {
					layer.open({
						content: "请选择正确的颜色和尺码",
						skin: 'msg',
						time: 2
					});
				}

			},
			initColorSize(BigProdNum) { //根据大款号查询所有颜色尺码
				var that = this;
				if($(".allcolor").length <= 0) {
					$.ajax({
						type: "post",
						url: types.GET_COLORANDSIZE,
						data: {
							bigProdNum: BigProdNum,
						},
						success: function(data) {
							if(data.ResultType == 3) {
								var cons = data.Data;
								that.allcolorsizelist = cons;
								var allColor = []; //所有颜色
								var allimg = []; //所有图片
								var itemcolorDom = $("<div class='allcolor' style='display: flex;justify-content: center;height: 50px;width: 100%;align-items: center;'></div>");
								var itemSizeDom = $("<div class='allsize' style='display: flex;justify-content: center;height: 50px;width: 100%;align-items: center;'></div>");
								var sizeNum = 'size';
								var ProductId, ProductNumber; //最后选择的商品
								$.each(cons, function(i, item) {
									if(allColor.indexOf(item.ColorName) < 0) {
										var tempcolor = item.ColorName;
										allColor.push(item.ColorName);
										itemcolorDom.append('<img style="width: 45px;margin: 0 8px;border-radius: 50%;height: 45px;"src="' + item.ColorPath + '"  color-data="' + item.ColorName + '"/>');
										var itemsize = $("<div style='display: none;' class='" + sizeNum + i + "'></div>");
										allimg.push(item.ThumbnailPath);
										$.each(cons, function(j, item) {
											if(tempcolor == item.ColorName) {
												itemsize.append("<span style='margin:0.25rem;font-size:.5rem'>" + item.SizeName + "</span>");
											}
										});
										itemSizeDom.append(itemsize);
									}
								})
								var color, size;
								$(".allcolorsize").append(itemcolorDom);
								$(".allcolorsize").append(itemSizeDom);
								var activeindex = 0;
								$(".allcolor img").eq(activeindex).css("border", "1px solid #222").addClass("active_color");
								$(".allsize div").eq(activeindex).show();
								$(".activeImg").attr("src", allimg[0]);
								$(".allcolor img").click(function() {
									activeindex = $(this).index();
									$(this).css("border", "1px solid #222").addClass("active_color").siblings().css("border", "none").removeClass("active_color");
									$(".allsize div").eq(activeindex).show().siblings().hide();
									color = $(this).attr("color-data");
									$("#select_color").html(color);
									$(".activeImg").attr("src", allimg[activeindex]);
								})
								$(".allsize div span").click(function() {
									$(this).css("border", "1px solid #222").addClass("active_size").siblings().css("border", "none").removeClass("active_size").parent().siblings().find("span").css("border", "none").removeClass("active_size");
									size = $(this).text();
									$("#select_size").html(size);
								})
								$("#select_color").html($(".allcolor img").eq(0).attr("color-data"));
							} else {
								showDig("网络状态不佳~")
							}

						}
					});
				}
			},
			getMybox() {
				this.$store.dispatch('getMybox');
			},
			getParams() {
				let routerParams = this.$route.query.BigProdNum;
				this.BigProdNum = routerParams;
				this.initColorSize(this.BigProdNum);
			},
			// 		 	 queryAppointment(){
			// 		 	 	       this.$router.push({ path: '/homeDiyBox',query:{
			//							  productId:this.productId
			//			        	}})
			// 		 	 },

			animate(startObj, endObj, execution) {
				var endObjTop = $(endObj).offset().top;
				var endObjLeft = $(endObj).offset().left + $(endObj).width();
				var startObjClone = $(startObj).clone();
				$(startObjClone).css({
					'top': '50%',
					'left': '50%',
					'z-index': '9999'
				})
				$("#app").append(startObjClone);
				$(startObjClone).animate({
					left: endObjLeft,
					top: endObjTop,
					opcity: 0,
					width: 0,
					height: 0
				}, execution, function() {
					$(startObjClone).remove();
				})
			},
			getData() {
				var that = this;
				$.ajax({
					type: "post",
					url: types.GETPRODUCT_DETEALS,
					data: {
						MemberId: localStorage.MemberId,
						U_Num: localStorage.u_num,
						BigProdNum: that.BigProdNum,
					},
					success: function(data) {
						//					console.log(data.Data);
						if(data.ResultType == 3) {
							var cons = data.Data;
							that.TagPrice = cons.TagPrice;
							that.PageViews = cons.PageViews;
							if(cons.IsCollect)that.iscollect=true;
							$(".scDeatils").append("<iframe id='frame'  style='height:100%;width: 100%;overflow:hidden;border: none;outline: none;' src='" + cons.HtmlPhonePath + "'></iframe>");
						}

					}
				});
			},
			collect() {
				this.confrimtype = 1;
				$(".mask").show();
				$(".selectColorSize").animate({
					opacity: 'show',
					bottom: 0
				}, 500);
			},
			addbox() {
				this.confrimtype = 2;
				$(".mask").show();
				$(".selectColorSize").animate({
					opacity: 'show',
					bottom: 0
				}, 500);
			}

		}
	}
</script>

