<template>
	<div class="router scroll">
		
		<ul class="subscribeBox" v-if="List.length > 0">
			<li class="subscribenav">
			<div>我的期刊</div>
			<div>
				<a href="http://mp.weixin.qq.com/s/C5_gLBFeZGxQ-bV91O2WWw" title="推荐方案">达人圈</a>
			</div>
		</li>
			<li class="MsgBox marginBot" :class="item.State == '102'?'green':'gray'" v-for="item in List" @click="operat(item.StateDisplay,item.Id)">
				<div class="yrborderBotm">
					<img :src="item.CoverImg" v-if="item.CoverImg" />
					<div class="seeplan">{{ item.StateDisplay }}</div>
				</div>
				<ul class="reservation ">
					<li>刊号：{{item.Number}}</li>
					<li>{{item.StoreName}}：{{item.CreatedTime}}</li>
				</ul>
				<!--<div class="status" @click="operat(item.State,item.Id)">{{item.State}}</div>-->
			</li>

		</ul>
		<div class="nodata" v-if="List.length == 0">
			<img src="data:image/png;base64,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" />
			<p>您还没有刊物哦~</p>
			<div class="seemorebox">
				<a class="seeelse" href="http://mp.weixin.qq.com/s/C5_gLBFeZGxQ-bV91O2WWw" title="推荐方案">去看看别人的专属刊物吧！<span>
				<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABZElEQVRYR8WXYVXDMBSFv6sAJOAA5mA4AAVsDnDA5gAHTAIOQMJwwBQACh4n5zQ7IyRtkyZd/q7L/V57b96LOPPSmfX5B2BmN8ATsJW0jwGa2TPwJWk7tYAYwA54AL6B2xiEmbnfLoCdpPUUiBjAJfAOXKcgzGwFvHTCkyCiHjCz2SCSJpwLojcFc0AMxjACsZD0eWq8KZ4YBHBCAYSLpkuHS8JxlUKMAmgJMRqgFUQWQAuIbIDaEEUANSGKAWIQkhZhXwjS4Rrc5vSZGgBvgOugB0lXAwD3kl6rAHRngxf/AZZh5wyqX0tynfbPKnoDtcQdSTZATfFsgNriWQAtxEcDBOIH4K7EcLHRbdADgfhH5/a+Thh1e2puHDOQ+KhVF+/9BK0r92+kbyhtWnkSYK7K+wD8xST6zbsm5C8mWYYblQIzWwKPwCqc+/wG3dVsHzvbU24vSkHuZiXPD54DJZvm/OcXc5EwMJkL5ZMAAAAASUVORK5CYII=" alt="箭头"/></span></a>
			</div>
		</div>

	</div>
</template>

<script>
	import types from "@/store/types.js"
	export default {
		data() {
			return {
				database: null,
				PageIndex: 1,
				PageSize: 100,
				List: [],
				FinishCount: '',
				AllCount: '',
				PendingCount: '',
				host: types.IMGHOST
			}
		},
		created: function() {
			this._getLess("components", "subscribe");

			//		   require("@/template/"+this.templates+"/components/subscribe/index.less");
		},
		computed: {
			state() {
				return
			}
		},
		mounted() {
			this.getDatas();

		},
		methods: {
			operat(da, projectId, ProductNumber) {
				var me = this;

				if(da == "查看方案" || da == "已预约") {
					me.$router.push({
						path: '/checkmatch',
						query: {
							projectId: projectId
						}
					})

				} else if(da == "待评价") {
					me.$router.push({
						path: '/evaluate',
						query: {
							projectId: projectId,
							ProductNumber: ProductNumber
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
								var host = sub.host;
								var newArr = []
								//var host="http://11.1.1.113:8888";
								$.each(da, function(i, item) {
									item.CreatedTime = new Date(parseInt(item.CreatedTime) * 1000).toLocaleDateString().replace(/:\d{1,2}$/, ' ');
									item.CoverImg = item.CoverImg ? (host + item.CoverImg) : null;

									//									if( item.State == '102' ){
									//										item.StateDisplay = '查看方案';
									//										newArr.push(item)
									//									}
									if(item.State == '103') {
										item.StateDisplay = '已预约';
										newArr.push(item)
									} else if(item.State == '302' || item.State == '303') {
										item.StateDisplay = item.IsComplishUserFeeback ? '已评价' : '待评价';
										newArr.push(item)
									}
								})

								sub.List = newArr;
								//sub.FinishCount = data.FinishCount;
								//sub.AllCount = data.AllCount;
								//sub.PendingCount = data.PendingCount;
							}
						}
					});
				});
			}
		}

	}
