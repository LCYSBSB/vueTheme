<template>
	<div class="psdBody">
		
		<div class="psdBox">
			<ul class="">
				<li class="icon borderline" style="height:1.2rem"><img src="./img/sjh.png" alt="" /></li>
				<li class="borderline" style="height:1.2rem"><input type="text" class="phoNum" placeholder="输入手机号" maxlength="11" style="width:2.9rem"  v-model="formData.phoNum"/></li>
				<li>
					<div class="getCode" @click="getRegisterCode(formData)" :disabled="!this.Verification.show">
					 <span v-show="this.Verification.show">获取验证码</span>
        			 <span v-show="!this.Verification.show" class="count">{{this.Verification.count}} s</span>
        		 </div>
				</li>
			</ul>
			<ul class="borderline">
				<li class="icon"><img src="./img/xinxi.png" alt="" style="width:.5rem;margin-top:.65rem"/></li>
				<li><input type="text" class="yzmNum" placeholder="输入验证码信息" v-model="formData.code" /></li>
			</ul>
			<ul class="borderline">
				<li class="icon"><img src="./img/mima1.png" alt="" /></li>
				<li><input type="password" class="newPsd" placeholder="设置密码" v-model="formData.newPwd" /></li>
			</ul>
			<ul class="borderline">
				<li class="icon"><img src="./img/tuijianren.png" alt="" /></li>
				<li><input type="text" class="" placeholder="推荐人手机号(可选)" maxlength="11" v-model="formData.Recommend" /></li>
			</ul>
		</div>
		<div class="sureLogin" @click="register(formData)">注册并登陆</div>
		<router-link to="/login"><p class="backLogon">返回登录</p></router-link>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import types from "@/store/types.js"
	export default{
	data(){
			 return {
			       formData: {
			          phoNum:'',	//手机号
			          code:'',		//验证码
			          newPwd:'',	//密码
			          type:0,//忘记密码是1 ，注册是0
			          Recommend:''//推荐人
			        }
		      }
	},
	computed:{
			...mapGetters([
				'Verification',
			])
		},
	methods:{
		getRegisterCode(formData){
		    this.$store.dispatch('getVerificationCode',{formData});
		},
		register(formData){
			
		
			var that=this;
				$.ajax({
					type: "post",
					url: types.HOST + "/api/members/member/register",
					data: {
						PhoneNumber: formData.phoNum,
						VerifyCode: formData.code,
						PassWord: formData.newPwd,
						Recommend:formData.Recommend,
						StoreId:36//旗舰店
					},
					success: function(data) {
						if(data.ResultType == 3) {
							$.ajax({
								type: "post",
								url: types.HOST + '/api/members/member/login',
								data: {
									PhoneNumber: formData.phoNum,
									PassWord: formData.newPwd
								},
								success: function(data) {
									if(data.ResultType == 3) {
										localStorage.MemberId = data.Data.MemberId;
										localStorage.u_num = data.Data.U_Num;
									    that.$router.push({ path: '/' })
									} else {
										layer.open({content: data.Message,skin: 'msg',time: 2});
									}
								}
							});
						} else {
							layer.open({content: data.Message,skin: 'msg',time: 2});
							that.formData.Recommend='';
						}
					}
				});
		}
	}
}
</script>

