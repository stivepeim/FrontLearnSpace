define(function(require, exports, module){
	var $ = require('jquery'),
		venus = require('venus'),
		ui = require('ui'),
		container = document.getElementById("container");
		
	/**
	 * 图表实例
	 * @public method:
	 *		run()
	 *		reander(startTime, endTime)
	 */
	var svg = {
		lineData: [],
		lineTicks: [],
		timeDiff: {},
		//default option
		lineOption : {
			width: 700,
			height: 400,
			axis: {
				x: {
					opposite: false,
					tickWidth: 70,
					ticks: ['1', '2', '3', '4', '5', '6',7,8,9,10]
				},
				y: {
					min: 0
				}
			},
			icons: {
				0: 'circle'
			},
			line: {
				smooth: true,
				dotRadius: 5
			},
			grid: {}
		},
		//get data from mysql
		_getData : function(callback){
			var self = this;
			
			$.post("api_get_user_total.php", self.timeDiff, function(res){
				var data = $.parseJSON(res);
				callback && callback(data);
			});
		},
		//set options
		_setData: function(data){
			var self = this,
				arr = [],
				time = [];
				
			data.forEach(function(l, i){
				time.push(l.time);
				arr.push(l.total);
			});
			self.lineData = [{name: 0, data: arr}];
			self.lineOption.width = arr.length * 70;
			self.lineOption.axis.x.ticks = time;	
		},
		//print to screen
		_show: function(){
			var self = this;
			container.innerHTML = '';
			new Venus.SvgChart(container, self.lineData, self.lineOption);
		},
		run: function(){
			var self = this,
			cb = function(data){
				self._setData(data);
				self._show();
			}
			
			this._getData(cb);
		},
		render: function(startTime, endTime){
			this.timeDiff.startTime = startTime || '';
			this.timeDiff.endTime = endTime || '';
			this.run();
		}
	};	
	exports.svg = svg;
	
});
