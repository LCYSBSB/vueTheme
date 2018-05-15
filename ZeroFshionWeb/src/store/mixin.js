export default {
	methods: {
		layerToast(msg) {
			layer.open({
				content: msg,
				skin: 'msg',
				time: 2,
				end: function() {
					layer.closeAll();
				}
			});
		}
	}
}