<template>
	<div class="boxheader">
		<div class="walletHead">
			<div class="integral">
				<p>{{Score}}</p>
				<p>积分</p>
			</div>
			<div class="integral">
				<p>{{Balance}}</p>
				<p>储值</p>
			</div>
		</div>
		

		<div class="rechargeBtn" @click="recharge">
			充值
		</div>
	</div>
</template>

<script>
	import types from "@/store/types.js"
	export default {
		data() {
			return {
				Score: '',
				Balance: '',
			}
		},
		created: function() {
				this._getLess("components","mineWallet");
//		   require("@/template/"+this.templates+"/components/mineWallet/index.less");
		},
		mounted() {
			this.getScore();
		},
		methods: {
			recharge(){
				$.fashion.tip("敬请期待");
			},
			getScore() {
				var that = this;
				$.fashion.validate(that,{phone:true}, function() {
					$.ajax({
						type: "post",
						url: types.GETMEMBERSCORE,
						data: {
							MemberId: localStorage.MemberId,
							U_Num: localStorage.u_num,
						},
						success:function(data){
							if(data.ResultType==3){
								var da = data.Data;
								that.Score=da.Score;
								that.Balance=da.Balance;
							}
						}
					});

				})

			}
		}

	}
</script>

