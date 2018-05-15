<template>
	<div>
		<div class="topicBox">
			<!--alldata:{{allData}}-->
			<p class="headline">1.{{option1.Title}}</p>
			<div class="cheackempty" v-show="false" :data-type="'请选择'+option1.Title">{{q1}}</div>
			<div class="selectradioBox" v-for="(item,index) in option1.Options">
				<div class="selectradio">
					<input type="radio" v-model="q1" :value="item.Value" :id="'feel-'+index">
					<div class="user-defined">
						<span class="circle" :class="q1.indexOf(item.Value)>-1?'active':''"></span>
					</div>
					<label :for="'feel-'+index">{{item.Title}}</label>
				</div>
			</div>
			<div class="mark">
				<textarea v-model="mark1" placeholder="您想表达什么" rows="6" cols="10"></textarea>
			</div>
		</div>
		<div class="topicBox">
			<!--alldata:{{allData}}-->
			<p class="headline">2.{{option2.Title}}</p>
			<div class="cheackempty" v-show="false" :data-type="'请选择'+option2.Title">{{q2}}</div>
			<div class="selectradioBox" v-for="(item,index) in option2.Options">
				<div class="selectradio">
					<input type="radio" v-model="q2" :value="item.Value" :id="'cloth-'+index">
					<div class="user-defined">
						<span class="circle" :class="q2.indexOf(item.Value)>-1?'active':''"></span>
					</div>
					<label :for="'cloth-'+index">{{item.Title}}</label>
				</div>
			</div>
			<div class="mark">
				<textarea v-model="mark2" placeholder="您想表达什么"></textarea>
			</div>
		</div>
		<div class="topicBox">
			<!--alldata:{{allData}}-->
			<p class="headline">3.{{option1.Title}}</p>
			<div class="cheackempty" v-show="false" :data-type="'请选择'+option3.Title">{{q3}}</div>
			<div class="selectradioBox" v-for="(item,index) in option3.Options">
				<div class="selectradio">
					<input type="radio" v-model="q3" :value="item.Value" :id="'three-'+index">
					<div class="user-defined">
						<span class="circle" :class="q3.indexOf(item.Value)>-1?'active':''"></span>
					</div>
					<label :for="'three-'+index">{{item.Title}}</label>
				</div>
			</div>
		</div>
		<div class="topicBox">
			<!--alldata:{{allData}}-->
			<p class="headline">4.{{option4.Title}}</p>
			<div class="cheackempty" v-show="false" :data-type="'请选择'+option4.Title">{{q4}}</div>
			<div class="selectradioBox" v-for="(item,index) in option4.Options">
				<div class="selectradio">
					<input type="radio" v-model="q4" :value="item.Value" :id="'four-'+index">
					<div class="user-defined">
						<span class="circle" :class="q4.indexOf(item.Value)>-1?'active':''"></span>
					</div>
					<label :for="'four-'+index">{{item.Title}}</label>
				</div>
			</div>
		</div>
		<div class="topicBox">
			<!--alldata:{{allData}}-->
			<p class="headline">5.{{option5.Title}}</p>
			<div class="cheackempty" v-show="false" :data-type="'请选择'+option5.Title">{{q5}}</div>

			<div class="selectradioBox" v-for="(item,index) in option5.Options">
				<div class="selectradio">
					<input type="checkbox" v-model="q5" :value="item.Value" :id="'five-'+index">
					<div class="user-defined">
						<span class="circle" :class="q5.indexOf(item.Value)>-1?'active':''"></span>
					</div>
					<label :for="'five-'+index" v-model="mark5">{{item.Title}}</label>
				</div>
			</div>
			<div class="mark">
				<textarea v-model="mark5" placeholder="您想表达什么"></textarea>
			</div>
		</div>
		<div class="topicBox">
			<!--alldata:{{allData}}-->
			<p class="headline">6.{{option6.Title}}</p>
			<div class="cheackempty" v-show="false" :data-type="'请选择'+option6.Title">{{q6}}</div>

			<div class="selectradioBox" v-for="(item,index) in option6.Options">
				<div class="selectradio">
					<input type="checkbox" v-model="q6" :value="item.Value" :id="'six-'+index">
					<div class="user-defined">
						<span class="circle" :class="q6.indexOf(item.Value)>-1?'active':''"></span>
					</div>
					<label :for="'six-'+index">{{item.Title}}</label>
				</div>
			</div>
		</div>
		<div class="topicBox">
			<!--alldata:{{allData}}-->
			<p class="headline">7.{{option7.Title}}</p>
			<div class="cheackempty" v-show="false" :data-type="'请选择'+option7.Title">{{q7}}</div>

			<div class="selectradioBox" v-for="(item,index) in option7.Options">
				<div class="selectradio">
					<input type="radio" v-model="q7" :value="item.Value" :id="'seven-'+index">
					<div class="user-defined">
						<span class="circle" :class="q7.indexOf(item.Value)>-1?'active':''"></span>
					</div>
					<label :for="'seven-'+index">{{item.Title}}</label>
				</div>
			</div>
			<div class="mark">
				<textarea v-model="mark7" placeholder="评价留言"></textarea>
			</div>
		</div>
		<div @click="commited" class="sure">确定</div>
	</div>
