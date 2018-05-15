<template>
	<div class="psdBody">
			
		<div class="psdBox">
			<ul class="">
				<li class="icon borderline" style="height:1.2rem"><img src="./img/sjh.png" alt="" /></li>
				<li class="borderline" style="height:1.2rem"><input type="text" class="phoNum" maxlength="11" placeholder="输入手机号" style="width:2.9rem" v-model="formData.phoNum"/></li>
				<li>
				<div class="getCode" @click="getCode(formData)" :disabled="!this.Verification.show">
					 <span v-show="this.Verification.show">获取验证码</span>
        			 <span v-show="!this.Verification.show" class="count">{{this.Verification.count}} s</span>
        		 </div>
				</li>
			</ul>
			<ul class="borderline">
				<li class="icon"><img src="./img/xinxi.png" alt="" style="width:.5rem;margin-top:.65rem"/></li>
				<li><input type="text" class="yzmNum" placeholder="验证码" v-model="formData.code" /></li>
			</ul>
			<ul class="borderline">
				<li class="icon"><img src="./img/mima1.png" alt="" /></li>
				<li><input type="password" class="newPsd" placeholder="设置新密码" v-model="formData.newPwd" /></li>
			</ul>
			<ul class="borderline">
				<li class="icon"><img src="./img/mima2.png" alt="" /></li>
				<li><input type="password" class="aginPsd" placeholder="再次输入新密码" v-model="formData.newPwdagin"/></li>
			</ul>
		</div>
		<div class="sureLogin" @click="sureLogin(formData)">确认</div>
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
			          newPwdagin:'',	//再一次密码
			          type:1,//忘记密码是1 ，注册是0
			        }
		      }
		},
		computed:{
			...mapGetters([
				'Verification',
			])
		},
		methods:{
		  getCode(formData){
				this.$store.dispatch('getVerificationCode',{formData});
          },
          sureLogin(formData){
			          if(formData.newPwd != formData.newPwdagin) {
						layer.open({content:'两次密码不一致！',skin: 'msg',time: 2});
						}else{
							$.ajax({
							type: "post",
							url: types.HOST + "/api/members/member/updatepassword",
							data: {
								PhoneNumber: formData.phoNum,
								PassWord: formData.newPwd,
								VerifyCode: formData.code,
							},
							success: function(data) {
								if(data.ResultType == 3) {
									layer.open({content: data.Message,skin: 'msg',time: 2});
								} else {
								    layer.open({content: data.Message,skin: 'msg',time: 2});
								}
							}
						});
							
				}
          }
		
		}
	}
</script>

