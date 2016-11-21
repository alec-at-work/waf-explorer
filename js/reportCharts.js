
// Charts and Adobe API Code for Reporting

(function buildReportingChartsEtc($){

	var isDeployed = (typeof window.analytics ===  "undefined" ? false : 
		(typeof window.analytics.wafer === "undefined" ? false : 
		(typeof window.analytics.wafer.reportChartsSet === "undefined" ? false : 
		(window.analytics.wafer.reportChartsSet))));

	if (!isDeployed) {

		window.analytics = window.analytics || {};
		window.analytics.wafer = window.analytics.wafer || {};
		window.analytics.wafer.reportChartsSet = false;

		// Highcharts
		(function highCharts(){
			var head = document.head;
			var highC = document.createElement('script');
			highC.type = 'text/javascript';
			highC.src = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/js/hc/highcharts.js';
			head.appendChild(highC);
		})();

		setTimeout(function(){

			// Highcharts Gray Theme JS
			(function highCharts(){
				var head = document.head;
				var highC = document.createElement('script');
				highC.type = 'text/javascript';
				highC.src = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/js/hc/highchartsBlue.js';
				// head.appendChild(highC);
			})();

			// Highcharts Data JS
			(function highCharts(){
				var head = document.head;
				var highC = document.createElement('script');
				highC.type = 'text/javascript';
				highC.src = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/js/hc/modules/data.js';
				head.appendChild(highC);
			})();

			// Highcharts Drilldown JS
			(function highCharts(){
				var head = document.head;
				var highC = document.createElement('script');
				highC.type = 'text/javascript';
				highC.src = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/js/hc/modules/drilldown.js';
				head.appendChild(highC);
			})();

			// Highcharts Exporting JS
			(function highCharts(){
				var head = document.head;
				var highC = document.createElement('script');
				highC.type = 'text/javascript';
				highC.src = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/js/hc/modules/exporting.js';
				head.appendChild(highC);
			})();

			/*
			// Highcharts Funnel JS
			(function highCharts(){
				var head = document.head;
				var highC = document.createElement('script');
				highC.type = 'text/javascript';
				highC.src = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/js/hc/modules/funnel.js';
				head.appendChild(highC);
			})();
			*/

			// Highcharts Heat Map JS
			(function highCharts(){
				var head = document.head;
				var highC = document.createElement('script');
				highC.type = 'text/javascript';
				highC.src = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/js/hc/modules/heatmap.js';
				head.appendChild(highC);
			})();
			

		},250);

		
		var _checkAPIcall = function(whichSet, _u, _s, _rID, _eP, _opt, _cb) {
			setTimeout(function(){
				// // console.log('running a GET for: ' + whichSet);
				// // console.log(analytics.reporting.datasets[whichSet]['ready']);
				// console.log('checking ' + _rID);
				if (analytics.reporting.datasets[whichSet]['ready']) {
					// console.log('report ' + _rID + ' is ready!');
					return;	
				} 
				else {
				//	try {
					// // console.log('report ' + _rID + ' is NOT ready!');

					var callFailHandle = function(errData) {
						// console.log('the call failed...');
						// console.log(errData);
		    			setTimeout(function(){
		    				_reRunReportGet(whichSet, _u, _s, _rID, _eP, _opt, _cb);				
		    			},50);
					};

					MarketingCloud.makeRequest(_u, _s, 'Report.Get', { "reportID" : _rID }, _eP,
			    		function(_dataResponse){
			    			
			    			var tempData2 = JSON.parse(_dataResponse.responseText);
			    			// // console.log(tempData2);
			    			var errorCheck = typeof tempData2['error'] !== "undefined" ? (tempData2['error'] == 'report_not_ready' ? true : false) : false;
			    			if (!errorCheck) {
			    				analytics.reporting.datasets[whichSet]['data'] = tempData2.report;
				    			analytics.reporting.datasets[whichSet]['ready'] = true;

				    			// alert("RECEIVED REAL DATA");
				    			// // console.log(whichSet + ' DATASET below ...');
				    			// // console.log(tempData2.report);
				    			
				    			
				    			// renderData(_opt, tempData2.report);
				    			_cb(_opt, tempData2.report);
				    			
			    			}
			    		}, callFailHandle);
						
				//	}
				//	catch(e) {
				//		// console.log('the call failed...');
				//		_reRunReportGet(whichSet, _u, _s, _rID, _eP);
				//	}
				}
			},1000);				
		};

		var _reRunReportGet = function(whichSet, _u, _s, _rID, _eP, _opt, _cb) {
			// console.log('RERUNNING check for ' + _rID);
			_checkAPIcall(whichSet, _u, _s, _rID, _eP, _opt, _cb);
		};

		// the ACTUAL function to call the Adobe Analytic API
		var _callAPI = function(_rN, _m, _p, _options, _callback) {

			var username = window.analytics.reporting.user.userName + ":Autodesk"; // 'your.name:Autodesk';
			var secret   = window.analytics.reporting.user.userSecret;
			var method   = _m;
			var endpoint = 'api.omniture.com';
			var params   = _p;

			var options = _options;
			var callback = _callback;

			// console.log('making next request: ' + _rN);
			MarketingCloud.makeRequest(username, secret, method, params, endpoint, 
				function(response) {

					

					// split out the data, and find the Report ID
			    	var tempData = JSON.parse(response.responseText);
			    	var tempReportID = tempData.reportID;

			    //	console.log("results from INITIAL API CALL FOR " + tempReportID);
				//	console.log(response);
				//	console.log(JSON.parse(response.responseText));
			    	
			    	if (tempReportID !== undefined) {
			    		// build out the data Object
				    	analytics.reporting.datasets[_rN] = {};
				    	analytics.reporting.datasets[_rN]['data'] = {}; 
				    	analytics.reporting.datasets[_rN]['reportID'] = tempReportID;
				    	analytics.reporting.datasets[_rN]['ready'] = false;
				
						// console.log("Report is QUEUED: " + _rN + ' ' + tempReportID);
						_checkAPIcall(_rN,username,secret,tempReportID,endpoint,options,callback);	
			    	} else {
			    		// console.log('API report ID came back as UNDEFINED');
			    	}
			    	
				},
				function(error){
					// console.log('error fetching Report');
					// console.log(error);

					// send a blank data set to produce the error
					_callback(_options, false);

				});

			return false;

		};

		// a public function to pass everything through...
		var callAPI = function(_reportName, _method, _params, _options, _callback) {
			var _reportName = _reportName || 'no-name';
			var _method = _method || false;
			if (_method) {
				_callAPI(_reportName, _method, _params, _options, _callback);	
			}
		}

		window.test_callAPI = callAPI;

		function reportOptions(id, title){
			return {
				'id' : id,
				'title' : title,
				'data' : {}
			};
		}

		window.analytics.reporting.runReport = function(id, reportData, callback){
			
			var title = window.analytics.reporting.types[id]['title'];
		//	console.log('details of REPORT REQUEST');
		//	console.log(reportData);

			try {
				var options = new reportOptions(id,title);
				
				var checkCreds = typeof window.analytics.reporting.user.userName === "undefined" ||
					typeof window.analytics.reporting.user.userSecret === "undefined";
				
				// always check the options, in case they get reset without page reload
				var checkOptions = true;
					/*
					var checkOptions = !window.analytics.reporting.options.fromDate || 
						!window.analytics.reporting.options.toDate || 
							!window.analytics.reporting.options.daysReporting;
							*/

				// var timeout = 0;
				if (checkCreds) {
					// console.log('no API credentials, requesting them');
					// timeout = 50;
					(function() {
		     	        var event = document.createEvent('Event');
		    	        event.initEvent('send-api-data');
		     	        document.dispatchEvent(event);
		     	    })();
				}
				if (checkOptions) {
					// timeout = 50;
					(function() {
		     	        var event = document.createEvent('Event');
		    	        event.initEvent('send-report-options');
		     	        document.dispatchEvent(event);
		     	    })();

		     	    // reset the report OPTIONS
		     	    // DATES
		     	    setTimeout(function(){
		     	    	reportData['reportDescription']['dateFrom'] = window.analytics.reporting.options.fromDate;
		     	    	reportData['reportDescription']['dateTo'] = window.analytics.reporting.options.toDate;
		     	    },10);
				}

				setTimeout(function(){
		     	    callAPI(id, 'Report.Queue', reportData, options, callback);
		     	},60);
				// },timeout);
				
			} catch(e) {
				// console.log(id +  ' error');
			}
		}

		// Generic Rendering a Build functions

		window.analytics.reporting.renderData = function(options, hcDetails, errorCloser) {

			var tar = '#' + options['id']; 
			var tarZone = $(tar + ' .report-chart-zone');
			// var tarTitle = $(tar + ' .report-title');

			tarZone.removeClass('reporting-loader');

			// console.log("RENDERING OPTIONS");
			// console.log(options);
			
			var o = options;

			buildTheChart(o['id'], o['title'], hcDetails, errorCloser);
		
		};

		var buildTheChart = function(id, title, hcDetails, errorCloser){
			
			var tar = '#' + id; 

			var tarZone = $(tar + ' .report-chart-zone');
			var tarTitle = $(tar + ' .report-title');

			if (hcDetails !== 'bad-data') {
				
				var msg = "track-report-success=" + id;;
				window.postMessage(msg,document.location.href);

				Highcharts.setOptions({
				    lang: {
				        thousandsSep: ','
				    },
				    chart: {
				    	style: {
				            fontFamily: 'Artifakt-book'
				        }	
				    }
				});
				
				tarZone.highcharts(hcDetails);
				// tarZone.attr('style','font-family:Artifakt-book');
		    	tarTitle.html(title);	

		    	// reset the Chart Widths to account for SVG issues
		    	$('.report-chart-zone svg').css('max-width','592px').css('max-height','400px');
		    	$('.report-chart-zone svg').css('width','592px').css('height','400px');

		    	// new piece for SCROLL ONLY
				if (id === "wafer-scroll-report") {
					
					// find the Scroll Report container
					var reportlet = $('#wafer-scroll-report').find('.report-section-chart');	
					// build out a nice little custom indicator
					var howFarInd = $('<div class="waf-report-scroll-how-far-indicator">' + 
						'<span id="waf-report-scroll-page-perc">...</span></div>');
					// append the indicator
					reportlet.append(howFarInd);

					// now add a function to handle the changing scroll
					(function createScrollPercentHandling($){
						
						// function for detecting depth
						function detectScroll(){
							var depth = window.analytics.reporting.getScrollDepth();
							var depthMsg = 'current scroll depth: <b>' + depth + '%</b>';
							// console.log('SCROLL % in view: ' + depth + '%');           
							$('#waf-report-scroll-page-perc').html(depthMsg);
						};
						// run it once
						detectScroll();
						// then set up the monitors
						$(document).on('scroll', function() {
							try {
								detectScroll();
							} catch(err){
								// the resize function didn't work, tis okay
							}
				        });

				        $(window).on('resize', function() {
							try {
								detectScroll();
							} catch(err){
								// the resize function didn't work, tis okay
							}
				        });
					})(jQuery);
				}

			} else {
				
				var msg = "track-report-failure=" + id;
				window.postMessage(msg,document.location.href);

				// tarZone.css('height', '100px');
				tarZone.animate({
				    height: '210px'
				},300)

				var errorDisplay = '<b><i class="waf-report-error-notice">Error</i></b> fetching the <b>' 
					+ title + '</b> report. Please close and try again. You might also want to try reloading the page.'
					+ '<br /><br />'
					+ 'If you feel like this is a bug, you can help out...<br />'
					+ ' simply <b class="waf-report-log-this-bug">let us know</b> by clicking the icon'
					+ '<br /><br />'
					+ '<i id="wafer-report-slack-' + id + '" class="fa fa-slack waf-report-slack" style="font-family:FontAwesome" aria-hidden="true"></i>';
				tarZone.find('.waf-report-error-display').removeClass('hidden');
		    	tarZone.find('.waf-report-error-display').html(errorDisplay);

		    	// reset FontAwesome
		    	$('.wf-active .fa').css('font-family','FontAwesome');
		    	
		    	var thisOne = "#wafer-report-slack-" + id;
		    	$(document).on('click', thisOne, function(e){
		    		letSlackKnow(title, errorCloser);
		    	});
			}
		   
		};

		// helpers for the Adobe Reporting API...

		window.analytics.reporting.help = {};
		var newCloudHelper = function(executeThis,putWhere){

			console.info('CLOUD Helper for: ' + executeThis);

			var u = window.analytics.reporting.user.userName + ":Autodesk"; // 'your.name:Autodesk';
			var s   = window.analytics.reporting.user.userSecret;
			var end = 'api.omniture.com';
			var params = { 
				"reportSuiteID":"autodesk-new-gl"
			};

	    	// makeRequest: function (username, secret, method, params, endpoint, callback, errorHandle)

	    	var handleError = function(errData){
	    		console.log(executeThis + ' FAIL -- -');
				console.log(errData);
				console.log(errData.responseText);
	    	}

			MarketingCloud.makeRequest(u, s, executeThis, params , end,
	    		function(_dataResponse){

	    			console.log(executeThis + ' RESULT -- +');
	    			var elems = JSON.parse(_dataResponse.responseText);
	    			// // console.log(elems);

	    			$.each(elems, function(index, sub){
	    				var id = sub['id'];  
	    				var name = sub['name'];
	    				putWhere[id] = [name];

	    				if (name === "[WAFER] v0 Instances" ||
	    					id == "[WAFER] v0 Instances") {
	    					alert('found (custom) v0 Instances! ' + id);
	    				}
	    				if (name === "e22 - Trial Initiate" ||
	    					id == "e22 - Trial Initiate") {
	    					alert('found e84! ' + id);
	    				}
	    			});

	    			console.log(analytics.reporting.help.elements);
		    		
	    		}, handleError);

		}

		var letSlackKnow = function(report, errorCloser){

			// var channel = '#wafer-reporter-bug';
			var channel = '#wafer-bug';
			var user = window.analytics.reporting.user.userName;
			var text = '_quick-log-feature_: the *' + report + '* Report failed on: ' + encodeURI(document.location.href);

			// then fire it off to SLACK
			$.ajax({
	        	url: 'https://hooks.slack.com/services/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',
		        type: 'POST',
		        data: {
		        	"payload" :
		        	JSON.stringify({
		        		"channel" : channel,
					 	"username" : user, 
						"text" : text, 
						"icon_emoji" : ":adsk:"
					})
				},
		        success: function (response) {
		           	var msg = "track-contact-form-success=report-slack-button";
					window.postMessage(msg,document.location.href);
					alert("thanks!");
					if (errorCloser) $(errorCloser).remove();
		        },
		        error: function (e) {
		        	var msg = "track-contact-form-failure=report-slack-button";
					window.postMessage(msg,document.location.href);
		            // console.log("ERROR!");
		            // console.log(e);
		            alert("sorry, something seems to be wrong with Slack...");
		            if (errorCloser) $(errorCloser).remove();
		        }
		    }); 
		}

		window.analytics.reporting.help.elements = {};
		window.analytics.reporting.help.getElements = function(){
			newCloudHelper('Report.GetElements',analytics.reporting.help.elements);			
	   	};
	   	window.analytics.reporting.help.metrics = {};
		window.analytics.reporting.help.getMetrics = function(){
			newCloudHelper('Report.GetMetrics',analytics.reporting.help.metrics);			
	   	};

	   	window.analytics.wafer.reportChartsSet = true;

	   	window.analytics.reporting.getScrollDepth = function(){
	   		var windowHeight = $(window).height(),
	   			docHeight = $(document).height(),
            	scrollTop = $(document).scrollTop();
            
            var scrollTotal = scrollTop + windowHeight;
            
            var percScroll = Math.round(100 * (scrollTotal / docHeight));
			
			return percScroll;
	   	};

	}
	else {
		// something here...
		// console.info('ReportCharts JS already loaded');
	}

})(jQuery);