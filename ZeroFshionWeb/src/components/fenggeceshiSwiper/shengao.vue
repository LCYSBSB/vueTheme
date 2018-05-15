<template>
<div class="swiper-container shengaoSwiper">
	<div class="swiper-wrapper">
		                <div class="swiper-slide">150</div>
						<div class="swiper-slide">151</div>
						<div class="swiper-slide">152</div>
						<div class="swiper-slide">153</div>
						<div class="swiper-slide">154</div>
						<div class="swiper-slide">155</div>
						<div class="swiper-slide">156</div>
						<div class="swiper-slide">157</div>
						<div class="swiper-slide">158</div>
						<div class="swiper-slide">159</div>
						<div class="swiper-slide">160</div>
						<div class="swiper-slide">161</div>
						<div class="swiper-slide">162</div>
						<div class="swiper-slide">163</div>
						<div class="swiper-slide">164</div>
						<div class="swiper-slide">165</div>
						<div class="swiper-slide">166</div>
						<div class="swiper-slide">167</div>
						<div class="swiper-slide">168</div>
						<div class="swiper-slide">169</div>
						<div class="swiper-slide">170</div>
						<div class="swiper-slide">171</div>
						<div class="swiper-slide">172</div>
						<div class="swiper-slide">173</div>
						<div class="swiper-slide">174</div>
						<div class="swiper-slide">175</div>
						<div class="swiper-slide">176</div>
						<div class="swiper-slide">177</div>
						<div class="swiper-slide">178</div>
						<div class="swiper-slide">179</div>
						<div class="swiper-slide">180</div>
						<div class="swiper-slide">181</div>
						<div class="swiper-slide">182</div>
						<div class="swiper-slide">183</div>
						<div class="swiper-slide">184</div>
						<div class="swiper-slide">185</div>
						<div class="swiper-slide">186</div>
						<div class="swiper-slide">187</div>
						<div class="swiper-slide">188</div>
						<div class="swiper-slide">189</div>
						<div class="swiper-slide">190</div>
	</div>
</div>
</template>

<script>
	export default{
		props:{
			defVal:{
				default:160
			},
			dat:{
				default:160
			},
			gap:{
				default:150
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
				
				that.Swiper=new Swiper('.shengaoSwiper', {
					onSlideChangeEnd: function(swiper) {
							var data=$(".shengaoSwiper .swiper-slide-active").text();
						    that.$emit('getShengao',data);
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