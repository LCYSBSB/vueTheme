<template>
	<div class="match" @click="jumpProgress">
		<div class="masterMap"><img :src="imgUrl" alt="" /></div>
		<p class="imgBg"></p>
		<div class="arriveTime">到店试穿时间:{{explain}}</div>
	</div>
</template>

<script>
	import types from "@/store/types.js"
	export default {
		data() {
			return {
				imgUrl: '',
				explain: '',
				project:'',
				host:types.IMGHOST
			}
		},
		created: function() {
			this._getLess("components","checkmatch");
//		   require("@/template/"+this.templates+"/components/checkmatch/index.less");
		},
		mounted() {
			this.getParameter();
		},
		methods: {
			jumpProgress() {
				var me = this;
				me.$router.push({
					path: '/progress',
					query: {
            projectNum: this.$route.query.projectId
					}
				})
			},
			getParameter() {
				var _self = this;
				let projectId = this.$route.query.projectId;
				$.ajax({
					type: "post",
					url: types.GETPLANS,
					data: {
						MemberId: localStorage.MemberId,
						U_Num: localStorage.u_num,
						id: projectId
					},
					success: function(data) {
						if(data.ResultType == 3) {
							var da = data.Data;
							var coverImg = da.plans[0].CoverImg;							
							_self.imgUrl = _self.host + coverImg;
							_self.explain = da.plans[0].Desc;
							_self.project = JSON.stringify(da);
						}
					}
				});
			}
		}

	}
</script>
