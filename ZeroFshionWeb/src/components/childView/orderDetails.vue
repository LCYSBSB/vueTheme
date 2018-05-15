<template>
	<div class="router scroll">

		<ul class="subscribeBox">
			<li class="MsgBox marginBot" v-for="(item,ind) in List">
				<p>商品名称：{{item.ProductName }}</p>
				<p>商品条码：{{item.ProductBarcode }}</p>
				<p>商品图片：{{item.ThumbnailPath }}</p>
				<p>零售价格：{{item.Price }}</p>
				<p>是否已经退货：{{item.IsReturned }}</p>
				<p>颜色：{{item.ColorName }}</p>
				<p v-if="item.IsAftermarketing">售后中</p>
				<input  v-if="canApply" type="checkbox"  :value="item.ProductBarcode" v-model="AllreturnProductBarcode"/>
				
			</li>
		</ul>
		    <p>{{AllreturnProductBarcode}}</p>
			<button @click="Aftersales()" v-if="canApply">申请售后</button>
	</div>
</template>

<script>
	import types from "@/store/types.js"
	export default {
		data() {
			return {
				List: [],
				RetailNumber:0,
				AllreturnProductBarcode:[],
				canApply:false
			}
		},
		computed: {
			
		},
		mounted() {
			this.getDatas();
			this.getcanApply();
		},
		methods: {
			
			Aftersales(){
				var that=this;
				$.ajax({
						type: "post",
						url: types.APPYAFTERSALE,
						data: {
							MemberId: localStorage.MemberId,
							U_Num: localStorage.u_num,
						    RetailNumber: that.RetailNumber,
						    BarCodes:that.AllreturnProductBarcode
						},
						success: function(da) {
							if(da.ResultType == 3) {
							}

						}
					});
					
					
			},
			getcanApply(){
				var  that=this;
				$.ajax({
						type: "post",
						url: types.CANAPPLY,
						data: {
							MemberId: localStorage.MemberId,
							U_Num: localStorage.u_num,
						},
						success: function(da) {
							that.canApply=da.ResultType==3;

						}
					});
			},
			getDatas() {
			    this.RetailNumber=this.$route.query.RetailNumber;
				var sub = this;
				
				$.fashion.validate(sub, {
					login: true,
				}, function() {
					$.ajax({
						type: "post",
						url: types.GETORDERLISTDETAILS,
						data: {
							MemberId: localStorage.MemberId,
							U_Num: localStorage.u_num,
						    RetailNumber:sub.RetailNumber
						},
						success: function(da) {
							if(da.ResultType == 3) {
								sub.List = da.Data.List;
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