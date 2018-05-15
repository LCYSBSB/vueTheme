<template>
	<div class="boxheader">
		<div class="collectHead">
			<div @click="showBox" v-model="BoxList" class="integral" :class="{collect:BoxList}">
				 方案
			</div>
			<div @click="showSingle" v-model="single" class="integral" :class="{collect:single}">
				单品
			</div>
		</div>
		<!--Box 详情-->
		<div v-show="BoxList">
			<div class="listAll">
				<div class="deleteMsg" v-for="(item,index) in List">
					<div class="inputBox">
						<label class="radio-inner">
						<input class="radioBox"  v-on:change="checkedList(index)" v-model="removeBox" :value="item.Id" type="checkbox" />
						<span class="radio-checked" v-if="item.checked"> </span>
					</label>
					</div>
					<div class="picture"><img :src="item.CoverImg" alt="" /></div>
					<p class="collecName">{{item.Name}}</p>
				</div>
			</div>
			<div v-if='List.length == 0' class="nodata">暂无收藏BOX</div>
			<footer>
				<div class="deleteBtn" @click="removeBoxList"><img src="./image/shanchushngpin.png" /></div>
			</footer>
		</div>
		<!--单品-->
		<div v-show="single">
			<div class="listAll">
				<div class="deleteMsg" v-for="(item,index) in List2">
					<div class="inputBox">
						<label class="radio-inner">
							<input class="radioBox"  v-on:change="checkedCloth(index)" v-model="removeList" type="checkbox" :value="item.ProductId" />
							<span class="radio-checked" v-if="item.checked"> </span>
						</label>
					</div>
					<div class="picture"><img :src="item.ProductImg" alt="" /></div>
					<p class="collecName">{{item.ProductName}}</p>
				</div>
			</div>
			<div v-if='List2.length == 0' class="nodata">暂无收藏单品</div>

			<footer>
				<div class="deleteBtn" @click="removeFavourite"><img src="./image/shanchushngpin.png" /></div>
			</footer>
		</div>
	</div>
</template>

<script>
	import types from "@/store/types.js"
	import mixin from "@/store/mixin.js"

	export default {
		data() {
			return {
				List: [],
				List2: [],
				removeList: [],
				removeBox: [],
				BoxList: true,
				single: false
			}
		},
		mixins: [mixin],
		computed: {},
		mounted() {
			this.getBox();
			this.getSingle();
		},
		created: function() {
			this._getLess("components","mineCollect");
//		   require("@/template/"+this.templates+"/components/mineCollect/index.less");
		},
		methods: {
			showBox() { //这几个方法控制dropdown太low了，暂时还没想到高端的方法， 先实现功能吧
				this.BoxList == false ? this.BoxList = true : this.BoxList = false;
				this.single = false;
			},
			showSingle() {
				this.single == false ? this.single = true : this.single = false;
				this.BoxList = false;
			},
			checkedCloth(index) {
				this.List2[index].checked = !this.List2[index].checked
			},
			checkedList(index) {
				this.List[index].checked = !this.List[index].checked
			},
			getBox() {
				var me = this;
				$.fashion.validate(me, {
					phone: true
				}, function() {
					$.ajax({
						type: "post",
						url: types.GETMEMBERCOLLECTBOX,
						data: {
							PageSize: 99999,
							PageIndex: 1,
							MemberId: localStorage.MemberId,
							U_Num: localStorage.u_num,
						},
						success: function(da) {
							if(da.ResultType == 3) {
								var data = da.Data;
								if(me.List.length == 0) {
									me.List = data.List;
								} else {
									me.List.concat(data.List);
								}
							}
						}
					});
				})
			},
			getSingle() {
				var me = this;
				$.fashion.validate(me, {
					phone: true
				}, function() {
					$.ajax({
						type: "post",
						url: types.GETMEMBERCOLLECTSIGLE,
						data: {
							PageSize: 99999,
							PageIndex: 1,
							MemberId: localStorage.MemberId,
							U_Num: localStorage.u_num,
						},
						success: function(da) {
							if(da.ResultType == 3) {
								var data = da.Data;
								if(me.List.length == 0) {
									me.List2 = data.List;
								} else {
									me.List2.concat(data.List);
								}
							}
						}
					});
				})
			},

			removeBoxList() {
				var self = this;
				var deleteBox = self.removeBox;
				if(deleteBox.length <= 0) {
					self.layerToast('请选择要删除的BOX');
					return;
				}
				$.ajax({
					type: 'post',
					url: types.DELETEBOX,
					data: {
						MemberId: localStorage.MemberId,
						U_Num: localStorage.u_num,
						PlanId: deleteBox
					},
					success: function(data) {
						if(data.ResultType == 3) {
							self.List = self.List.filter(function(item) {
								return self.removeBox.indexOf(item.Id) == -1;
							});
							//清空选中数组
							self.removeBox = [];
						}
						self.layerToast(data.Message)
					}
				})
			},
			removeFavourite(id) {
				var self = this;
				var deleteCloths = this.removeList;
				if(deleteCloths.length <= 0) {
					self.layerToast('请选择要删除的单品');
					return;
				}
				$.ajax({
					type: 'post',
					url: types.DELETEFAVOURITE,
					data: {
						MemberId: localStorage.MemberId,
						U_Num: localStorage.u_num,
						ProductId: deleteCloths
					},
					success: function(data) {
						if(data.ResultType == 3) {
							self.List2 = self.List2.filter(function(item) {
								return self.removeList.indexOf(item.ProductId) == -1;
							});
							//清空选中数组
							self.removeList = [];
						}
						self.layerToast(data.Message)
					}
				})
			}
		}
	}
</script>

