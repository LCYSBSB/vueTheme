import types from '../types.js'
//import axios from 'axios'
const state = {
	sex: '女',
	dataTime: '2012/12/12',
	storeName:'旗舰店',
	Verification: {
		TIME_COUNT: 60,
		show: true,
		count: '',
		timer: null,
	},
	loginflag: false,
	showStoreflag: false,
	selectMyBoxToDiy:{
		SelectImage:[],
		options:{},
		SelectLikeNum:[],
		Note:""
	}
}

const getters = {
	Verification(state) {
		return state.Verification;
	},
	getSex(state) {
		return state.sex
	},
	getTime(state) {
		return state.dataTime
	},
	validate(state) {
		return state.Validate;
	},
	getstore(state){
		return state.storeName;
	},
	getSelectMyBoxToDiySelectImage(state){
		return state.selectMyBoxToDiy.SelectImage;
	},
	getSelectMyBoxToDiyOptions(){
		return state.selectMyBoxToDiy.options;
	},
	getSelectMyBoxToDiySelectLikeNum(){
		return state.selectMyBoxToDiy.SelectLikeNum;
	},
	getSelectMyBoxToDiySelectNote(){
		return state.selectMyBoxToDiy.Note;
	}
}

const actions = {
	getVerificationCode({
		commit,
		state
	}, formData) {
		commit(types.GET_VERIFICATIONCODE, formData.formData);
	},
	changeSex({commit,state},val) {
		state.sex = !val?"女":"男";
	},
	changeTime({commit,state},val) {
		state.dataTime = val;
	},
	changeSelectMyBoxToDiySelectImage({commit,state},val){
	
		state.selectMyBoxToDiy.SelectImage = val;
		
	},
	changeSelectMyBoxToDiyOptions({commit,state},val){
		state.selectMyBoxToDiy.options = val;
	},
	changeSelectMyBoxToDiySelectLikeNum({commit,state},val){
		state.selectMyBoxToDiy.SelectLikeNum = val;
	},
	getSelectMyBoxToDiySelectNote({commit,state},val){
		state.selectMyBoxToDiy.Note = val;
	}
}

const mutations = {
	//修改绑定手机号组件显示隐藏
	changeloginfalg(state, bolean) {
		state.loginflag = bolean;
	},
	//修改绑定店铺组件显示隐藏
	changeStorefalg(state, bolean) {
		state.showStoreflag = bolean;
	},
	changeStoreName(state,val){
		state.storeName=val;
	},
	[types.GET_VERIFICATIONCODE](state, formData) {
		$.ajax({
			type: "post",
			url: types.HOST + "/api/message/verifycode/get",
			data: {
				PhoneNumber: formData.phoNum,
				VerifyCodeType: formData.type
			},
			success: function(data) {
				if(data.ResultType == 3) {
					layer.open({
						content: '验证码已发送',
						skin: 'msg',
						time: 2
					});
					if(!state.Verification.timer) {
						state.Verification.count = state.Verification.TIME_COUNT;
						state.Verification.show = false;
						state.Verification.timer = setInterval(() => {
							if(state.Verification.count > 0 && state.Verification.count <= state.Verification.TIME_COUNT) {
								state.Verification.count--;
							} else {
								state.Verification.show = true;
								clearInterval(state.Verification.timer);
								state.Verification.timer = null;
							}
						}, 1000)
					}
				} else {
					layer.open({
						content: data.Message,
						skin: 'msg',
						time: 2
					});
				}
			}
		});
	},
}

export default {
	state,
	getters,
	actions,
	mutations
}