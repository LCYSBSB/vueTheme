import types from '../types.js'
//import axios from 'axios'

const state={
	mybox:null
}

const getters={
	myboxCount(state){
		return state.mybox;
	}
}

const actions={
	addMyBoxCount({commit,state}){
			state.mybox++;
	},
	getMybox({commit,state}){
   		 	  
	$.ajax({
		
		url:types.PRODUCT_BOX_GETCOUNT,
		data:{
			MemberId:window.localStorage.MemberId,
			U_Num:window.localStorage.u_num,
		},
		success: function(data) {
			if(data.ResultType == 3) {
				commit(types.GET_MYBOX,data.Data.totalCount);
			}
		}
	})

	
	}
}

const mutations={
	[types.GET_MYBOX](state,data){
		state.mybox=data
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}