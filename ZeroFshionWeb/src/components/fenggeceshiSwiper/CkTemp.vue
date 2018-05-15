<template>
<div>
	<div class="selectradioDetails" v-for="(item,index) in odata">
		<input type="checkbox" v-model="cdatam" :value="item" :id="mname+'-'+index" >
		<div class="user-defined">
			<span class="circle" :class="cdatam.indexOf(item)>-1?'active':''"></span>
		</div>
		<label :for="mname+'-'+index">{{item}}</label>
	</div>
</div>
</template>

<script>
	export default{
		props:['odata','cdata','ckey','lcount','mname'],
		data(){
			return {
				cdatam:this.cdata,
			}
		},
		watch:{
			cdatam(val){
                this.validCheckCount(val,this.lcount);
			},
			cdata(val,oldval){
				this.cdata = val;
			}
		},
		methods:{
	        validCheckCount(arr,count){
	            if (arr.length>(count||arr.length)) {
	                arr.pop();
	                layer.open({
	                    content: "最多选择"+count+"个",
	                    skin: 'msg',
	                    time: 2
	                });
	            }
	            this.$emit("ckchange",this.mname,arr);
	        }
		}
	}
</script>

