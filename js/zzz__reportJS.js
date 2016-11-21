
(function buildAPIcode($){

// jQuery styling for Date Picker
(function attachCSS(){
	var head = document.head;
	var styleSheet = document.createElement('link');
	styleSheet.type = 'text/css';
	styleSheet.rel = 'stylesheet';
	styleSheet.href = '//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css';
	head.appendChild(styleSheet);
})();

// jQuery UI
(function jQueryJS(){
	var head = document.head;
	var jquery = document.createElement('script');
	jquery.type = 'text/javascript';
	jquery.src = '//code.jquery.com/ui/1.11.4/jquery-ui.js';
	head.appendChild(jquery);
})();

// Highcharts
(function highCharts(){
	var head = document.head;
	var highC = document.createElement('script');
	highC.type = 'text/javascript';
	highC.src = '//code.highcharts.com/highcharts.js';
	head.appendChild(highC);
})();

// API Reporting JS
(function apiPullJS(){
	var head = document.head;
	var apiPullJS = document.createElement('script');
	apiPullJS.type = 'text/javascript';
	apiPullJS.src = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/js/apiPull.js';
	head.appendChild(apiPullJS);
})();

/*
// Date Picker JS
(function attachDragDropJS(){
	var head = document.head;
	var datePicker = document.createElement('script');
	datePicker.type = 'text/javascript';
	datePicker.src = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/js/datepicker.js';
	head.appendChild(datePicker);
})();
*/

window.analytics = window.analytics || {};
window.analytics.reporting = window.analytics.reporting || {};
window.analytics.reporting.user = {};

// MESSAGE RELAYING

	(function() {
        var event = document.createEvent('Event');
        event.initEvent('send-api-data');
        document.dispatchEvent(event);
    })();

    document.addEventListener("setApiData", function(data) {
	    // console.log(data.detail);
	    window.analytics.reporting.user.userName = data.detail.user;
	    window.analytics.reporting.user.userSecret = data.detail.secret;
	});

// END RELAY MESSAGING


setTimeout(function(){

var _reportSkeleton = $('<div id="waf-report-edge">\n	<div id="waf-report-block">\n	<div id="report-tool-title-bar">\n		<img id="report-tool-logo" src="chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/imgs/reportLogo.png">\n		<img id="waf-report-close-button" src="chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/imgs/closeX.png"></img>\n	</div>\n	<div id="report-menu">\n		<div class="report-menu-option-active" id="reporter-options" data-reporter-menu="false">Options</div>\n		<div class="report-menu-option-active" id="reporter-chart" data-reporter-menu="false">Chart</div>\n	</div>\n	<div id="report-section-options" class="report-section-container">\n		<div id="report-options-dates">\n			<div id="reporting-tool-descrip">Use the following options to generate a report for this page</div>\n			<hr id="reporting-line-break" />\n			<div class="report-options-description" id="initial-report-option">D A T E S</div>\n				<div class="calendar-pickers"><input type="text" id="datepicker-from" value="start date"></div>\n				<div class="calendar-pickers"><input type="text" id="datepicker-to" value="end date"></div>\n			\n			<div class="report-options-description">M E T R I C S</div>\n			<div>\n				<div data-report-metric="pageviews" data-report-metric-active="false">Page Views</div>\n	  			<div data-report-metric="visits" data-report-metric-active="true">Visits</div>\n	  			<div data-report-metric="visitors" data-report-metric-active="false">Visitors</div>\n			</div>\n			<div class="report-options-description">G R A N U L A R I T Y</div>\n			<div>\n				<div data-report-granularity="day" data-report-granularity-active="true">Daily</div>\n	  			<div data-report-granularity="month" data-report-granularity-active="false">Monthly</div>\n			</div>\n			<hr id="reporting-line-break" />\n			<div id="run-the-reporting" data-report-run-report="false">Run Report</div>\n		</div>\n	</div>\n	<div id="report-section-chart" class="report-section-container">\n		<div id="report-zone">\n		</div>\n	</div>\n	<div id="report-invalid-page" class="report-section-container">\n		<p>\n		THIS PAGE IS INVALID\n		</p>\n	</div>\n	</div>\n	<!-- DRAGGABLE PIECES -->\n	<div id="waf-report-drag-top"></div>\n	<div id="waf-report-drag-bottom"></div>\n</div>');
$('body').append(_reportSkeleton);	

// RENDERING AND OTHER FUNCTIONALITY

// window.analytics.reporting.active = true;
window.analytics.reporting.datasets = {};
window.analytics.reporting.options = {
	'page' : '',
	'metrics' : ['visits'],
	'granularity' : 'day'
};

$(function() {
	var validPage = false;
	window.validReportingPage = false;
	// old school pageNames
	if (typeof adsk != "undefined") {
		if (adsk.s) {
			if (adsk.s.pageName) {
				window.validReportingPage = validPage = window.adsk.s.pageName;
			}
		}
	}
	// foundation pageNames
	if (window.digitalData) {
		if (window.digitalData.page) {
			if (window.digitalData.page.pageName) {
				window.validReportingPage = validPage = window.digitalData.page.pageName;
			}
		}
	}
	
	if (validPage) {
		analytics.reporting.options.page = validPage;
		$('.report-options').show();
	}
	else {
		$('#report-menu').hide();
		$('#report-invalid-page').show();
		
	}
    $( "#datepicker-from" ).datepicker();
    $( "#datepicker-to" ).datepicker();
});

/* requires wsse.js, marketing_cloud.js, and jQuery */
//var reportID;

	


	/*** API Functionality ***/

	var callTries = 0;
	var _checkAPIcall = function(whichSet, _u, _s, _rID, _eP) {
		callTries += 1;
		// console.log('call number: ' + callTries);
		setTimeout(function(){
			// console.log('running a GET for: ' + whichSet);
			if (analytics.reporting.datasets[whichSet]['ready']) return;
			else {
			//	try {
				(function GOOO(){
					MarketingCloud.makeRequest(_u, _s, 'Report.Get', { "reportID" : _rID }, _eP,
			    		function(_dataResponse){
			    			
			    			var tempData2 = JSON.parse(_dataResponse.responseText);
			    			// console.log(tempData2);
			    			var errorCheck = typeof tempData2['error'] !== "undefined" ? (tempData2['error'] == 'report_not_ready' ? true : false) : false;
			    			if (!errorCheck) {
			    				analytics.reporting.datasets[whichSet]['data'] = tempData2.report;
				    			analytics.reporting.datasets[whichSet]['ready'] = true;
				    			// _buildTrendedData(tempData2.report,'_linkTracking','v21');

				    			// console.log(whichSet + ' DATASET below for try #' + callTries);
				    			// console.log(tempData2.report);
				    			renderData(checkStatus(), tempData2.report);
			    			}
			    		}, function(){
			    			// console.log('the call failed...');
			    			_reRunReportGet(whichSet, _u, _s, _rID, _eP);			
			    		});
				})();
					
			//	}
			//	catch(e) {
			//		// console.log('the call failed...');
			//		_reRunReportGet(whichSet, _u, _s, _rID, _eP);
			//	}
			}
		},500);				
	};

	var _reRunReportGet = function(whichSet, _u, _s, _rID, _eP) {
		_checkAPIcall(whichSet, _u, _s, _rID, _eP);
	};

	(function validateAPI(){
		// console.log('validating the api...');
		if (typeof chrome !== 'undefined') {
			// console.log('api validation: chrome exists');
			if (typeof chrome.extension !== 'undefined') {
				// console.log('api validation: chrome.extension exists');
				var getUser = 'sendApiUser=true';
				chrome.extension.sendMessage(getUser, function(response) {
	  				// console.log('getUser response');
	  				// console.log(response);
	   			});
	   			var getSecret = 'sendApiSecret=true';
				chrome.extension.sendMessage(getSecret, function(response) {
	  				// console.log('getSecret response');
	  				// console.log(response);
	   			});
			}	
			if (typeof chrome.storage !== 'undefined') {
				// console.log('api validation: chrome.storage exists');
				if (typeof chrome.storage.local !== 'undefined') {
					// console.log('api validation: chrome.storage.local exists');
					// console.log(chrome.storage.local);
						
				}
			}	
		}
	})();
		

	// the ACTUAL function to call the Adobe Analytic API
	var _callAPI = function(_rN, _m, _p) {

		var username = window.analytics.reporting.user.userName + ":Autodesk"; // 'your.name:Autodesk';
		var secret   = window.analytics.reporting.user.userSecret;
		var method   = _m;
		var endpoint = 'api.omniture.com';
		var params   = _p;

		// console.log('making next request: ' + _rN);
		MarketingCloud.makeRequest(username, secret, method, params, endpoint, 
			function(response) {
				// split out the data, and find the Report ID
		    	var tempData = JSON.parse(response.responseText);
		    	var tempReportID = tempData.reportID;
		    	
		    	// build out the data Object
		    	analytics.reporting.datasets[_rN] = {};
		    	analytics.reporting.datasets[_rN]['data'] = {}; 
		    	analytics.reporting.datasets[_rN]['reportID'] = tempReportID;
		    	analytics.reporting.datasets[_rN]['ready'] = false;
    	
    			// console.log("Report is QUEUED: " + _rN + ' ' + tempReportID);

    			_checkAPIcall(_rN,username,secret,tempReportID,endpoint);
			});

		return false;

	};

	// a public function to pass everything through...
	var callAPI = function(_reportName, _method, _params) {
		var _reportName = _reportName || 'no-name';
		var _method = _method || false;
		if (_method) {
			_callAPI(_reportName, _method, _params);	
		}
	}

	var runTheReportOnClick = function(_from, _to, _pageName) {
		
		/*
		var blobOfEval = [
		  "utilitynav > adsk:en:home > sign in",
		  "utilitynav > adsk:en:home > my account"
		];

		$.each(blobOfEval, function(key,blah){
			blah = encodeURI(blah);
		});
		*/

		var encodePage = encodeURI(_pageName);


		var reportMetrics = [];
		$.each(window.analytics.reporting.options['metrics'], function(index,val){
			var newMet = { 'id' : val };
			reportMetrics.push(newMet);
		});

		// content tracking demo report PARAMS
		var page_report = { 
			"reportDescription":{
				"reportSuiteID":"autodesk-new-gl",
		        // "reportSuiteID":"autodeskdevsite",
		        "dateFrom" : _from,
		        "dateTo" : _to,
		        "dateGranularity" : analytics.reporting.options['granularity'],
		        "elements":[
		            { 
		            	"id" : "page" ,
		            	"selected":[encodePage]
		        	}
		        ],
		        // no selections here
		        "metrics": reportMetrics
		    }
		};


		try {
			callAPI('page-report', 'Report.Queue', page_report);
		} catch(e) {
			// console.log('page-report');
		}

	};

	// TOOL CONTROLS

	$('[data-reporter-menu]').on('click', function(e){
		if ($(e.target).hasClass('report-menu-option-inactive')) return;
		var thisSection = (($(e.target).attr('id')).split('-'))[1];
		if ($('#report-section-' + thisSection).is(':visible')) return;
		else {
			var hideSection = $('.report-section-container:visible');
			$('#reporter-' + ((hideSection.attr('id')).split('-'))[2]).attr('data-reporter-menu','false')
			hideSection.slideToggle(128,function(){
				$('#reporter-' + thisSection).attr('data-reporter-menu','true');
				$('#report-section-' + thisSection).slideToggle(128);
			});
		}
	});


	$('#run-the-reporting').on('click', function(){
		var pageName = window.validReportingPage;
		var fromDate = new Date($('#datepicker-from').val());
		var toDate = new Date($('#datepicker-to').val());

		var realFrom = (fromDate.getFullYear() + '-' + (fromDate.getMonth() + 1) + '-' + fromDate.getDate()).toString();
		var realTo = (toDate.getFullYear() + '-' + (toDate.getMonth() + 1) + '-' + toDate.getDate()).toString();

		var isValid = fromDate < toDate ? true : false;
		if (isValid) {
			runTheReportOnClick(realFrom, realTo, pageName);
			$('#report-zone').addClass('reporting-loader');
			$('#reporter-chart').removeClass('report-menu-option-inactive').addClass('report-menu-option-active');
			$('#reporter-chart').trigger('click');
		}
		else {
			alert("please check your dates and be sure to select them in the proper order.");
		}
	});

	$('[data-report-metric]').on('click', function(e){
		var newState = $(e.target).attr('data-report-metric-active') == "true" ? "false" : "true";
		$(e.target).attr('data-report-metric-active',newState);
		// process the selected metrics
		var selections = $('[data-report-metric-active="true"]');
		var newSelects = [];
		$.each(selections,function(index,obj){
			var pushThis = $(obj).attr('data-report-metric');
			newSelects.push(pushThis);
		});
		window.analytics.reporting.options['metrics'] = newSelects;
	});

	$('[data-report-granularity]').on('click', function(e){
		var useThis = $(e.target).attr('data-report-granularity-active') == "true" ? false : "true";
		if (useThis) {
			$('[data-report-granularity-active="true"]').attr('data-report-granularity-active',"false");
			$(e.target).attr('data-report-granularity-active',useThis);	
			window.analytics.reporting.options['granularity'] = $(e.target).attr('data-report-granularity');
		}
		
	});

	// REMOVE BUTTON
	$('#waf-report-close-button').on('click', function(e){
		e.preventDefault();
		$('#waf-report-edge').remove();
		//analytics.reporting.active = false;
	});


	
	// PEP / DRAG & DROP
	// add in the PEP Drag-and-Drop functionality
	(function attachDragDropJS(){
		var head = document.head;
		var dragJS = document.createElement('script');
		dragJS.type = 'text/javascript';
		dragJS.src = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/js/pep.js';
		head.appendChild(dragJS);
	})();


	window.reportToolMove = false;

	$('#waf-report-drag-top, #waf-report-drag-bottom').on('mousedown touchstart', function(e){
		e.preventDefault();
		window.reportToolMove = true;
		var $pep = $('#waf-report-edge');
		$pep.pep({ 
			constrainTo : 'window', 
			place : false, 
			disableSelect : false,
			overlapFunction: false,
			useCSSTranslation: false
		}); 

	});
	$(document).on('mouseup touchend', function(e){
		// e.preventDefault();
		if (reportToolMove) {
			var $pep = $('#waf-report-edge');
			$.pep.unbind( $pep ); 
			$('#waf-report-edge').css('position','fixed');
			reportToolMove = false;
		}
		
	});

	// then SHOW THE TOOL
	setTimeout(function(){
		$('#waf-report-block').show();
	},300);
	
},900);


})(jQuery);
