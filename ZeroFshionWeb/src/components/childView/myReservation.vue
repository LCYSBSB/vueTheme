<template>
	<div>
		<div class="title">
			离您最近的试衣间
		</div>
		<div class="myposition">
			<div class="mystore">
				<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAyCAYAAAAus5mQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIyRjExMzE3MjczNjExRThCRkM0OUY4N0Y3MzJCMjRBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIyRjExMzE4MjczNjExRThCRkM0OUY4N0Y3MzJCMjRBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjJGMTEzMTUyNzM2MTFFOEJGQzQ5Rjg3RjczMkIyNEEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjJGMTEzMTYyNzM2MTFFOEJGQzQ5Rjg3RjczMkIyNEEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4tP9gyAAADTklEQVR42syZbWjNURzHz/3P5jHZK0UedtsaC1OemmdJQxkj8YZ4IZuH1d6xFxNCvFAe7tVeSVNCTDeNRDFhGWK0PHVlQsTQPC0W3x+/W7d1//97zu/cp299Xmz3nP/5/s/5/8/v9zt/X96iJUqo0WAuKAYFYCTI5d9+gDB4Ce6Da6A51kXCoQbPQXoZmuoLVoHVYJpHu4FgMCgBK/l/beAEOApe6w7oGJjbAJ6Bujjm3FQEdoLnYDvolyiDtJQ3QQAMVfbqA2rBY7DA1uBy8JCXKtEaBhr9ZeU1UoObwSmQpZKrXTAZNDVYAQ6q1KkSJg/rGqSt44hKvTbCZHU8g/RmhVT6tB8mi7wMHtd9/ZOoc24Gp4JylX4VYBbXxzIYUJmjfTDpRBukfW685UU/cbxtMgllHqFybbTBKouLXQGLgZ9vdBbIA7M57kr1z5MP2UwO373k5dgC9sZpUwbOCjd8P83gdKG5Kg1ziretmcJZLHX47TXVJXDIoD0lG9sE45SQwbGCjhWCPjtAh2GffDI43LDTPfBCuGSnDdv3J4ODDDs1WbyZtwzb9yaD3YadPloYfGNaYjhc4JhogIXBHNMOZDBbUFtINcqwvY8Mdhl2mmORZS8zbP+bDL4SLHG1wFyxoLb5RgZbBYPtFlR4JwXjfHA42Jsqm6PDEM32jaBQME4LGbwh2OEVb/APwAqPNhSDW3TqXxed8fHZTIBPDqR6xLNEj8svClGcxUyxuGZ7ONQwInI2c8DS4BgmkQpGJ6xPwWWVWQr2rEk2ZVJNguXt7GnwCZed6RYFjlq3uriSdu80G1yH2etyM/g1Uk2lSc0wVx/vbIaW+WKaDC6NdzYTHdQ7U2xuDWbvra7B7xa7v0T1MHcs1g9ZuYWuKRplOZ/B/CSba4W5Uq+E1UsUYeqSaK6D80tXec1gROc5j8tPgsGJmL32eCm/jmiZ7yTYHM1cm05NoqsZHG0SoYXgqm7RpKuftCTq/4cYW3MXTKo6E1GkmczZj0TzTMxJDJLoqG4CuGvQp5uza+OUzhHOBM3kJM3n6D3f0HXJQI7Fs/SH30SvFO02GMe1i0q1wYjo8+wel6SDapJ3Nhd3ErRt1LBR+oj9BWzlv631V4ABAL8EpsdeNcnWAAAAAElFTkSuQmCC" />
				<span>{{ StoreName }}</span>
			</div>
			<router-link to="BindSotreMap">
				<button>查看周围的试衣间</button></router-link>
		</div>
		<!--<router-link to="boxCustomized">
			<button class="toappointment">一键预约</button></router-link>-->
			<button class="toappointment" @click="quickAppoint">一键预约</button>
	</div>

</template>

