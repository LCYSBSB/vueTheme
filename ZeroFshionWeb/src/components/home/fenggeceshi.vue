<template>
	<div class="testcontent scroll">
		<div class="testHeader"><img :src="_getImage('fenggeceshi','fenggeceshiTitel.png')" alt="" /><p>&nbsp;&nbsp;&nbsp;&nbsp;风格测试通过一系列选择题来完成，请认真选择，若选择不精准将直接影响搭配方案的满意度，客户体型或工作生活状态发生变化时，需要重新测试。</p></div>
		
		<div class="questionbox">
			<div v-show="false">{{finallydata}}{{finallyDeatiltest}}</div>
			<div class="boxheaer">
				<p>1.请选择您的性别</p>
				<div class="cheackempty" v-show="false" data-type="请选择您的性别">{{sex}}</div>
			</div>
			<div class="boxcontent">
				<div class="selectradio">
					<input type="radio" v-model="sex" value="0" id="women">
					<div class="user-defined">
						<span class="circle" :class="sex==0?'active':''"></span>
					</div>
					<label for="women">女</label>
				</div>
				<div class="selectradio">
					<input type="radio" v-model="sex" value="1" id="man">
					<div class="user-defined">
						<span class="circle" :class="sex==1?'active':''"></span>
					</div>
					<label for="man">男</label>
				</div>
			</div>
		</div>

		<div class="questionbox">
			<div class="boxheaer">
				<p>2.请选择您的年龄(滑动数字)</p>
			</div>
			<div class="boxcontent">
				<img src="./img/fenggeceshi/huadong.png" alt="" class="huadongimg" />
				<div class="swiperbox">
					<swierbrith @getage="getage"  :age="brith"></swierbrith>
					<p>(周岁)</p>
				</div>
			</div>
		</div>
		<div class="questionbox">
			<div class="boxheaer">
				<p>3.请选择您的身高体重(滑动数字)</p>
			</div>
			<div class="boxcontent">
				<img src="./img/fenggeceshi/huadong.png" alt="" class="huadongimg" />
				<div class="swiperbox">
					<swipershengao @getShengao="getShengao" :dat="shengao"></swipershengao>
					<p>(身高cm)</p>
				</div>
				<img src="./img/fenggeceshi/huadong.png" alt="" class="huadongimg" />
				<div class="swiperbox">
					<swipertizhong @getTizhong="getTizhong" :dat="tizhong"></swipertizhong>
					<p>(体重kg)</p>
				</div>
			</div>
		</div>
		<div class="questionbox">
			<div class="boxheaer">
				<p>4.请选择您的上下装尺码(滑动尺码)</p>
			</div>
			<div class="boxcontent">
				<img src="./img/fenggeceshi/huadong.png" alt="" class="huadongimg" />
				<div class="swiperbox">
					<swipershagnzhuang @getShangzhuang="getShangzhuang" :dat="shangzhuang"></swipershagnzhuang>
					<p>(上装)</p>
				</div>
				<img src="./img/fenggeceshi/huadong.png" alt="" class="huadongimg" />
				<div class="swiperbox">
					<swiperxiazhuang @getXiazhuang="getXiazhuang" :dat="xiazhuang"></swiperxiazhuang>
					<p>(下装)</p>
				</div>
			</div>
		</div>
		<!--<div class="questionbox">
			<div class="boxheaer">
				<p>5.请选择您的四围(滑动数字)</p>
			</div>
			<div class="boxcontent">
				<img src="./img/fenggeceshi/huadong.png" alt="" class="huadongimg" />
				<div class="swiperbox">
					<swiperjian @getJian="getJian" :dat="jian"></swiperjian>
					<p>(肩cm)</p>
				</div>
				<img src="./img/fenggeceshi/huadong.png" alt="" class="huadongimg" />
				<div class="swiperbox">
					<swiperxiong @getXiong="getXiong" :dat="xiong"></swiperxiong>
					<p>(胸cm)</p>
				</div>
				<img src="./img/fenggeceshi/huadong.png" alt="" class="huadongimg" />
				<div class="swiperbox">
					<swiperyao @getYao="getYao" :dat="yao"></swiperyao>
					<p>(腰cm)</p>
				</div>
				<img src="./img/fenggeceshi/huadong.png" alt="" class="huadongimg" />
				<div class="swiperbox">
					<swipertun @getTun="getTun" :dat="tun"></swipertun>
					<p>(臀cm)</p>
				</div>
			</div>
		</div>-->
		<div class="questionbox">
			<div class="boxheaer">
				<p>5.请选择您的体型</p>
				<div class="cheackempty" v-show="false" data-type="请选择您的体型">{{Tixing}}</div>
			</div>
			<div class="boxcontent">
				<div class="selectradioTixing">
					<input type="radio" v-model="Tixing" value="A" id="A">
					<div class="user-defined">
						<span class="circle" :class="Tixing=='A'?'active':''" ></span>
					</div>
					<label for="A" >A型 显瘦 上衣比裤子小一码占尽便宜</label>
				</div>
				<div class="selectradioTixing">
					<input type="radio" v-model="Tixing" value="I" id="I">
					<div class="user-defined">
						<span class="circle" :class="Tixing=='I'?'active':''"></span>
					</div>
					<label for="I">I型 骨质 天生丽质难自弃 全身骨干</label>
				</div>
				<div class="selectradioTixing">
					<input type="radio" v-model="Tixing" value="X" id="X">
					<div class="user-defined">
						<span class="circle" :class="Tixing=='X'?'active':''"></span>
					</div>
					<label for="X">X型 腰细 腰臀曲线明显 不管胖瘦</label>
				</div>
				<div class="selectradioTixing">
					<input type="radio" v-model="Tixing" value="H" id="H">
					<div class="user-defined">
						<span class="circle" :class="Tixing=='H'?'active':''"></span>
					</div>
					<label for="H">H型 匀称 腰臀曲线不明显 优雅干练</label>
				</div>
				<div class="selectradioTixing">
					<input type="radio" v-model="Tixing" value="V" id="V">
					<div class="user-defined">
						<span class="circle" :class="Tixing=='V'?'active':''"></span>
					</div>
					<label for="V">V型 上衣比裤子大一码 让人羡慕</label>
				</div>
				<div class="selectradioTixing">
					<input type="radio" v-model="Tixing" value="O" id="O">
					<div class="user-defined">
						<span class="circle" :class="Tixing=='O'?'active':''"></span>
					</div>
					<label for="O">O型 圆润 苦苦寻找大码装 气场女王</label>
				</div>
			</div>
		</div>
		<div class="questionbox">
			<div class="boxheaer">
				<p>7.请选择您的体型特征(可多选)</p>
				<div class="cheackempty" v-show="false" data-type="请选择您的体型特征">{{TexingCheack}}</div>
			</div>
			<div class="boxcontent">
				<div class="selectradio tixing" v-for="(item,index) in Texingarr">
					<input type="checkbox" v-model="TexingCheack" :value="item" class="more" :id="'tx-'+index">
					<div class="user-defined">
						<span class="circle" :class="TexingCheack.indexOf(item)>-1?'active':''"></span>
					</div>
					<label :for="'tx-'+index">{{item}}</label>
				</div>
			</div>
		</div>
		<div class="questionbox">
			<div class="boxheaer">
				<p>8.请选择您喜欢的颜色(最多3个)</p>
				<div class="cheackempty" v-show="false" data-type="请选择您喜欢的颜色">{{colorCheack}}</div>
			</div>
			<div class="boxcontent">

				<!--<div v-for="(item,index) in colorarr" @click="filterSearchCondition(index,'color',item.ColorId)"><img :src="item.IconPath" alt="" :color-id="item.ColorId" />
					<p>{{item.ColorName}}</p>
				</div>-->

				<div class="selectradio color" v-for="(item,index) in colorarr">
					<input type="checkbox"  v-model="colorCheack" :value="item.ColorName" :id="'color-'+item.ColorId">
					<div class="user-defined">
						<span class="circle" :class="colorCheack.indexOf(item.ColorName)>-1?'active':''"></span>
					</div>
					<label :for="'color-'+item.ColorId">{{item.ColorName}}</label>
					<img :src="item.IconPath" alt="" :color-id="item.ColorId" />
				</div>
			</div>
		</div>
		<!--<div class="questionbox">
			<div class="boxheaer">
				<p>9.您的日常工作特点(可多选)</p>
				<div class="cheackempty" v-show="false" data-type="请选择您的日常工作特点">{{details_one_cheack}}</div>
			</div>
			<div class="boxcontent">
				<div class="selectradioDetails" v-for="(item,index) in details_one">
					<input type="checkbox" v-model="details_one_cheack" :value="item" :id="'Qone-'+index">
					<div class="user-defined">
						<span class="circle" :class="details_one_cheack.indexOf(item)>-1?'active':''"></span>
					</div>
					<label :for="'Qone-' + index">{{item}}</label>
				</div>
			</div>
		</div>
		<div class="questionbox">
			<div class="boxheaer">
				<p>10.您对工作的态度(可多选)</p>
				<div class="cheackempty" v-show="false" data-type="请选择您对工作的态度">{{details_two_cheack}}</div>
			</div>
			<div class="boxcontent">
				<div class="selectradioDetails" v-for="(item,index) in details_two">
					<input type="checkbox" v-model="details_two_cheack" :value="item" :id="'Qtwo-'+index">
					<div class="user-defined">
						<span class="circle" :class="details_two_cheack.indexOf(item)>-1?'active':''" ></span>
					</div>
					<label :for="'Qtwo-' + index">{{item}}</label>
				</div>
			</div>
		</div>
		<div class="questionbox">
			<div class="boxheaer">
				<p>11.您的日常生活特点(可多选)</p>
				<div class="cheackempty" v-show="false" data-type="请选择您的日常生活特点" >{{details_three_cheack}}</div>
				
			</div>
			<div class="boxcontent">
				<div class="selectradioDetails" v-for="(item,index) in details_three">
					<input type="checkbox" v-model="details_three_cheack" :value="item" :id="'Qthree-'+index">
					<div class="user-defined">
						<span class="circle" :class="details_three_cheack.indexOf(item)>-1?'active':''"></span>
					</div>
					<label :for="'Qthree-' + index">{{item}}</label>
				</div>
			</div>
		</div>
		<div class="questionbox">
			<div class="boxheaer">
				<p>12.您的时尚态度(可多选)</p>
				<div class="cheackempty" v-show="false" data-type="请选择您的时尚态度">{{details_four_cheack}}</div>
				
			</div>
			<div class="boxcontent">
			
				<div class="selectradioDetails" v-for="(item,index) in details_four">
					<input type="checkbox" v-model="details_four_cheack" :value="item" :id="'Qfour-'+index" >
					<div class="user-defined">
						<span class="circle"  :class="details_four_cheack.indexOf(item)>-1?'active':''"></span>
					</div>
					<label :for="'Qfour-' + index">{{item}}</label>
				</div>
			</div>
		</div>
		-->
		<div @click="commitData" class="commit">
			<p>提交</p>
		</div>
	</div>