</template>

<script>
	import types from "@/store/types.js"
	export default {
		data() {
			return {
				option1: [],
				option2: [],
				option3: [],
				option4: [],
				option5: [],
				option6: [],
				option7: [],
				q1: [],
				q2: [],
				q3: [],
				q4: [],
				q5: [],
				q6: [],
				q7: [],
				mark1: '',
				mark2: '',
				mark5: '',
				mark7: '',
				projectNum:null,
				productNum:null,
			}
		},
		created: function() {
				this._getLess("components","topic");
			
//		   require("@/template/"+this.templates+"/components/topic/index.less");
		},
		computed: {
			allData: function() {
				var that = this;
				var  alldata = [{
					"ProductNumber": that.productNum, 
					'CheckOptions': [{
							'OptionId': 1,
							'Checked': [that.q1],
							'Remarks': that.mark1,
						},
						{
							'OptionId': 2,
							'Checked': [that.q2],
							'Remarks': that.mark2,
						},
						{
							'OptionId': 3,
							'Checked': [that.q3],
						},
						{
							'OptionId': 4,
							'Checked': [that.q4],
						},
						{
							'OptionId': 5,
							'Checked': that.q5,
							'Remarks': that.mark5,
						},
						{
							'OptionId': 6,
							'Checked': that.q6,
						},
						{
							'OptionId': 7,
							'Checked': [that.q7],
							'Remarks': that.mark7,
						},
					]
				}]
				return JSON.stringify(alldata);
			}
		},
		mounted() {
			this.getOption();
			this.getParm();
		},
		methods: {
			getParm(){
					this.projectNum = this.$route.query.projectNum;
					this.productNum=this.$route.query.productNum;
			},
			getOption() {
				var self = this;
				$.ajax({
					type: 'post',
					url: types.GRTOPTIONS,
					data: {
						MemberId: localStorage.MemberId,
						U_Num: localStorage.u_num
					},
					success: function(data) {
						if(data.ResultType == 3) {
							$.each(data.Data, function(index, item) {
								var option = "option" + parseInt(index + 1) + "";
								self[option] = item;
							});
						}
					}
				})
			},
			commited() {
				var that = this;
				var validate = true;
				$(".cheackempty").siblings("p").css("color", "#fff");
				$.each($(".cheackempty"), function(index, item) {
					var itemval = $(item).html();
					if(itemval == "" || itemval == "[]") {
						layer.open({
							content: $(item).attr("data-type"),
							skin: 'msg',
							time: 2
						});
						$(item).siblings("p").css("color", "red");
						validate = false;
						return false;
					}

				})
				if(!validate) return;
				$.fashion.validate(that, {
					login: true
				}, function() {
					$.ajax({
						type: 'post',
						url: types.SUBMITFEEDBACKS,
						data: {
							MemberId:localStorage.MemberId,
				            U_Num:localStorage.u_num,
							appointmentNumber:that.projectNum,
							feedbacks:that.allData, 
						},
						success: function(data) {
							if(data.ResultType == 3) {
								window.history.go(-1);
							}else{
								$.fashion.tip(data.Message)
							}
						}
					})
				})

			}
		}
	}
</script>

