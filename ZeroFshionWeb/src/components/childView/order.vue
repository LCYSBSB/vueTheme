<template>
	<div class="router scroll">

		<ul class="subscribeBox">
			<li class="MsgBox marginBot" v-for="(item,ind) in List" @click="openDetalsView(item.RetailNumber)">
				<p>单号：{{item.RetailNumber}}</p>
				<p>总价：{{item.ConsumeCount}}</p>
				<p>消费：{{item.RealConsumeMoney}}</p>
				<p>店铺：{{item.StoreName}}</p>
				<p>件数：{{item.PieceCount}}</p>
				<p>购买时间：{{item.BuyTime}}</p>
				<p>订单状态：{{item.IsAftermarketing?"售后中":item.RetailState}}</p>
			</li>
			<div v-show="List.length==0" style="margin:30px auto;text-align: center;color:#ccc"><img src="./image/order.png" style="width:60px;margin-top:70px"/><p>暂无订单</p></div>
		</ul>
		
	</div>
</template>

<script>
	import types from "@/store/types.js"
	export default {
		data() {
			return {
				List: []
			}
		},
		computed: {

		},
		mounted() {
			this.getDatas();
		},
		methods: {
			openDetalsView(RetailNumber){
				  this.$router.push({
						path: '/OrderDetails',
						query: {
							RetailNumber:RetailNumber
						}
					})
			},
			
			getDatas() {
				var sub = this;

				$.fashion.validate(sub, {
					login: true,
				}, function() {
					$.ajax({
						type: "post",
						url: types.GETORDERLIST,
						data: {
							MemberId: localStorage.MemberId,
							U_Num: localStorage.u_num,

						},
						success: function(da) {
							if(da.ResultType == 3) {
								var alldata= da.Data.List;
								$.each(alldata, function(index,item) {
									if(item.RetailState==0)item.RetailState="正常"
									if(item.RetailState==1)item.RetailState="整单已退货"
									if(item.RetailState==2)item.RetailState="部分退货"
									if(item.RetailState==3)item.RetailState="删除"
									if(item.RetailState==4)item.RetailState="禁用"
									if(item.RetailState==5)item.RetailState="发货完成"
									
								});
								sub.List=alldata;
							}

						}
					});
				});
			}
		}

	}
</script>

<style scoped>
	.subscribeBox {
		width: 95%;
		margin: 0 auto;
	}
	
	.MsgBox {
		width: 100%;
		background: #fff;
		clear: both;
		margin: 29px 0;
		border-radius: 10px;
		-webkit-box-shadow: 3px 8px 19px #888888;
		box-shadow: 0px 3px 15px #888888;
	}
</style>