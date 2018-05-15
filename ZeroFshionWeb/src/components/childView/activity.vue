<template>
	<div>
		<ul class="activityHead">
			<li>
				<img src="./projectView/QIANDAO2.png" alt="" />
				<p>已签到</p>
			</li>
			<li v-on:click='layerToast("暂未开放")'>
				<img src="./projectView/FENXIANG1.png" alt="" />
				<p>分享</p>
			</li>
		</ul>

		<!--<div class="youhuiquan">
			<img class="barcodeImg" src="" />
			<p>{{CardNumber}}</p>
		</div>-->
		<!--优惠券-->
		<div id='youhq' class="scroll">
			<div class="youhuiquan">
				<div class="barcodeImg"/>
				<p>{{CardNumber}}</p>
			</div>

			<div id="newYouh">
				<div class="youhuq">
					<img class="imgYouh" v-on:click="coupon_code_show=true;show_cupon_code(item.CouponNumber)" v-for="item in coupon_list" v-bind:data-int="item.CouponNumber" v-bind:src="item.CouponImagePath">
				</div>
			</div>

			<div id='oldYouh'>
				<p class="seeYouh" v-on:click="expired_coupon_title_show?expired_coupon_title_show=false:expired_coupon_title_show=true"> 过期/已使用 优惠券</p>
				<img class="open" src="./projectView/sj@2x.png" alt="" />
			</div>
			<div id="appendYouh" v-show="expired_coupon_title_show">
					<img v-for="item in expired_coupon" class="oldImg"  :src='item.CouponImagePath'>
		   </div>
		</div>
		<!--优惠券弹窗-->
		<div class="yhqDialog" v-show="coupon_code_show" v-on:click="coupon_code_show=false">
			<!--优惠券遮罩-->

			<div class="youhuiquanalog">

				<img class="barcodeImgalog" />
				<p>{{coupon_code_show_num}}</p>
			</div>
		</div>
		<!--二维码弹窗-->
		<div class="qrDialog" v-show="coupon_qrcode_show" v-on:click="coupon_qrcode_show=false">
			<div class="erweima">
			</div>
		</div>
	</div>
</template>

<script>
	import types from "@/store/types.js"
	import JSbar from "@/store/JsBarcode.all.min.js"
//	import QRCode from "@/store/JsQrcode.min.js"
	import QRCode from 'qrcodejs2'
	import mixin from "@/store/mixin.js"
	
	var options = {
		format: "CODE128", //选择要使用的条形码类型
		width: 4, //设置条之间的宽度
		height: 100, //高度
		displayValue: false, //是否在条形码下方显示文字
		background: "#fff", //设置条形码的背景
		lineColor: "#000", //设置条和文本的颜色。
		margin: 0 //设置条形码周围的空白边距
	};

	export default {
		data() {
			return {
				clear_cache_show: false,
				shop_dialog_show: false,
				shop_list_show: false,
				login_failure: false,
				login_fail_msg: '',
				shop_list: [],
				coupon_list: [],
				expired_coupon_title_show:false,
				expired_coupon: [],
				CardNumber: "",
				UUID:"",
				coupon_code_show: false,
				coupon_qrcode_show:false,
				coupon_code_show_num: '',
				qrcodesize:100
			}
		},
		mixins:[mixin],
		created(){ 
				this._getLess("components","active");
//			 require("@/template/"+this.templates+"/components/active/index.less")
			var self = this;
			self.getUUID();
			setInterval(self.getUUID,(1000*60-10)*3);
//			$.notification.onUUIDChange=function(uuid){
//				self.UUID = uuid;
//			}
			//$.notification.start();
		},
		mounted() {
			var _self = this;
			_self.getCoupon()
		},
		watch:{
			CardNumber(){
				this.show_qruuid_code();
			},
			UUID(){
				this.show_qruuid_code();
			},
		},
		computed: {
			
		},
		methods: {
			getUUID(){
				var self=this;
				$.ajax({
				url:types.GETUUID,
				type:"post",
				data:{
						MemberId: localStorage.MemberId,
						U_Num: localStorage.u_num,
				},
				success:function(da){
					if(da.ResultType == 3) {
						self.UUID = da.Data.UUID;
					}
				},
					error: function(da) {}
				})
			},
			getCoupon() {
				var _self = this;
				//未使用
				$.ajax({
					type: "post",
					url: types.GETCOUPON,
					data: {
						MemberId: localStorage.MemberId,
						U_Num: localStorage.u_num,
						CouponType: 0
					},
					success: function(data) {
						var data = data.Data;
						_self.coupon_list = data.ListCouPon;
						_self.CardNumber = data.CardNumber;
					    _self.getExpiredcoupon(1);
					}
				});
			},
			getExpiredcoupon(type) {
				var _self = this;
				$.ajax({
					type: "post",
					url: types.GETCOUPON,
					data: {
						MemberId: localStorage.MemberId,
						U_Num: localStorage.u_num,
						CouponType: type
					},
					success: function(data) {
						var data = data.Data;
						Object.assign(_self.expired_coupon,data.ListCouPon);
//						_self.expired_coupon = _self.expired_coupon.concat(data.ListCouPon);
						if(type==1){
							_self.getExpiredcoupon(2);
						}
					}
				});
			},
			show_cupon_code(code) {
				JsBarcode(".barcodeImgalog", code, options);
				this.coupon_code_show_num = code
			},
			show_qruuid_code(){
				if($(".erweima").attr("title"))return;
				var self=this;
				var code = self.CardNumber;
				if(self.UUID){
					code+="&"+self.UUID;
				}
				var domCode = document.getElementsByClassName("barcodeImg")[0];
				domCode.innerHTML=null;
				new QRCode(domCode, {
						    width: 200,
						    height: 200,
						    colorDark: "#000000",
						    colorLight: "#ffffff",
						    text: code, //二维码内容
						});
			}
		}
	}
</script>

