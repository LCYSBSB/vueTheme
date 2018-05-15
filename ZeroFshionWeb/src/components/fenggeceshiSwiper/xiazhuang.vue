<template>
<div class="swiper-container xiazhuangSwiper">
	<div class="swiper-wrapper">
		<div class="swiper-slide abc" v-for="item in dalist">{{item}}</div>
	</div>
</div>
</template>

<script>
	export default{
		props:['dat'],
		data(){
			return {
				dalist:["XS","S","M","L","XL","2XL","3XL","4XL"],
				da:3,
				swiper:null,
			}
		},
		mounted(){
				this.initSwiper();
		},
		watch:{
			dat(val){
				this.da = this.dalist.indexOf(val);
				this.swiper.destroy(false);
				this.initSwiper();
			}
		},
		methods:{
			initSwiper(){
				var that=this;
				that.swiper = new Swiper('.xiazhuangSwiper', {
					onSlideChangeEnd: function(swiper) {
						var data=$(".xiazhuangSwiper .swiper-slide-active").text();
						    that.$emit('getXiazhuang',data);
					},
					direction: 'horizontal',
					initialSlide:that.da,
					longSwipesRatio: 0.3,
					observer: true, //修改swiper自己或子元素时，自动初始化swiper
					observeParents: true, //修改swiper的父元素时，自动初始化swiper
					slidesPerView: 5,
					spaceBetween: 20,
					freeMode: false,
					loop: false,
					loopAdditionalSlides: 1, //这个属性很重要，不然会右滑出现左边空的情况，1代表赋值2倍，0是默认
					centeredSlides: true,
				});
			}
		}
	}
</script>

<style scoped>
	.swiper-slide{
		color:#B3B3B3;
	}
	.swiper-slide-active{
		color:rgb(33,77,80)
	}
</style>