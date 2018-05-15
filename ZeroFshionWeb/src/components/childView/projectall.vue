<template>
	<div class="boxplan" id="boxplan">
		<!--每个轮播信息模块-->
		<div class="boxcontentplan" id="boxcontentplan">
			<div class="projectBoxplan" v-for="(item,index) in planList">
				<!--轮播图-->
				<div class="conceptualDrawing">
					<div class="swiper-container">
						<div class="swiper-wrapper" @click="jmpDetails(item.Id)">
							<div class="swiper-slide" v-for="img in item.CombineImg">
								<img :src="img" />
								<div style="position: absolute;bottom: 0;text-align: center;color:#fff;background: rgba(0,0,0,.5);width:100%;padding: 8px 0px;font-size: 14px;">点击进入</div>
							</div>
						</div>
						<!--<div class="swiper-scrollbar"></div>
						<div class="swiper-button-prev"></div>
						<div class="swiper-button-next"></div>-->
					</div>
				</div>
				<!--信息-->
				<div class="projectInfo">
					<p class="name">名称：{{item.Name}} <span class="praise"><img src="./projectView/projectView/ck.png" alt="" />{{item.PageViews}}</span></p>
					<div class="projectMessage">
						<p>体型：{{item.TagTiXing|joinArr}}</p>
						<p>风格：{{item.TagFengGe|joinArr}}</p>
						<p>看点：{{item.Desc}}</p>
					</div>
				</div>
			</div>
			<div class="theend" style="text-align: center;color: #ccc;margin: 10px;font-size: 12px;">_________ The End _________</div>
			<div class="nodata" v-if="planList.length == 0">
				<img src="data:image/png;base64,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" />
				<p>暂无该体型BOX</p>
			</div>
		</div>
	</div>
</template>

<script>
	import types from "@/store/types.js"
	export default {
		data() {
			return {
				planList: [],
				BodyStyle: '',
				PageIndex: 1,
				PageSize: 10,
				maxIndex :9999,
				scrollBox: ".boxplan",
				scrollContent: ".boxcontentplan",
			}
		},
		created: function() {
			this._getLess("components", "project");

			//		   require("@/template/"+this.templates+"/components/project/index.less");
		},
		mounted() {
						this.PageIndex = 1;
						this.getBodyType(); //先获得上个页面的参数(体型)
						this.getBodyStyle();
						this.initFn();
			//监听滚动加载下一页
			var DomPageContent = document.getElementById('boxplan');
			var DomPlanContent = document.getElementById('boxcontentplan');
			var _this = this;
			DomPageContent.addEventListener('scroll', function() {

				var scrollTop = DomPageContent.scrollTop;
				var viewH = DomPageContent.offsetHeight;
				var PlanContentH = DomPlanContent.offsetHeight;
				if(PlanContentH - viewH - scrollTop < 200 ){
					if(_this.PageIndex < _this.maxIndex ){
						//获取下一页
						_this.PageIndex ++;
						_this.getBodyStyle();
					}
					
				}

			})
		},
		activated() {
//			this.PageIndex = 1;
//			this.getBodyType(); //先获得上个页面的参数(体型)
//			this.getBodyStyle();
//			this.initFn();
		},
		updated() {
			//用于数据更新时的的钩子函数
			this.initSwiper();
		},
		methods: {
			jmpDetails(id) {
				this.$router.push({
					path: '/projectDetails',
					query: {
						planId: id
					}
				})
			},
			//获取参数
			initFn() {
				$.extend({
					"swiperOption": function(f1, f2, f3, f4) {
						new Swiper(f1, {
							//							scrollbar: f2,
							//							scrollbarHide: false,
							//							nextButton: f4,
							//							prevButton: f3,
							observer: true, //修改swiper自己或子元素时，自动初始化swiper
							observeParents: true, //修改swiper的父元素时，自动初始化swiper
							spaceBetween: 15,
							freeMode: false,
						});
					}
				});
			},
			getBodyType() {
				let bodyStyle = this.$route.query.dataParam;
				this.BodyStyle = bodyStyle;
			},
			getBodyStyle() {
				
				var that = this;
				$.ajax({
					type: "post",
					url: types.GETBOXSHOPINGLIST,
					data: {
						//						ProductAttrName: that.BodyStyle,
						PageIndex: that.PageIndex,
						PageSize: that.PageSize,
					},
					success: function(data) {
						if(data.ResultType == '3') {
							var contacts = data.Data;
//							that.planList = contacts.List;
							that.planList = that.planList.concat(contacts.List);

							that.maxIndex = contacts.totalPage;
							that.planList.forEach(function(item, ind) {
								item.CombineImg = [];
								item.CombineImg.unshift(item.CoverImg);
								//								item.CombineImg.unshift(item.CoverImg);
							});
							$(".swiper-container").each(function(index) {
								$.swiperOption($(this), $(this).find(".swiper-scrollbar"), $(this).find(".swiper-button-prev"), $(this).find(".swiper-button-next"));
							});
						}

					}
				});
			},
			initSwiper() {
				$(".swiper-container").each(function(index) {
					$.swiperOption($(this), $(this).find(".swiper-scrollbar"), $(this).find(".swiper-button-prev"), $(this).find(".swiper-button-next"));
				});
			},
			joinToArr(arr, val) {
				arr.push(val);
				return arr;
			},
		},
		filters: {
			joinArr(val) {
				return val.join('、');
			},
		}
	}
</script>