<template>
	<div class="changeStoreBox" v-show="showStoreflag">
		<ul class="chang_shop">
			<div class="changeStoreheader">请选择店铺<span class="clostbtn" @click="closebindStoreView">取消</span></div>
			<div class="chang_shop_scroll scroll">
				<li @click="changeStore(item.Id,item.StoreName)" v-for="item in shop_list">{{ item.StoreName }}</li>
			</div>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				shop_list: [],
				isLoaded:false,
			}
		},
		created: function() {
		this._getLess("home","bindStore");
		},
		computed: {
			//获取全局变量
			showStoreflag() {
				if(this.$store.state.user.showStoreflag&&!this.isLoaded) this.getAllShop();
				return this.$store.state.user.showStoreflag;
			}
		},
		mounted: function() {
			
		},
		methods: {
			closebindStoreView() {
				this.$store.commit('changeStorefalg', false);
			},
			getAllShop() {
				var _self = this;
				$.fashion.ajax({
					type: "post",
					hosttype: "api",
					url: "/API/stores/store/queryattachstore",
					success: function(data) {
						_self.shop_list = data;
						if(data.length>0) _self.isLoaded=true;
					}
				})
			},
			changeStore(shopId,storename) {
				var _self = this;
				$.fashion.ajax({
					type: "post",
					hosttype: "api",
					url: "/api/members/member/SwitchAttachStore",
					data: {
						MemberId: localStorage.MemberId,
						U_Num: localStorage.u_num,
						newStoreId: shopId,
					},
					success: function(da) {

						layer.open({
							content: '更改店铺成功',
							skin: 'msg',
							time: 2 //2秒后自动关闭
						});
						_self.$store.commit('changeStorefalg', false);
						_self.$store.commit('changeStoreName', storename);
					}
				});

			},
		}
	}
</script>
