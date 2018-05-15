<template>
	<div class="infoBox">
		<div class="photoBox">
			<div class="photoInfo">
				<img :src="UserPhoto" alt="" />
			</div>
			<span class="level">{{datas.LevelName}}</span>
			<span class="name">{{datas.RealName}}</span>
		</div>
		<ul class="message">
			<li @click="showSex" v-model="sex"><span>性别</span><i>{{getSex}}</i><img src="./projectView/jiantou.png" alt="" /></li>
			<li><router-link to="/BindSotreMap"><span>归属店铺</span><i>{{storeName}}</i><img src="./projectView/jiantou.png" alt="" /></router-link></li>
			<li @click="setDate"><span>生日</span><i>{{getTime}}</i><img src="./projectView/jiantou.png" alt="" /></li>
			<li @click="changePsd" v-model="change"><span>修改密码</span><img src="./projectView/jiantou.png" alt="" /></li>
			<li v-on:click='layerToast("暂未开放")'>
				<span>收货地址</span>
					
					<img src="./projectView/jiantou.png" alt="" />
				
			</li>
			<li v-on:click='openRecommendBox'>
				<span>推荐人</span>
			        <i>{{Recommend}}</i>
					<img src="./projectView/jiantou.png" alt="" v-if="CanRecommend" />
				
			</li>
		</ul>
		<!--修改性别-->
		<div @click="hideSex" class="changeSex" v-show="sex">
			<ul class="sexBox">
				<li @click="changSex(0)"><span>性别</span><i>女</i></li>
				<li @click="changSex(1)"><span>性别</span><i>男</i></li>
			</ul>
		</div>
		<!--修改密码-->
		<div class="changePassword" v-show="change">
			<div class="psd"><span>旧密码</span><input type="password" v-model="oldPassWord" id="oldPassWord" /></div>
			<div class="psd"><span>新密码</span><input type="password" v-model="newPassWord" id="newPassWord" /></div>
			<div class="psd"><span>再次确认</span><input type="password" v-model="aginNewPassWord" id="againPassWord" /></div>
			<div class="changePsd" @click="changePassWord" v-model="change"></div>
		</div>
		<!--推荐人-->
		<div  class="changetuijianren" v-show="tuijianren">
			<div class="closeLaylout" @click="tuijianren=false"></div>
			<ul class="tuijianrenbox">
				<li><span>推荐人:</span><input type="text" class="tuijianrenInput" placeholder="推荐人手机号" maxlength="11"  v-model="RecommendVal"/> </li>
				<div class="btn" @click="changeRecommend"><span>修改</span></div>
			</ul>
		</div>
		
		
		<footer>
			<div class="login-out" v-on:click="loginOut">退出登录</div>
		</footer>
		
	</div>
</template>

<script>
	import { mapGetters, mapActions, mapMutations } from 'vuex';
	import Vue from 'vue';
	import Calendar from 'vue2-datepick';
	import types from "@/store/types.js"
	import mixin from "@/store/mixin.js"
	
	Vue.use(Calendar);
	export default {
		data() {
			return {
				datas: '',
				sex: '',
				change: false,
				tuijianren:false,
				oldPassWord: '',
				newPassWord: '',
				aginNewPassWord: '',
				UserPhoto: localStorage.UserPhoto,
				MemberName: localStorage.MemberName,
				storeName:"",
				Recommend:'',
				RecommendVal:'',
				CanRecommend:false
			}
		},
		created: function() {
			this._getLess("components","mineSet");
//		   require("@/template/"+this.templates+"/components/mineSet/index.less");
		},
		mixins:[mixin],
		computed: {
			...mapGetters([
				'getSex',
				'getTime',
				'getstore'
			])
		},
		mounted() {
			this.getUserMessage();
		},
		methods: {
			openRecommendBox(){
				if(this.CanRecommend)this.tuijianren=true;
			},
			...mapActions([
				'changeSex',
				'changeTime'
			]),
			//更改归属店铺
//			...mapMutations([
//				'changeStorefalg',
//			]),
			changeRecommend(){
				var that=this;
			$.fashion.ajax({
					url: types.CHANGERECOMMEND,
					data: {
						MemberId: localStorage.MemberId,
						U_Num: localStorage.u_num,
						RecommendPhone:that.RecommendVal
					},
					success: function(da) {
						that.tuijianren=false;
						that.Recommend=da.Recommender;
						that.CanRecommend=false;
					}
				});
			},
			//修改性别
			showSex() {
				this.sex = true;
			},
			hideSex() {
				this.sex = false;
				
			},
			changSex(da) {
				var self = this;
				self.updatememberinfo(da, 4, function() {
					self.changeSex(da);
				});
			},
			//修改生日			
			setDate() {
				var self = this;
				this.$calendar.show({
					onOk: (date) => {
						self.updatememberinfo(date, 6, function() {
							self.changeTime(date);
						})
					}
				});
			},
			updatememberinfo(keyword, flag, fn) {
				$.ajax({
					type: "post",
					url: types.UPDATEMEMBERINFO,
					data: {
						MemberId: localStorage.MemberId,
						U_Num: localStorage.u_num,
						KeyWord: keyword,
						Flag: flag
					},
					success: function(da) {
						$.fashion.tip({
							content: da.ResultType == 3 ? "修改成功" : da.Message,
						});
						if(da.ResultType == 3 && typeof fn == "function")
							fn();
					}
				});
			},
			//修改密码
			changePsd() {
				this.change = true;
			},
			changePassWord() {
				var me = this;
				$.fashion.ajax({
					url: types.UPDATE_PASSWORD,
					data: {
						MemberId: localStorage.MemberId,
						U_Num: localStorage.u_num,
						OldPwd: me.oldPassWord,
						NewPwd: me.newPassWord,
					},
					success: function(da) {
						localStorage.u_num = da.U_Num;
						me.oldPassWord = null;
						me.newPassWord = null;
						me.aginNewPassWord = null;
						me.change = false;
						$.fashion.tip({
							content: '密码修改成功',
							btn: ["确定"],
						});
					}
				});
			},
			//获取个人信息
			getUserMessage() {
				var _self = this;
				$.ajax({
					type: "post",
					data: {
						MemberId: localStorage.MemberId,
						U_Num: localStorage.u_num,
						//						OpenId: "oUtkFj7zfwcXD9yi12kEECdhCC1I",
					},
					url: types.GETMEMBERINFO,
					success: function(data) {
						var da = data.Data;
						_self.storeName=da.StoreName;
						localStorage.StoreName=da.StoreName||'无';
						_self.datas = da;
					//	_self.changeStoreName(da.StoreName);
						_self.Recommend=da.Recommender||"无";
						_self.CanRecommend=da.CanRecommend;
						_self.changeSex(da.Gender);
						_self.changeTime(da.DateofBirth);
					},
				});
			},
			loginOut(){
				localStorage.clear();
				window.location.replace(types.HOME);
			}
		}
	}
</script>

