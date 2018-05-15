<template>
	<div class="header">
		<img src="./img/return.png" alt="" class="return" @click="returnLocation"/>
			<div class="headertitel">零时尚</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			
			}
		},
		computed: {
			
		},
		methods: {
			returnLocation(){
				
				window.history.go(-1);
			}
		}

	}
</script>

<style scoped>
	.return{
		width: 20px;
		position: absolute;top:50%;left:20px;
		transform: translateY(-50%);
	}
	.header{
		z-index: 99999;
		position: fixed;
		width: 100vw;
		height: 7vh;
		top:0;left:0;
		background: rgba(255,255,255,1);
		border-bottom: 1px solid rgba(0,0,0,.2);
		
	}
	.headertitel{
		color:#163638;
		letter-spacing: 2px;
		font-size:16px;
		position: absolute;
		top:50%;left: 50%;
		transform: translate(-50%,-50%);
	}
</style>