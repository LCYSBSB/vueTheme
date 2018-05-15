<template>
	<div class="productContainer scroll">
		<div class="mask" v-show="maskshow" @click="maskhide"></div>
		<div class="selectbox">
			<ul>
				<li @click="dropdownColorBox" v-model="colorActive" :class="{selctactive:colorActive}">颜色<img src="./sigleProduct/img/xialaanniu.png" alt="" class="icon_xiala" /></li>
				<li @click="dropdownStyleBox" v-model="styleActive" :class="{selctactive:styleActive}">风格<img src="./sigleProduct/img/xialaanniu.png" alt="" class="icon_xiala" /></li>
				<li @click="dropdownSceneBox" v-model="sceneActive" :class="{selctactive:sceneActive}">场合<img src="./sigleProduct/img/xialaanniu.png" alt="" class="icon_xiala" /></li>
			</ul>

		</div>
		<div class="selectColorBox scroll" v-show="colorActive">
			<div @click="filterSearchCondition(null,'color',null)"><img src="./sigleProduct/img/quanbu.png" />
				<p>全部</p>
			</div>
			<div v-for="(item,index) in colorarr" @click="filterSearchCondition(index,'color',item.ColorId)"><img :src="item.IconPath" alt="" :color-id="item.ColorId" />
				<p>{{item.ColorName}}</p>
			</div>
		</div>
		<div class="selectStyleBox scroll" v-show="styleActive">
			<div @click="filterSearchCondition(null,'style',null)">
				<div>全部</div>
			</div>
			<div v-for="(item,index) in stylearr" @click="filterSearchCondition(index,'style',item.Id)">
				<div :style-id="item.Id">{{item.AttributeName}}</div>
			</div>
		</div>
		<div class="selectSceneBox scroll" v-show="sceneActive">
			<div @click="filterSearchCondition(null,'sence',null)">
				<div>全部</div>
			</div>
			<div v-for="(item,index) in scenearr" @click="filterSearchCondition(index,'sence',item.Id)">
				<div :scene-id="item.Id">{{item.AttributeName}}</div>
			</div>
		</div>

		<div class="bgBody">
			<div id="scroller" class="appendBox">
				<div class="white_bgg" @click="openDetails(item.BigProdNum)" v-for="(item,index) in cloths" v-bind:data-bigproductnumber="item.BigProdNum">
					<div class="commodity">
						<img class="picture" v-bind:src="item.ProductImg">
						<div class="message_box">
							<div class="message">
								<p>{{ item.ProductName }}</p>
								<ul class="mold">
									<li>￥{{item.TagPrice }}</li>
									<li>{{ item.SeasonName }}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--底部导航栏-->
		<div class="footer_navigation">
			<div class="swiper-container">
				<div class="swiper-wrapper slideitemBox">
					<li class="swiper-slide slideitem"><img src="./sigleProduct/img/quanbu2.png" />
						<p>全部</p>
					</li>
					<li class="swiper-slide slideitem" data-type="1"><img src="./sigleProduct/img/yifu2.png" />
						<p>上装</p>
					</li>
					<li class="swiper-slide slideitem" data-type="2"><img src="./sigleProduct/img/qunzi2.png" />
						<p>下装</p>
					</li>
					<li class="swiper-slide slideitem" data-type="3"><img src="./sigleProduct/img/lianyiqun2.png" />
						<p>连体</p>
					</li>
					<li class="swiper-slide slideitem" data-type="4"><img src="./sigleProduct/img/scarf2.png" />
						<p>围巾</p>
					</li>
					<li class="swiper-slide slideitem" data-type="5"><img src="./sigleProduct/img/zhihuan2.png" />
						<p>饰品</p>
					</li>
					<li class="swiper-slide slideitem" data-type="6"><img src="./sigleProduct/img/xiezi2.png" />
						<p>鞋</p>
					</li>
					<li class="swiper-slide slideitem" data-type="7"><img src="./sigleProduct/img/bag2.png" />
						<p>包</p>
					</li>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import types from "@/store/types.js"
	var PageSize = 10,
		downHeight, //用来判断只有当用户下拉的时候才加载
		postcomplete = false; //用来判断上一次已经完成才可以下一页
	export default {
		data() {
			return {
				srcollTop: null,
				colorarr: [],
				stylearr: [],
				scenearr: [],
				cloths: [],
				ColorId: null, //筛选的ColorId
				styleArr: [], //被选中的风格集合
				senceArr: [], //被选中的场景集合
				CategoryId: null, //品类Id
				maxIndexPage: 99999,
				PageIndex: 1,
				colorActive: false,
				styleActive: false,
				sceneActive: false,
				myswiper: null,
				scrollBox:".productContainer",
				scrollContent:"#scroller"
			}
		},
	created: function() {
				this._getLess("components","single");
		
//		   require("@/template/"+this.templates+"/components/single/index.less");
		},
		computed: {
			maskshow() {
				if(this.colorActive == true || this.styleActive == true || this.sceneActive == true) {
					return true;
				} else if(this.colorActive == false && this.styleActive == false && this.sceneActive == false) {
					return false;
				}
			},
			ProductAttrId() {
				return this.styleArr.concat(this.senceArr);
			}
		},
		mounted() {
         this.getSeletedOption(); //获得颜色，场合，风格
		},
		activated() {
//			$(".productContainer").scrollTop(this.srcollTop + 30);
			this.PageIndex = 1,
			this.maxIndexPage = 9999;
			this.getParams(); //先获得上个页面的参数(品类)
			this.srcoll(); //监听滚动条到达body一半时候，加载下一页
			//this.getCommodity();//获得单品 swiper初始化的时候走第一遍
			
			//this.initSwiper();
		},
		methods: {
			maskhide() {
				this.colorActive = false;
				this.styleActive = false;
				this.sceneActive = false;
			},
			dropdownColorBox() { //这几个方法控制dropdown太low了，暂时还没想到高端的方法， 先实现功能吧
				this.colorActive == false ? this.colorActive = true : this.colorActive = false;
				this.styleActive = false;
				this.sceneActive = false;
			},
			dropdownStyleBox() {
				this.styleActive == false ? this.styleActive = true : this.styleActive = false;
				this.colorActive = false;
				this.sceneActive = false;
			},
			dropdownSceneBox() {
				this.sceneActive == false ? this.sceneActive = true : this.sceneActive = false;
				this.colorActive = false;
				this.styleActive = false;
			},
			addpageIndex() {
				this.PageIndex++;
			},
			getParams() {
				let routerParams = parseInt(this.$route.query.dataObj);
				if(routerParams != this.CategoryId) { //这里是为了清除缓存，如果从1级到2级，并且选择的不是上一次的品类就重新加载
					this.CategoryId = routerParams;
					//this.myswiper.destroy(false);
					if(this.myswiper != null) { ///呵呵，到处都是坑，如果是重新选择的品类，你还得吧上个swiper所有监听都去掉，不然active-swiper有问题
						this.myswiper.destroy(false);
						this.myswiper = null;
					}
					this.initSwiper();
				}
			},
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
				document.getElementsByClassName("productContainer")[0].addEventListener('touchmove', function(evt) {
					if(!evt._isScroller) {
						evt.preventDefault();
					}
				});
				//	绑定box，让商品可以滚动
				$(".productContainer").scroll(function(e) {
					var bodyClientHeight = $("#app").height();
					var BoxHeight = $("#scroller").height();
					var BoxoffsetHeight = Math.abs($("#scroller").offset().top);
//					that.srcollTop = BoxoffsetHeight;
					var allowAjaxHeight = BoxHeight - bodyClientHeight - BoxoffsetHeight;
					if(allowAjaxHeight < bodyClientHeight / 2 && postcomplete == true && allowAjaxHeight < downHeight) {
						that.getCommodity();
					}
					downHeight = allowAjaxHeight;
				})
			},
			filterSearchCondition(index, type, activeSelection) { //筛选搜索条件，然后再走getCommedity,颜色只能一个Id，属性是一个Int[],在这里拼装
				var that = this;
				that.cloths = [];
				that.PageIndex = 1;
				that.maxIndexPage = 9999;
				switch(type) {
					case 'color':
						$(".selectColorBox div").find("img").removeClass("activeColor");
						$(".selectColorBox div").eq(index + 1).find("img").addClass("activeColor");
						that.ColorId = activeSelection;
						that.getCommodity()
						that.maskhide();
						break;
					case 'style':
						$(".selectStyleBox>div").removeClass("activeStyleAndSence");
						if(index == null) index = -1;
						$(".selectStyleBox>div").eq(index + 1).addClass("activeStyleAndSence")
						that.styleArr = [];
						if(activeSelection != null) {
							that.styleArr.push(activeSelection);
						}
						that.getCommodity();
						that.maskhide();
						break;
					case 'sence':
						$(".selectSceneBox>div").removeClass("activeStyleAndSence");
						if(index == null) index = -1;
						$(".selectSceneBox>div").eq(index + 1).addClass("activeStyleAndSence")
						that.senceArr = [];

						if(activeSelection != null) {
							that.senceArr.push(activeSelection);
						}
						that.getCommodity();
						that.maskhide();
						break;
					default:
						break;
				}

			},
			getSeletedOption() {
				var that = this;
				$.ajax({
					type: "post",
					url: types.GETPRODUCT_COLORLIST,
					data: {

					},
					success: function(data) {
						if(data.ResultType == '3') {
							var data = data.Data;
							$.each(data, function(i, item) {
								that.colorarr.push(item);
							})
						}
					}
				});
				$.ajax({
					type: "post",
					url: types.GETPRODUCT_LISTBYNAME,
					data: {
						Name: "风格"
					},
					success: function(data) {
						$.each(data, function(i, item) {
							that.stylearr.push(item);
						})
					}
				});
				$.ajax({
					type: "post",
					url: types.GETPRODUCT_LISTBYNAME,
					data: {
						Name: "场合"
					},
					success: function(data) {
						$.each(data, function(i, item) {
							that.scenearr.push(item);
						})
					}
				});
			},
			getCommodity() {
				var _self = this;
				if(_self.PageIndex > _self.maxIndexPage) {
					layer.open({
						content: "没有更多商品啦~",
						skin: 'msg',
						time: 2
					});
					return;
				}
				$.ajax({
					type: "post",
					url: types.GETPRODUCT_GETLIST,
					data: {
						ColorId: _self.ColorId,
						ProductAttrId: _self.ProductAttrId,
						CategoryId: _self.CategoryId,
						PageIndex: _self.PageIndex,
						PageSize: PageSize,
					},
					beforeSend: function() {
						layer.open({
							type: 2,
							shade: false
						});
						postcomplete = false;
					},
					complete: function() {
						postcomplete = true;
					},
					success: function(data) {
						if(data.ResultType == '3') {
							_self.addpageIndex(); //我也忘了为啥要这样写了而不是直接++
							var contacts = data.Data.List;
							_self.maxIndexPage = data.PageCount;
							if(data.Data.totalCount == 0) {
								layer.open({
									content: "还没有此类商品",
									skin: 'msg',
									time: 2,
									end: function() {
										layer.closeAll();
									}
								});
							} else {
								layer.closeAll();
								for(var i = 0; i < contacts.length; i++) {
									_self.cloths.push(contacts[i])
								}
							}

						}
					}
				});

			},
			initSwiper() {
				var that = this;
				that.myswiper = new Swiper('.swiper-container', {
					onSlideChangeStart:function(){layer.closeAll();},
					onSlideChangeEnd: function(swiper) {
						
						that.CategoryId = parseInt($('.swiper-slide-active').attr('data-type'))||null;
						$(".selectColorBox div").find("img").removeClass("activeColor");
						$(".selectStyleBox>div").css("color", "#214d50");
						$(".selectSceneBox>div").css("color", "#214d50");
						that.cloths = [];
						that.PageIndex = 1;
						that.maxIndexPage = 9999,
							that.ColorId = null, //筛选的ColorId
							that.styleArr = [], //风格集合
							that.senceArr = []
						that.getCommodity();

					},
					//			        onTouchMove: function(swiper){
					//				            swiper.unlockSwipeToPrev();
					//				    },
					direction: 'horizontal',
					initialSlide: that.CategoryId,
					//		          	paginationClickable: true,
					longSwipesRatio: 0.3,
					touchRatio: .5,
					observer: true, //修改swiper自己或子元素时，自动初始化swiper
					observeParents: true, //修改swiper的父元素时，自动初始化swiper
					//			        pagination: '.swiper-pagination',
					slidesPerView: 5,
					spaceBetween: 15,
					freeMode: false,
					loop: true,
					loopAdditionalSlides: 1, //这个属性很重要，不然会右滑出现左边空的情况，1代表赋值2倍，0是默认
					centeredSlides: true,
				});
			},
			openDetails(BigProdNum) {
				this.$router.push({
					path: '/singleChild',
					query: {
						BigProdNum: BigProdNum
					}
				})
			}
		}
	}
</script>

