<template>
	<div class="addressBox">
		<ul class="addressInfo">
			<li><span>收货人</span><input type="text" maxlength="10" v-model="da.Receiver" @blur="Adjust" /></li>
			<li><span>手机号</span><input type="text" maxlength="11" v-model="da.MobilePhone" @blur="Adjust" /></li>
			<li><span>省份</span><input type="text" maxlength="8" v-model="da.Province" @blur="Adjust" /></li>
			<li><span>城市</span><input type="text" maxlength="10" v-model="da.City" @blur="Adjust" /></li>
			<li><span>县/区</span><input type="text" maxlength="10" v-model="da.District" @blur="Adjust" /></li>
			<li><span>街道</span><input type="text" maxlength="30" v-model="da.HomeAddress" @blur="Adjust" /></li>
			<li style="border-bottom: none;"><span>详细地址</span></li>
			<li><i>{{address}}</i></li>
		</ul>
	</div>
</template>
<script>
	import types from "@/store/types.js"
	export default {
		data() {
			return {
				da: {},
			}
		},
		computed: {
			address() {
				var da = this.da;
				return da.Province + da.City + da.District + da.HomeAddress;
			},
		},
		mounted() {
			var me = this;
			$.fashion.ajax({
				url: types.GETADDRESS,
				data: {
					MemberId: localStorage.MemberId,
					U_Num: localStorage.u_num,
					PageIndex: 1,
					PageSize: 1,
				},
				success: function(da) {
					if(da && da.List.length > 0) {
						me.da = da.List[0];
					}
				}
			});
		},
		methods: {
			Adjust() {
				var me = this;
				$.fashion.ajax({
					url: types.ADJUSTADDRESS,
					data: {
						MemberId: localStorage.MemberId,
						U_Num: localStorage.u_num,
						Address: me.da
					},
					success: function(data) {

					}
				});
			}
		}
	}
</script>

<style scoped="scoped">
	.addressBox {
		width: 94%;
		margin: 0 auto;
		padding-top: 10px;
	}
	
	.addressInfo {
		width: 100%;
		height: 88vh;
		background: #fff;
	}
	
	.addressInfo li {
		width: 100%;
		border-bottom: 1px solid #F2F2F2;
	}
	
	.addressInfo li span {
		width: 25%;
		text-indent: 10px;
		height: 8vh;
		line-height: 8vh;
		color: #566C6D;
		display: inline-block;
		font-size: 15px;
	}
	
	.addressInfo li input {
		color: #5A5A5A;
		font-size: 14px;
		height: 8vh;
		line-height: 8vh;
	}
	
	.addressInfo li i {
		width: 100%;
		font-style: normal;
		font-size: 14px;
		display: inline-block;
		color: #566C6D;
		padding-left: 10px;
		height: 8vh;
		line-height: 3vh;
		padding-bottom: 2vh;
	}
</style>