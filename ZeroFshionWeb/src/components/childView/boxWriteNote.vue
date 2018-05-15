<template>
	<div class="diycontent scroll">
		<div class="questionbox">
			<div class="boxheaer">
				<p>请填写您的备注</p>
			</div>
			<div class="boxcontent">
				<textarea type="text" name="" id="note" value="" placeholder="如果您有其他需求，请填写在这里。" v-model="note" />
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
				note: ""
			}
		},
		created: function() {
			this._getLess("components","boxSelectLike");
//		   require("@/template/"+this.templates+"/components/boxSelectLike/index.less")
		},
		mounted() {
			this.getParms();
		},
		methods: {
			...mapActions([
				'getSelectMyBoxToDiySelectNote',
				'changeSelectMyBoxToDiyOptions',

			]),
			getParms() {
				if(this.$route.query.options) {
					var optinos = JSON.parse(this.$route.query.options);
					this.changeSelectMyBoxToDiyOptions(optinos)
				}
			},
			topay() {
				let palnId = parseInt(this.$route.query.palnId);
				this.getSelectMyBoxToDiySelectNote(this.note);
				this.$router.push({
					path: '/payment',
					query: {
						palnId: palnId,
						fromType: this.$route.query.fromType
					}

				})

			},
		}

	}
</script>

