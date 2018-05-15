<template>
<div class="swiper-container jianSwiper">
	<div class="swiper-wrapper">
		             <div class="swiper-slide">32</div>
						<div class="swiper-slide">33</div>
						<div class="swiper-slide">34</div>
						<div class="swiper-slide">35</div>
						<div class="swiper-slide">36</div>
						<div class="swiper-slide">37</div>
						<div class="swiper-slide">38</div>
						<div class="swiper-slide">39</div>
						<div class="swiper-slide">40</div>
						<div class="swiper-slide">41</div>
						<div class="swiper-slide">42</div>
						<div class="swiper-slide">43</div>
						<div class="swiper-slide">44</div>
						<div class="swiper-slide">45</div>
	</div>
</div>
</template>

<script>
	export default{
		props:{
			defVal:{
				default:37
			},
			dat:{
				default:37
			},
			gap:{
				default:32
			},
		},
		data(){
			return {
				da : (this.dat||this.defVal)-this.gap,
			}
		},
		mounted(){
				this.initSwiper();
		},
		watch:{
			dat(val){
				this.da = val-this.gap;
				this.initSwiper();
			}
		},
		methods:{
			initSwiper(){
				var that=this;
				
				if(that.Swiper) { that.Swiper.slideTo(that.da,500,false);return false;}
				
				that.Swiper = new Swiper('.jianSwiper', {
					onSlideChangeEnd: function(swiper) {
						var data=$(".jianSwiper .swiper-slide-active").text();
						console.log("swiper:"+data);
						    that.$emit('getJian',data);
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