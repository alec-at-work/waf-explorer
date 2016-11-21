
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
	window.analytics.reporting.user = {};

	// MESSAGE RELAYING

		(function() {
	        var event = document.createEvent('Event');
	        event.initEvent('send-api-data');
	        document.dispatchEvent(event);
	    })();

	    document.addEventListener("setApiData", function(data) {
		 //   // console.log(data.detail);
		    window.analytics.reporting.user.userName = data.detail.user;
		    window.analytics.reporting.user.userSecret = data.detail.secret;
		});

	// END MESSAGE RELAYING
		
	analytics.reporting.checks = analytics.reporting.checks || {};
	analytics.reporting.checks.validPage = false;

	analytics.reporting.datasets = {};

	
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

	analytics.reporting.checks.validPage = analytics.reporting.checks.validPage.trim();

	// otherwise say it's unsupported....
	

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
			'title' : 'Traffic - Past 30 Days', 
			'position' : 1,
			'report-link' : 'https://wiki.autodesk.com/x/o9JVDg',
			'report-info' : 'this is the traffic report blah blah',
			'valid' : true,
			'launched' : false
		},
		'wafer-navigation-report' : {
			'title' : 'Navigation Sources - Past 30 Days', 
			'position' : 2,
			'report-link' : 'https://wiki.autodesk.com/x/39JVDg',
			'report-info' : 'this is the campaigns report blah blah',
			'valid' : true,
			'launched' : false
		},
		'wafer-industry-report' : {
			'title' : 'Demandbase Industry Traffic - Past 30 Days', 
			'position' : 3,
			'report-link' : 'https://wiki.autodesk.com/x/_NJVDg',
			'report-info' : 'this is the industry report blah blah',
			'valid' : true,
			'launched' : false
		},
		'wafer-mobile-report' : {
			'title' : 'Visitor Device Type - Past 30 Days', 
			'position' : 4,
			'report-link' : 'https://wiki.autodesk.com/x/-dJVDg',
			'report-info' : 'this is the mobile tech report blah blah',
			'valid' : true,
			'launched' : false
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

		var obj = window.analytics.reporting.types[deploy];
	//	// console.log('deploying the [obj] below');
	//	// console.log(obj);

		window.analytics.screens.ready = true;

		var xStub = reportSkeleton(deploy);	// ,obj['title']);
		$('html').append(xStub);

		// reset Font Awesome elements?
		$('.wf-active .fa').css('font-family','FontAwesome');
		// $('.report-section-chart em').css('font-family','FontAwesome');

		window.analytics.reporting.runReport(deploy,request,callback);
	
		chartsArray.push(deploy);

		setTimeout(function(){
			restackStubs(deploy,true);
		},10);

		analytics.screens.attachPep(deploy,false);
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
	
})(jQuery);