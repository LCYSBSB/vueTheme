<template>
	<div>
		<div class="haveCloth" v-if="haveCloth">
			<div class="myBoxList">
				<div class="cloth-in-box" v-for="(cloth,index) in boxCloths" v-bind:id="cloth.ProductId">
					<div class="radio">
						<label class="radio-inner">
						<input type="checkbox" v-on:change="checkedCloth(index)"  :value="cloth.ProductNumber+'&path&'+cloth.ProductImg+'&path&'+cloth.ProductId" v-model="checkboxModel" />
						<span class="radio-checked" v-if="ischecked(cloth.ProductNumber+'&path&'+cloth.ProductImg+'&path&'+cloth.ProductId)"></span>
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
			<footer>
				<div class="sure" v-on:click="sureCloth"><img src="./diyBox/anniu.png" />
					<span class="sureText">确定</span>
				</div>
			</footer>
		</div>
		<div class="no-have-cloth" v-else>
			<p>我的BOX是空的~</p>
		</div>
	</div>
</template>

<script>
	import types from "@/store/types.js"
	import mixin from "@/store/mixin.js"
	import { mapGetters, mapActions, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				disabled: true,
				boxCloths: [],
				checkboxModel: [],
				editShow: false,
				allcheckVal: false,
			}
		},
		mixins:[mixin],
		computed: {
			haveCloth() {
				return this.boxCloths.length
			},
			...mapGetters([
				'getSelectMyBoxToDiySelectImage'
			])
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

			this.getParms()
		},
		methods: {
			...mapActions([
				'changeSelectMyBoxToDiySelectImage'
			]),
			checkedCloth(index) {

				if(this.checkboxModel.length > 5) {
					this.layerToast('最多选择5个');
					//从选中model中删除
					this.checkboxModel.splice(this.checkboxModel.length - 1, 1)
					return;
				}
				this.boxCloths[index].checked = !this.boxCloths[index].checked;

			},

			sureCloth() {

				this.changeSelectMyBoxToDiySelectImage(this.checkboxModel)
				this.$router.push({
					path: '/boxSelectLike'
				})
			},
			getParms() {
				this.checkboxModel = this.getSelectMyBoxToDiySelectImage;
			},
			ischecked(value) {
				var ischecked = false;
				this.checkboxModel.forEach(function(item) {

					if(item == value) {
						ischecked = true;
						return;
					}
				})
				return ischecked;
			}
		},
		watch: {
			//监听数组全选，清空状态
			checkboxModel() {
				//清空选项
				if(this.checkboxModel.length == 0) {
					this.boxCloths.forEach(function(item) {
						item.checked = false;
					});
				}
				//全选联动
				var allCheck = false;
				this.checkboxModel.length == this.boxCloths.length ? allCheck = true : allCheck = false;

				this.allcheckVal = allCheck;

			}
		}
	}
</script>

<style scoped>
	[v-cloak] {
		display: none;
	}
	
	.myBoxList {
		padding-top: 2vh;
		padding-bottom: 10vh;
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
		margin-bottom: 5px;
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
	
	.sure {
		float: right;
		height: 6vh;
		margin-top: 2vh;
		margin-right: 10vw;
		position: relative;
	}
	
	.sure .sureText {
		color: #FFF;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		line-height: 6vh;
		text-align: center;
	}
	
	.sure img {
		height: 100%;
	}
	
	.no-have-cloth p {
		text-align: center;
		padding: 20px 0;
	}
</style>