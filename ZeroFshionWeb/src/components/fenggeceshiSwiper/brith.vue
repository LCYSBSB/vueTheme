<template>
<div class="swiper-container brithSwiper">
	<div class="swiper-wrapper">
		            <li class="swiper-slide slideitem">18</li>
					<li class="swiper-slide slideitem">19</li>
					<li class="swiper-slide slideitem">20</li>
					<li class="swiper-slide slideitem">21</li>
					<li class="swiper-slide slideitem">22</li>
					<li class="swiper-slide slideitem">23</li>
					<li class="swiper-slide slideitem">24</li>
					<li class="swiper-slide slideitem">25</li>
					<li class="swiper-slide slideitem">26</li>
					<li class="swiper-slide slideitem">27</li>
					<li class="swiper-slide slideitem">28</li>
					<li class="swiper-slide slideitem">29</li>
					<li class="swiper-slide slideitem">30</li>
					<li class="swiper-slide slideitem">31</li>
					<li class="swiper-slide slideitem">32</li>
					<li class="swiper-slide slideitem">33</li>
					<li class="swiper-slide slideitem">34</li>
					<li class="swiper-slide slideitem">35</li>
					<li class="swiper-slide slideitem">36</li>
					<li class="swiper-slide slideitem">37</li>
					<li class="swiper-slide slideitem">38</li>
					<li class="swiper-slide slideitem">39</li>
					<li class="swiper-slide slideitem">40</li>
					<li class="swiper-slide slideitem">41</li>
					<li class="swiper-slide slideitem">42</li>
					<li class="swiper-slide slideitem">43</li>
					<li class="swiper-slide slideitem">44</li>
					<li class="swiper-slide slideitem">45</li>
					<li class="swiper-slide slideitem">46</li>
					<li class="swiper-slide slideitem">47</li>
					<li class="swiper-slide slideitem">48</li>
					<li class="swiper-slide slideitem">49</li>
					<li class="swiper-slide slideitem">50</li>
					<li class="swiper-slide slideitem">51</li>
					<li class="swiper-slide slideitem">52</li>
					<li class="swiper-slide slideitem">53</li>
					<li class="swiper-slide slideitem">54</li>
					<li class="swiper-slide slideitem">55</li>
					<li class="swiper-slide slideitem">56</li>
					<li class="swiper-slide slideitem">57</li>
					<li class="swiper-slide slideitem">58</li>
					<li class="swiper-slide slideitem">59</li>
					<li class="swiper-slide slideitem">60</li>
	</div>
</div>
</template>

<script>
	export default{
		props:{
			defVal:{
				default:28
			},
			age:{
				default:this.defVal
			},
			gap:{
				default:18
			},
		},
		data(){
			return {
				da:(this.age||this.defVal)-this.gap,
			}
		},
		mounted(){
				this.initSwiper();
		},
		watch:{
			age(val,old){
			    this.da = val-this.gap;
				this.initSwiper();
			}
		},
		methods:{
			initSwiper(){
				var that=this;
				if(that.Swiper) { that.Swiper.slideTo(that.da,500,false);return false;}
				that.Swiper=new Swiper('.brithSwiper', {
					onSlideChangeEnd: function(swiper) {
						var data=$(".brithSwiper .swiper-slide-active").text();
						 that.$emit('getage',data);
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