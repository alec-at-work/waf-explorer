
(function($){


	window.____waferBaseSet = window.____waferBaseSet || false;

	if (!____waferBaseSet) {

		window.analytics = window.analytics || {};
		
		window.analytics.screens = window.analytics.screens || {};
		window.analytics.screens.ready = false;
		window.analytics.screens.array = new Array();

		window.analytics.reporting = window.analytics.reporting || {};

		function enableWindowResize(thisOne,turnOn){
			var turnOn = turnOn || false;
			if (turnOn) {
				$('#' + thisOne + ' .waf-report-edge').resizable({
					grid: [ 20, 10 ],
		  			minWidth: 300,
		  			minHeight: 300,
		  			maxWidth: 640,
		  			maxHeight: 700
				});
			} else {
				$('#' + thisOne + ' .waf-report-edge').resizable( "disable" );	// also "destroy"
			}

		};

		function goResize(go){
			enableWindowResize('first-one',go);
		}

		var offSet = 1;

		window.analytics.screens.restackStubs = function(popIt,initial) {

			// console.log(">> POP this --> " + popIt);
			// // console.log('>>> SCREENS ARRAY');
			// // console.log(analytics.screens.array);

			var initial = initial || false;
			//chartsArray.indexOf(popIt); // selected one
			//chartsArray.push(popIt); // to new ranks

			var chartsArray = window.analytics.screens.array;

			var start = chartsArray.indexOf(popIt);
			//	// console.log(start);
			chartsArray.splice(start, 1);
			
			// // console.log('>>> SCREENS ARRAY AFTER SPLICE');
			// // console.log(chartsArray);
			
			chartsArray.push(popIt);

			// // console.log('>>> SCREENS ARRAY AFTER SPLICE & PUSH');
			// // console.log(chartsArray);

			$.each(chartsArray, function(index,value){
					// console.log('>>> restack');
			//		// console.log(index);
					// console.log(value);
				window.analytics.reporting.types[value]['position'] = index;
				// // console.log('adjusting ' + value + ' to ' + index + ' position');
				if (popIt === value) {
					// console.log("FOUND A MATCH: " + popIt);
					adjustZIndex(value,index,initial);
				}
				else {
					adjustZIndex(value,index,false);	
				}
				// if (popIt !== value) {
				//	initial = false;
				//}
			 	// adjustZIndex(value,index,initial);
			});		

			window.analytics.screens.array = chartsArray;	

		};

		var restackStubs = window.analytics.screens.restackStubs;

		function adjustZIndex(id, start, initial) {

			var start = start * 1000000 + 1000000;
			var id = id || false;

			var thisStub = '#' + id + ' ';

			// // console.log(thisStub + ' will start at ' + start);

			var adjusts = [];

			if (id === 'waf-debug-edge') {
				try { adjusts.push(['#waf-debug-edge', 0]); } catch(err) { };
				try { adjusts.push(['#waf-debug-block', 1]); } catch(err) { };
				try { adjusts.push(['#waf-debug-drag-top', 10]); } catch(err) { };
				try { adjusts.push(['#waf-debug-drag-bottom', 11]); } catch(err) { };
				try { adjusts.push(['#waf-debug-close-button', 20]); } catch(err) { };
			}
			else {
				try { adjusts.push(['.waf-report-edge', 0]); } catch(err) { };
				try { adjusts.push(['.waf-report-deploy-edge', 0]); } catch(err) { };
				try { adjusts.push(['.waf-report-block', 1]); } catch(err) { };
				try { adjusts.push(['.waf-report-drag-top', 10]); } catch(err) { };
				try { adjusts.push(['.waf-report-drag-bottom', 11]); } catch(err) { };
				try { adjusts.push(['.waf-report-close-button', 20]); } catch(err) { };
				try { adjusts.push(['.waf-report-toggler', 20]); } catch(err) { };
				try { adjusts.push(['.waf-report-info', 21]); } catch(err) { };
				try { adjusts.push(['.waf-report-scroll-how-far-indicator', 22]); } catch(err) { };
			}

			$.each(adjusts, function(index,obj){
				var check = $(thisStub + obj[0]);
				// // console.log(thisStub + obj[0] + ' --> ' + parseInt(start + obj[1]));
				// $(thisStub + obj[0]).css('position', 'fixed');
				if (id === 'waf-debug-edge') {
					$(obj[0]).css('zIndex', parseInt(start + obj[1]));
				} 
				else {
					$(thisStub + obj[0]).css('zIndex', parseInt(start + obj[1]));	
				}
			});

			var top = 0;
			var right = 0;
			switch (id){
				case 'waf-debug-edge' :
					top = 0;
					right = 0;
					break;
				case 'wafer-traffic-report' :
					top = 1;
					right = 1;
					break;
				case 'wafer-navigation-report' :
					top = 2;
					right = 2;
					break;
				case 'wafer-industry-report' :
					top = 3;
					right = 3;
					break;
				case 'wafer-mobile-report' :
					top = 4;
					right = 4;
					break;	
				case 'wafer-scroll-report' :
					top = 5;
					right = 5;
					break;						
				default: 
					top = 0;
					right = 0;
					break;
			}

			if (initial) {
				// // console.log($(thisStub + '.waf-report-edge').css('right'));
				$(thisStub + '.waf-report-edge').css('left', parseInt(right * 28) + 'px');
				$(thisStub + '.waf-report-edge').css('top', parseInt(top * 28) + 'px');
				// offSet += 1;
			}
			// // console.log('done z-index-adjust');

		};

		window.debugMove = false;
		window.pepper = false;

		$(document).on('click', '.waf-report-block, #waf-debug-edge', function(e){

			// // console.log('clicked a SCREEN');
			// e.preventDefault();
			var target = $(this);
			var isMain = target.attr('id') === 'waf-debug-edge' ? true : false;
			if (isMain) {
				var stackMe = target.attr('id');
			}
			else {
				var mainholder = target.parents('.waf-report-target');
				var stackMe = mainholder.attr('id');	
			}
			
			if (analytics.screens.ready) {
				// // console.log('registered a CLICK and will RESTACK this one: ' + stackMe);
				restackStubs(stackMe);	
			}
		});

		// PEP
		analytics.screens.attachPep = function(id, main){

			// // console.log('attaching PEP to this: ' + id);
			var main = main || false;
			
			if (!main) {
				var eval = '#' + id + ' .waf-report-drag-top, #' + id + ' .waf-report-drag-bottom';	
			}
			else {
				var eval = '#waf-debug-drag-top, waf-debug-drag-bottom';
			}
			
			// // console.log(eval);
			$(eval).on('mousedown touchstart', function(e){
				// e.preventDefault();
			
				window.debugMove = true;
				// // console.log('ready to DRAG a REPORT SCREEN');
				var target = $(e.target);
				var $pep;
				var stackMe;
				if (!main) {
					$pep = target.parent('.waf-report-edge');
						var mainholder = $pep.parent('.waf-report-target');
					stackMe = mainholder.attr('id');
				} else {
					$pep = $('#waf-debug-edge');
					stackMe ='waf-debug-edge';
				}
				
				restackStubs(stackMe);

				window.pepper = $pep;
				$pep.pep({ 
					constrainTo : 'window', 
					place : false, 
					disableSelect : false,
					overlapFunction: false,
					useCSSTranslation: false
				}); 

			});
		};

		$(document).on('mouseup touchend', function(e){
			// e.preventDefault();
			if (debugMove) {
			//	// console.log('unpepped');
				var $pep = window.pepper;
				$.pep.unbind( $pep ); 
				//	// console.log($('#waf-debug-edge').css('position'));
				window.pepper.css('position','fixed');
				debugMove = false;
			}
			
		});

		// REMOVE BUTTON
		$('#waf-debug-close-button').on('click', function(e){
		//	e.preventDefault();
			var allTrackingOpts = [];
			$.each(analytics.debug.trackObjs, function(index, obj){
				allTrackingOpts.push(analytics.debug.trackObjs[index]);				
			});
			analytics.debug.state.toggleTracking(allTrackingOpts,false);
			$('#waf-debug-edge').remove();
			//	_toggleTracking('off');
			// reset the DEBUG ACTIVE state
			analytics.debug.active = false;
			/*
			var closeObj = { 
		    	eventCategory: 'Tool Navigation',
		    	eventAction: 'Closed the Tool',
		    	eventLabel: '"X" button - Top Right'	
			};
			*/
			//analytics.debug.tracking.event(closeObj);
			// return false;
		});

		// REMOVE BUTTON for MAIN
		$(document).on('click', '#waf-debug-close-button', function(e){
		//	e.preventDefault();
			var allTrackingOpts = [];
			$.each(analytics.debug.trackObjs, function(index, obj){
				allTrackingOpts.push(analytics.debug.trackObjs[index]);				
			});
			analytics.debug.state.toggleTracking(allTrackingOpts,false);
			$('#waf-debug-edge').remove();
			//	_toggleTracking('off');
			// reset the DEBUG ACTIVE state
			var index = analytics.screens.array.indexOf('waf-debug-edge');
			if (index > -1) {
			    analytics.screens.array.splice(index, 1);
			}
			analytics.debug.active = false;
			/*
			var closeObj = { 
		    	eventCategory: 'Tool Navigation',
		    	eventAction: 'Closed the Tool',
		    	eventLabel: '"X" button - Top Right'	
			};
			*/
			//analytics.debug.tracking.event(closeObj);
			// return false;
		});

		// REMOVE BUTTON for REPORTER
		$(document).on('click', '.waf-report-close-button', function(e){

			//	e.preventDefault();
		//	// console.log('clicked to CLOSE a REPORT');
			var removeMe = $(this).parents('.waf-report-target');
		//	// console.log(removeMe);
			var unArrayThis = removeMe.attr('id');
		//	// console.log(unArrayThis);
			removeMe.remove();

			window.analytics.reporting.types[unArrayThis]['launched'] = false;
			//	_toggleTracking('off');
			// reset the DEBUG ACTIVE state
			var index = analytics.screens.array.indexOf(unArrayThis);
			if (index > -1) {
			    analytics.screens.array.splice(index, 1);
			}
			/*
			var closeObj = { 
		    	eventCategory: 'Tool Navigation',
		    	eventAction: 'Closed the Tool',
		    	eventLabel: '"X" button - Top Right'	
			};
			*/
			//analytics.debug.tracking.event(closeObj);
			// return false;
		});


		// Build the Basic Charts functionality

		(function buildReporterBase($){

			
			// the HTML stub...
			function reportSkeleton(id){
				var id = id || 'no-id';
				return $('<div class="waf-report-target" id="' + id + '"><div class="waf-report-edge">\n    <div class="waf-report-block">\n        <div class="report-tool-title-bar"> \n        <div class="waf-report-info" >\n        		<i class="fa fa-info-circle" aria-hidden="true"></i>\n        	</div> \n	<div class="waf-report-toggler hidden">\n        		<i class="fa fa-minus-square" aria-hidden="true" data-report-menu-option="reporter-toggle" ></i>\n        	</div>\n        	<img class="waf-report-close-button" src="chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/closeX.png">\n        </div>\n       \n        <!-- CHART DISPLAY -->\n        <div class="report-section-chart report-section-container">\n            <div class="report-chart-zone reporting-loader"><div class="waf-report-error-display hidden"></div></div>\n <div class="report-chart-resize">\n <i class="fa fa-caret-right" data-report-resize-right aria-hidden="true"></i>\n <i class="fa fa-caret-down" data-report-resize-down aria-hidden="true"></i>\n </div>  \n  </div>\n        <div class="report-invalid-page report-section-container">\n            <p> THIS PAGE IS INVALID </p>\n        </div>\n    </div>\n    <!-- DRAGGABLE PIECES -->\n    <div class="waf-report-drag-top"></div>\n    <div class="waf-report-drag-bottom"></div>\n</div></div>');
			};

			// API Reporting JS
			(function apiPullJS(){
				var head = document.head;
				var apiPullJS = document.createElement('script');
				apiPullJS.type = 'text/javascript';
				apiPullJS.src = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/js/apiPull.js';
				head.appendChild(apiPullJS);
			})();

			window.analytics = window.analytics || {};
			window.analytics.reporting = window.analytics.reporting || {};
			
			// USER INFO
			window.analytics.reporting.user = {
				'userName' : false,
				'userSecret' : false
			};	

			// OPTIONS 
			window.analytics.reporting.options = {
				'fromDate' : false,
				'toDate' : false,
				'daysReporting' : false,
				'isCustomRange': false
			};

			window.analytics.reporting.helper = window.analytics.reporting.helper || {};

				window.analytics.reporting.helper.fromDate = function(numDays){
					var numDays = numDays || 31;
					var today = new Date();
					var priorDate = new Date().setDate(today.getDate() - numDays);
					// var priorDate = new Date().setDate(today.getDate()-3);
					var theDate = new Date(priorDate);
				    var dd = theDate.getDate();
				    var mm = theDate.getMonth()+1; 
				    var yyyy = theDate.getFullYear(); 
					return yyyy + '-' + mm + '-' + dd;
				}

				window.analytics.reporting.helper.toDate = function(){
					var today = new Date();
					var yest = new Date().setDate(today.getDate()-1);
					var yesterday = new Date(yest);
				    var dd = yesterday.getDate();
				    var mm = yesterday.getMonth()+1; 
				    var yyyy = yesterday.getFullYear(); 
					return yyyy + '-' + mm + '-' + dd;
				}

			// MESSAGE RELAYING

				// get the USER INFO from the Extensions
				function userInfo(){
			        var event = document.createEvent('Event');
			        event.initEvent('send-api-data');
			        document.dispatchEvent(event);
			      //  console.info('sending REQUEST for API data');
			    };
			    userInfo();

			    document.addEventListener("setApiData", function(data) {
				 //	console.info('recieved RESPONSE for API data');
				 //	console.info(data.detail);
				    window.analytics.reporting.user.userName = data.detail.user;
				    window.analytics.reporting.user.userSecret = data.detail.secret;
				});

				// get the REPORTING OPTIONS from the Extensions
				function reportOptions(){
			        var event = document.createEvent('Event');
			        event.initEvent('send-reporting-options');
			        document.dispatchEvent(event);
			      //  console.info('sending REQUEST for Reporting Options');
			    };
			    reportOptions();

			    document.addEventListener("setReportOptions", function(data) {
				 //	console.info('recieved RESPONSE for Reporting Options');
				 //	console.info(data.detail);

				 	var from,
				 		to,
				 		days,
				 		customRange = false;

				 	if (data.detail.days == "7" || data.detail.days == "30") {

				 		days = data.detail.days;
				 		from = window.analytics.reporting.helper.fromDate(days);
				 		to = window.analytics.reporting.helper.toDate();
				 		
				 	} else if (data.detail.days.indexOf('custom') > -1) {

				 		var countSplit = data.detail.days.split(':');
				 		days = countSplit[1];
				 		from = data.detail.from;
				 		to = data.detail.to;
				 		customRange = true;

				 	}
				 	
				    window.analytics.reporting.options.fromDate = from;
				    window.analytics.reporting.options.toDate = to;
				    window.analytics.reporting.options.daysReporting = days;
				    window.analytics.reporting.options.isCustomRange = customRange;
				});

			// END MESSAGE RELAYING
				
			analytics.reporting.checks = analytics.reporting.checks || {};
			analytics.reporting.checks.validPage = false;

			analytics.reporting.datasets = {};

			
			window.analytics.reporting.checkValidPage = function(){
				// foundation pageNames
				if (window.digitalData) {
					if (window.digitalData.page) {
						if (window.digitalData.page.pageName) {
							analytics.reporting.checks.validPage = window.digitalData.page.pageName;
						}
					}
				}
				// old school pageNames
				else if (typeof adsk !== "undefined") {
					if (adsk.s) {
						if (adsk.s.pageName) {
							analytics.reporting.checks.validPage = window.adsk.s.pageName;
						}
					}
				}
				// check the S object
				else if (typeof s !== "undefined") {
					if (s.pageName) {
						analytics.reporting.checks.validPage = window.s.pageName;
					}
				}

				if (analytics.reporting.checks.validPage) {
					analytics.reporting.checks.validPage = analytics.reporting.checks.validPage.trim();	
				}
				
			}
			
			// otherwise say it's unsupported....
			
			// console.log("IM SETTING THE REPORTING.TYPES ");

			// the codebase
			window.analytics = window.analytics || {};
			window.analytics.reporting = window.analytics.reporting || {};
			window.analytics.reporting.types = {
				'waf-debug-edge' : {
					'title' : false,
					'position' : 0,
					'report-info' : false,
					'valid' : false,
					'launched' : false
				},
				'wafer-traffic-report' : {
					'title' : 'Traffic - ', 
					'position' : 1,
					'report-link' : 'https://wiki.autodesk.com/x/o9JVDg',
					'report-info' : 'this is the traffic report blah blah',
					'valid' : true,
					'launched' : false
					// ,
					// 'fromDate' : false,
					// 'toDate' : false
				},
				'wafer-navigation-report' : {
					'title' : 'Navigation Sources - ', 
					'position' : 2,
					'report-link' : 'https://wiki.autodesk.com/x/39JVDg',
					'report-info' : 'this is the campaigns report blah blah',
					'valid' : true,
					'launched' : false
					// ,
					// 'fromDate' : false,
					// 'toDate' : false
				},
				'wafer-industry-report' : {
					'title' : 'Demandbase Industry Traffic - ', 
					'position' : 3,
					'report-link' : 'https://wiki.autodesk.com/x/_NJVDg',
					'report-info' : 'this is the industry report blah blah',
					'valid' : true,
					'launched' : false
					// ,
					// 'fromDate' : false,
					// 'toDate' : false
				},
				'wafer-mobile-report' : {
					'title' : 'Visitor Device Type - ', 
					'position' : 4,
					'report-link' : 'https://wiki.autodesk.com/x/-dJVDg',
					'report-info' : 'this is the mobile tech report blah blah',
					'valid' : true,
					'launched' : false
					// ,
					// 'fromDate' : false,
					// 'toDate' : false
				},
				'wafer-scroll-report' : {
					'title' : '% of Page Viewed - ', 
					'position' : 5,
					'report-link' : 'https://wiki.autodesk.com/x/AKURDw',
					'report-info' : 'this is the scroll report blah blah',
					'valid' : true,
					'launched' : false
					// ,
					// 'fromDate' : false,
					// 'toDate' : false
				}			

				/*
					,
					'third-one' : {
						'title' : '#3 yall!', 
						'position' : 2	
					}
				*/
			};

			var chartsArray = window.analytics.screens.array;
			var restackStubs = window.analytics.screens.restackStubs;

			window.analytics.reporting.deployReport = function(deploy, request, callback){
			
			//	// console.log(deploy);
			//	// console.log(window.analytics.reporting.types);
			//	// console.log(window.analytics.reporting.types[deploy]);

				if (!window.analytics.reporting.user.userName || !window.analytics.reporting.user.userSecret) {
					(function() {
				        var event = document.createEvent('Event');
				        event.initEvent('send-api-data');
				        document.dispatchEvent(event);
				        
				        // console.info('sending REQUEST for API data');
				    })();
				}

				// for now, always fire the Report Options
				/* if (!window.analytics.reporting.options.fromDate || 
						!window.analytics.reporting.options.toDate || 
							!window.analytics.reporting.options.daysReporting) {
				*/
					(function() {
				        var event = document.createEvent('Event');
				        event.initEvent('send-reporting-options');
				        document.dispatchEvent(event);
				        
				        // console.info('sending REQUEST for API data');
				    })();

				// }

				setTimeout(function(){
					var obj = window.analytics.reporting.types[deploy];
						//	// console.log('deploying the [obj] below');
						//	// console.log(obj);

					// adjust the report title
					if (deploy !== "waf-debug-edge") {
						obj['toDate'] = window.analytics.reporting.options.toDate;
						obj['fromDate'] = window.analytics.reporting.options.fromDate;
						obj['daysReporting'] = window.analytics.reporting.options.daysReporting;
						obj['temp-title'] = false;
						if (window.analytics.reporting.options.isCustomRange) {
							var titleFrom = obj['fromDate'].replace('-','.').replace('-','.');
							var titleTo = obj['toDate'].replace('-','.').replace('-','.');
							obj['title-range'] = titleFrom + ' to ' + titleTo;
							obj['temp-title'] = obj['title'] + titleFrom + ' to ' + titleTo;	
						} else {
							obj['title-range'] = 'Past ' + obj['daysReporting'] + ' Days';
							obj['temp-title'] = obj['title'] + 'Past ' + obj['daysReporting'] + ' Days';	
						}

					}

					window.analytics.screens.ready = true;

					var xStub = reportSkeleton(deploy);	// ,obj['title']);
					$('html').append(xStub);					

					// reset Font Awesome elements?
					setTimeout(function(){
						$('.wf-active .fa').css('font-family','FontAwesome');
						$('#waf-debug-block').css('color','black');
						$('#waf-debug-block').css('webkit-font-smoothing','auto');
						$('#waf-debug-notification-bubble').css('webkit-font-smoothing','auto');
					},5);

					window.analytics.reporting.runReport(deploy,request,callback);
				
					chartsArray.push(deploy);

					// setTimeout(function(){
						restackStubs(deploy,true);
					// },10);

					analytics.screens.attachPep(deploy,false);
				}, 128);
			};	

			function toggleChartView(which) {

				var el = '#' + which + ' .report-section-chart';
				var isVis = $(el).is(":visible") ? true : false;
				var icon = '#' + which + ' [data-report-menu-option="reporter-toggle"]';
				$(el).slideToggle();
				if (isVis) {
					$(icon).removeClass('fa-minus-square');
					$(icon).addClass('fa-plus-square');
				} else {
					$(icon).removeClass('fa-plus-square');
					$(icon).addClass('fa-minus-square');
				}
			};

			$(document).on('click', '[data-report-menu-option]', function(e){
			
				var which = $(e.target).attr('data-report-menu-option');
				var whichReport = $(e.target).parents('.waf-report-target');
				var toggleMe = whichReport.attr('id');

				switch (which){
					case 'reporter-toggle' :
						toggleChartView(toggleMe);
						break;
					default : 
						break;
				};

			});

			$(document).on('click', '.waf-report-info', function(e){
			
				var whichReport = $(e.target).parents('.waf-report-target');
				var thisOne = whichReport.attr('id');

			//	// console.log(thisOne);
				var msg = "track-report-info-click=" + thisOne;
				window.postMessage(msg,document.location.href);

				window.open(analytics.reporting.types[thisOne]['report-link'], '_blank');

				// alert(analytics.reporting.types[thisOne]['report-info']);

			});

			window.analytics.reporting.checkValidPage();

		})(jQuery);

		window.____waferBaseSet = true;

	}
	else {
		// console.log("WAFER BASE ALREADY SET, for REALz");
	}

})(jQuery);