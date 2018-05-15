<template>
	<div class="diycontent scroll">
		<div class="diytitel">
			<img src="./diyBox/biaoti2.png" alt="" />

		</div>
		<div class="questionbox" v-for="(aquestion,key) of questions" :questionKey="aquestion.Key">
			<div class="boxheaer">
				<p><i>{{aquestion.Order}}.</i><span class="Checkfailure">{{aquestion.Desc}}</span></p>
			</div>
			<div class="boxcontent">

				<div class="selectradioContent" v-for="(item,index) in aquestion.Options">
					<input :type="aquestion.Multiple?'checkbox':'radio'" :name="aquestion.Key" v-model="checkedValue[aquestion.Key]" :value="item.Value" :id="'aquestion'+key+'-'+index">
					<div class="user-defined">
						<span class="circle" :class="checkedValue[aquestion.Key].indexOf(item.Value)>-1?'active':''"></span>
					</div>
					<label :for="'aquestion'+key+'-'+index">{{item.Text}}</label>
				</div>
			</div>
		</div>
		<div class="footer">
			<div class="btn" @click="toselectLike"><span>下一步</span></div>
		</div>
	</div>
</template>

<script>
	import types from "@/store/types.js"
	import mixin from "@/store/mixin.js"

	export default {
		data() {
			return {
				questions: [],
				checkedValue: {

				}

			}
		},
		created: function() {
				this._getLess("components","boxCustomized");
//		   require("@/template/"+this.templates+"/components/boxCustomized/index.less")
		},
		mixins: [mixin],
		beforeCreate() {
			var that = this;
			$.fashion.validate(that, {
				phone: true,
			}, function() {
				$.ajax({
					type: 'post',
					url: types.GETYUYUEOPTION,
					data: {
						MemberId: localStorage.MemberId,
						U_Num: localStorage.u_num,
					},
					success: function(data) {
						if(data.ResultType == 3) {
							var da = data.Data;
							$.each(da, function(i, item) {
								if(item.Multiple) {
									that.$set(that.checkedValue, item.Key, [])
								} else {
									that.$set(that.checkedValue, item.Key, '')
								}

							})

							that.questions = da;

						} else if(data.ResultType == 6) {
							$.fashion.tip({
								content: '您还没有登录，是否现在登录?',
								ok: function() {
									that.$router.replace({
										path: '/login',
										query: {
											orgpath: that.$route.fullPath
										}
									})
								}
							});
						}
					}
				});
			})
		},

		methods: {
			alloptions: function() {
				var options = this.checkedValue;
				
				for(var item in options) {
					if(options[item].constructor == Array) {
						options[item] = options[item].join(",")
					}
				}
				return JSON.stringify(options);
			},
			toselectLike() {
				var that = this;

				for(var item in this.checkedValue) {
					var val = this.checkedValue[item];
					var targetJqDom = $('.questionbox[questionKey=' + item + ']').find('p');
					if(!val.length) {

						that.layerToast(targetJqDom.find(".Checkfailure").html())
						targetJqDom.addClass("notcheckTitle")
						return false;
					} else {
						targetJqDom.removeClass("notcheckTitle")
					}

				}

				//console.log(this.alloptions())
//
//				that.$router.push({
//					path: '/boxSelectLike',
//					query: {
//						options: that.alloptions()
//					}
//				})

			that.$router.push({
					path: '/boxWriteNote',
					query:{
						options: that.alloptions(),
						fromType:1
					}

				})
			}
		}
	}
</script>

<style scoped>
	
</style>