
<template>
	<div class="bgBody">

		<div class="dengl" data-int='0'>
			<div class="dengLsu"></div>
		</div>
		<div>
			<!--登陆头像-->
			<div class="top_distance">
				<div class="register_photo">
						<img src="./img/logo.png" alt="" />
				</div>
			</div>
			<!--登陆框-->
			<div class="loginborder">
		    	<div class="login_box">
					<ul class="borderline">
						<li><img src="./img/zhanghao.png" class="account_number" alt="" /> </li>
						<li><input type="text" name="account" id="account" placeholder="请输入手机号" v-model="phoneNumber" maxlength="11"/></li>
					</ul>
					<ul>
						<li><img src="./img/mima.png" class="password" /></li>
						<li><input type="password" name="psd" id="psd" placeholder="请输入密码" v-model="pwd"/></li>
					</ul>
				</div>
			</div>

			<!--登陆按钮-->
			<div type="button" name="" id="login_btn" @click="login">登 录</div>
			<!--操作账号区域-->
			<p href="javascript:;" class="active_area">
				<router-link to='/forgetpassword'><span class="find_psd">找回密码</span></router-link>
				<router-link to='/register'><span class="active_register">注册</span></router-link>
			</p>
		</div>
		<!--提示框-->
		<!--<div class="dialog_box">
			<p>温馨提示</p>
			<span></span>
			<div class="close_dialog" type="button">确定</div>
		</div>-->
<!--		<img src="./img/icon64_wx_logo.png" alt="" id="wx_login" @click="wxlogin" />-->
	</div>
</template>

<script>
	import types from "@/store/types.js"
	import loginCss from "./css/login.css"
	export default{
		data(){
			return{
				phoneNumber:null,
				pwd:null,
			}
		},
		created(){
			localStorage.clear();		
		},
		methods:{
			
			//登陆
			login(){
				var that=this;
				var MemberId;
				if((that.phoneNumber == null) || (that.phoneNumber == '')) {
					  layer.open({content: '请输入手机号码',skin: 'msg',time: 2});
				} else if((that.pwd == null) || (that.pwd == '')) {
					 layer.open({content: '请输入密码',skin: 'msg',time: 2});
				} else {
					$.ajax({
						type: "post",
						url: types.HOST + '/api/members/member/login',
						data: {
							PhoneNumber:that.phoneNumber,
							PassWord: that.pwd
						},
						success: function(data) {
							if(data.ResultType == 3) {
								localStorage.MemberId = data.Data.MemberId;
								localStorage.u_num = data.Data.U_Num;
								localStorage.UserPhoto = data.Data.UserPhoto;
								localStorage.MemberName = data.Data.MemberName;
								localStorage.isTest=data.Data.IsTest;//true做了风格测试false没做
								localStorage.isDetailTest=data.Data.isDetailTest;//1做了详细测试0没做
								localStorage.tixing=data.Data.TiXing;//如果有测试数据，返回体型，用于判断box商城的体型预约
								layer.open({content: data.Message,skin: 'msg',time: 2});
								if(that.$route.query.orgpath){
									that.$router.replace({ path: that.$route.query.orgpath })
								}else{
									that.$router.push({ path: '/' })
								}
							} else {
								layer.open({content: data.Message,skin: 'msg',time: 2});
							}
						}
					});
				}
			},
			wxlogin(){
				location.replace("/Authorities/oauth/index");
			}
  }
}
	
	
</script>
