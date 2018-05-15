<template>
	<div class="index">
		<router-view></router-view>
		<div class="cartoon">
			<div class="fly"></div>
		</div>

		<footer id="footerMenu">
			<div class="menu" @click="changeactive(0)">
				<router-link to="projectall">
					<div class="menuImage"></div>
					<!--<img :src="active==0?box1:box2" alt="" />-->
					<p>微系列</p>
				</router-link>
			</div>
			<div class="menu" @click="changeactive(1)">
				<router-link to="homeSingle">
					<div class="menuImage"></div>
					<!--<img :src="active==1?danpinshow2:danpinshow1" alt="" />-->
					<!--	<p>一人一刊</p>-->
					<p>单品商城</p>
				</router-link>
			</div>
			<div class="menu" @click="changeactive(2)">
				<router-link to="myReservation">
					<div class="menuImage"></div>

					<!--<img :src="active==2?boxdingzhi2:boxdingzhi1" alt="" />-->
					<p>我要试穿</p>
				</router-link>
			</div>
			<div class="menu" @click="changeactive(3)">
				<router-link to="homeMine">
					<div class="menuImage"></div>

					<!--<img :src="active==3?wode2:wode1" />-->
					<p>我的</p>
				</router-link>
			</div>
		</footer>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				active: localStorage.activeIndex || 0,

			}
		},
		computed: {

		},
		created: function() {
			this._getLess("index", "index");
			//		 require("@/template/"+this.templates+"/index/index.less")
		},
		methods: {

			changeactive(index) {
				this.active = index;
				localStorage.activeIndex = index;
			},
			GetQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return decodeURI(r[2]);
				return null;
			}
		},
		mounted: function() {
			var _this = this;
			var MemberId = localStorage.getItem('MemberId');
			var u_num = localStorage.getItem('u_num');
			var openId = localStorage.getItem("openId");

			//获取授权回传的数据
			if(!MemberId || !u_num) {
				var memberinfo = _this.GetQueryString("MemberInfo");
				if(memberinfo) {
					memberinfo = JSON.parse(memberinfo);
					MemberId = memberinfo.MemberId;
					localStorage.setItem("MemberId", memberinfo.MemberId);
					u_num = memberinfo.U_Num;
					localStorage.setItem("u_num", memberinfo.U_Num);
					localStorage.UserPhoto = memberinfo.UserPhoto;
					localStorage.isTest = memberinfo.IsTest; //true做了风格测试false没做
					localStorage.isDetailTest = memberinfo.isDetailTest; //1做了详细测试0没做
				}
			}
			if(!MemberId && !openId) {
				var WxInfo = _this.GetQueryString("WxInfo");
				if(WxInfo) {
					WxInfo = JSON.parse(WxInfo);
					openId = WxInfo.openid;
					var headimg = WxInfo.headimgurl;
					var sex = WxInfo.sex; //0女1男
					var nickname = WxInfo.nickname;
					localStorage.isTest = WxInfo.IsTest; //true做了风格测试false没做
					localStorage.isDetailTest = WxInfo.isDetailTest; //1做了详细测试0没做
					localStorage.setItem("openId", openId);
				}
			}
			//
			if((!MemberId || !u_num) && !openId) {

			} else {
				if(MemberId && u_num) {
					localStorage.openId = "";
					$.notification.start();
				} else {
					localStorage.MemberId = "";
					localStorage.u_num = "";
				}
			}
		}
	}
</script>