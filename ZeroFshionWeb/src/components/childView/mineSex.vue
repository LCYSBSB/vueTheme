<template>
	<div class="sexChange">
		<div class="sex">
			<ul class="sexBox">
				<li @click="changeSex(0)"><span>性别</span><i>女</i></li>
				<li @click="changeSex(1)"><span>性别</span><i>男</i></li>
			</ul>
			<router-link to="/mineSet">
				<div class="callOff">取消</div>
			</router-link>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
	import types from "@/store/types.js"
	export default{
		data(){
			return{
				
			}
		},
		mounted(){
		
		},
		methods:{
			...mapActions([
				'changeSex'
			]),
		}
	}
</script>

<style scoped="scoped">
	i {
		font-style: normal;
	}
	.sexChange {
		padding-top: 2vh;
	}
	.sex{
		width: 100%;
		height: 98vh;
		background: #fff;
	}
	.sexBox {
		width: 100%;
		height: 20vh;
		background: #fff;
	}
	
	.sexBox li {
		width: 80%;
		margin: 0 auto;
		height: 10vh;
		line-height: 10vh;
		padding: 0 15px;
		color: #727F80;
		font-weight: 600;
		border-bottom: 1px solid #E8E8E8;		
	}	
	.sexBox li i {
		float: right;
	}	
	.callOff {
		width: 100%;
		border-top: 1px solid #E8E8E8;
		height: 10vh;
		position: fixed;
		bottom: 0;
		text-align: center;
		line-height: 10vh;
		font-weight: 600;
		color: #727F80;
	}
</style>