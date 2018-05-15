<template>
	<div id="serviceBox">
		<div class="chargeBox">
			<p class="serviceCharge">预约搭配方案需要支付50元预约费</br>您可到零时尚共享试衣间领取免费预约码</br>也可拨打零时尚热线获取预约码</br><span style="color:#214D50">400-600-0433</span></p>
		</div>
		
			<!--<div class="yuyuetitel">请填写预约券上的预约码即可预约</div>-->
			
			<!--<div class="checkPay" v-show="false">{{ticket}}</div>
			<div class="selectBox">
				<input type="radio" v-model="ticket" value="0" id="quan">
				<div class="user-defined">
					<span class="circle" :class="ticket=='0'?'active':''"></span>
				</div>
				<label for="quan">预约券</label>
				<span class="coupon">您当前有<i> {{payIndex}} </i>张预约券</span>
				<input type="button" v-show="showDraw" @click="changeHtml" class="draw" value="免费领取" />
				<input type="button" v-show="hideDraw" class="alreadyReceived" value="已领取" />
			</div>
			<div class="selectBox">
				<input type="radio" v-model="ticket" value="1" id="chuzhi">
				<div class="user-defined">
					<span class="circle" :class="ticket=='1'?'active':''"></span>
				</div>
				<label class="stored" for="chuzhi">花费50</label>
				<span class="residue">剩余储值{{store}}</span>
			</div>-->
		
		<div class="selectStore">
			<img src="./image/selectmap_icon.png" alt="" class="selectmap_icon" />
			<router-link to="/BindSotreMap"> {{StoreName}}
				<div class="changeStore" v-show="hasStore">
					<p>更换试衣间</p><img src="./image/changeStoreIcon.png" alt="" />
				</div>
			</router-link>
		</div>
		<div class="radioBox">
		<input type="text" class="yuyuema" placeholder="输入预约码" maxlength="6" v-model="ConversionCodeInput" />
		</div>
		<div class="present" @click="submit">提交</div>
	</div>
</template>

<script>
	import types from "@/store/types.js"
	import { mapGetters, mapActions, mapMutations } from 'vuex';

	export default {
		data() {
			return {
				ticket: null,
				showDraw: true,
				hideDraw: false,
				payIndex: '0',
				store: '', //储值
				StoreName: '', //当前试衣店铺
				changePay: 0,
				mianfei: '',
				hasStore: true,
				ConversionCodeInput: '',
				ConversionCode: ['YUE001', 'YUE002', 'YUE003', 'ZMZ001','FLY001','STA001','LSS001']
			}
		},
		created: function() {
				this._getLess("components","payment");
			
//		   require("@/template/"+this.templates+"/components/payment/index.less");
		},
		mounted() {
			//初始化预约券数目
			localStorage.paydex = 0;
			this.getIndex();
			this.cheackRealStore();
		},
		computed: {
			...mapGetters([
				'getSelectMyBoxToDiyOptions',
				'getSelectMyBoxToDiySelectLikeNum',
				'getSelectMyBoxToDiySelectNote'
			])

		},
		methods: {
			cheackRealStore() {
				var that = this;
//				$.fashion.validate(that, {
//					store: true
//				})
				that.StoreName = localStorage.StoreName || "请选择共享试衣间";
				if(!localStorage.StoreName) that.hasStore = false;
			},
			tip(msg, palnId) {
				var me = this;
				$.fashion.tip({
					content: msg,
					ok: function() {
						me.$router.push({
							path: '/subscribe',
							query: {
								imgId: palnId
							}
						})
					}
				});
			},
			submit() {

				var self = this;
				var appointmentType = this.$route.query.fromType;
				/*判断是否选择了试衣店铺和兑换码是否正确*/
				if(this.ConversionCode.indexOf(this.ConversionCodeInput) >= 0) {
						if(this.hasStore) {
							if(appointmentType == 1) {
									//定制box预约
									var data = {
										MemberId: localStorage.MemberId,
										U_Num: localStorage.u_num,
										likes: this.getSelectMyBoxToDiySelectLikeNum.join(','),
										notes: this.getSelectMyBoxToDiySelectNote,
										options: JSON.stringify(this.getSelectMyBoxToDiyOptions) //JSON.stringify(options) 
									}
									$.ajax({
										type: "post",
										url: types.HOST + "/API/Members/Appointment/AddV2",
										data: data,
										success: function(data) {
											//console.log(data)
											if(data.ResultType == 3) {
												//预约成功
												layer.open({
													title: '预约成功',
													btn: ["确定"],
													content: '您收到的搭配方案可能根据库存有所调整，但风格将保持一致，我们会在一个工作日内与您联系，请注意接听零时尚客服电话',
													yes: function(index, layero) {
														//预约成功页面跳转
														self.toSubscribe()
														layer.closeAll()
													}
												});
											} else {
												self.tip(data.Message);
											}
										}
									});
								} else {
									//方案预约
//									var me = this;
//									let palnId = parseInt(this.$route.query.palnId);
//									$.ajax({
//										type: "post",
//										url: types.ADDBYPLAN,
//										data: {
//											MemberId: localStorage.MemberId,
//											U_Num: localStorage.u_num,
//											planId: palnId
//										},
//										success: function(da) {
//											if(da.ResultType == 3) {//400-600-0433
//												me.tip("您收到的搭配方案可能根据库存有所调整，但风格将保持一致，我们会在一个工作日内与您联系，请注意接听零时尚客服电话", palnId);
//												localStorage.paydex = 0;
//											} else {
//												me.tip(da.Message, palnId);
//											}
//										}
//									});
								}
						} else {
							$.fashion.tip("请点击‘选择试衣店铺’>在地图中点击图标>设置归属店铺");
							return;
						}
						
				} else {
					$.fashion.tip("预约码错误,请注意区分大小写");
					return;
				}
				

								
			},

			storedPresent() {
				var me = this;
				var itemval = $(".checkPay").html();
				var huiyuan = localStorage.paydex;
				if(itemval == "" || itemval == "[]") {
					$.fashion.tip({
						content: '请选择支付方式',
						btn: ["确定"],
					});
					return false
				}

				if(itemval == 0) {
					if(huiyuan == 0) {
						$.fashion.tip({
							content: '无可用预约券',
							btn: ["确定"],
						});
						return false
					} else {
						me.submit();
					}
				}
				if(itemval == 1) {
					$.fashion.tip({
						content: '需花费储值50',
						ok: function() {
							console.log('需花费储值50');
							$.fashion.tip("暂时不可以通过储值预约")
						}
					});
				}

			},
			getIndex() {
				var me = this;
				var paydex = localStorage.paydex;
				console.log(paydex);
				$.ajax({
					type: "post",
					url: types.GETMEMBERSCORE,
					data: {
						MemberId: localStorage.MemberId,
						U_Num: localStorage.u_num,
					},
					success: function(data) {
						if(data.ResultType == 3) {
							var da = data.Data;
							me.store = da.Balance;
						}
					}
				})
			},
			changeHtml() {
				var self = this;
				self.showDraw = false;
				self.hideDraw = true;
				self.payIndex = 1;
				localStorage.paydex = 1;
			},
			toSubscribe() {
				this.$router.push({
					path: '/subscribe'
				})
			}
		}
	}
</script>
