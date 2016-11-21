
// Launch the USER Report Method
(function whoReport($){

	// console.log('attempting to launch the Industry Report');

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
	var firmigraphic_report = { 
		"reportDescription":{
			"reportSuiteID":"autodesk-new-gl",
	        "dateFrom" : _from,
	        "dateTo" : _to,
	        "elements":[
	            { 
	            	"id" : "page" //,
	           // 	"selected": [_pageName]	//[encodePage]
	        	},
	        	{
	        		"id" : "eVar40",
	        		"classification" : "DB ADSK Industry Group",
	        		"top": 10 //,
            		// "everythingElse": true
	        	},
	        	{
	        		"id" : "eVar38",
	        		"classification" : "Company Name",
	        		"top": 15 // ,
            		// "everythingElse": true
	        	}
	        ],
	        // no selections here
	        "metrics": [
		        {
		        	'id' : 'visitors' 
		        },{
		        	'id' : 'pageviews' 
		        },{
		        	'id' : 'event22' 
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
			
			// var rData = analytics.reporting.datasets['wafer-industry-report']['data'];

			var realData = rData['data'][0];
			var elements = rData['elements'];
			var metrics = rData['metrics'];
			var totals = realData['counts'];

			console.log('real Data');
			console.log(realData);
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
			finalData['Industry'] = {};

			var breakdown = realData['breakdown'];
			$.each(breakdown, function(ind,data){
				// console.log('in the BREAKDWON');
				// console.log(data);

				finalData['Industry'][data['name']] = {};
				var fD = finalData['Industry'][data['name']];
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
				$.each(furtherBreak, function(n,company){
					//// console.log(company);
					breakData[company['name']] = {};
					var bN = breakData[company['name']];

					$.each(metrics, function(index,met){
						bN[met['name']] = '';
					});

					var theData = company['counts'];
					$.each(theData, function(x,num){
						var which = metricsMap[x];
						bN[which] = parseInt(num);
					});
					
				});
		
			});

			// console.log(finalData);
			
			var totalPageViews = parseInt(finalData['Page Views']);
			var runningTotal = 0;
			// Cleanup and Process data into more finalized format

			var renderData = {};

	/*
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
	*/

			renderData['total'] = finalData['Page Views'];

			$.each(finalData['Industry'], function(industry,data){

			//	var finalDevice = cleanDeviceType(device);

				if (typeof renderData[industry] === 'undefined') {
					renderData[industry] = {};
					renderData[industry]['total'] = 0;
					renderData[industry]['breakdown'] = {};
				}

				var total = parseInt(data['Page Views']);
				renderData[industry]['total'] = parseInt(renderData[industry]['total']) + total;
					
				var indBreak = data['breakdown'];

				$.each(indBreak, function(company, dat){

					if (typeof renderData[industry]['breakdown'][company] === 'undefined') {
						renderData[industry]['breakdown'][company] = 0;
					}

					var thisTotal = parseInt(dat['Page Views']);
					renderData[industry]['breakdown'][company] = parseInt(renderData[industry]['breakdown'][company]) + thisTotal;

				});

			});

			// console.log(renderData);

			// now that the Render Data is Ready, build the Highchart...

			var hcSeries = {
				'name' : 'Industry',
	            'colorByPoint' : true,
	            'type' : 'bar',
	            'name' : 'Industry Group',
	            'data' : []
			};

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

			var seriesSortObj = {};
			var hcDrillDown = [];

			$.each(renderData, function(industry,data){

				if (industry !== "total") {
					var allTotal = renderData['total'];
					var total = data['total'];
					var Fpercent = ((total / allTotal) * 100).toFixed(1);
					// console.log(industry + ' = ' + total + ' ... ' + Fpercent + '%');

					var industryBreak = data['breakdown'];
					var firstLevel;
					if (industry === "::unspecified::") {
						firstLevel = {
							'name': 'Non-Industry',
			                'y': total,
			                'perc' : Fpercent,
			                'drilldown': false,
			                'color': 'gray'
						};
						secondLevel = {
							'name': 'Industry',
			                'y': parseInt(allTotal - total),
			                'perc' : (((allTotal - total) / allTotal) * 100).toFixed(1),
			                'drilldown': false,
			                'color': 'blue'
						};

						runningTotal = parseInt(allTotal - total);

						hcTotalSeries['data'].push(firstLevel);
						hcTotalSeries['data'].push(secondLevel);

					} else {
						var altName = industry.substring(0,12);
						if (altName !== industry) {
							altName += '..';
						}
						// console.info('altName = ' + altName);
						firstLevel = {
							'name': industry,
							'altName' : altName,
							'color' : '#0696D7',
			                'y': total,
			                'perc' : Fpercent,
			                'drilldown': industry
						};
						hcSeries['data'].push(firstLevel);

						seriesSortObj[industry] = total;
					}

					if (industry !== "::unspecified::") {
						var drillLevel = {
							'name' : industry,
				            'id' : industry,
				            'type' : 'bar',
				            'plotOptions' : {
					            'series' : {
					                'dataLabels' : {
					                    'enabled' : true,
					                }
					            },
						        'xAxis' : {
						        	'categories' : []
						        }
					        },
							'data' : []
						};

						var drillSortObj = {}
						$.each(industryBreak, function(company, dat){
							var thisTotal = dat;
							var percent = ((thisTotal / total) * 100).toFixed(1);
							// // console.log('  > ' + company + ' = ' + thisTotal + ' ... ' + percent + '%');
							var altName = company.substring(0,12);
							if (altName !== company) {
								altName += '..';
							}

							// // console.info('altName = ' + altName); 
							var drillData = {
								'name': altName, //company,
								'altName' : company, // altName,
			                	'y': dat,
			                	'perc' : percent,
			                	'color' : '#32BCAD'
							}
							drillSortObj[company] = dat;
							// runningTotal = parseInt(runningTotal) + parseInt(dat);

							// drillLevel['plotOptions']['xAxis']['categories'].push(altName);
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

						hcDrillDown.push(drillLevel);
					}
				}

			});

			var saveNavIndex = hcDrillDown.length - 1;
			var seriesSortArr = [];
			for (var series in seriesSortObj) {
				seriesSortArr.push([series, seriesSortObj[series]]);
				seriesSortArr.sort(function(b, a) {return b[1] - a[1]});
				// seriesSortArr.sort(function(a, b) {return b[1] - a[1]});
			}
			    
			// console.info(hcDrillDown);
			// console.info(hcSeries);
			    
				// console.info("SERIES SORT!!!");
				// console.info(seriesSortArr);

			// reset the data for Navigation Series (index 4)
			var newDataSet = [];
			// var axisLabels = [];		
			var finalNavigationSeries = (function(){
				var indSet = hcSeries['data'];

				// console.log("Ind Set!");
				// console.log(indSet);
				$.each(seriesSortArr, function(ind,obj){
					var checker = obj[0];
					$.each(indSet, function(indx, objD) {
						if (checker === objD['altName']) {
							// console.log('pushing this obj:');
							// console.log(objD);
							newDataSet.push(objD);
						//	axisLabels.push(objD['altName']);
						 	// console.log(objD['altName']);
						}
					});
				});
			})();
			// hcDrillDown[saveNavIndex]['data'] = newDataSet;
			hcSeries['data'] = newDataSet;

		//	var hcHiddenTotals = hcTotalSeries;
		//	hcHiddenTotals['visible'] = false;

			var titleVal = window.analytics.reporting.types[options['id']]['title'];


			var nonCompanyTotal = parseInt(totalPageViews - runningTotal);
				var nonPerc = ((nonCompanyTotal / totalPageViews) * 100).toFixed(1);
			var companyTotal = parseInt(runningTotal);
				var compPerc = ((companyTotal / totalPageViews) * 100).toFixed(1);

				// // console.log('totals for the X-Axis Label');
				// // console.log(totalPageViews);
				// // console.log(runningTotal);
				// // console.log(nonCompanyTotal);
				// // console.log(companyTotal);

			function numberWithCommas(x) {
			    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}

			var compTot = numberWithCommas(companyTotal);
			var nonTot = numberWithCommas(nonCompanyTotal);

			var yAxisTitle = '<div><b><div style="text-align:center;padding:2px;">Page Views</div></b>' +
				'<div style="text-align:left;font-size:90%;">Industry: <b>' + compTot + '</b> (' + compPerc + '% of total)</div>' +
				'<div style="text-align:left;font-size:90%;">Non-Industry: <b>' + nonTot + '</b> (' + nonPerc + '% of total)</div></div>'; 

			// <br /> Industry Traffic is ' + compPerc + '% of total';

			// Make monochrome colors and set them as default for all bars
		    Highcharts.getOptions().plotOptions.bar.colors = (function () {
		        var colors = [],
		            base = Highcharts.getOptions().colors[0],
		            i;

		        for (i = 0; i < 5; i += 1) {
		            // Start out with a darkened base color (negative brighten), and end
		            // up with a much brighter color
		            colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
		        }
		        return colors;
		    }());

			var highChartsDetails = {
				chart: {
					plotBackgroundColor: null,
					events: {
		                drilldown: function (data) {
		                	//// console.log('highcharts data');
		                	//// console.log(data);
		                	// console.log('highcharts object');
		                	// console.log(this);
		                	//// console.log('drill DOWN!');
		                	//// console.log(this.series[0]['name']);
		                	var whichDrill = data.seriesOptions['id'];
		                	var newTitleVal = 'Top 15 Companies for ' + whichDrill + ' - Past 30 Days';
		                	this.setTitle({
		         				useHTML: true,
		            			text: '<div style="font-family:Artifakt-book"><i class="fa fa-university" style="font-family:FontAwesome" aria-hidden="true"></i> ' + newTitleVal + '</div>'
		            		}, { 
		            			'text' : '' 
		            		});
		            	
		                	/*
		            		// this.yAxis[0]['axisTitle']['textStr'] = 'Pageviews for ' + whichDrill;
		            		this.yAxis[0].update({
							    'axisTitle' : {
							    	'textStr' : 'Pageviews for ' + whichDrill
							    }
							});
							*/ 

		                },
		                drillup: function () {
		         			
		         			// console.log('highcharts object');
		                	// console.log(this);
		         			this.setTitle({
		         				useHTML: true,
		            			text: '<div style="font-family:Artifakt-book"><i class="fa fa-university" style="font-family:FontAwesome" aria-hidden="true"></i> ' + titleVal + '</div>'
		            		},{
					            text: 'Click the blue bars to view Company details.'
					        });
					        /*
		         			this.yAxis[0]['axisTitle']['textStr'] = yAxisTitle;
		         			*/
		                }
		            }
				},
		        title: {
		        	useHTML: true,
		            text: '<div style="font-family:Artifakt-book"><i class="fa fa-university" style="font-family:FontAwesome" aria-hidden="true"></i> ' + titleVal + '</div>'
		        },

		        subtitle: {
		            text: 'Click the blue bars to view Company details.'
		        },
		        footer: {
		        	text: 'footer test...'
		        },
		        /*
		        labels: {
		            items: [{
		                html: 'Total Traffic',
		                style: {
		                    left: '325px',
		                    top: '145px',
		                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
		                }
		            }]
		        },
		        */
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
		        plotOptions: {
		            bar: {
		            	allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    format: '{point.y:,.0f}',
		                    style: {
		                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		                    }
		                },
	                    showInLegend: false
		            }
		        },

		        tooltip: {
		        	backgroundColor: 'AliceBlue',
		            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
		            pointFormat: '<span style="color:black">{point.altName}</span>: <b>{point.y:,.0f}</b> Pageviews<br/>',
		            style: {
		            	"color" : 'black',
		            	"z-index" : 900000000
		            }
		        },
		        // series: [ hcSeries, hcTotalSeries ],
		        series: [ hcSeries ],
		        drilldown: {
		            series: hcDrillDown
		        }
		    };

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
	var _id = 'wafer-industry-report';
	var thisOne = window.analytics.reporting.types[_id];
	var isLaunched = thisOne['launched'];
	if (!isLaunched) {
		window.analytics.reporting.deployReport(_id, firmigraphic_report, processData);
		thisOne['launched'] = true;
		var msg = "track-report-launch=" + _id;
		window.postMessage(msg,document.location.href);
	} else {
		// console.log('already launched the Industry Report');
	}

})(jQuery);