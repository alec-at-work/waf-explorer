
		// user Technology Pull parameters
		var technology_report = { 
			"reportDescription":{
				"reportSuiteID":"autodesk-new-gl",
		        "dateFrom" : "2016-04-01",
		        "dateTo" : "2016-04-30",
		        "elements":[
		            { 
		            	"id" : "page" ,
		            	"selected": ["adsk:en:home"]
		        	},
		        	{
		        		"id" : "mobileDeviceType",
		        		"top": 7 //,
                		// "everythingElse": true
		        	},
		        	{
		        		"id" : "browser",
		        		"top": 8 // ,
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
		        ]
		    }
		};

		test_callAPI('wafer-technology-report', 'Report.Queue', technology_report);


		// Process the Data once the report is done and ready


		var rData = analytics.reporting.datasets['wafer-technology-report']['data'];

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

		renderData['total'] = finalData['Visitors'];

		$.each(finalData['Device'], function(device,data){

			var finalDevice = cleanDeviceType(device);

			if (typeof renderData[finalDevice] === 'undefined') {
				renderData[finalDevice] = {};
				renderData[finalDevice]['total'] = 0;
				renderData[finalDevice]['breakdown'] = {};
			}

			var total = parseInt(data['Visitors']);
			renderData[finalDevice]['total'] = parseInt(renderData[finalDevice]['total']) + total;
				
			var deviceBreak = data['breakdown'];

			$.each(deviceBreak, function(brow, dat){

				if (typeof renderData[finalDevice]['breakdown'][brow] === 'undefined') {
					renderData[finalDevice]['breakdown'][brow] = 0;
				}

				var thisTotal = parseInt(dat['Visitors']);
				renderData[finalDevice]['breakdown'][brow] = parseInt(renderData[finalDevice]['breakdown'][brow]) + thisTotal;

			});

		});

		$.each(renderData, function(device,data){

			if (device !== "total") {
				var allTotal = renderData['total'];
				var total = data['total'];
				var Fpercent = ((total / allTotal) * 100).toFixed(1);
				// console.log(device + ' = ' + total + ' ... ' + Fpercent + '%');

				var deviceBreak = data['breakdown'];

				$.each(deviceBreak, function(brow, dat){
					var thisTotal = dat;
					var percent = ((thisTotal / total) * 100).toFixed(1);
					// console.log('  > ' + brow + ' = ' + thisTotal + ' ... ' + percent + '%');
				});
			}

		});



