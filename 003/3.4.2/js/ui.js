define(function(require, exports, module){
	var svg = require('svg'),
		$ = require('jquery'),
		startTimeValue = '',
		endTimeValue = '',
		_selectStartTime = $("#startTime"),
		_selectEndTime = $("#endTime");
	
	//日期事件绑定
	var bind = function(){
		startTimeValue = _selectStartTime.val();
		endTimeValue = _selectEndTime.val();
		console.log(startTimeValue);
		console.log(endTimeValue);
		if( Date.parse(startTimeValue) >= Date.parse(endTimeValue) ){
			alert('开始时间必须小于结束时间');
			return;
		}
		run();
	};
	var init = function(){
		$(function(){
			[_selectStartTime, _selectEndTime].forEach(function(item){
				item.on('change', bind);
			});
		});
	};
	
	//调用显示接口
	var run = function(){
		svg.svg.render(startTimeValue, endTimeValue);
	};
	
	//导出初始化
	exports.init = init;
});