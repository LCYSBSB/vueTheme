<template>
	<div id="container"></div>
</template>

<script>
	import types from "@/store/types.js"
	import BMap from 'BMap'  
	export default {
		data() {
			return {}
		},
		mounted() {
			this.getLocation();
		},
		methods: {
		
			changeStore(shopId,StoreName) {
					var that=this;
					$.fashion.tip("选择试衣店铺成功！")
					localStorage.StoreName=StoreName;
					that.$router.go(-1);
//				$.ajax({
//					type: "post",
//					url: types.HOST + "/api/members/member/SwitchAttachStore",
//					data: {
//						MemberId: localStorage.MemberId,
//						U_Num: localStorage.u_num,
//						newStoreId: shopId,
//					},
//					beforeSend:function(){
//						layer.open({
//							type: 2,
//							shade: false
//						});
//					},
//					success: function(da) {
//						 layer.closeAll();
//						if(da.ResultType == 3) {
//						$.fashion.tip("切换归属店铺成功！")
//						localStorage.storeId=shopId;
//						localStorage.StoreName=StoreName;
//						that.$router.go(-1)
//						} else {
//							
//								$.fashion.tip(da.Message)
//						}
//					},
//					error: function(da) {
//							$.fashion.tip(JSON.stringify(da.Message))
//					}
//				});
			},
			getLocation() {
				var iconpath ="data:image/png;base64,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";
				var that = this;
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r) {
					if(this.getStatus() == BMAP_STATUS_SUCCESS) {

						var map = new BMap.Map("container");
						var point = new BMap.Point(r.point.lng, r.point.lat)
						var myIcon = new BMap.Icon(iconpath, new BMap.Size(30, 30), {
							imageOffset: new BMap.Size(0, 0),
							imageSize: new BMap.Size(30, 30)
						});
						map.centerAndZoom(point, 11);
						var marker = new BMap.Marker(point, {
							icon: myIcon
						});
						map.addOverlay(marker);
						that.getMarkers(map);

					} else {
						alert('failed' + this.getStatus());
					}
				}, {
					enableHighAccuracy: true
				})

			},
			getMarkers(map) {
				window._self=this;
				$.ajax({
					type: "post",
					url:types.HOST + "/Api/Stores/Store/GetStoreByStoreType",
					success: function(da) {
						if(da.ResultType == 3) {
							var data = da.Data;
								var iconpath2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAACqCAYAAABoFzfcAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBDNzBEQkE0RDU3MTExRTdBOEM5ODZCQ0YzNjVERDBCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBDNzBEQkE1RDU3MTExRTdBOEM5ODZCQ0YzNjVERDBCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEM3MERCQTJENTcxMTFFN0E4Qzk4NkJDRjM2NUREMEIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEM3MERCQTNENTcxMTFFN0E4Qzk4NkJDRjM2NUREMEIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6RhHjAAAATiUlEQVR42uxd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';
//								var iconpath2 = types.IMGHOST+"/home/store/img/fashion2.png";
							$.each(data, function(i, item) {
								var StoreName=item.StoreName;
								var sContent =
									"<h6 style='margin:0 0 5px 0;padding:0.2em 0 ;display:inline;'>" + item.StoreName + "</h6>" +
									"<span style='display: inline-block;border-radius: 5px;color: #fff;background: #4c94c8;font-size: 12px; padding: 8px 9px;margin-left: 14px;' onclick='window._self.changeStore(" + item.Id + ",\""+StoreName+"\")'>选择为试衣店铺</span>" +
									"<img style='float:right;margin-top:20px;width:45%;height:53%' id='imgDemo' src='" + item.StorePhoto + "'  title='" + item.StoreName + "'/>" +
									"<p style='margin-top:20px;line-height:1.5;font-size:13px;text-indent:1em'>" + item.Address + "</p>" +
									"</div>";
								var point = new BMap.Point(item.Longitude, item.Latitude);
								var myIcon = new BMap.Icon(iconpath2, new BMap.Size(25, 35), {
									imageOffset: new BMap.Size(0, 0),
									imageSize: new BMap.Size(25, 35)
								});
								var infoWindow = new BMap.InfoWindow(sContent, {
									width: 200,
									height: 150

								});
								var marker = new BMap.Marker(point, {
									icon: myIcon
								});
								map.addOverlay(marker);
								marker.disableDragging();
								marker.addEventListener("click", function() {
									this.openInfoWindow(infoWindow);
									//图片加载完毕重绘infowindow
									document.getElementById('imgDemo').onload = function() {
										infoWindow.redraw(); //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
									}
								});
							})

						}
					},
					error: function(da) {}
				})
			}
		}
	}
</script>

<style scoped>
	#container {
		width: 100%;
		height: 100%;
	}
</style>