<template>

	<div id='boxBg'>
		<router-view></router-view>
		<div class="moduleBox">
			<div class="Abodily smallBox" @click="openproduct('A型')"> </div>
			<div class="Ibodily smallBox" @click="openproduct('I型')"> </div>
			<div class="Hbodily smallBox" @click="openproduct('H型')"> </div>
			<div class="Obodily smallBox" @click="openproduct('O型')"> </div>
			<div class="Xbodily smallBox" @click="openproduct('X型')"> </div>
			<div class="Vbodily smallBox" @click="openproduct('V型')"> </div>
			<div class="fly"></div>
		</div>
		<div class="shade"></div>
	</div>
</template>

<script>
	export default {
		created: function() {
      this._getLess("home", "homeBoxMall");
    },
		methods: {
//			trigger() {
//				var tixing = localStorage.tixing;
//				localStorage.yuyue = tixing;				
//				this.$router.push({
//					path: '/project',
//					query: {
//						dataParam: tixing
//					}
//				})
//			},
			openproduct(param) {
				var that = this;
				that.$router.push({
						path: '/project',
						query: {
							dataParam: param
						}
					})
//				var tixing = localStorage.tixing;
//				tixing = tixing!="null"?tixing:null;
//				var xing = param.substr(0, 1);
//				localStorage.yuyue = xing;
//			    var MemberId = window.localStorage.MemberId;
//				if(tixing && tixing == xing && MemberId) {
//					that.$router.push({
//						path: '/project',
//						query: {
//							dataParam: param
//						}
//					})
//				} else if(tixing && tixing != xing && MemberId){
//						$.fashion.tip({
//							content: '您是' + tixing + '型，其他体型只能预览不可预约',
//							ok: function() {
//								that.$router.push({
//									path: '/project',
//									query: {
//										dataParam: param
//									}								
//								})
//							}
//						});
//				}else if(!MemberId){
//					that.$router.push({
//						path: '/project',
//						query: {
//							dataParam: param
//						}
//					})
//				}else if(MemberId && !tixing){
//					$.fashion.tip({
//							content: '您还没有体型数据，不可预约。',
//								btn:['做测试', '先看看'],
//							ok: function() {
//								that.$router.push({
//									path: '/fenggeceshi',
//								})
//							},
//							no:function(){
//								that.$router.push({
//									path: '/project',
//									query: {
//										dataParam: param
//									}
//								})
//							}
//						});
//				}
			},
			layOut(msg) {
				localStorage.opt = 0;
				setTimeout(function() {
					$.fashion.tip({
						content: '您的测试报告是' + msg + '体型',
						btn: ["好的，我知道了"],
					});
				}, 2900);
			},
		},
		mounted: function() {
			var tixing = localStorage.tixing;
			var opt = localStorage.opt;
			var heightFly = $(".fly").height();
			if(opt == 1) {
				$(".fly").show().addClass('diaoyong');
				$(".shade").show();				
				setTimeout(function(){
					$(".fly").removeClass("diaoyong");
					$(".shade").animate({opacity:0},500);
					setTimeout(function(){
						$(".shade").hide();
					},600)
				},1000)
				
				if(tixing == 'A') {			
					setTimeout(function(){
						$(".fly").animate({left: '-2px',top: '-2px'},1500);
					},1200);
					this.layOut(tixing);					
				}
				if(tixing == 'H') {
					setTimeout(function(){
						$(".fly").animate({left: '-2px',top: heightFly - 2 + 'px'},1500);
					},1200);
					this.layOut(tixing);					
				}
				if(tixing == 'X') {
					setTimeout(function(){
						$(".fly").animate({left: '-2px',top: heightFly * 2 + 'px'},1500);
					},1200)		
					this.layOut(tixing);					
				}
				if(tixing == 'I') {
					setTimeout(function(){
						$(".fly").animate({left: '50.2%',top: '-2px'},1500);
					},1200);
					this.layOut(tixing);
				}
				if(tixing == 'O') {
					setTimeout(function(){
						$(".fly").animate({left: '50.2%',top: heightFly - 2 + 'px'},1500);
					},1200);
					this.layOut(tixing);
				}
				if(tixing == 'V') {
					setTimeout(function(){
						$(".fly").animate({left: '50.2%',top: heightFly * 2 + 'px'},1500);
					},1200)			
					this.layOut(tixing);					
				}
				setTimeout(function(){
					$(".fly").css('z-index','1');
				},2800)
			}
		}
	}
</script>
