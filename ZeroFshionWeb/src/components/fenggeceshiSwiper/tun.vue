<template>
<div class="swiper-container tunSwiper">
	<div class="swiper-wrapper">
		          <div class="swiper-slide">75</div>
						<div class="swiper-slide">76</div>
						<div class="swiper-slide">77</div>
						<div class="swiper-slide">78</div>
						<div class="swiper-slide">79</div>
						<div class="swiper-slide">80</div>
						<div class="swiper-slide">81</div>
						<div class="swiper-slide">82</div>
						<div class="swiper-slide">83</div>
						<div class="swiper-slide">84</div>
						<div class="swiper-slide">85</div>
						<div class="swiper-slide">86</div>
						<div class="swiper-slide">87</div>
						<div class="swiper-slide">88</div>
						<div class="swiper-slide">89</div>
						<div class="swiper-slide">90</div>
						<div class="swiper-slide">91</div>
						<div class="swiper-slide">92</div>
						<div class="swiper-slide">93</div>
						<div class="swiper-slide">94</div>
						<div class="swiper-slide">95</div>
						<div class="swiper-slide">96</div>
						<div class="swiper-slide">97</div>
						<div class="swiper-slide">98</div>
						<div class="swiper-slide">99</div>
						<div class="swiper-slide">100</div>
						<div class="swiper-slide">101</div>
						<div class="swiper-slide">102</div>
						<div class="swiper-slide">103</div>
						<div class="swiper-slide">104</div>
						<div class="swiper-slide">105</div>
						<div class="swiper-slide">106</div>
						<div class="swiper-slide">107</div>
						<div class="swiper-slide">108</div>
						<div class="swiper-slide">109</div>
						<div class="swiper-slide">110</div>
						<div class="swiper-slide">111</div>
						<div class="swiper-slide">112</div>
						<div class="swiper-slide">113</div>
						<div class="swiper-slide">114</div>
						<div class="swiper-slide">115</div>
						<div class="swiper-slide">116</div>
						<div class="swiper-slide">117</div>
						<div class="swiper-slide">118</div>
						<div class="swiper-slide">119</div>
						<div class="swiper-slide">120</div>
	</div>
</div>
</template>

<script>
	export default{
		props:{
			defVal:{
				default:100
			},
			dat:{
				default:100
			},
			gap:{
				default:75
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
				var that =this;
				if(that.Swiper) { that.Swiper.slideTo(that.da,500,false);return false;}
				
				that.Swiper=new Swiper('.tunSwiper', {
					onSlideChangeEnd: function(swiper) {
						var data=$(".tunSwiper .swiper-slide-active").text();
						    that.$emit('getTun',data);
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