</template>

<script>
	import types from "@/store/types.js"
	import swierbrith from '@/components/fenggeceshiSwiper/brith'
	import swipershengao from '@/components/fenggeceshiSwiper/shengao'
	import swipertizhong from '@/components/fenggeceshiSwiper/tizhong'
	import swipershagnzhuang from '@/components/fenggeceshiSwiper/shangzhuang'
	import swiperxiazhuang from '@/components/fenggeceshiSwiper/xiazhuang'
	import swiperjian from '@/components/fenggeceshiSwiper/jian'
	import swiperxiong from '@/components/fenggeceshiSwiper/xiong'
	import swiperyao from '@/components/fenggeceshiSwiper/yao'
	import swipertun from '@/components/fenggeceshiSwiper/tun'
//	import cktemp from '@/components/fenggeceshiSwiper/cktemp' 
	
	
	
	
	
	
	
	export default {
		data() {
			return {
				sex: null,
				Tixing: null,
				brith:null,
				shengao:null,
				tizhong:null,
				shangzhuang:null,
				xiazhuang:null,
				jian:40,
				xiong:92,
				yao:83,
				tun:100,
				Texingarr: ['脖子短', '肩宽', '胸大', '上臂粗', '腰粗', '腹部突出', '宽臀', '大腿粗', '窄臀', '小腿粗', '平臀', '腿不直'],
				TexingCheack: [],
				colorarr: [],
				colorCheack: [],
				details_one:['以室内办公为主，很少差旅','经常性差旅','商务会见频繁','偏艺术方向',
							'技术性工作','研究性工作','经常面对较多人讲话','较少与他人进行正式的商务沟通',
							'工作内容很有规律','工作内容变化性强','经常从事户外工作','全职妈妈','较多自由安排的时间'],
				details_one_cheack:['以室内办公为主'],
				details_two:['工作狂一枚','希望自己在事业上能有所建树','希望工作与生活能够平衡','喜欢家庭生活，力求与家人建立亲密关系',
				             '希望自己的工作稳定，可预期','希望工作充满未知','当工作内容发生变化时会感到焦虑','当工作内容发生变化时有点兴奋',
				             '喜欢研究商业世界的逻辑','很关注自己的职业生涯发展'],
				details_two_cheack:['喜欢交友常与朋友一起玩'], 
				details_three:['喜欢交友，常与朋友一起玩','喜欢独处，喜欢宅在家里','喜欢上网浏览','喜欢研究美食','喜欢布置家居',
				          '喜欢看书、看电影','喜欢欣赏古典音乐','喜欢亲子时光','喜欢出去看世界','喜欢二人时间','希望有更多的时间回家看望父母',
				          '喜欢逛街、购物'],
				details_three_cheack:['很关注时尚'],   
				details_four:['很关注时尚','与形象相比，内在更重要','日常着装随意些更好','形象很重要，是一个人内在与修为的表达',
				              '希望自己有相对固定的着装风格','希望自己的形象随着场合与角色的变化而经常变化','已经形成了自己风格',
				              '很清楚在哪里能买到更适合自己的东西','很困惑在哪里能买到更适合自己的东西','希望未来可以形成自己的风格',
				              '希望能有更多不同的尝试','消费时更注重自己的感受','消费是很在意周围人的评价','果断决策者','选择困难症',
				              '经常指导别人买东西','周围有朋友给自己很好的消费建议'],
				details_four_cheack:['果断决策者'],      
			}
		},
		created: function() {
// 		   require("@/template/"+this.templates+"/home/fenggeceshi/index.less");
 		   this._getLess("home","fenggeceshi");
//		   this.titelsrc= require("@/template/"+this.templates+"/home/img/fenggeceshi/fenggeceshiTitel.png");
		},
		computed:{
			finallydata:function(){
				var data={};
				var year =new Date().getFullYear();
				data.Birthday=(year-this.brith)+"-1-1";
				data.Gender=parseInt(this.sex);
				data.ApparelSize=this.shangzhuang+","+this.xiazhuang;
				data.FigureInfo=this.shengao+","+this.tizhong+","+this.jian+","+this.xiong+","+this.yao+","+this.tun+","+this.Tixing;
				data.MemberId=localStorage.MemberId;
				data.U_Num=localStorage.u_num;
				data.FigureDescription=this.TexingCheack.join(",");//数组转字符串才能提交
				data.PreferenceColor=this.colorCheack.join(",");
				return data;
			},
			finallyDeatiltest:function(){
				var data={};
				data['您的日常工作特点']=this.details_one_cheack.join(",");
					data['您对工作的态度']=this.details_two_cheack.join(",");
						data['您的日常生活特点']=this.details_three_cheack.join(",");
							data['您的时尚态度']=this.details_four_cheack.join(",");
				return data;
			}
		},
		mounted() {
			this.getColor();
			this.getParms();
		    this.getDetails();
		},
		watch:{
			colorCheack(val) {
                this.validCheckCount(val,3);
            },
		},
		methods: {
			splitArr(strarr){
				if(!strarr) return [];
				else if(strarr instanceof Array) return strarr;
				var reg = new RegExp(/[,，]/);
				return strarr.split(reg);
			},
			getParms(){
				var da=this.$route.query.testData;
				var that=this;
				if(da){
					that.sex=da.Gender;
					that.brith=da.Age;
					that.shengao = da.Height;
					that.tizhong = da.Weight;
					var st =that.splitArr(da.ApparelSize);
					that.shangzhuang =st.length>0? st[0]:'L';
					that.xiazhuang = st.length>1?st[1]:'L';
					that.jian = da.Shoulder;
					that.xiong = da.Bust;
					that.yao = da.Waistline;
					that.tun = da.Hips;
					that.Tixing = da.FigureType;
					that.TexingCheack =da.FigureDes||[];
					that.colorCheack = that.splitArr(da.PreferenceColor);
				}
			},
			getDetails(){
				var that=this;
					 $.ajax({
						type: 'post',
						url:types.GETDETAILSTEST,
						data: {
							   isDetail:true,
 								MemberId: localStorage.MemberId,
								U_Num: localStorage.u_num,
						},
						success: function(data) {
							if(data.ResultType == 3) {
 								 var list = data.Data.CQAs;
 								 
 								that.details_one_cheack=that.filterCQA(list,"您的日常工作特点");
 								that.details_two_cheack=that.filterCQA(list,"您对工作的态度");
 								that.details_three_cheack=that.filterCQA(list,"您的日常生活特点");
 								that.details_four_cheack=that.filterCQA(list,"您的时尚态度");
							}else{
								layer.open({content: data.Message,skin: 'msg',time: 2});
							}
						}
					})
			},
			filterCQA(arr,flag){
				var cur = arr.filter(function(item){ return item.QuestionName==flag; });
 				if(cur.length>0){
 					return cur[0].QuestionAnswers.map(function(item){ return item.Content; });
 				}
 				return [];
			},
			getage(val){
					this.brith=val;
			},
			getShengao(val){
				this.shengao=val;
			},
			getTizhong(val){
				this.tizhong=val;
			},
			getShangzhuang(val){
				this.shangzhuang=val
			},
			getXiazhuang(val){
				this.xiazhuang=val;
			},
			getJian(val){
				this.jian=val;
			},
			getXiong(val){
				this.xiong=val;
			},
			getYao(val){
				this.yao=val;
			},
			getTun(val){
				this.tun=val;
			},
            validCheckCount(arr,count){
            if (arr.length>(count||arr.length)) {
                arr.pop();
                layer.open({
                    content: "最多选择"+count+"个",
                    skin: 'msg',
                    time: 2
                });
            }
        },
	        commitData(){
	        	var that=this;
	        	var validate=true;
	        	$(".cheackempty").siblings("p").css("color","#fff");
	        $.each($(".cheackempty"),function(index,item){
	        	var itemval=$(item).html();
	        	if(itemval==""|| itemval =="[]"){
	        		layer.open({content: $(item).attr("data-type"),skin: 'msg',time: 2});
	        		$(item).siblings("p").css("color","red");
	        		validate=false;
	        		  return false;
	        	}
	        	
	        })
	        if(!validate)return;
	        	$.fashion.validate(that,{login:true},function(){
			        $.ajax({
						type: 'post',
						url:types.COMMITSTYLETEST,
						data: that.finallydata,
						success: function(data) {
							if(data.ResultType == 3) {
 								that.commitDetailTestData();
							}else if(data.ResultType == 6){
										$.fashion.tip({
										content: data.Message,
										ok: function() {
											that.$router.replace({
												path: '/login',
												query: {
													orgpath: that.$route.fullPath
												}
											})
										}
									   });
							}else{
								layer.open({content: data.Message,skin: 'msg',time: 2});
							}
						}
					})
	        	})
	        },
	        commitDetailTestData(){
	        	var that=this;
	        	  $.ajax({
						type: 'post',
						url:types.COMMITSTYLEDETAILSTEST,
						data: {
						     	MemberId: localStorage.MemberId,
								U_Num: localStorage.u_num,
								dicJson:JSON.stringify(that.finallyDeatiltest)
						},
						success: function(data) {
							if(data.ResultType == 3) {
								   layer.open({content:"提交成功",skin: 'msg',time: 2});
									window.localStorage.tixing= that.Tixing;
									console.log("风格测试",localStorage.tixing);
									window.localStorage.setItem('isTest', true);
									that.$router.replace({
												path: '/CeshiReport',
											})
							}else if(data.ResultType == 6){
										$.fashion.tip({
										content: data.Message,
										ok: function() {
											that.$router.replace({
												path: '/login',
												query: {
													orgpath: that.$route.fullPath
												}
											})
										}
									   });
							}else{
								layer.open({content: data.Message,skin: 'msg',time: 2});
							}
						}
					})
	       },
//          ckchange(mkey,newArr){
//      	this[mkey]=newArr;
//      },
//			selectColor(thiscolor,cname){
//				var that=this;
//				var $this=$(thiscolor);
//			    var colorlength=that.colorCheack.length;
//					if(colorlength>3){
//					layer.open({
//						content: "最多选择3种颜色",
//						skin: 'msg',
//						time: 2
//					});
//					$this.prop("checked",false);
//					that.colorCheack.splice(colorlength-1,1);
//					return
//					}
//					if($this[0].checked) {
//						$this.siblings("div").children("span").addClass("active");
//					} else {
//						$this.siblings("div").children("span").removeClass("active");
//					}
//			
//					
//			},
			getColor() {
				var that = this;
				$.ajax({
					type: "post",
					url: types.GETPRODUCT_COLORLIST,
					data: {

					},
					success: function(data) {
						if(data.ResultType == '3') {
							var data = data.Data;
							that.colorarr=data;
						}
					}
				});
			}
		},
		components: {
			'swierbrith': swierbrith,
			'swipershengao': swipershengao,
			'swipertizhong': swipertizhong,
			'swipershagnzhuang': swipershagnzhuang,
			'swiperxiazhuang': swiperxiazhuang,
			'swiperjian': swiperjian,
			'swiperxiong': swiperxiong,
			'swiperyao': swiperyao,
			'swipertun': swipertun,
//			'cktemp':cktemp,
		}

	}
</script>

<style scoped>
	
</style>