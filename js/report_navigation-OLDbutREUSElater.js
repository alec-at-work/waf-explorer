
// Launch the NAVIGATION Report Method


	// console.log('attempting to launch the Navigation Report');

	var _from = window.analytics.reporting.fromDate();
	var _to = window.analytics.reporting.toDate();

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
	            	"id" : "page" ,
	            	"selected": [encodePage]
	        	},
	        	{
	        		"id" : "trackingCode",
	        		"classification" : "(v0) Activity Type",
	        		"top": 15 //,
            		// "everythingElse": true
	        	},
	        	{
	        		"id" : "trackingCode",
	        		"classification" : "(v0) Activity Name",
	        		"top": 15 // ,
            		// "everythingElse": true
	        	},
	        	/*
	        	{
	        		"id" : "trackingCode",
	        		"classification" : "(v0) Activity ID",
	        		"top": 15 // ,
            		// "everythingElse": true
	        	},
	        	*/
	        	{ 
	            	"id" : "trackingCode",
	            	"top" : 20
	        	}
	        ],
	        
	        "segments": [

	        /*
		    	{ 
	               "id": "page",
	               "selected": [encodePage, _pageName]
	            },
			
	          
	            {

	               "container":{
			           "type":"hits",
			           "rules":[
			           	 {
			           	 	 "name" : "Page",
			                 "element" : "page",
			                 "operator" : "equals",
			                 "value" : _pageName
			              }
			             
			              	// how to make sure this exists?
			              {
			              	 "name" : "(v0)Tracking Code",
			                 "element" : "trackingCode",
			                 "operator" : "exists"	//,
			                 // "value" : "*"
			              }
			             
			           ]
			        }
				} 
				*/
			],
			
	        // no selections here
	        "metrics": [
		        {
		        	'id' : 'cm1403_575aeaff408496f31ca5087d'  // custom v0 Instances
		        },{
		        	'id' : 'pageviews' 
		        }
	        ]
	    }
	};

	// CALLBACK method

	var processData = function(options, theData){
		var rData = theData;
		
		// window.navData = analytics.reporting.datasets['wafer-navigation-report']['data'];

		// console.log("nav Data Raw");
		// console.log(rData);

		var realData = rData['data'][0];
		var elements = rData['elements'];
		var metrics = rData['metrics'];
		var totals = realData['counts'];

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
			// console.log(x + ' --> ' + num);
			// console.log('this metric: ' + which + ' is ' + num);

			finalData[which] = parseInt(num);
		});

		// process the elements
		finalData['Navigation'] = {};

		var breakdown = realData['breakdown'];
		$.each(breakdown, function(ind,data){
			// console.log('in the BREAKDWON');
			// console.log(data);

			let activity = data['name'];	
			let noBreak = false;
			let addNextLevel = false;
			switch(activity) {
				case '::unspecified::' :
					activity = '...data pending ??...';
					noBreak = true;
					break;
				case '[blog]' :
					activity = 'blogs';
					addNextLevel = true;
					break;
				case '[mail]' :
					activity = 'webmail client';
					break;
				case '[organic]' :
					activity = 'Organic Search';
					addNextLevel = true;
					break;
				case '[ref domain]' :
					activity = 'Referring Domains';
					addNextLevel = true;
					break;
				case '[social media]' :
					activity = 'Social Media (Organic)';
					addNextLevel = true;
					break;
				case '[typed/bookmarked]' :
					activity = 'Direct Load';
					noBreak = true;
					break;
				case 'Social media' :
					activity = 'Social Media (Paid)';
				default : 
					break;
			}		
			let transFormBreakDownName;

			switch (activity) {
				case 'Advertising' :
				case 'Email Direct' :
				case 'Social Media (Paid)' :
				case 'Other' :
					transFormBreakDownName = true;
					break;
				default :
					transFormBreakDownName = false;
					break;
			}

			// console.log(activity);
			// console.log('transFormBreakDownName --> ' + transFormBreakDownName);
			

			finalData['Navigation'][activity] = {};
			var fD = finalData['Navigation'][activity];	
			
			// console.log(finalData['Navigation']);
			// console.log(fD);

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

			if (addNextLevel) {
				furtherBreak = data['breakdown'][0]['breakdown'];
			}
			
			var thisTotal = fD['Instances'];
			var runningTotal = 0;

			if (!noBreak) {
				$.each(furtherBreak, function(n,campagin){
					//// console.log(company);
					var finalName = campagin['name'];
					
					// transform the name if an activity ID is needed for it
					if (transFormBreakDownName && typeof campagin['breakdown'] !== "undefined") {
						if (typeof campagin['breakdown'][0] !== "undefined") {
							if (typeof campagin['breakdown'][0]['name'] !== "undefined") {
								// console.log('resetting the activity Info name');
								finalName = campagin['name'] + ' (' + campagin['breakdown'][0]['name'] + ')';
							}
						}	
					}
					
					// remove the beginning part
					if (addNextLevel) {
						var tempName = finalName.split('] ');
						finalName = tempName[1];
					}

					breakData[finalName] = {};
					var bN = breakData[finalName];

					$.each(metrics, function(index,met){
						bN[met['name']] = '';
					});

					var theData = campagin['counts'];
					$.each(theData, function(x,num){
						var which = metricsMap[x];
						bN[which] = parseInt(num);
						if (which === 'Instances') {
							runningTotal = parseInt(runningTotal) + parseInt(num);	
						}
					});

				});
				
				var restTotal = parseInt(thisTotal) - parseInt(runningTotal);

				if (restTotal > 0) {
					breakData['all others'] = {
						'Instances' : restTotal,
						'Page Views' : restTotal
					};	
				}
		

			}
	
		});

		// console.log(finalData);
		
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

		renderData['totalInstances'] = finalData['Instances'];
		renderData['totalPageviews'] = finalData['Page Views'];
		renderData['nonInstances'] = finalData['Page Views'] - finalData['Instances'];

		$.each(finalData['Navigation'], function(navig,data){

		//	var finalDevice = cleanDeviceType(device);

			if (typeof renderData[navig] === 'undefined') {
				renderData[navig] = {};
				renderData[navig]['total'] = 0;
				renderData[navig]['breakdown'] = {};
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
			'name' : 'Navigation',
            'id' : 'Navigation',
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

		$.each(renderData, function(navMeth,data){

			if (navMeth === "nonInstances") {
				var allTotal = renderData['totalPageviews'];
				var Fpercent = ((data / allTotal) * 100).toFixed(1);
				// console.log(navMeth + ' = ' + data + ' ... ' + Fpercent + '%');

				var firstLevel = {
					'name': 'on-site Navigation',
	                'y': data,
	                'perc' : Fpercent,
	                'drilldown': false,
	                'color': 'gray'
				};
				hcSeries['data'].push(firstLevel);
			}

			else if (navMeth === "totalInstances") {
				var allTotal = renderData['totalPageviews'];
				var Fpercent = ((data / allTotal) * 100).toFixed(1);
				// console.log(navMeth + ' = ' + data + ' ... ' + Fpercent + '%');

				var firstLevel = {
					'name': 'external Navigation',
	                'y': data,
	                'perc' : Fpercent,
	                'drilldown': 'Navigation',
	                'color': 'yellow'
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
						'name': navMeth,
		                'y': total,
		                'perc' : Fpercent,
		                'drilldown': false,
		                'color': 'gray'
					};
				
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
						'name': navMeth,
		                'y': total,
		                'perc' : Fpercent,
		                'drilldown': navMeth
					};
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
					        	'categories' : []
					        }
				        },
						'data' : []
					};

					$.each(navBreak, function(campaign, dat){
						var thisTotal = dat;
						var percent = ((thisTotal / total) * 100).toFixed(1);
					//	// console.log('  > ' + campaign + ' = ' + thisTotal + ' ... ' + percent + '%');
						var drillData = {
							'name': campaign,
		                	'y': dat,
		                	'perc' : percent,
						}
						drillLevel['plotOptions']['xAxis']['categories'].push(campaign);
						drillLevel['data'].push(drillData);
					});

					hcDrillDown.push(drillLevel);
				}
			}

		});

		hcDrillDown.push(navigationDrill);

	//	var hcHiddenTotals = hcTotalSeries;
	//	hcHiddenTotals['visible'] = false;

		var titleVal = window.analytics.reporting.types[options['id']]['title'];

		var highChartsDetails = {
			chart: {
				type: 'bar',
				events: {
	                drilldown: function () {

	                	// // console.log(this);

	                },
	                drillup: function () {
	         
	                }
	            }
			},
	        title: {
	        	useHTML: true,
	            text: '<img class="highchart-logo-img" src="chrome-extension://obfcndackhiakjaaffgmdigimdldoepa/bar/reportLogo5.png"> ' + titleVal
	        },

	        subtitle: {
	            text: 'Click the slices to view Company details.'
	        },
	        footer: {
	        	text: 'footer test...'
	        },

	        xAxis: {
	            labels: {
	                enabled: false
	            },
	            title: {
	                text: null
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
	        	pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                    },
                    showInLegend: true
                },
	            bar: {
	                dataLabels: {
	                    enabled: true,
	                    useHTML: true,
	                    format: '<i>{point.name}</i>: <b>{point.y} </b> ({point.perc:.1f}% of total)'
	                },
                    showInLegend: false
	            }
	        },

	        tooltip: {
	        	backgroundColor: 'gray',
	            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
	            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> total ({point.perc:.1f}%)<br/>',
	            style: {
	            	"color" : 'white',
	            	"z-index" : 100000000
	            }
	        },
	        // series: [ hcSeries, hcTotalSeries ],
	        series: [ hcSeries ],
	        drilldown: {
	            series: hcDrillDown
	        }
	    };

		// END Highchart build, now RENDER!!

		window.analytics.reporting.renderData(options, highChartsDetails);

	};

	// end Callback

	window.analytics.reporting.deployReport('wafer-navigation-report', nav_report, processData);

