
// Launch the Mobile Report Method

(function mobileReport($){

	// console.log('attempting to launch the Mobile Report');
	// console.log('checking data from ' + _from + ' to ' + _to);

	if(true) {
		window.analytics.reporting.checkValidPage();
	}

	var _pageName = analytics.reporting.checks.validPage;
	var encodePage = encodeURI(_pageName);

	// content tracking demo report PARAMS
	var technology_report = { 
		"reportDescription":{
			"reportSuiteID":"autodesk-new-gl",
	     // now handled at Report Run
	     //   "dateFrom" : _from,
	     //   "dateTo" : _to,
	        "elements":[
	            { 
	            	"id" : "page" //,
	            //	"selected": [_pageName] //[encodePage]
	        	},
	        	{
	        		"id" : "mobileDeviceType",
	        		"top": 10 //,
            		// "everythingElse": true
	        	},
	        	{
	        		"id" : "browser",
	        		"top": 10 // ,
            		// "everythingElse": true
	        	}
	        ],
	        // no selections here
	        "metrics": [
		        {
		        	'id' : 'visitors' 
		        },{
		        	'id' : 'pageviews' 
		        }
	        ],
	        "segments":[
			    {
			        "container":{
			           "type":"hits",
			           "rules":[
			              {
			                 "name":"Page",
			                 "element":"page",
			                 "operator":"equals",
			                 "value":_pageName
			              }
			           ]
			        }
			    }
			]
	    }
	};

	// CALLBACK method

	var processData = function(options, theData){
			
		try {

			var errorCloser = false;

			var rData = theData;
			// var rData = analytics.reporting.datasets['wafer-technology-report']['data'];

			var realData = rData['data'][0];
			var elements = rData['elements'];
			var metrics = rData['metrics'];
			var totals = realData['counts'];

			// console.log('real Data');
			// console.log(realData);
			// console.log('elements');
			// console.log(elements);
			// console.log('metrics');
			// console.log(metrics);
			// console.log('totals');
			// console.log(totals);

			var metricsMap = {};

			$.each(metrics, function(index,metData){
				metricsMap[index] = metData['name'];
			});

			var finalData = {};

			// highest level
			$.each(metrics, function(index,met){
				finalData[met['name']] = 0;
			});
			$.each(totals, function(x,num){

				var which = metricsMap[x];
				// console.log(x + ' --> ' + num);
				// console.log('this metric: ' + which + ' is ' + num);

				finalData[which] = parseInt(num);
			});

			// process the elements
			finalData['Device'] = {};

			var breakdown = realData['breakdown'];
			$.each(breakdown, function(ind,data){
				// console.log('in the BREAKDWON');
				// console.log(data);

				finalData['Device'][data['name']] = {};
				var fD = finalData['Device'][data['name']];
				$.each(metrics, function(index,met){
					fD[met['name']] = 0;
				});

				// console.log('processing TOTALS');
				var totalsData = data['counts'];
				$.each(totalsData, function(x,num){
					// console.log(x + ' -> ' + num);
					var which = metricsMap[x];
					fD[which] = parseInt(num);
					// finalData[which] = parseInt(finalData[which]) + parseInt(num);
				});

				fD['breakdown'] = {};
				var breakData = fD['breakdown']; 
				var furtherBreak = data['breakdown'];
				$.each(furtherBreak, function(n,browser){
					//// console.log(browser);
					breakData[browser['name']] = {};
					var bN = breakData[browser['name']];

					$.each(metrics, function(index,met){
						bN[met['name']] = '';
					});

					var theData = browser['counts'];
					$.each(theData, function(x,num){
						var which = metricsMap[x];
						bN[which] = parseInt(num);
					});
					
				});
		
			});

			// console.log(finalData);
			
			// Cleanup and Process data into more finalized format

			var renderData = {};
			var totalCount = '';

			function cleanDeviceType(device){
				switch(device) {
					case 'Other' :
						return 'Desktop';
						break;
					case 'Mobile Phone' :
						return 'Mobile';
						break;
					case 'Tablet' :
						return 'Tablet';
						break;
					default :
						return 'Other';
						break;
				}
			};

			renderData['total'] = finalData['Page Views'];
			totalCount = finalData['Page Views'];

			$.each(finalData['Device'], function(device,data){

				var finalDevice = cleanDeviceType(device);

				if (typeof renderData[finalDevice] === 'undefined') {
					renderData[finalDevice] = {};
					renderData[finalDevice]['total'] = 0;
					renderData[finalDevice]['breakdown'] = {};
				}

				var total = parseInt(data['Page Views']);
				renderData[finalDevice]['total'] = parseInt(renderData[finalDevice]['total']) + total;
					
				var deviceBreak = data['breakdown'];

				$.each(deviceBreak, function(brow, dat){

					if (typeof renderData[finalDevice]['breakdown'][brow] === 'undefined') {
						renderData[finalDevice]['breakdown'][brow] = 0;
					}

					var thisTotal = parseInt(dat['Page Views']);
					renderData[finalDevice]['breakdown'][brow] = parseInt(renderData[finalDevice]['breakdown'][brow]) + thisTotal;

				});

			});

			var hcSeries = {
				'name' : 'Device Type',
	            'colorByPoint' : true,
	            'type' : 'bar',
	            'data' : []
			};

			var hcDrillDown = [];

			function getColorForDevice(device){
				switch(device) {
					case 'Desktop' :
						return '#04628d';
						break;
					case 'Mobile' :
						return '#0696D7';
						break;
					case 'Tablet' :
						return '#30bbf9';
						break;
					default :
						return 'gray';
						break;
				}
			};

			var seriesSortObj = {};

			$.each(renderData, function(device,data){

				if (device !== "total") {
					var allTotal = renderData['total'];
					var total = data['total'];
					var Fpercent = ((total / allTotal) * 100).toFixed(1);
					// console.log(device + ' = ' + total + ' ... ' + Fpercent + '%');

					var deviceBreak = data['breakdown'];
					var color = getColorForDevice(device);

					var firstLevel = {
						'name': device,
						'color' : color,
		                'y': total,
		                'perc' : Fpercent,
		                'drilldown': device,
		                'type' : 'bar'
					};

					seriesSortObj[device] = total;
					hcSeries['data'].push(firstLevel);

					var drillLevel = {
						'name' : device,
			            'id' : device,
			            'type' : 'bar',
			            'plotOptions' : {
			            	'column' : {
				                'grouping' : false
				            },
				            'series' : {
				                'dataLabels' : {
				                    'enabled' : true,
				                }
				            },
					      //  'xAxis' : {
					      //  	'categories' : []
					      //  }
				        },
						'data' : []
					};

					var drillCounter = 0;
					var drillSortObj = {};
					$.each(deviceBreak, function(brow, dat){
						drillCounter += 1;
						var thisTotal = dat;
						var percent = ((thisTotal / total) * 100).toFixed(1);
						// console.log('  > ' + brow + ' = ' + thisTotal + ' ... ' + percent + '%');
						//var drillData = [ brow, dat ];
						var drillData = {
							'name': brow,
		                	'y': dat,
		                	'perc' : percent
						}
						// drillLevel['plotOptions']['xAxis']['categories'].push(brow);
						drillLevel['data'].push(drillData);
						drillSortObj[brow] = dat;
					});

					var drillSortArr = [];
					for (var drill in drillSortObj) {
						drillSortArr.push([drill, drillSortObj[drill]]);
						drillSortArr.sort(function(b, a) {return b[1] - a[1]});
						// seriesSortArr.sort(function(a, b) {return b[1] - a[1]});
					}
					    
					//	// console.info("DRILL SERIES SORT!!!");
					//	// console.info(drillSortArr);

					// reset the data for Navigation Series (index 4)
					var newDataSet = [];
					// var axisLabels = [];		
					var finalDrillSeries = (function(){
						var navSet = drillLevel['data'];
						$.each(drillSortArr, function(ind,obj){
							var checker = obj[0];
							$.each(navSet, function(indx, objD) {
								if (checker === objD['name']) {
									newDataSet.push(objD);
								//	axisLabels.push(objD['altName']);
								}
							});
						});
					})();
					drillLevel['numberOfRecords'] = drillCounter;
					drillLevel['data'] = newDataSet;

					hcDrillDown.push(drillLevel);
				}

			});

			var seriesSortArr = [];
			for (var series in seriesSortObj) {
				seriesSortArr.push([series, seriesSortObj[series]]);
				seriesSortArr.sort(function(b, a) {return b[1] - a[1]});
				// seriesSortArr.sort(function(a, b) {return b[1] - a[1]});
			}
			    
				// console.info("SERIES SORT!!!");
				// console.info(seriesSortArr);

			// reset the data for Navigation Series (index 4)
			var newDataSet = [];
			// var axisLabels = [];		
			(function(){
				var indSet = hcSeries['data'];
			//	// console.log("Ind Set!");
			//	// console.log(indSet);
				$.each(seriesSortArr, function(ind,obj){
					var checker = obj[0];
					$.each(indSet, function(indx, objD) {
						if (checker === objD['name']) {
							// // console.log('pushing this obj:');
							// // console.log(objD);
							newDataSet.push(objD);
						 	
						}
					});
				});
			})();
			// hcDrillDown[saveNavIndex]['data'] = newDataSet;
			hcSeries['data'] = newDataSet;

			// now that the Render Data is Ready, build the Highchart...

			// console.log("got here with the MOBILE Request");

			// console.log(renderData);

			function numberWithCommas(x) {
			    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}

			var totCount = numberWithCommas(totalCount);

			var yAxisTitle = '<div><b><div style="text-align:center;padding:2px;">Page Views</div></b>' +
				'<div style="text-align:left;font-size:90%;"><b>' + totCount + '</b> in total</div></div>'; 

			var titleVal = window.analytics.reporting.types[options['id']]['temp-title'];

			var reportObj = window.analytics.reporting.types['wafer-mobile-report'];

			var highChartsDetails = {
		        chart: {
		         //   type: 'pie',
		            plotBackgroundColor: null,
	            	plotBorderWidth: null,
	            	plotShadow: false,
					events: {
		                drilldown: function (data) {
		                	
		                	// console.log('highcharts data');
		                	// console.log(data);
		                	//// console.log('highcharts object');
		                	//// console.log(this);
		                	
		                	var whichDrill = data.seriesOptions['id'];
		                	var howMany = data.seriesOptions['numberOfRecords'];
		                	var newTitleVal = 'Top ' + howMany + ' Browsers for ' + whichDrill
		                		+ ' - ' + window.analytics.reporting.types[options['id']]['title-range'];
		                	
		                	this.setTitle({
		         				useHTML: true,
		            			text: '<div style="font-family:Artifakt-book"><i class="fa fa-laptop" style="font-family:FontAwesome" aria-hidden="true"></i> ' + newTitleVal + '</div>'
		            		}, { 
		            			'text' : '' 
		            		});

		                },
		                drillup: function () {
		         			
		         			// // console.log('highcharts object');
		                	// // console.log(this);

		         			this.setTitle({
		         				useHTML: true,
		            			text: '<div style="font-family:Artifakt-book"><i class="fa fa-laptop" style="font-family:FontAwesome" aria-hidden="true"></i> ' + titleVal + '</div>'
		            		},{
					            text: 'Click the blue bars to view more details.'
					        });

		                }
		            }
		        },
		        title: {
		        	useHTML: true,
		            text: '<div style="font-family:Artifakt-book"><i class="fa fa-laptop" style="font-family:FontAwesome" aria-hidden="true"></i> ' + titleVal + '</div>'
		        },
		        subtitle: {
		            text: 'Click the blue bars to view browser details.'
		        },
		        plotOptions: {
		            bar: {
		            	cursor: 'pointer',
		                dataLabels: {
		                	enabled: true,
		                    format: '{point.perc:,.1f}%'
		                },
	                    showInLegend: false
		            }
		        },
		        xAxis: {
	                type: 'category',
		           /*	labels: {
		               enabled: true,
			            formatter: function() {
			            	// console.log('highChart altName: ' + this.altName);
							return this.altName;
						}
		            },*/
		            title: {
		                text: ''
		            }
		        },
		        yAxis: {
		            labels: {
		                enabled: true
		            },
		            title: {
		            	useHTML: true,
		                text: yAxisTitle
		            }
		        },
		        credits: {
		        	enabled: true,
		        	// text: "Alec hiiii",
		        	text: 'Data is from ' + reportObj['fromDate'] + 
		        		" to " + reportObj['toDate'] +
		        		' for page ' + window.analytics.reporting.checks.validPage,
		        	// href: "http://www.highcharts.com",
		        	position: {
		        		align: "right",
		        		x: -10,
		        		verticalAlign: "bottom",
		        		y: -5
		        	},
		        	style: {
		        		cursor: "pointer",
		        		color: "#909090",
		        		fontSize: "9px"
		        	}
		        },
		        tooltip: {
		            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
		            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.perc:,.1f}%</b> ({point.y} Page Views)<br/>'
		        },
		        series: [ hcSeries ],
		        drilldown: {
		            series: hcDrillDown
		        }
		    };

			// END Highchart build, now RENDER!!

		}
	    catch(err) {

	    	console.log('error processing report data');
	    	console.log(err);
	    	var highChartsDetails = 'bad-data';
	    	errorCloser = '#' + options['id']; 
	    }
		
		window.analytics.reporting.renderData(options, highChartsDetails, errorCloser);

	};

	// end Callback

	// end Callback
	var _id = 'wafer-mobile-report';
	var thisOne = window.analytics.reporting.types[_id];
	var isLaunched = thisOne['launched'];
	if (!isLaunched) {
		window.analytics.reporting.deployReport(_id, technology_report, processData);
		thisOne['launched'] = true;
		var msg = "track-report-launch=" + _id;
		window.postMessage(msg,document.location.href);
	} else {
		// console.log('already launched the Mobile Report');
	}

})(jQuery);