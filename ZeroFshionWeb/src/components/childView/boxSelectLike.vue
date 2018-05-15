<template>
	<div class="diycontent scroll">
		<div class="questionbox">
			<div class="boxheaer">
				<p>请选择您喜欢的单品</p>
			</div>
			<div class="boxcontent">
				<div>从我的心愿清单选择喜欢的单品</div>
				<router-link to="/selectMyBoxList"></router-link>
				<div v-on:click="toBoxList" class="addBox"><img src="./diyBox/jiahao.png" alt="" class="openbox" />({{count}}/5)</div>

			</div>
			<div class="cloths">
				<div class="one-cloth" v-for="(cloth,index) in likeCloths" v-bind:num="cloth.split('&path&')[0]">
					<img class="delete" v-on:click="deleteLike(index)" src="./diyBox/shanchu.png" />
					<img :src="cloth.split('&path&')[1]" />
				</div>
			</div>
		</div>

		<div class="footer">
			<div class="btn" @click="topay"><span>下一步</span></div>
		</div>

	</div>
</template>

<script>
	import types from "@/store/types.js"
	import { mapGetters, mapActions, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				likeCloths: []

			}
		},
		mounted() {
			this.getParms();
		},
		computed: {
			count() {
				return this.likeCloths.length
			},
			...mapGetters([
				'getSelectMyBoxToDiySelectImage'
			]),
			commitData() {
				//提交数据likes
				var likeClothsNum = [];
				this.likeCloths.forEach(function(item, index) {
					likeClothsNum.push(item.split('&path&')[0])
				})
				return likeClothsNum;
			}
		},
		methods: {
			...mapActions([
				'changeSelectMyBoxToDiySelectImage',
				'changeSelectMyBoxToDiyOptions',
				'changeSelectMyBoxToDiySelectLikeNum'
			]),

			topay() { //去选择个兑换券，然后才可以提交
				this.changeSelectMyBoxToDiySelectLikeNum(this.commitData)
				this.$router.push({
					path: '/boxWriteNote',
					query:{
						fromType:1
					}

				})

			},
			toBoxList() {

				this.$router.push({
					path: '/selectMyBoxList'

				})
			},
			getParms() {

				if(this.$route.query.options) {
					//boxCustomized box定制参数 vuex selectMyBoxToDiy
					var optinos = JSON.parse(this.$route.query.options);
					this.changeSelectMyBoxToDiyOptions(optinos)
					//from boxCustomized 请空选择图片
					this.changeSelectMyBoxToDiySelectImage([])
				} else {
					//喜欢的衣服
					this.likeCloths = this.getSelectMyBoxToDiySelectImage
				}
				
			},
			deleteLike(index) {
				this.likeCloths.splice(index, 1);
			}

		}

	}
</script>

<style scoped>
	.diycontent {
		width: 100%;
		height: 100%;
		overflow-y: scroll;
	}
	
	.questionbg {
		width: 100%;
		height: 100%;
	}
	
	.openbox {
		width: 20px;
		margin-right: 10px;
		vertical-align: middle;
	}
	
	.boxcontent {
		justify-content: space-between;
		padding: 10px;
		font-size: .2rem;
		color: #888;
		display: flex;
		align-items: center;
	}
	
	.questionbox {
		width: 90%;
		min-height: 60vh;
		background: #fff;
		margin: 20px auto;
		padding-bottom: 40px;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		box-shadow: 3px 3px 3px rgba(153, 153, 153, .2);
		display: flex;
		flex-direction: column;
	}
	
	.boxheaer {
		width: 100%;
		height: 50px;
		background: url("./diyBox/questionbg.png") no-repeat;
		background-size: 100% 100%;
	}
	
	.boxheaer p {
		color: #fff;
		padding-left: .5rem;
		font-size: .35rem;
		line-height: 50px;
	}
	
	.selectradio {
		width: 50%;
		height: 50px;
		line-height: 55px;
		position: relative;
	}
	
	.selectradio label {
		margin-left: 40%;
		color: #737373;
		font-size: .35rem;
	}
	
	input[type='radio'],
	input[type='checkbox'] {
		position: absolute;
		width: 20px;
		height: 20px;
		top: 15px;
		left: 0px;
		z-index: 3;
		opacity: 0;
	}
	
	.selectradioContent {
		height: 50px;
		line-height: 55px;
		position: relative;
	}
	
	.selectradioContent label {
		margin-left: 11%;
		color: #737373;
		font-size: .35rem;
	}
	
	.user-defined {
		position: absolute;
		width: 20px;
		height: 20px;
		top: 15px;
		left: 0px;
		z-index: 2;
		border: 1px solid #737373;
		border-radius: 50%;
	}
	
	.user-defined span.circle {
		display: block;
		width: 18px;
		height: 18px;
		margin-top: 1px;
		margin-left: 1px;
		background-color: transparent;
		border-radius: 50%;
	}
	
	.user-defined span.active {
		background-color: #214d50;
	}
	
	.footer {
		width: 100%;
		height: 10%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	
	.btn {
		width: 30%;
		height: 60%;
		color: #fff;
		background: url("./sigleProduct/img/anniu.png");
		background-repeat: no-repeat;
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.addBox {
		padding: 0 10px;
	}
	
	.cloths {
		padding: 10px;
	}
	
	.one-cloth {
		width: 33.33%;
		float: left;
		padding: 5px;
		max-height: 20vh;
		overflow: hidden;
		box-sizing: border-box;
		position: relative;
	}
	
	.one-cloth img {
		width: 100%;
	}
	
	.one-cloth .delete {
		width: 25px;
		position: absolute;
		top: 10px;
		right: 10px;
	}
</style>