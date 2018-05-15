 <template>
	<div class="box_content" v-show="loginflag">
		<div class="box">
			<div class="boxheader">
			
				<input type="number" maxlength="11" placeholder="手机号" v-model="phoneNum" class="phoneinput" />
				<input type="number" maxlength="6" placeholder="请输入验证码" class="verifyinput" v-model="VerifyCode" />
				<div @click="sendCode" type="button" v-model="countdown" class="getCodeVer"></div>
			</div>
			<div class="boxfooter">
				<div class="closebt" @click="closebindPhoneView">取消</div>
				<div @click="bindWechat" class="bindconfrim">绑定手机号</div>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				phoneNum: '',
				VerifyCode: '',
				countdown: 120,
				countdownruning: false
			}
		},
		created: function() {
		this._getLess("home","bindphone");
		},
		computed: {
			//获取全局变量
			loginflag() {
				return this.$store.state.user.loginflag;
			}
		},
		methods: {
			closebindPhoneView() {
				this.$store.commit('changeloginfalg', false);
			},
			bindWechat() {
				var _this = this;
				$.fashion.ajax({
					hosttype: "api",
					url: "/Api/Members/Member/RegisterThird",
					type: "POST",
					data: {
						VerifyCode: _this.VerifyCode,
						PhoneNumber: _this.phoneNum,
						OpenId: localStorage.openId,
						StoreId:36			//旗舰店
					},
					success: function(da) {
						alert(JSON.stringify(da));
						localStorage.MemberId = da.MemberId;
						localStorage.u_num = da.U_Num;
						localStorage.UserPhoto = da.UserPhoto;
						localStorage.isTest = da.IsTest; //true做了风格测试false没做
						localStorage.isDetailTest = da.isDetailTest; //1做了详细测试0没做
						localStorage.openId = "";
						_this.$store.commit('changeloginfalg', false);
						location.reload();
						
					},
					fail:function(da){
						alert(JSON.stringify(da));
					}
				})
			},
			settime() {
				var _this = this;
				_this.countdownruning = true;
				if(_this.countdown == 0) {
					$(".getCodeVer").text('获取验证码');
					_this.countdownruning = false;
					return;
				} else {
					_this.countdown > 0 ? _this.countdown-- : _this.countdown = 0;
					$(".getCodeVer").text(_this.countdown + "(已发送)");
				}
				if(_this.countdownruning) {
					setTimeout(function() {
						_this.settime();
					}, 1000)
				}

			},
			sendCode(PhoneNumber) {
				var _this = this;
				if(_this.countdownruning == false) {
					$.fashion.ajax({
						hosttype: "api",
						url: "/API/Message/VerifyCode/Send",
						beforeSend:function(){
							_this.countdownruning == true;
						},
						type: "POST",
						data: {
							VerifyCodeType: 0,
							PhoneNumber: _this.phoneNum,
						},
						success: function(da) {
								_this.settime();
						
						}
					})
				}

			}
		}

	}
</script>

