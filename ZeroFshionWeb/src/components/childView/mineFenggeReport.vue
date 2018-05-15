<template>
	<div class="warpper">
		
		<div class="content Imagecontain scroll">
			<img :src="item.AttributeImgs" alt="" v-for="item in TixingImg"/>
			<img :src="item.AttributeImgs" alt="" v-for="item in TexingImg"/>
		</div>
		<div class="footer">
				<div class="retest btn" @click="retest"><span>重新测试</span></div>
				<!--<div class="lijiyuyue btn" @click="lijiyuyue"><span>立即预约</span></div>-->
		</div>
		
	</div>
</template>

<script>
	import types from "@/store/types.js"	
	export default{
		data(){
			return{
				TixingImg:[],
				TexingImg:[],
				testData:null
			}
		},
		created: function() {
			this._getLess("components","CeshiReport");
//		   require("@/template/"+this.templates+"/components/CeshiReport/index.less");
		},
		mounted(){
			this.getReport();
		},
		methods:{
			getReport(){
				var that=this;
				$.fashion.validate(that,{login:true},function(){
					$.ajax({
				type: "post",
				url:types.GETCESHIREPORT,
				data: {
					MemberId: localStorage.MemberId,
					U_Num: localStorage.u_num
				},
				success: function(data) {
					if(data.ResultType == 3) {
									that.TixingImg=data.Data.Attr_TiXing;
									that.TexingImg=data.Data.Attr_TeXing;
									that.testData=data.Data.MemberFigure;
								}else if(data.ResultType == 6){
										$.fashion.tip({
										content:data.Message,
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
						})
					})
							
			},
			retest(){
				var that=this;
				this.$router.push({
					path: '/fenggeceshi',
					query: {
						testData: that.testData
					}
				})
				
			},
			lijiyuyue(){
				localStorage.opt = '1';
				this.$router.push({
					path: '/homeDiyBox',
					query: {
						tixing: localStorage.tixing,
					}
				})
			}
		}
	}
</script>

