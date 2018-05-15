import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import state from './states'
import mutations from './mutations'
import actions from './actions'
import user from './modules/user'
import project from './modules/project'
import seller from './modules/seller'
import mybox from './modules/mybox'	//我的盒子共全局调用
import ratings from './modules/ratings'

Vue.use(Vuex);

export default new Vuex.Store({
	getters,
  actions,
  state,
  mutations,
	modules:{
		project,
		user,
		seller,
		mybox,
		ratings
	}
});

