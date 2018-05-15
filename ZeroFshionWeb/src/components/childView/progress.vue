<template>
	<div class="progressBox">
		<div class="senBox">
			<p class="leftHua">左滑查看搭配</p>
			<div>
				<p class="allCloth">
					<img class="jiantou choose_left" src="./projectView/zuojiantou.png" alt="" />
					<span class="match_num">全部单品</span>
					<img class="jiantou choose_right" src="./projectView/youjiantou.png" alt="" />
				</p>
			</div>

			<div class="swiperBox swiper-container scroll">
				<div class="swiper-wrapper">
					<div class="singleSelect swiper-slide">
						<div class="imgLeft" v-for="(item,index) in rules">
							<div :style={backgroundImage:getimgurl(host+item.productCollocationImg)} class="imgback"></div>
							<span class="indexIcon">{{index+1}}</span>
							<!--<img :src="host+item.productCollocationImg" />-->
							<p>{{item.productNumber}}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="explain">
				<span class="explainSpan">
					{{Desc}}
					<p class="reference">衣服图片仅供参考，适不适合自己只有穿上体验才能下结论哦</p>
				</span>
				
			</div>
		</div>
	</div>
</template>

<script>
  import types from "@/store/types.js"

	export default {
		data() {
			return {
				rules: [],
				host:types.IMGHOST,
				suggestions: [],
				allSingle: '全部单品',
				ruleOrder: [],
				SuggestionPageCount: '',
        Desc: "",
        project:""
			}
		},
		created: function() {
				this._getLess("components","progress");
			
//		   require("@/template/"+this.templates+"/components/progress/index.less");
		},
		mounted() {
			this.getParameter();
		},
		updated() {
			var that = this;
			if($(".indexIcon").length > 0) {
				var suggestArr = that.suggestions;
				$.each(suggestArr, function(i, item) {
					var itemOrder = item.ruleOrder;
					$(".swiper-wrapper").append("<div class='singleSelect swiper-slide' group-id=" + i + "></div>");
					$.each(itemOrder, function(j, items) {
						var strchilddom = $(".indexIcon").eq(Number(items) - 1).parent(".imgLeft").clone(true);
						$("[group-id=" + i + "]").append(strchilddom);
					})
				});
			}
		},
		methods: {
			getimgurl(url) {
				return "url(" + url + ")";
			},
      getParameter() {
				var me = this;
        let projectNum = me.$route.query.projectNum;
        $.ajax({
          type: "post",
          url: types.GETPLANS,
          data: {
            MemberId: localStorage.MemberId,
            U_Num: localStorage.u_num,
            id: projectNum
          },
          success: function (data) {
            if (data.ResultType == 3) {
              var da = data.Data;
              me.project = da;
              var imgUrl = me.host;
              new Swiper('.swiperBox', {
                //					pagination: '.swiper-pagination',
                nextButton: '.choose_right',
                prevButton: '.choose_left',
                effect: 'coverflow',
                grabCursor: true,
                preloadImages: true,
                //								centeredSlides: true,
                //								longSwipesRatio: 0.3,
                touchRatio: 1,
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: true, //修改swiper的父元素时，自动初始化swiper
                slidesPerView: 1,
                loop: false,
                freeMode: false,
                spaceBetween: 20,
                coverflow: {
                  slideShadows: "false"
                },
                onTouchEnd: function (swiper) {

                },
                onInit: function (swiper) {
                  me.getData(me.project);
                  //	fixscolltop = $(".swiper-slide-active").offset().top;
                },
                onSlideChangeEnd: function (swiper) {
                  var index = swiper.activeIndex;
                  $(".swiper-choose_box").scrollTop(0);
                  if (index == 0) {
                    $(".hint").html("左滑查看搭配");
                    $(".match_num").html("全部单品");
                  } else {
                    var suggesionNum = $(swiper.slides[index]).find(".indexIcon").map(function () {
                      return $(this).text();
                    }).get().join("+");
                    $(".match_num").html(suggesionNum);
                    $(".leftHua").html("搭配(" + index + "/" + me.SuggestionPageCount + ")");
                  }

                },
              });


            }
          }
        });




	
		
			},
      getData(data) {
        var that = this;
        var dataObj=data;
				that.rules = JSON.parse(dataObj.plans[0].Rules);
				that.suggestions = JSON.parse(dataObj.plans[0].Suggestions);
				that.SuggestionPageCount =dataObj.plans[0].SuggestionCount;
				that.Desc=dataObj.plans[0].Desc
				
			}
		}
	}
</script>

