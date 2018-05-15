<template>
	<div id="app" >
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
		<!--<ReturnHeader></ReturnHeader>-->
		<BindPhone ref="phone"></BindPhone>
		<BindSotre ref="store"></BindSotre>
	</div>
</template>

<script>
	import BindPhone from '@/components/home/bindphone';
	import BindSotre from '@/components/home/bindStore';
//	import ReturnHeader from '@/components/home/header';返回专用头
	
	export default {
		name: 'app',
		components: {
			BindPhone,
			BindSotre,
//			ReturnHeader

		}
	}
</script>

<style>
	#app {
		height: 100vh;
	}
</style>