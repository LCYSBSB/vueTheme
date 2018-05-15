(function($) {
	;$.notification = (function() {
		var self = this;
		$.connection.hub.url = "";
		var autonotificationhub = $.connection.apiMemberHub;
		var server = autonotificationhub.server;
		function _start(MemberId){
			$.connection.hub.start().done(function() {
				server.flushSocketLink(MemberId);
			});
		}
		let _ind =1;
		let skipReconnect = false;
		
		self.start = function(){
			skipReconnect = false;
			let MemberId = localStorage.MemberId;
			$.connection.hub.start().done(function() {
				server.flushSocketLink(MemberId);
			});
			
			$.connection.hub.reconnected(function() {
				!skipReconnect && server.flushSocketLink(MemberId);
			});

			$.connection.hub.disconnected(function() {
				!skipReconnect && setTimeout(function() {_start(MemberId)}, 10000);
			});
		};
		
		
		self.stop=function(){
			skipReconnect = true;
			$.connection.hub.stop();
		};

		autonotificationhub.client.GetNoti = function(data) {
			self.GetNoti(data);
		};

		autonotificationhub.client.GetUUID=function(uuid){
			_flushUUID(uuid,60*3-20);
		};

		//接收到消息【可重写】
		self.GetNoti = function(data) {
			//console.log(data);
		}
		
		var _interflushUUID=null;
		
		//获取确认登录所需uuid,并定时刷新
		function _flushUUID(uuid,timegap){
			_interflushUUID && clearInterval(_interflushUUID);
			_interflushUUID = setInterval(function() {
				if($.signalR.hub.state==$.signalR.connectionState.connected){
					server.flushSocketLink(localStorage.MemberId);
				}else{
					clearInterval(_interflushUUID);
				}
			}, timegap*1000);
			self.onUUIDChange(uuid);
		}
		
		//接收到消息【可重写】
		self.onUUIDChange=function(uuid){
			console.log(uuid);
		};
		
		//发送消息到AdminId
		self.SendNoti = function(AdminId, jsonContent) {
			server.sendNoti(AdminId, jsonContent);
		}
		return self;
	})();
	
	//pos机登录本人认证
	;$.notification.denglu = function(num) {
		var host = "";
		$.ajax({
			type: "post",
			url: host + "/api/members/member/confirmlogin",
			data: {
				MemberId: localStorage.MemberId,
				U_Num: localStorage.u_num,
				isConfirm: num
			},
			success: function(da) {
				if(da.ResultType==3){
					$.fashion.tip(num?"已确认":"已取消");
				}else{
					$.fashion.tip("操作失败,"+da.Message);
				}
			},
			error:function(){
				$.fashion.tip("网络异常,稍后重试");
			}
		});
	}
	$.notification.GetNoti = function(data) {
		var send = data.context;
		var x=e.page
		if(send == 'CONFIRM_LOGIN') {
			$.fashion.tip({
				content: '请确认是否本人操作？',
				ok: function() {
					$.notification.denglu(1);
				},
				no: function() {
					$.notification.denglu(0);
				}
			});
		}
	};
	
})(jQuery);