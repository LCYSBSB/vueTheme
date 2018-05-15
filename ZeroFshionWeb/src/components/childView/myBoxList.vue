<template>
	<div>
		<div class="haveCloth" v-if="haveCloth">
			<div class="edit-box">
				<div class="allcheckbox" v-if="editShow">
					<input type="checkbox" hidden id="allcheckbox" v-model="allcheckVal" v-on:change="allChecked" />
					<label for="allcheckbox">
						<span class="allchecked-outside">
							<span v-if="allcheckVal" class="allchecked-inner"></span>
						</span>
						<span class="label-text">全选</span>
					</label>
				</div>

				<button class="edit-button" v-on:click="edit">{{editShow ? '完成' : '编辑'}}</button>
			</div>
			<div class="myBoxList">
				<div class="cloth-in-box" v-for="(cloth,index) in boxCloths" v-bind:id="cloth.ProductId">
					<div class="radio">
						<label class="radio-inner" v-show="editShow">
						<input type="checkbox" v-on:change="checkedCloth(index)"  :value="cloth.ProductId" v-model="checkboxModel" />
						<span class="radio-checked" v-if="cloth.checked"></span>
					</label>
					</div>
					<div class="cloth-image">
						<img :src="cloth.ProductImg" />
					</div>
					<div class="cloth-description">
						<h2 class="cloth-name">{{ cloth.ProductName }}</h2>
						<p>{{ cloth.SeasonName }}</p>
						<p><span>尺码：</span><span>{{ cloth.SizeName }}</span></p>
						<p><span>颜色：</span><span>{{ cloth.ColorName }}</span></p>
						<p class="price"><strong>￥{{ cloth.TagPrice }}</strong></p>

					</div>
				</div>

			</div>
			<footer v-if="editShow">
				<div class="delete" v-on:click="deleteCloth"><img src="./image/shanchushngpin.png" /></div>
			</footer>
		</div>
		<div class="no-have-cloth" v-else>
			<img src="data:image/png;base64,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" />
			<p>我的BOX是空的~</p>
		</div>
	</div>
</template>

<script>
	import types from "@/store/types.js"
	import mixin from "@/store/mixin.js"

	export default {
		data() {
			return {

				boxCloths: [],
				checkboxModel: [],
				editShow: false,
				allcheckVal: false,
			}
		},
		mixins: [mixin],
		computed: {
			haveCloth() {
				return this.boxCloths.length
			}
		},
		mounted() {
			var self = this;
			$.fashion.validate(self, {
				login: true
			}, function() {
				$.ajax({
					url: types.MEMBERBOX,
					type: 'post',
					data: {
						MemberId: localStorage.MemberId,
						U_Num: localStorage.u_num,
						PageIndex: 1,
						pageSize: 15
					},
					success: function(data) {

						for(var i = 0; i < data.Data.List.length; i++) {
							data.Data.List[i].checked = false;
						}
						self.boxCloths = data.Data.List;

					}
				})
			})
		},
		methods: {
			checkedCloth(index) {
				this.boxCloths[index].checked = !this.boxCloths[index].checked
			},
			edit() {
				this.editShow = !this.editShow;
				this.checkboxModel = []; //清空选项
			},
			//全选按钮事件
			allChecked() {

				var self = this;
				self.checkboxModel = [];
				if(!this.allcheckVal) {
					this.boxCloths.forEach(function(item) {
						item.checked = false;
					});
				} else {

					this.boxCloths.forEach(function(item) {
						item.checked = true;
						self.checkboxModel.push(item.ProductId);
					});
				}

			},
			deleteOne(index) {
				this.boxCloths.splice(index, 1);
			},
			deleteCloth(id) {
				var self = this;
				var deleteCloths = this.checkboxModel;
				if(deleteCloths.length <= 0) {
					self.layerToast('请选择要删除的商品')

					return;
				}
				$.ajax({
					url: types.MEMBERBOXDELETE,
					type: 'post',
					data: {
						MemberId: localStorage.MemberId,
						U_Num: localStorage.u_num,
						ProductId: deleteCloths
					},
					success: function(data) {
						if(data.ResultType == 3) {
							//清空选中数组
							self.checkboxModel = [];
							//删除视图
							for(var i = self.boxCloths.length - 1; i >= 0; i--) {
								if(self.boxCloths[i].checked) {
									self.deleteOne(i)
									console.log(i)
								}
							}

						}
						self.layerToast(data.Message)

					}
				})
			},

		},
		//		watch: {
		//			//监听数组全选，清空状态
		//			checkboxModel() {
		//				//清空选项
		//				if(this.checkboxModel.length == 0) {
		//					this.boxCloths.forEach(function(item) {
		//						item.checked = false;
		//					});
		//				}
		//				//全选联动
		//				var allCheck = false;
		//				this.checkboxModel.length == this.boxCloths.length ? allCheck = true : allCheck = false;
		//
		//				this.allcheckVal = allCheck;
		//
		//			}
		//		},
		//		components: {
		//			'el-checkbox': Checkbox
		//		}
	}
