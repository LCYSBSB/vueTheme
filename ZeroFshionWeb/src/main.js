// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import types from './store/types.js'
import { mapState, mapGetters, mapMutations } from 'vuex'

Vue.config.productionTip = false

Vue.mixin({
	data() {
		return {
			prev_Scroll_Top: 0,
			prev_Page_Param: null,
			cur_Page_Param: null,
			scrollBox: "",
			scrollContent: "",
		}
	},
	computed: {
		...mapGetters([
			'isLoadedTemp',
			'templates',
		]),
	},
	created() {
		if(!this.isLoadedTemp) {
			this.isLoadedTempMu(true);
			var qparams = this.$route.query;
			var StoreId = null;
			$.each(qparams, function(key, val) {
				if(key.toLowerCase() == "tsid") {
					StoreId = val;
					return false;
				}
			});
			this._updateWebAppTemp(StoreId);
		}
	},
	methods: {
		...mapMutations([
			'isLoadedTempMu',
			'templatesMu',
		]),
		_updateWebAppTemp(StoreId) {
			var self = this;
			if(StoreId) {
				$.ajax({
					url: types.GETTEMP,
					async: false,
					data: {
						StoreId: StoreId
					},
					success: function(da) {
						self.templatesMu(da)
					}
				});
			}
		},
		_getLess(filepath, filename) {
			return require("./../static/template/" + this.templates + "/" + filepath + "/" + filename + "/index.less");
		},
		_getImage(filepath, filename) {
			var filePath = require("./../static/template/" + this.templates + "/home/img/" + filepath + "/" + filename);
			return filePath;
		},
		_jmpScroll() {
			if(this.prev_Scroll_Top) {
				var self = this;
				$(self.scrollBox).scrollTop(self.prev_Scroll_Top + 0);
			}
		},
		_calcParams() {
			var curparams = null;
			var fullPath = this.$route.fullPath;
			var ind = fullPath.indexOf("?");
			if(ind > -1) {
				curparams = fullPath.substr(ind + 1, fullPath.length);
			}
			this.cur_Page_Param = curparams;

			if((this.prev_Page_Param == this.cur_Page_Param) && this.cur_Page_Param) {
				this._jmpScroll();
			} else {
				this.prev_Scroll_Top = 0;
			}
			this.prev_Page_Param = this.cur_Page_Param;
			this.cur_Page_Param = null;
		},
		_divBindScroll() {
			var self = this;
			$(self.scrollBox).scroll(function() {
				var BoxoffsetHeight = Math.abs($(self.scrollContent).offset().top);
				self.prev_Scroll_Top = BoxoffsetHeight;
			});
		}
	},
	activated() {
		this._calcParams();
		this._divBindScroll();
	}
})

router.beforeEach(function(to, from, next) {
	if(from.query.tsid && !to.query.tsid) {
		to.query.tsid = from.query.tsid;
		next({
			path: to.fullPath,
			query: to.query
		});
	} else {
		next();
	}
});
var vm = new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
		App
	}
})
window.vm = vm;