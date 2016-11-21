
// Launch the NAVIGATION Report Method
(function NavReport($){

	// console.log('attempting to launch the Navigation Report');

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
	var nav_report = { 
		"reportDescription":{
			"reportSuiteID":"autodesk-new-gl",
	        "dateFrom" : _from,
	        "dateTo" : _to,
	        "elements": [
	        
	            {
	        		"id" : "trackingCode",
	        		"classification" : "(v0) Wafer categories",
	        		"top": 10 // ,
            		// "everythingElse": true
	        	},
	        	{ 
	            	"id" : "trackingCode",
	            	"top" : 15
	        	},
	        	{
	        		"id" : "trackingCode",
	        		"classification" : "(v0) Activity Name",
	        		"top": 1 // ,
            		// "everythingElse": true
	        	},
	        ],
	        // no selections here
	        "metrics": [
		        {
		        	'id' : 'cm1403_575aeaff408496f31ca5087d'  // custom v0 Instances
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
			
			window.navData = analytics.reporting.datasets['wafer-navigation-report']['data'];

			// console.log("nav Data Raw");
			// console.log(rData);

			var realData = rData['data'];
			var elements = rData['elements'];
			var metrics = rData['metrics'];
			var totals = rData['totals'];

			// reprocess the METRICS to handle custom ones
				// example - v0 Instances;
			// console.log('resetting metrics');
			$.each(metrics, function(i,d){
				let newID = d['id'];
				let newName = d['name'];
				switch(d['id']) {
					case 'cm1403_575aeaff408496f31ca5087d' :
						newID = 'instances';
						newName = 'Instances';
						break;
					default :
						break;
				}
				metrics[i]['id'] = newID;
				metrics[i]['name'] = newName;
			});

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
				//		// console.log(x + ' --> ' + num);
				//			// console.log('this metric: ' + which + ' is ' + num);

				finalData[which] = parseInt(num);
			});

			// process the elements
			finalData['Navigation'] = {};
	    
	    	// process the first ELEMENT - v0 Tracking Code...
			// var breakdown = realData['breakdown'];


			// console.log("HERES THE BREAKDOWN!!!");
			// // console.log(breakdown);

			$.each(realData, function(ind,data){

	 			var activity = data['name'];
	 			var needsBreak = false;

				switch(activity) {
					case '::unspecified::' :
					case 'Direct' :
						noBreak = true;
						break;
					case 'Organic' :
					case 'Referrer' :
					case 'Social Media' :
					case 'Email Referrer' :
					case 'Blog' :
					case 'Campaigns' :
						needsBreak = true;
						addNextLevel = true;
						break;
					default : 
						break;
				}	

				// for better label display
				// var altName = activity.substring(0,12) + '..';
				var altName = activity; //.substring(0,12) + '..';

				if (typeof finalData['Navigation'][activity] === "undefined") {
		      		finalData['Navigation'][activity] = {
		      			'altName' : altName
		      		};
		        	$.each(metrics, function(index,met){
		          		finalData['Navigation'][activity][met['name']] = data['counts'][index];
		        	});
		      	} 
				
				var fD = finalData['Navigation'][activity];	
		      	fD['breakdown'] = fD['breakdown'] || { };
	      
	      		//  // console.log('processing TOTALS');
				// var totalsData = data['counts'];
	      
				if (needsBreak) {
					$.each(data['breakdown'], function(indX, bObj){
						var breakName = bObj['name'];
						if (activity === "Campaigns") {
							if (typeof bObj['breakdown'][0]['name'] !== "undefined") {
								if (bObj['breakdown'][0]['name'] !== "::unspecified::") {
									breakName = breakName + ' (' + bObj['breakdown'][0]['name'] + ')';
								}
							}
						}
						var breakAlt = breakName.substring(0,12) + '..';
						fD['breakdown'][breakName] = {
							'altName' : breakAlt
						};
						var bN = fD['breakdown'][breakName];
						$.each(metrics, function(index,met){
							bN[met['name']] = bObj['counts'][index];
						});
					});	
				}
			});

		   // adjust totals and include "all remaining"
		   
		   /*
		    var tLS = finalData['Navigation'];
			var runningTotal = { };  
			$.each(metrics, function(index,met){  
		  		 runningTotal[met['name']] = 0;
		  	});
		    
		   	$.each(tLS, function(cat,set){
		      	$.each(metrics, function(index,met){  
		        	runningTotal[met['name']] = parseInt(runningTotal[met['name']]) + parseInt(set[met['name']]);
		      	});
		   	});
			
			// console.log(runningTotal);
		      
		   	var hasRemainders = false;
		   	var leftOvers = {};
		    $.each(metrics, function(index,met){  
		        var lefts = finalData[met['name']] - runningTotal[met['name']];
		        leftOvers[met['name']] =  lefts;
		        if (lefts > 0) {
		        	hasRemainders = true;
		        }
		    });
		      
		   	if (hasRemainders) {
			   	finalData['Navigation']['all others'] = { 'breakdown' : {},
			   		'altName' : 'all others' 
			   	};
		     	var aO = finalData['Navigation']['all others'];
		     	$.each(metrics, function(index,met){  
					aO[met['name']] = leftOvers[met['name']];
		      	});
		   	}
			*/

			// console.log(finalData);
			
			// Cleanup and Process data into more finalized format

			var renderData = {};

			renderData['totalInstances'] = finalData['Instances'];
			renderData['totalPageviews'] = finalData['Page Views'];
			renderData['nonInstances'] = finalData['Page Views'] - finalData['Instances'];

			$.each(finalData['Navigation'], function(navig,data){

			//	var finalDevice = cleanDeviceType(device);

				if (typeof renderData[navig] === 'undefined') {
					renderData[navig] = {};
					renderData[navig]['total'] = 0;
					renderData[navig]['breakdown'] = {};
					renderData[navig]['altName'] = data['altName'];
				}

				var total = parseInt(data['Instances']);
				renderData[navig]['total'] = parseInt(renderData[navig]['total']) + total;
					
				var indBreak = data['breakdown'];

				$.each(indBreak, function(camp, dat){

					if (typeof renderData[navig]['breakdown'][camp] === 'undefined') {
						renderData[navig]['breakdown'][camp] = 0;
					}

					var thisTotal = parseInt(dat['Instances']);
					renderData[navig]['breakdown'][camp] = thisTotal;
					if (thisTotal === 0) {
						delete renderData[navig]['breakdown'][camp];
					}

				});

				// reset the breakdown to cleanup non-v0 Instances
				// ... might be able to use this data for some other level of detail?
				if (renderData[navig]['total'] === 0) {
					delete renderData[navig];
				}
				

			});

			// console.log(renderData);

			// now that the Render Data is Ready, build the Highchart...

			var hcSeries = {
				'name' : 'Navigation Methods',
	            'colorByPoint' : true,
	            'type' : 'pie',
	            'data' : []
			};

	/*
			var hcTotalSeries = {
				'name' : 'Total Traffic',
	            'colorByPoint' : true,
	            'type' : 'pie',
	            'name' : 'Total Traffic',
	            'data' : [],
	            'center' : [350, 200],
	            'size' : 75,
	            'showInLegend' : false,
	            'dataLabels' : {
	                'enabled' : false
	            },
	            'linkedSeries' : hcSeries
			}

	*/
			var hcDrillDown = [];
			var navigationDrill = {
				'name' : 'Navigation Source',
	            'id' : 'Navigation',
	            'type' : 'bar',
	            'plotOptions' : {
		            'series' : {
		                'dataLabels' : {
		                    'enabled' : true,
		                }
		            },
			        'xAxis' : {
			        	'type' : 'category'

			        	//'categories' : []
			        }
		        },
				'data' : []
			};

			var onSiteNav = {};
			var seriesSortObj = {};
			$.each(renderData, function(navMeth,data){
			
				if (navMeth === "nonInstances") {
					var allTotal = renderData['totalPageviews'];
					var Fpercent = ((data / allTotal) * 100).toFixed(1);
					// console.log(navMeth + ' = ' + data + ' ... ' + Fpercent + '%');

					var firstLevel = {
						'name': 'on-site Navigation',
						'altName': 'on-site Navigation',
		                'y': data,
		                'perc' : Fpercent,
		                'drilldown': false,
		                'color': 'gray'
					};
					hcSeries['data'].push(firstLevel);
					onSiteNav = firstLevel;
					navigationDrill['data'].push(onSiteNav);
					seriesSortObj['on-site Navigation'] = data;
				}

				else if (navMeth === "totalInstances") {
					var allTotal = renderData['totalPageviews'];
					var Fpercent = ((data / allTotal) * 100).toFixed(1);
					// console.log(navMeth + ' = ' + data + ' ... ' + Fpercent + '%');

					var firstLevel = {
						'name': 'external Navigation',
						'altName': 'external Navigation',
		                'y': data,
		                'perc' : Fpercent,
		                'drilldown': 'Navigation',
		                'color': 'green'
					};
					hcSeries['data'].push(firstLevel);
				}
				else if (typeof data === "object") {
					var allTotal = renderData['totalPageviews'];
					var total = data['total'];
					var Fpercent = ((total / allTotal) * 100).toFixed(1);
			//		// console.log(navMeth + ' = ' + total + ' ... ' + Fpercent + '%');

					var navBreak = data['breakdown'];
					var firstLevel;
					let drillThis = false;

					// console.log('Navigation Breakdown ==');
					// console.log(navBreak);
					// console.log(navBreak.length);

					if ( Object.keys(navBreak).length === 0 ) {
						firstLevel = {
							'name': data['altName'],
							'altName' : navMeth,
							// 'name': navMeth,
							// 'altName' : data['altName'],
			                'y': total,
			                'perc' : Fpercent,
			                'drilldown': false,
			                'color': 'gray'
						};					
					
						seriesSortObj[navMeth] = total;
						/*
						secondLevel = {
							'name': 'Industry',
			                'y': parseInt(allTotal - total),
			                'perc' : (((allTotal - total) / allTotal) * 100).toFixed(1),
			                'drilldown': false,
			                'color': 'blue'
						};
						hcSeries['data'].push(secondLevel);
						*/
							

					} else {
						drillThis = true;
						firstLevel = {
							'name': data['altName'],
							'altName' : navMeth,
							// 'name': navMeth,
							// 'altName' : data['altName'],
			                'y': total,
			                'perc' : Fpercent,
			                'color' : '#0696D7',
			                'drilldown': navMeth
						};
						seriesSortObj[navMeth] = total;
					}
					navigationDrill['data'].push(firstLevel);
					
					if (drillThis) {
						var drillLevel = {
							'name' : navMeth,
				            'id' : navMeth,
				            'type' : 'bar',
				            'plotOptions' : {
					            'series' : {
					                'dataLabels' : {
					                    'enabled' : true,
					                }
					            },
						        'xAxis' : {
						        	'type' : 'category'
						        }
					        },
							'data' : []
						};

						var drillSortObj = {}
						$.each(navBreak, function(campaign, dat){
							var thisTotal = dat;
							var percent = ((thisTotal / total) * 100).toFixed(1);
						//	// console.log('  > ' + campaign + ' = ' + thisTotal + ' ... ' + percent + '%');
							var altName = campaign.substring(0,12) + '..';
							var drillData = {
								'name': altName,
								'altName' : campaign,
								'color' : '#32BCAD',
								// 'name': navMeth,
								// 'altName' : data['altName'],
			                	'y': dat,
			                	'perc' : percent,
			                	'enabledLabels' : false
							};
							drillSortObj[campaign] = dat;
							// drillLevel['plotOptions']['xAxis']['categories'].push(campaign);
							drillLevel['data'].push(drillData);
						});

						var drillSortArr = [];
						for (var drill in drillSortObj) {
							drillSortArr.push([drill, drillSortObj[drill]]);
							drillSortArr.sort(function(b, a) {return b[1] - a[1]});
							// seriesSortArr.sort(function(a, b) {return b[1] - a[1]});
						}
						    
							// console.info("DRILL SERIES SORT!!!");
							// console.info(drillSortArr);

						// reset the data for Navigation Series (index 4)
						var newDataSet = [];
						// var axisLabels = [];		
						var finalDrillSeries = (function(){
							var navSet = drillLevel['data'];
							$.each(drillSortArr, function(ind,obj){
								var checker = obj[0];
								$.each(navSet, function(indx, objD) {
									if (checker === objD['altName']) {
										newDataSet.push(objD);
									//	axisLabels.push(objD['altName']);
									}
								});
							});
						})();
						drillLevel['data'] = newDataSet;
						// drillLevel['plotOptions']['xAxis']['categories'] = axisLabels;

						hcDrillDown.push(drillLevel);
					}
				}

			});

			// console.log("Navigation DRILL DONW");
			// console.log(navigationDrill);

			hcDrillDown.push(navigationDrill);

			var saveNavIndex = hcDrillDown.length - 1;

		//	var hcHiddenTotals = hcTotalSeries;
		//	hcHiddenTotals['visible'] = false;

	/*
			var maxSpeed = {car:300, bike:60, motorbike:200, airplane:1000,
			    helicopter:400, rocket:8*60*60}
			var sortable = [];
			for (var vehicle in maxSpeed)
			      sortable.push([vehicle, maxSpeed[vehicle]])
			sortable.sort(function(a, b) {return a[1] - b[1]})
	*/

			
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
			//var axisLabels = [];		
			var finalNavigationSeries = (function(){
				var navSet = hcDrillDown[saveNavIndex]['data'];
				$.each(seriesSortArr, function(ind,obj){
					var checker = obj[0];
					$.each(navSet, function(indx, objD) {
						if (checker === objD['altName']) {
							newDataSet.push(objD);
						//	axisLabels.push(objD['altName']);
						//	// console.log(objD['altName']);
						}
					});
				});
			})();
			hcDrillDown[saveNavIndex]['data'] = newDataSet;
			//hcDrillDown[saveNavIndex]['plotOptions']['xAxis']['categories'] = axisLabels;	
		//	hcDrillDown[4]['plotOptions']['xAxis']['labels'] = {
		//		'enabled' : true
		//	}

			// console.info('HC Series');
			// console.info(hcSeries);
			// console.info('HC Series');
			// console.info(hcDrillDown);

				// now remove the pie chart piece for now...
				var newHCseries = hcDrillDown[saveNavIndex];
				hcDrillDown.splice(saveNavIndex, 1);

			var titleVal = window.analytics.reporting.types[options['id']]['title'];

			var highChartsDetails = {
				chart: {
					type: 'bar',
					plotBackgroundColor: null,
	            	plotBorderWidth: null,
	            	plotShadow: false,
					events: {
		                drilldown: function (data) {
		                	
		                	//// console.log('highcharts data');
		                	//// console.log(data);
		                	//// console.log('highcharts object');
		                	//// console.log(this);
		                	
		                	var whichDrill = data.seriesOptions['id'];
		                	var newTitleVal = 'Breakdown for ' + whichDrill;
		                	
		                	this.setTitle({
		         				useHTML: true,
		            			text: '<img class="highchart-logo-img" src="chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/bar/reportLogo5.png"> ' + newTitleVal
		            		}, { 
		            			'text' : '' 
		            		});

		                },
		                drillup: function () {
		         			
		         			// // console.log('highcharts object');
		                	// // console.log(this);

		         			this.setTitle({
		         				useHTML: true,
		            			text: '<img class="highchart-logo-img" src="chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/bar/reportLogo5.png"> ' + titleVal
		            		},{
					            text: 'Click the blue bars to view more details.'
					        });

		                }
		            }
				},
		        title: {
		        	useHTML: true,
		            text: '<img class="highchart-logo-img" src="chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/bar/reportLogo5.png"> ' + titleVal
		        },

		        subtitle: {
		            text: 'Click the blue bars to view more details.'
		        },
		        footer: {
		        	text: 'footer test...'
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
		                text: 'Pageviews'
		            }
		        },
		        plotOptions: {
		            /*
		        	pie: {
	                    allowPointSelect: true,
	                    cursor: 'pointer',
	                    dataLabels: {
	                        enabled: false,
	                    },
	                    showInLegend: true
	                },
	                */
		            bar: {
		            	cursor: 'pointer',
		                dataLabels: {
		                	enabled: true,
		                    format: '{point.y}'
		                },
	                    showInLegend: false
		            }
		        },

		        tooltip: {
		        	backgroundColor: 'AliceBlue',
		            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
		            pointFormat: '<span style="color:{point.color}">{point.altName}</span>: <b>{point.y}</b> total ({point.perc:.1f}% of total)<br/>',
		            style: {
		            	"color" : 'black',
		            	"z-index" : 900000000
		            }
		        },
		        series: [ newHCseries ],
		        // series: [ hcSeries ],
		        drilldown: {
		            series: hcDrillDown
		        }
		    };

			// END Highchart build, now RENDER!!
		
		}
	    catch(err) {

	    	// console.log('error processing report data');
	    	// console.log(err);
	    	var highChartsDetails = 'bad-data';
	    	errorCloser = '#' + options['id']; 
	    }
		
		window.analytics.reporting.renderData(options, highChartsDetails, errorCloser);

	};

	// end Callback
	var _id = 'wafer-navigation-report';
	var thisOne = window.analytics.reporting.types[_id];
	var isLaunched = thisOne['launched'];
	if (!isLaunched) {
		window.analytics.reporting.deployReport(_id, nav_report, processData);
		thisOne['launched'] = true;
		var msg = "track-report-launch=" + _id;
		window.postMessage(msg,document.location.href);
	} else {
		// console.log('already launched the Navigation Report');
	}

})(jQuery);