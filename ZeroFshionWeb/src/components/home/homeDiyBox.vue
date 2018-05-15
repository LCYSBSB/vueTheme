<template>
	<div class="homeDiyBox">
		<div class="diyboxcontent">
			<p>提交试衣需求<br/>预约专属搭配方案</p>
			<img :src="_getImage('homeDiyBox','diyShow.png')" alt="" class="bg" />
			<img @click="godiy" :src="_getImage('homeDiyBox','kaishidingzhi.png')" alt="" class="todiy" />
		</div>
	</div>
</template>

<script>
	export default {
		created: function() {
				this._getLess("home","homeDiyBox");
//		   require("@/template/"+this.templates+"/home/homeDiyBox/index.less")
		},
		methods: {
			godiy() {
				var that = this;
				$.fashion.validate(that, {
					login: true,
					test: true
				}, function() {
					that.$router.push({
						path: "/boxCustomized"
					})
				})
			}
		}
	}
</script>

