<template>
	<div class="router scroll">
		<ul class="subscribeBox">
		
			<li class="MsgBox marginBot" v-if="item.State=='预约中'||item.State=='查看方案'" v-for="item in List">
				<div class="subscribePhoto"><img :src="item.CoverImg" v-if="item.CoverImg"/></div>
				<ul class="reservation ">
					<li>预约号:{{item.Number}}</li>
					<li>{{item.StoreName}}:{{item.CreatedTime}}</li>
				</ul>
				<div class="status green" @click="operat(item.State,item.Id)">{{item.State}}</div>
			</li>
		</ul>
		<ul class="history">
			<!--历史纪录-->
			<li class="MsgBox" v-if="item.State!='预约中'&&item.State!='查看方案'" v-for="item in List" @click="operat(item.State,item.Id,item.Number)">
				<div class="borderBotm">
					<div class="historyPhoto"><img :src="item.CoverImg" v-if="item.CoverImg"/></div>
					<ul class="reservation ">
						<li>预约号:{{item.Number}}</li>
						<li>{{item.StoreName}}:{{item.CreatedTime}}</li>
					</ul>
					<div class="status gray">{{item.State}}</div>
				</div>
			</li>
		</ul>
		<ul class="footerBox">
			<li>预约中:{{PendingCount}}</li>
			<li class="total">合计:{{AllCount}}</li>
			<li>已预约:{{FinishCount}}</li>
		</ul>
	</div>
</template>

<script>
	import types from "@/store/types.js"
	export default {
		data() {
			return {
				database: null,
				PageIndex: 1,
				PageSize: 50,
				List: [],
				FinishCount: '',
				AllCount: '',
				PendingCount: '',
				host:types.IMGHOST
			}
		},
		created: function() {
				this._getLess("components","subscribe");
			
//		   require("@/template/"+this.templates+"/components/subscribe/index.less");
		},
		computed: {

		},
		mounted() {
			this.getDatas();
		},
		methods: {
			operat(da, projectId,ProductNumber) {
				var me = this;
				if(da == "查看方案" ||da =="已预约") {
					me.$router.push({
						path: '/checkmatch',
						query: {
							projectId: projectId
						}
					})

				}else if(da=="待评价"){
					me.$router.push({
						path: '/evaluate',
						query: {
							projectId: projectId,
							ProductNumber:ProductNumber
						}
					})
				}
			},
			getDatas() {
				var sub = this;
				
				$.fashion.validate(sub, {
					login: true,
				}, function() {
					$.ajax({
						type: "post",
						url: types.SUBSCRIBE,
						data: {
							MemberId: localStorage.MemberId,
							U_Num: localStorage.u_num,
							PageSize: sub.PageSize,
							PageIndex: sub.pageIndex
						},
						success: function(data) {
							if(data.ResultType == 3) {
								var da = data.Data;
								var host=sub.host;
//								var host="http://11.1.1.113:8888";
								$.each(da, function(i, item) {
									item.CreatedTime = new Date(parseInt(item.CreatedTime) * 1000).toLocaleDateString().replace(/:\d{1,2}$/, ' ');
									item.CoverImg = item.CoverImg?(host+item.CoverImg):null;
									if(item.State == 0) {
										item.State = '预约中';
									}
									else if(item.State == '101') {
										item.State = '已确认';
									}
									else if(item.State == '102') {
										item.State = '查看方案';
									}
									else if(item.State == '103') {
										item.State = '已预约';
									}
									else if(item.State == '301'|| item.State == '201' || item.State == '202'||item.State == '203' ) {
										item.State = '待试穿';
									}
									else if(item.State == '302'||item.State == '303') {
										item.State = item.IsComplishUserFeeback?'已评价':'待评价';
									}
									else if(item.State == '-1') {
										item.State = '已撤销';
									}
//									if(item.State=='304'){
//										item.State = '已评价';
//									}
								})
								sub.List = da;
								sub.FinishCount = data.FinishCount;
								sub.AllCount = data.AllCount;
								sub.PendingCount = data.PendingCount;
							}
						}
					});
				});
			}
		}
		
	}
</script>

