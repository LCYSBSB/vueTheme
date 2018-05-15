<template>
<div class="swiper-container tizhongSwiper">
	<div class="swiper-wrapper">
		              <div class="swiper-slide">40</div>
						<div class="swiper-slide">41</div>
						<div class="swiper-slide">42</div>
						<div class="swiper-slide">43</div>
						<div class="swiper-slide">44</div>
						<div class="swiper-slide">45</div>
						<div class="swiper-slide">46</div>
						<div class="swiper-slide">47</div>
						<div class="swiper-slide">48</div>
						<div class="swiper-slide">49</div>
						<div class="swiper-slide">50</div>
						<div class="swiper-slide">51</div>
						<div class="swiper-slide">52</div>
						<div class="swiper-slide">53</div>
						<div class="swiper-slide">54</div>
						<div class="swiper-slide">55</div>
						<div class="swiper-slide">56</div>
						<div class="swiper-slide">57</div>
						<div class="swiper-slide">58</div>
						<div class="swiper-slide">59</div>
						<div class="swiper-slide">60</div>
						<div class="swiper-slide">61</div>
						<div class="swiper-slide">62</div>
						<div class="swiper-slide">63</div>
						<div class="swiper-slide">64</div>
						<div class="swiper-slide">65</div>
						<div class="swiper-slide">66</div>
						<div class="swiper-slide">67</div>
						<div class="swiper-slide">68</div>
						<div class="swiper-slide">69</div>
						<div class="swiper-slide">70</div>
						<div class="swiper-slide">71</div>
						<div class="swiper-slide">72</div>
						<div class="swiper-slide">73</div>
						<div class="swiper-slide">74</div>
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
	</div>
</div>
</template>

<script>
	export default{
		props:{
			defVal:{
				default:50
			},
			dat:{
				default:50
			},
			gap:{
				default:40
			}
		},
		data(){
			return {
				da : this.dat||this.defVal-this.gap,
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
				
				that.Swiper=new Swiper('.tizhongSwiper', {
					onSlideChangeEnd: function(swiper) {
							var data=$(".tizhongSwiper .swiper-slide-active").text();
						    that.$emit('getTizhong',data);
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