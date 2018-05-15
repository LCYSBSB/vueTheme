<template>
	<div class="evaluateBox scroll">
		<ul class="evaluate">
			<li  v-for="(item,index) in rules">
				<div class="matchImg">
					<img :src='host+item.productCollocationImg' alt="" />
				</div>
				<p>{{item.productNumber}}</p>
				<div class="btn" @click="evaluate(item.productNumber)" v-if="feedbackedNumbers.indexOf(item.productNumber)==-1">待评价</div>
				<div class="btn" v-if="feedbackedNumbers.indexOf(item.productNumber)>-1">已评价</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import types from "@/store/types.js"
	export default {
		data() {
			return {
				rules: [],
				host: types.IMGHOST,
				projectId:null,
				projectNum:null,
				feedbackedNumbers:[]
			}
		},
		mounted() {
			this.getYuyue();
		},
		methods: {
			evaluate(num){
				var that = this;
				that.$router.push({
							path: '/topic',
							query: {
							projectNum:that.projectNum,
							productNum:num
							}
						})
			},
			getYuyue() {
				var that = this;
				that.projectId= parseInt(that.$route.query.projectId);
				that.projectNum=that.$route.query.ProductNumber;
				$.ajax({
					type: "post",
					url: types.GETPLANS,
					data:{
						MemberId: localStorage.MemberId,
						U_Num: localStorage.u_num,
						id: that.projectId
					},
					success: function(data) {
						if(data.ResultType == 3) {
							var da = data.Data;
							that.rules  = JSON.parse(data.Data.plans[0].Rules);
							that.feedbackedNumbers=data.Data.feedbackedNumbers;
						} else {
							$.fashion.tip({
								content: data.Message,
								ok: function() {
									that.$router.push({path: '/login',})
								}
							})
						}
					}
				});
			}
		}
	}
</script>

<style scoped="scoped">
	.evaluateBox {
		padding-top: 2vh;
	}
	
	.evaluate {
		width: 85%;
		height: 98vh;
		margin: 0 auto;
		background: #fff;
		padding: 0 10px;
	}
	
	.evaluate li {
		height: 10vh;
		line-height: 10vh;
		border-bottom: 1px solid #ccc;
	}
	
	.matchImg {
		width: 40px;
		height: 40px;
		float: left;
		overflow: hidden;
		border-radius: 50%;
		margin-top: 10px;
	}
	
	.matchImg img {
		width: 100%;
	}
	
	.evaluate li p {
		display: inline-block;
		float: left;
		margin-left: 15px;
		font-size: 12px;
	}
	
	.btn {
		width: 60px;
		text-align: center;
		border-radius: 10px;
		float: right;
		background-color: #8A8A8A;
		height: 30px;
		line-height: 30px;
		color: #fff;
		font-size: 12px;
		margin-top: 15px;
	}
</style>