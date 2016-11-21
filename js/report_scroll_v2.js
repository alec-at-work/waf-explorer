
// Launch the Scrolling Report

(function scrollReport($){

	// console.log('attempting to launch the Scrolling Report');

	var _from = window.analytics.reporting.options.fromDate;
	var _to = window.analytics.reporting.options.toDate;
	var days = window.analytics.reporting.options.daysReporting;

	// console.log('checking data from ' + _from + ' to ' + _to);

	if(true) {
		window.analytics.reporting.checkValidPage();
	}

	var _pageName = analytics.reporting.checks.validPage;
	var encodePage = encodeURI(_pageName);

	// content tracking demo report PARAMS
	var scroll_report = { 
		"reportDescription":{
			"reportSuiteID":"autodesk-new-gl",
	        "dateFrom" : _from,
	        "dateTo" : _to,
	        "elements":[
	        	{
	        		"id" : "prop14",
	        	//	"name":"c14 - Percentage of Page Viewed",
	        	//	"classification" : encodeURI("(c14) - Max Percentage of Page Viewed Report"),
	        		"top": 5000,
            		"everythingElse": true
	        	}
	        	/*
		        	,
		        	{
		        		"id" : "browser",
		        		"top": 10 // ,
	            		// "everythingElse": true
		        	}
		        */
	        ],
	        // no selections here
	        "metrics": [
		        {
		        	'id' : 'pageviews' 
		        }
	        ],
	        "segments":[
			    {
			        "container":{
			           "type":"hits",
			           "rules":[
			              {
			                 "name":"c24 - Previous Page",
			                 "element":"prop24",
			                 "operator":"equals",
			                 "value":_pageName
			              },
			              {
			                 "name":"c14 - Percentage of Page Viewed",
			                 "element":"prop14",
			                 "operator":"contains",
			                 "value":"|"
			              }
			           ]
			        }
			    }
			]
	    }
	};

	// CALLBACK method

	var scrollGroups = {
		'0-10' : 0,
		'11-20' : 0,
		'21-30' : 0,
		'31-40' : 0,
		'41-50' : 0,
		'51-60' : 0,
		'61-70' : 0,
		'71-80' : 0,
		'81-90' : 0,
		'91-99' : 0,
		'100' : 0,
		'total' : 0	
	};

	var scrollTotals = {
		'0-10' : 0,
		'11-20' : 0,
		'21-30' : 0,
		'31-40' : 0,
		'41-50' : 0,
		'51-60' : 0,
		'61-70' : 0,
		'71-80' : 0,
		'81-90' : 0,
		'91-99' : 0,
		'100' : 0
	};

	var processData = function(options, theData){
			
		try {

			var errorCloser = false;

			var rData = theData;
			console.log('SCROLL DATA');
			console.log(rData);
			// var rData = analytics.reporting.datasets['wafer-scroll-report']['data'];

			var realData = rData['data'];
			var elements = rData['elements'];
			var metrics = rData['metrics'];
			var totals = rData['totals'][0];

			console.log('real Data');
			console.log(realData);
			console.log('elements');
			console.log(elements);
			console.log('metrics');
			console.log(metrics);
			console.log('totals');
			console.log(totals);

			scrollGroups['total'] = parseInt(totals);

			var runningTotal = 0;

			$.each(realData, function(ind,dat){
			//	console.log("index " + ind);
			//	console.log(dat);
				var depth = ((dat['name']).split('|'))[0];
				var count = dat['counts'][0];

			//	console.log(depth + " = " + count);

				var moveInt = parseInt(depth);
				var cnt = parseInt(count);
				if (moveInt >= 0 && moveInt <= 10) scrollGroups['0-10'] += cnt;
				if (moveInt >= 11 && moveInt <= 20) scrollGroups['11-20'] += cnt;
				if (moveInt >= 21 && moveInt <= 30) scrollGroups['21-30'] += cnt;
				if (moveInt >= 31 && moveInt <= 40) scrollGroups['31-40'] += cnt;
				if (moveInt >= 41 && moveInt <= 50) scrollGroups['41-50'] += cnt;
				if (moveInt >= 51 && moveInt <= 60) scrollGroups['51-60'] += cnt;
				if (moveInt >= 61 && moveInt <= 70) scrollGroups['61-70'] += cnt;
				if (moveInt >= 71 && moveInt <= 80) scrollGroups['71-80'] += cnt;
				if (moveInt >= 81 && moveInt <= 90) scrollGroups['81-90'] += cnt;
				if (moveInt >= 91 && moveInt <= 99) scrollGroups['91-99'] += cnt;
				if (moveInt == 100) scrollGroups['100'] += cnt;
					
				if (moveInt >= 0) scrollTotals['0-10'] += cnt;
				if (moveInt >= 11) scrollTotals['11-20'] += cnt;
				if (moveInt >= 21) scrollTotals['21-30'] += cnt;
				if (moveInt >= 31) scrollTotals['31-40'] += cnt;
				if (moveInt >= 41) scrollTotals['41-50'] += cnt;
				if (moveInt >= 51) scrollTotals['51-60'] += cnt;
				if (moveInt >= 61) scrollTotals['61-70'] += cnt;
				if (moveInt >= 71) scrollTotals['71-80'] += cnt;
				if (moveInt >= 81) scrollTotals['81-90'] += cnt;
				if (moveInt >= 91) scrollTotals['91-99'] += cnt;
				if (moveInt == 100) scrollTotals['100'] += cnt;

				runningTotal += cnt;

			});

			scrollGroups['missing'] = parseInt(parseInt(totals) - parseInt(runningTotal));
			scrollTotals['missing'] = parseInt(parseInt(totals) - scrollTotals['100']);

			console.log('scrollGroups data');
			console.log(scrollGroups);

			console.log('scrollTotals data');
			console.log(scrollTotals);

			/*

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
		        	text: 'Data is from ' + _from + 
		        		" to " + _to +
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

			*/
			// END Highchart build, now RENDER!!

		}
	    catch(err) {

	    	// console.log('error processing report data');
	    	var highChartsDetails = 'bad-data';
	    	errorCloser = '#' + options['id']; 
	    }
		
		window.analytics.reporting.renderData(options, highChartsDetails, errorCloser);

	};

	// end Callback

	// end Callback
	var _id = 'wafer-scroll-report';
	var thisOne = window.analytics.reporting.types[_id];
	var isLaunched = thisOne['launched'];
	if (!isLaunched) {
		window.analytics.reporting.deployReport(_id, scroll_report, processData);
		thisOne['launched'] = true;
		var msg = "track-report-launch=" + _id;
		window.postMessage(msg,document.location.href);
	} else {
		// console.log('already launched the Mobile Report');
	}

})(jQuery);