<script>
	//	import BMap from 'BMap'  
	import types from "@/store/types.js"
	import { mapGetters, mapActions, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				StoreName: '正在获取位置信息'

			}
		},
		mounted() {
			
			var _this = this;
			var geolocation = new BMap.Geolocation();

			geolocation.getCurrentPosition(function(r) {
				_this.getLatelyStore(r.point.lat, r.point.lng)

			}, {
				enableHighAccuracy: true
			})
		},
		computed: {
			...mapGetters([
				'getSelectMyBoxToDiyOptions',
				'getSelectMyBoxToDiySelectLikeNum',
				'getSelectMyBoxToDiySelectNote'
			])

		},
		methods: {
			quickAppoint(){
				var that=this;
				$.fashion.validate(that, {
						phone: true,
					}, function() {
						var data = {
										MemberId: localStorage.MemberId,
										U_Num: localStorage.u_num,
										likes: that.getSelectMyBoxToDiySelectLikeNum.join(','),
										notes: localStorage.StoreName,
										options: '{"Quantity":"1","Situation":"1","Style":"2","Budget":"1","Color":"0"}'
									}
									$.ajax({
										type: "post",
										url: types.HOST + "/API/Members/Appointment/AddV2",
										data: data,
										success: function(data) {
											//console.log(data)
											if(data.ResultType == 3) {
												//预约成功
												layer.open({
													title: '预约成功',
													btn: ["确定"],
													content: '我们会一个工作日内与您联系,进一步确认您的个人信息和试穿时间地点,以便为您制作精准的搭配方案,请注意接听客服电话18601028061/71/81的来电。',
													yes: function(index, layero) {
														layer.closeAll()
													}
												});
											} else {
												$.fashion.tip(data.Message);
											}
										}
									});
					})
			},
			getLatelyStore(Latitude, Longitude) {
				var _this = this;
				$.ajax({
					type: "post",
					url: types.GetLatestStore,
					data: {
						MemberId: localStorage.MemberId,
						U_Num: localStorage.u_num,
						Latitude: Latitude,
						Longitude: Longitude,
						StoreTypeId: 6

					},
					success: function(data) {
						if(data.ResultType == 3) {
							_this.StoreName = data.Data.Address;
						}
					}
				});
			}
		}
	}
</script>

<style scoped="scoped">
	.title {
		margin: 0 auto;
		padding: 45px 0;
		color: #9f825a;
		font-size: 20px;
		text-align: center;
	}
	
	.myposition {
		margin: 20px;
		background: #FFFFFF;
		border-radius: 10px;
		padding: 30px;
		 box-shadow: 0 0 5px rgba(0,0,0,.1);
	}
	
	.myposition button {
		border: 0px;
		color: #FFFFFF;
		margin: 0 auto;
		display: block;
		font-size: 16px;
		padding: 15px 30px;
		background-size: 100% 100%;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQoAAABGCAIAAAC7RE09AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI1NDRCMzI2MjczNjExRTg5Q0QyRDUxMEZCNkQ2NkVDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI1NDRCMzI3MjczNjExRTg5Q0QyRDUxMEZCNkQ2NkVDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjU0NEIzMjQyNzM2MTFFODlDRDJENTEwRkI2RDY2RUMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjU0NEIzMjUyNzM2MTFFODlDRDJENTEwRkI2RDY2RUMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4qQrmiAAACZklEQVR42uzZUXKcMBBFUXVL2JvPerwUbyUzIHXnSZDkKxuI7jEeMOUvqm61xNj31w8/Pmv7sPrhtZp50QFsKCMzYowc5+hnXO8W4yxuNrMoUZp5taJCeFTYrQ39RIba6DEudaGjjeuVOe9nGxaHMjFXKfSB7frQ5NBvqo1+jf6O/lYeP2cxMTwO92O2sRZXmic8MGxTRj6Lq5CZh9pY0+N8RVUb3YfymIsr9h7Yd+8RI2ItrvqlMdKu3qtmSvSsPWYeviYHowMbDpC1vrrzGEOhKI8RnipEh9W+tujkgV3zmHuPRWflMXcjGaWoiuGZ2plbsSQP7NhH3rsPtaGpoRtN99SCLk0X8xWWhof+jTywZx/ru4+1U9dHy2fXbvdomW90NTsseVrYLI6yWrjfYa2rkrykAv6JPADyAMgDIA+APADyAMgDIA+APADyAMgDAHkA5AGQB0AeAHkA5AGQB0AeAHkA5AGAPADyAMgDIA+APADyAMgDIA+APADyAEAeAHkA5AGQB0AeAHkA5AGQB0AeAHkA5AGAPADyAMgDIA+APADyAMgDIA/g/9XuU2aWtGLl9588GewqVw5PHllCZaTFLKR4qBHiwJ5dFFWgQyncObQRaRoaGRHmbrYGyHMC9mljTYwZxurjjqT1MS9setZWtIGtC1mR3FG0q4+hXoIFFfCXuVX39j67BogKWTPl2ZnwdLBjEmv9pMWT321Ub6+za4D02UfGvR/hzRU2bMOeQtSGDrVxtDoXV+9ZyMoj88/yC9hsdDwbb7eZx9HmV4LzzdU64h4gtIHNC5mjQx9h6uKXAAMAAhmeswxkS48AAAAASUVORK5CYII=)
	}
	
	.mystore {
		margin: 30px;
		line-height: 30px;
		padding-left: 30px;
		min-height: 30px;
		position: relative;
	}
	
	.mystore img {
		position: absolute;
		left: 0;
		top: 5px;
		width: 25px;
	}
	
	.toappointment {
		padding: 15px 70px;
		background: #214d50;
		border-radius: 5px;
		color: #FFFFFF;
		display: block;
		margin: 50px auto;
		border: 0px;
		font-size: 20px;
	}
</style>