</script>
<style scoped="scoped">
	.router {
		padding-top: 110px;
	}
	
	.subscribenav {
		display: flex;
		background: #f3f3f3;
		position: fixed;
		top: 0;
		background: ;
		left: 0;
		width: 100%;
		padding: 15px 10px 0 10px;
		z-index: 1000000;
		box-sizing: border-box;
		/*box-shadow: 0 3px 5px rgba(0, 0, 0, .2);*/
	}
	
	.subscribenav div {
		height: 70px;
		line-height: 70px;
		font-size: 18px;
		flex: 1;
		text-align: center;
		color: #1E4244;
		background-color: #FFF;
		box-shadow: 0 3px 5px rgba(0, 0, 0, .2);
	}
	
	.subscribenav div>a {
		display: block;
	}
	
	.subscribenav div:first-child {
		background: url(image/wodeshoucangditu.e1bae1e.png);
		background-size: 100% 100%;
		color: #FFF;
	}
	
	.MsgBox {
		width: 90%;
		margin: 0 auto 20px;
		height: auto;
		overflow: hidden;
		border-bottom: 0px solid #EDEDED;
		border-radius: 20px;
		background: #FFF;
		padding: 20px;
		box-sizing: border-box;
		box-shadow: 0 0 5px rgba(0, 0, 0, .2);
	}
	
	.router .green .yrborderBotm {
		position: relative;
		border-radius: 20px;
		overflow: hidden;
		border: 4px solid #32696d;
		margin: 0 auto;
		height: auto;
		background: #32696d;
	}
	
	.router .gray .yrborderBotm {
		position: relative;
		border-radius: 20px;
		overflow: hidden;
		border: 4px solid #CCC;
		margin: 0 auto;
		height: auto;
		background: #CCC;
	}
	
	.green .yrborderBotm .seeplan {
		text-align: center;
		padding: 15px;
		position: absolute;
		bottom: -1px;
		left: 0;
		width: 101%;
		color: #FFF;
		font-size: 15px;
		background: rgba(50, 105, 109, .7);
	}
	
	.gray .yrborderBotm .seeplan {
		text-align: center;
		padding: 15px;
		position: absolute;
		bottom: -1px;
		left: 0;
		width: 101%;
		color: #FFF;
		font-size: 15px;
		background: rgba(153, 153, 153, .8);
	}
	
	.router .yrborderBotm img {
		display: block;
		width: 100%;
	}
	
	.historyPhoto {
		width: 90%;
		margin: 0 auto;
		border-radius: ;
	}
	
	.reservation {
		height: auto;
		width: auto;
	}
	
	.green .reservation li:first-child {
		font-size: 14px;
		color: #32696d;
	}
	
	.green .reservation li:last-child {
		font-size: 14px;
		color: #32696d;
		margin-top: 10px;
	}
	
	.gray .reservation li:first-child {
		font-size: 14px;
		color: #999;
	}
	
	.gray .reservation li:last-child {
		font-size: 14px;
		color: #999;
		margin-top: 10px;
	}
	
	.nodata>img {
		display: block;
		margin: 20px auto;
	}
	
	.nodata p {
		font-size: 13px;
		color: #32696d;
		text-align: center;
	}
	
	.theend {
		text-align: center;
		color: #ccc;
		margin: 10px;
		font-size: 12px;
	}
	
	.seemorebox {
		width: 100%;
		box-sizing: border-box;
		z-index: 10000;
		background: #f3f3f3;
		margin-top: 60px;
	}
	
	.seeelse {
		padding: 25px;
		background: #32696d;
		border-radius: 5px;
		display: block;
		width: 90%;
		font-size: 15px;
		color: #fff;
		-webkit-box-sizing: border-box;
		margin: 10px auto;
		box-sizing: border-box;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, .3);
	}
	
	.seeelse span {
		float: right;
	}
	
	.seeelse span img {
		width: 16px;
	}
</style>