
// Launch the Scrolling Report

(function scrollReport($){

	// console.log('attempting to launch the Scrolling Report');
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
			// dates will get set when report is actually run
	     //   "dateFrom" : _from,
	     //   "dateTo" : _to,
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
			// console.log('SCROLL DATA');
			// console.log(rData);
			// var rData = analytics.reporting.datasets['wafer-scroll-report']['data'];

			var realData = rData['data'];
			var elements = rData['elements'];
			var metrics = rData['metrics'];
			var totals = rData['totals'][0];

			/*
			console.log('real Data');
			console.log(realData);
			console.log('elements');
			console.log(elements);
			console.log('metrics');
			console.log(metrics);
			console.log('totals');
			console.log(totals);
			*/

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
			scrollTotals['missing'] = parseInt(parseInt(totals) - scrollTotals['0-10']);

			/*
			console.log('scrollGroups data');
			console.log(scrollGroups);
			console.log('scrollTotals data');
			console.log(scrollTotals);
			*/

			var hcSeries = {
				'name' : 'Scroll Depth',
				'borderWidth' : 1,
				// 'type': 'funnel',
	            'colorByPoint' : true,
	            'dataLabels' : {
	                'enabled' : true,
	                'color' : '#000000'
	            },
	            'data' : []
			};

			function getColorForDepth(dep){
				switch(dep) {
					default :
						return 'gray';
						break;
				}
			};

			// make the Array of Arrays for the 'data'
			// push the values into the data set
			var newDataSet = [];
			var yAxisCats = [];
			var index = 0;
			$.each(scrollTotals, function(grp,val){
				if (grp !== "missing" && grp !== "100") {
				//	console.log('group= ' + grp);
				//	console.log('index= ' + index);
				//	console.log('[0,' + index + ',' + val + ']');

					// var percVal = 100 * (val / scrollGroups['total']);

					var percVal = Math.round( (100 * (val / scrollGroups['total'])) * 10 ) / 10
					var pushMe = [0,index,percVal];

					newDataSet.push(pushMe);
					yAxisCats.push(grp + '%');
					index += 1;
				}
			});
			
			// push in the 100 value
			// console.log('group= 100');
			// console.log('index= ' + index);
			// console.log('[0,' + index + ',' + scrollTotals['100'] + ']');

			var percVal = Math.round( (100 * (scrollTotals['100'] / scrollGroups['total'])) * 10 ) / 10

			var pushMe2 = [0,index,percVal];
			newDataSet.push(pushMe2);
			yAxisCats.push('100%');
			
			newDataSet = newDataSet.reverse();
			yAxisCats = yAxisCats.reverse();
			$.each(newDataSet, function(indy,objy){
				objy[1] = indy;
			});

			hcSeries['data'] = newDataSet;

			/*
				console.log('max index...');
				console.log(index);
				console.log('yAxis cats length...');
				console.log(yAxisCats.length);
				console.log(yAxisCats);

			console.log('hcSeries');
			console.log(hcSeries);
			*/

			// now that the Render Data is Ready, build the Highchart...
			// console.log("got here with the SCROLL Request");

			function numberWithCommas(x) {
			    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}

			var subTitle = '<div style="font-family:Artifakt-book">Based on a <a href="https://wiki.autodesk.com/x/AKURDw" style="color:DarkRed" target="_blank">sample</a> of ' + numberWithCommas(scrollGroups['total']) 
				+ ' Page Views that also had a <i>Next Page View</i></div>';
			var totCount = numberWithCommas(parseInt(scrollGroups['total']));

			var xAxisTitle = '<div><b><div style="text-align:center;padding:2px;">Page Views in this sample</div></b>' +
				'<div style="text-align:left;font-size:90%;"><b>' + totCount + '</b> in total</div></div>'; 

			var titleVal = window.analytics.reporting.types[options['id']]['temp-title'];

			var reportObj = window.analytics.reporting.types['wafer-scroll-report'];

		    var highChartsDetails = {
		    	chart: {
		            type: 'heatmap',
		            marginTop: 80,
		            // marginBottom: 40,
		            marginRight: 130,
            		marginLeft: 150,
		            
		            plotBorderWidth: 1
		        },
		        title: {
		        	useHTML: true,
		            text: '<div style="font-family:Artifakt-book"><i class="fa fa-sort-amount-desc" style="font-family:FontAwesome" aria-hidden="true"></i> ' + titleVal + '</div>'
		        },
		        subtitle: {
		        	useHTML: true,
		            text: subTitle, 
		            style: {
				        color: 'DarkRed'
				    }
		        },
		        xAxis: {
		        	labels:
					{
					  enabled: true
					},
		            categories: ['Percent of Page Views that saw X% of the page']
		        },

		        yAxis: {
		            categories: yAxisCats,
		            title: {
		            	text: 'Percent of Page Viewed'
		            }
		        },

		        colorAxis: {
		            min: 0,
		            minColor: '#FFFFFF',
		            maxColor: Highcharts.getOptions().colors[0]
		        },

		        /*
		        legend: {
		            align: 'right',
		            layout: 'vertical',
		            margin: 0,
		            verticalAlign: 'top',
		            y: 65,
		            symbolHeight: 280
		        },
		        */
		        credits: {
		        	enabled: true,
		        	// text: "Alec hiiii",
		        	text: 'Data is from ' + reportObj.fromDate + 
		        		" to " + reportObj.toDate +
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
		            formatter: function () {
		                return 'Visitors saw <b>' + this.series.yAxis.categories[this.point.y] + '</b> of<br>' +
		                    'the page <b>' + this.point.value + '%</b> of the time.';
		            }
		        },

		        series: [ hcSeries ]
		    }

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