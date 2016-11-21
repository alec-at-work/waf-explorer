
// Launch the Traffic Report Method

(function trafficReport($){

	// console.log('attempting to launch the Traffic Report');

	// var granularity = "day";
	/*
		if (days === "1") {
			granularity = "hour";
		}
		console.log(granularity);
	*/

	// console.log('checking data from ' + _from + ' to ' + _to);

	if(true) {
		window.analytics.reporting.checkValidPage();
	}

	var _pageName = analytics.reporting.checks.validPage;
	var encodePage = encodeURI(_pageName);

	// console.log("Page Report Details");
	// console.log(_pageName);
	// console.log(encodePage);

	// content tracking demo report PARAMS
	var traffic_report = { 
		"reportDescription":{
			"reportSuiteID":"autodesk-new-gl",
	        // "reportSuiteID":"autodeskdevsite",
	      
	        // now handled at REPORT RUN
	      //  "dateFrom" : _from,
	      //  "dateTo" : _to,
	        "dateGranularity" : "day",
	        // "dateGranularity" : granularity,
	        "elements":[
	            { 
	            	"id" : "page" //,
	     //       	"selected": [_pageName] //[encodePage]
	        	}
	        ],
	        // no selections here
	        "metrics": [
		        {
		        	'id' : 'visitors' 
		        },{
		        	'id' : 'visits' 
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
			                 // "value":encodePage
			              }
			           ]
			        }
			    }
			]
	    }
	};

	var processData = function(options, theData){
		try {

			var errorCloser = false;

		//	console.log('Traffic Data');
		//	console.log(theData);

			var totalsAxis = {};
			totalsAxis['Visitors'] = theData['totals'][0];
			totalsAxis['Visits'] = theData['totals'][1];
			totalsAxis['Pageviews'] = theData['totals'][2];

			var renderData = {
				'metrics' : [],
				'categories' : []
			}
			// metrics
			$.each(theData['metrics'],function(index,obj){
				var color;
				var met = obj['name'];
				switch (met) {
					case "Visitors" :
						color = '#04628d';
						break;
					case "Visits" :
						color = '#0696D7';
						break;
					case "Page Views" :
						color = '#30bbf9';
						break;
				};
				renderData['metrics'].push({ 
					'name' : obj['name'], 
					'color' : color,
					'data' : [] 
				});
			});
			// categories		
			$.each(theData['data'],function(index,obj){
				//if (analytics.reporting.options.granularity === "day") {
				var newCatVal = (obj.month + '.' + obj.day + '.' + obj.year).toString();	
				//}
				//else if (analytics.reporting.options.granularity === "month") {
				//	var newCatVal = obj['name'];
				//}
				
				renderData['categories'].push(newCatVal);
				// the data
				if (obj['breakdown'].length > 0) {
					var newData = obj['breakdown'][0]['counts'];
					$.each(newData, function(dIndex,dValue){
						renderData['metrics'][dIndex]['data'].push(parseInt(dValue));
					});
				}
				else if (obj['breakdownTotal'].length > 0) {
					var newData = obj['breakdownTotal'];
					$.each(newData, function(dIndex,dValue){
						renderData['metrics'][dIndex]['data'].push(parseInt(dValue));
					});
				}
				
			});

			// now that the Render Data is Ready, build the Highchart...

			//	console.log(renderData);

			function numberWithCommas(x) {
			    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}

			var totPV = numberWithCommas(totalsAxis['Pageviews']);
			var totVS = numberWithCommas(totalsAxis['Visits']);
			var totVR = numberWithCommas(totalsAxis['Visitors']);


			// !!! TEMP FIX
			// can't use VISITORS or VISITS until can sync up multiple sources
			var yAxisTitle = '<div><b><div style="text-align:center;padding:2px;">Visitors</div></b></div>';
			var xAxisTitle = '<div style="text-align:left;font-size:90%;"><b>' + // totVR + '</b> Visitors - <b>' +
				// totVS + '</b>  Visits - <b>' + 
				totPV + '</b> total Page Views</div>'; 

			var titleVal = window.analytics.reporting.types[options['id']]['temp-title'];

			var reportObj = window.analytics.reporting.types['wafer-traffic-report'];

			var highChartsDetails = {
		    	chart: {
		    		plotBackgroundColor: null,
		    		type: 'line'
		    	},
		  		title: {
		  			useHTML: true,
		  			text: '<div style="font-family:Artifakt-book"><i class="fa fa-car" style="font-family:FontAwesome" aria-hidden="true"></i> ' + titleVal + '</div>'
		  		},
		        subtitle: {
		        	// useHTML: true,
		        	text: '',
		        	//text: '<div style="font-family:Artifakt-book">dates dates pagename</div>',
		            // text: 'Source: Adobe Reporting API v1.4',
		            // verticalAlign: "bottom"
		        },
		        xAxis: {
		            categories: renderData['categories'],
		            title: {
		            	useHTML: true,
		                text: xAxisTitle
		            },
		        },
		        yAxis: {
		            title: {
		            	useHTML: true,
		                text: ''	// yAxisTitle
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
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
		            valueSuffix: ''
		        },
		        legend: {
		            layout: 'horizontal',
		            align: 'center',
		            verticalAlign: 'bottom',
		            borderWidth: 0
		        },
		        series: renderData['metrics']
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
	var _id = 'wafer-traffic-report';
	var thisOne = window.analytics.reporting.types[_id];
	var isLaunched = thisOne['launched'];
	if (!isLaunched) {
		window.analytics.reporting.deployReport(_id, traffic_report, processData);
		thisOne['launched'] = true;
		// console.log('SET IT AS LAUNCHED!');
		// console.log(_id);
		// console.log(window.analytics.reporting.types[_id]['launched']);
		var msg = "track-report-launch=" + _id;
		window.postMessage(msg,document.location.href);
	} else {
		// console.log('already launched the Traffic Report');
	}
	
//} catch(err){
//	// console.log('no dice on Traffic Report');
//}
})(jQuery);