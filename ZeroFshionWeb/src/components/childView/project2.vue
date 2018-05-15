<template>
	<div class="planeBox">
			<div class="planewrapper">
			
						
			
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
				scrollBox:".planeBox",
				scrollContent:".planewrapper",
			}
		},
		mounted() {
			this.getBodyType(); //先获得上个页面的参数(体型)
			this.getBodyStyle();
		},
		activated() {
			this.getBodyType(); //先获得上个页面的参数(体型)
			this.getBodyStyle();
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
						ProductAttrName: that.BodyStyle,
						PageIndex: that.PageIndex,
						PageSize: that.PageSize,
					},
					success: function(data) {
						if(data.ResultType == '3') {
							var contacts = data.Data;
							that.planList = contacts.List;
						
						}

					}
				});
			},
		},
	}
</script>
<style scoped>
.planeBox{
	width:100%;
	height: 91vh;
	overflow-y: auto;
}
.planewrapper{
	width: 100%;
}
</style>