<template>

	<div id='boxBgSingle'>
		<div class="moduleBox">
			<div class="itemleft">
				<div class="smallBox" @click="openSigleProduct(1)">

					<img :src="_getImage('homeSingle','jacket.png')" alt="" />
				</div>
				<div class="smallBox" @click="openSigleProduct(2)">

					<img :src="_getImage('homeSingle','qunzi.png')" />
				</div>
				<div class="smallBox" @click="openSigleProduct(3)">

					<img :src="_getImage('homeSingle','dress.png')" />
				</div>
			</div>
			<div class="itemright">
				<div class="smallBox minddle" @click="openSigleProduct(4)">

					<img :src="_getImage('homeSingle','scarf.png')" alt="" />
				</div>
				<div class="smallBox minddle" @click="openSigleProduct(7)">

					<img :src="_getImage('homeSingle','bag.png')" />
				</div>
				<div class="smallBox minddle" @click="openSigleProduct(6)">
					<img :src="_getImage('homeSingle','xiezi.png')" />
				</div>
				<div class="smallBox minddle" @click="openSigleProduct(5)">
					<img :src="_getImage('homeSingle','jiezhi.png')" />
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		created: function() {
			this._getLess("home","homeSingle");
		},
		methods: {
			openSigleProduct(param) {
				this.$router.push({
					path: '/sigleProduct',
					query: {
						dataObj: param
					}
				})
			}
		}
	}
</script>
