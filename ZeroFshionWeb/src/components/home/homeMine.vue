<template>
	<div class="detailsBox">
		<!--头部信息-->
		<div class="personalDetails" v-if="templates=='001'">
			<div class="photo">
				<img :src="UserPhoto" alt="" />
			</div>
			<ul class="details">
				<li>{{MemberName}}</li>
				<li>{{LevelName}}</li>
				<li>{{StoreName}}</li>
			</ul>
			<div class="change">
				<div class="qrCode">

					<router-link to="/activity"><img :src="_getImage('homeMine','erweima.png')" alt="二维码" /></router-link>
				</div>
				<div class="set">
					<img :src="_getImage('homeMine','shezhi.png')" alt="设置" @click="openNewViewCheack('mineSet')" />
				</div>
			</div>
		</div>
		<div class="personalDetails" v-if="templates!='001'">
			<div class="photo">
				<img :src="UserPhoto" alt="" />
			</div>
			<ul class="details">
				<li>{{MemberName}}</li>
				<li>{{StoreName}}</li>
			</ul>
			<div class="change">
				<div class="qrCode">
					<router-link to="/activity"><img :src="_getImage('homeMine','erweima.png')" alt="二维码" /></router-link>
				</div>
				<div class="set">
					<img :src="_getImage('homeMine','shezhi.png')" alt="设置" @click="openNewViewCheack('mineSet')" />
				</div>
			</div>
			<div class="personalDetailsBottom">
				<div @click="openNewViewCheack('subscribe')"><img :src="_getImage('homeMine','wdyy.png')" alt="" />
					<p>我的预约</p>
				</div>
				<div class="spliceline"></div>
				<div v-on:click='openNewViewCheack("Order")'><img :src="_getImage('homeMine','wddd.png')" alt="" />
					<p>我的订单</p>
				</div>
				<div class="spliceline"></div>
				<div @click="openNewViewCheack('mineCollect')"><img :src="_getImage('homeMine','xyqd.png')" alt="" />
					<p>心愿清单</p>
				</div>
			</div>

		</div>
		<ul class="singleBox" v-if="templates!='001'">
			<li @click="openNewViewCheack('CeshiReport')"><img :src="_getImage('homeMine','ceshibaogao.png')" alt="" /><p>测试报告</p></li>
			<li @click="openNewViewCheack('mineWallet')"><img :src="_getImage('homeMine','wodeqianbao.png')" alt="" /><p>我的钱包</p></li>
			<li>
				<router-link to='/activity'><img :src="_getImage('homeMine','youhuihuodong.png')" alt="" /><p>优惠活动 </p></router-link>
			</li>
			<li v-on:click='layerToast("敬请期待")'><img :src="_getImage('homeMine','jianglizhongxin.png')" alt="" /><p>奖励中心</p></li>
			<li>
				<a href="http://mp.weixin.qq.com/s/m-j-TY3m0Nnfmqx0JDSysw">
					<img  :src="_getImage('homeMine','shiyijianhezuo.png')" alt="" /><p>试衣合作</p>
				</a>
			</li>
			<li>
				<a href="tel:400-600-0433">
					<div>
						<img  :src="_getImage('homeMine','kefu.png')" alt="" /><p>客服电话</p>
					</div>
				</a>
			</li>
		</ul>
		<!--我的-->
		<ul class="singleBox" v-if="templates=='001'">
			<li @click="openNewViewCheack('subscribe')"><img src="./img/homeMine/wodeyuyue.png" alt="" />我的预约</li>
			<li @click="openNewViewCheack('mineWallet')"><img src="./img/homeMine/wodeqianbao.png" alt="" />我的钱包</li>
			<li @click="openNewViewCheack('mineCollect')"><img src="./img/homeMine/wodeshoucang.png" alt="" />我的心愿清单</li>
			<!--<li @click="openNewViewCheack('myBoxList')"><img src="./img/homeMine/wodebox.png" alt="" />我的BOX</li>-->
			<li v-on:click='openNewViewCheack("Order")'><img src="./img/homeMine/wodedindan.png" alt="" />我的订单</li>
			<li @click="openNewViewCheack('CeshiReport')"><img src="./img/homeMine/ceshibaogao.png" alt="" />测试报告</li>
		</ul>
		<!--end 我的-->
		<!--活动中心-->
		<ul class="singleBox" v-if="templates=='001'">
			<router-link to='/activity'>
				<li><img src="./img/homeMine/youhuihuodong.png" alt="" />优惠活动</li>
			</router-link>
			<li v-on:click='layerToast("敬请期待")'><img src="./img/homeMine/jianglizhongxin.png" alt="" />奖励中心</li>
			<a href="http://mp.weixin.qq.com/s/m-j-TY3m0Nnfmqx0JDSysw">
				<li><img src="./img/homeMine/shiyijianhezuo.png" alt="" />试衣间合作</li>
			</a>

		</ul>
		<!--end 活动中心-->
		<!--联系方式-->
		<div class="phone" v-if="templates=='001'">客服电话：400-600-0433</div>
		<!--end联系方式-->
	</div>

</template>
<script>
	import types from "@/store/types.js"
	import mixin from "@/store/mixin.js"

	export default {
		data() {
			return {
				UserPhoto: localStorage.UserPhoto,
				MemberName: localStorage.MemberName,
				LevelName: '',
				StoreName: '我的店铺',
			}
		},
		created: function() {
			this._getLess("home","homeMine");
//			require("@/template/" + this.templates + "/home/homeMine/index.less")
		},
		mixins: [mixin],
		mounted() {
			this.getUserMessage();
		},
		methods: {
			openNewViewCheack(path) {
				var that = this;
				$.fashion.validate(that, {
					login: true
				}, function() {
					that.$router.push({
						path: '/' + path
					})
				})
			},
			getUserMessage() {
				var _self = this;
				$.fashion.validate(_self, {
					phone: true
				}, function() {
					$.ajax({
						type: "post",
						data: {
							MemberId: localStorage.MemberId,
							U_Num: localStorage.u_num,
							//						OpenId: "oUtkFj7zfwcXD9yi12kEECdhCC1I",
						},
						url: types.GETMEMBERINFO,
						success: function(data) {
							if(data.ResultType == 3) {
								var da = data.Data;
								_self.MemberName = da.RealName;
								_self.LevelName = da.LevelName;
								_self.StoreName = da.StoreName;
								localStorage.StoreName = da.StoreName;
							} else if(data.ResultType == 6) {
								$.fashion.tip({
									content: data.Message,
									ok: function() {
										_self.$router.replace({
											path: '/login',
											query: {
												orgpath: _self.$route.fullPath
											}
										})
									}
								});
							}
						},
					});
				})
			},
		},

	}
</script>