</script>

<style scoped>
	[v-cloak] {
		display: none;
	}
	
	.myBoxList {
		padding-top: 7vh;
		padding-bottom: 10.5vh;
	}
	
	.cloth-in-box {
		height: 40vw;
		margin-bottom: 10px;
		background: #FFF;
	}
	
	.cloth-in-box>div {
		float: left;
	}
	
	.cloth-in-box>div:nth-child(1) {
		height: 100%;
		width: 20%;
	}
	
	.cloth-in-box>div:nth-child(2) {
		height: 100%;
		width: 30%;
	}
	
	.cloth-in-box>div:nth-child(2) img {
		height: 100%;
	}
	
	.cloth-in-box>div:nth-child(3) {
		width: 50%;
	}
	
	.radio {
		position: relative;
	}
	
	.radio-inner {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -10px;
		margin-top: -10px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		border: 2px solid #214D50;
		box-sizing: border-box;
	}
	
	.radio-inner input[type=checkbox] {
		opacity: 0;
		width: 100%;
		height: 100%;
	}
	
	.radio-checked {
		position: absolute;
		top: 50%;
		left: 50%;
		box-sizing: border-box;
		margin-left: -6px;
		margin-top: -6px;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #214D50;
	}
	
	.cloth-description .cloth-name {
		color: #000;
		margin: 10px 0;
		font-size: 1em;
	}
	
	.cloth-description p {
		margin-bottom: 8px;
	}
	
	.cloth-description p,
	.cloth-description span {
		font-size: .9em;
		color: #5b5b5b;
	}
	
	.cloth-description p.price {
		color: #750000;
	}
	
	.edit-box {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 5vh;
		overflow: hidden;
		padding: 1vh 0;
		background: #f3f3f3;
		z-index: 10000;
	}
	
	.allcheckbox {
		position: absolute;
		top: 10px;
		left: 10%;
		margin-left: -10px;
	}
	
	.allcheckbox span.label-text {
		margin-left: 5px;
		font-size: .8em;
		line-height: 22px;
	}
	
	.allchecked-outside {
		float: left;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		border: 2px solid #214D50;
		box-sizing: border-box;
	}
	
	.allchecked-inner {
		position: absolute;
		top: 4px;
		left: 4px;
		display: block;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #214D50;
	}
	
	.edit-button {
		float: right;
		margin-right: 5vw;
		color: #214D50;
		background: transparent;
		border: 0px;
		height: 100%;
	}
	
	footer {
		height: 10vh;
		width: 100%;
		background: #FFF;
		position: fixed;
		bottom: 0;
		left: 0;
		border-top: 1px solid #CCC;
	}
	
	.delete {
		float: right;
		height: 6vh;
		margin-top: 2vh;
		margin-right: 10vw;
	}
	
	.delete img {
		height: 100%;
	}
	
	.no-have-cloth {
		text-align: center;
		padding: 20px 0;
		color: #204c4f;
	}
	
	.no-have-cloth p {
		font-size: 12px;
		margin-top: 10px;
	}
</style>