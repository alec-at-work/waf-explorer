
window.____apTr = window.____apTr || false;

if (!window.____apTr) {

	(function buildOutMessageExchange(){

		var frameURL = window.location.href;
		var isTopFrame = (window.parent == window);

		// Receives messages from the inspected page frame and redirects them to the background,
		// building up the first step towards the communication between the backbone agent and the panel.
		window.addEventListener("message", function(event) {
		    // Only accept messages from same frame
		    if (event.source != window) return;

		    var message = event.data;

		    if (typeof message === "string") {

		    	if (message === "track-get-tms-deployments") {

			    	// analytics tracking...
					var eventObj = { 
				    	eventCategory: 'Advanced Features',
				    	eventAction: 'Get TMS Deployments',
				    	eventLabel: 'Manage 1.0 API - Get Deployemnts',
				    	title: document.location.href,
			    		page: document.location.href
					};
					var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
					//	// console.log('passing this Event to Analytics Tracking >>> ');
					//	// console.log(eventObj);
				   	chrome.extension.sendMessage(trackingInfo, function(response) {
				  
				   	});
			    }

			    if (message.indexOf('track-highlighting-of-wats') > -1) {

			    	var msgvals = message.split('=');
			    	var typeHighlighted = msgvals[1];
			    	// analytics tracking...
					var eventObj = { 
				    	eventCategory: 'Advanced Features',
				    	eventAction: 'Highlight Tracking on Page',
				    	eventLabel: typeHighlighted,
				    	title: document.location.href,
			    		page: document.location.href
					};
					var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
					//	// console.log('passing this Event to Analytics Tracking >>> ');
					//	// console.log(eventObj);
				   	chrome.extension.sendMessage(trackingInfo, function(response) {
				  
				   	});
			    }

			    if (message.indexOf('track-contact-form-open') > -1) {

			    	var msgvals = message.split('=');
			    	var formType = msgvals[1];
			    	// analytics tracking...
					var eventObj = { 
				    	eventCategory: 'Advanced Features',
				    	eventAction: 'Contact Form View',
				    	eventLabel: formType,
				    	title: document.location.href,
			    		page: document.location.href
					};
					var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
					//	// console.log('passing this Event to Analytics Tracking >>> ');
					//	// console.log(eventObj);
				   	chrome.extension.sendMessage(trackingInfo, function(response) {
				  
				   	});
			    }

			    if (message.indexOf('track-contact-form-submit') > -1) {

			    	var msgvals = message.split('=');
			    	var formType = msgvals[1];
			    	// analytics tracking...
					var eventObj = { 
				    	eventCategory: 'Advanced Features',
				    	eventAction: 'Contact Form Submit',
				    	eventLabel: formType,
				    	title: document.location.href,
			    		page: document.location.href
					};
					var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
					//	// console.log('passing this Event to Analytics Tracking >>> ');
					//	// console.log(eventObj);
				   	chrome.extension.sendMessage(trackingInfo, function(response) {
				  
				   	});
			    }

			    if (message.indexOf('track-contact-form-success') > -1) {

			    	var msgvals = message.split('=');
			    	var formType = msgvals[1];
			    	// analytics tracking...
					var eventObj = { 
				    	eventCategory: 'Advanced Features',
				    	eventAction: 'Contact Form Success',
				    	eventLabel: formType,
				    	title: document.location.href,
			    		page: document.location.href
					};
					var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
					//	// console.log('passing this Event to Analytics Tracking >>> ');
					//	// console.log(eventObj);
				   	chrome.extension.sendMessage(trackingInfo, function(response) {
				  
				   	});
			    }

			    if (message.indexOf('track-contact-form-failure') > -1) {

			    	var msgvals = message.split('=');
			    	var formType = msgvals[1];
			    	// analytics tracking...
					var eventObj = { 
				    	eventCategory: 'Advanced Features',
				    	eventAction: 'Contact Form Failure',
				    	eventLabel: formType,
				    	title: document.location.href,
			    		page: document.location.href
					};
					var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
					//	// console.log('passing this Event to Analytics Tracking >>> ');
					//	// console.log(eventObj);
				   	chrome.extension.sendMessage(trackingInfo, function(response) {
				  
				   	});
			    }

			    if (message.indexOf('track-report-launch') > -1) {

			    	var msgvals = message.split('=');
			    	var reportType = msgvals[1];
			    	// analytics tracking...
					var eventObj = { 
				    	eventCategory: 'WAFER Reporter',
				    	eventAction: reportType,
				    	eventLabel: 'launch',
				    	title: document.location.href,
			    		page: document.location.href
					};

					var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
					// // console.log('passing this REPORT LAUNCH to Analytics Tracking >>> ');
					// // console.log(eventObj);
				   	chrome.extension.sendMessage(trackingInfo, function(response) {
				  
				   	});
			    }
			    if (message.indexOf('track-report-success') > -1) {

			    	var msgvals = message.split('=');
			    	var reportType = msgvals[1];
			    	// analytics tracking...
					var eventObj = { 
				    	eventCategory: 'WAFER Reporter',
				    	eventAction: reportType,
				    	eventLabel: 'success',
				    	title: document.location.href,
			    		page: document.location.href
					};

					var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
					// // console.log('passing this REPORT LAUNCH to Analytics Tracking >>> ');
					// // console.log(eventObj);
				   	chrome.extension.sendMessage(trackingInfo, function(response) {
				  
				   	});
			    }
			    if (message.indexOf('track-report-failure') > -1) {

			    	var msgvals = message.split('=');
			    	var reportType = msgvals[1];
			    	// analytics tracking...
					var eventObj = { 
				    	eventCategory: 'WAFER Reporter',
				    	eventAction: reportType,
				    	eventLabel: 'failure',
				    	title: document.location.href,
			    		page: document.location.href
					};

					var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
					// // console.log('passing this REPORT LAUNCH to Analytics Tracking >>> ');
					// // console.log(eventObj);
				   	chrome.extension.sendMessage(trackingInfo, function(response) {
				  
				   	});
			    }
			    if (message.indexOf('track-report-info-click') > -1) {

			    	var msgvals = message.split('=');
			    	var reportType = msgvals[1];
			    	// analytics tracking...
					var eventObj = { 
				    	eventCategory: 'WAFER Reporter',
				    	eventAction: reportType,
				    	eventLabel: 'info (wiki) click',
				    	title: document.location.href,
			    		page: document.location.href
					};

					var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
					// // console.log('passing this REPORT LAUNCH to Analytics Tracking >>> ');
					// // console.log(eventObj);
				   	chrome.extension.sendMessage(trackingInfo, function(response) {
				  
				   	});
			    }

				if (message === 'track-wafer-inspector-launch-success') {
		    
				    var eventObj = { 
				    	eventCategory: 'WAFER Inspector',
				    	eventAction: 'Launch Tool',
				    	eventLabel: 'launch success',
					    title: document.location.href,
				    	page: document.location.href
					};
					var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
						//	// console.log('passing this Event to Analytics Tracking >>> ');
						//	// console.log(eventObj);
					   	chrome.extension.sendMessage(trackingInfo, function(response) {
					  
					 });

			    }

				if (message === 'track-wafer-inspector-launch-failure') {
		    
				    var eventObj = { 
				    	eventCategory: 'WAFER Inspector',
				    	eventAction: 'Launch Tool',
				    	eventLabel: 'launch failure',
					    title: document.location.href,
				    	page: document.location.href
					};
					var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
						//	// console.log('passing this Event to Analytics Tracking >>> ');
						//	// console.log(eventObj);
					   	chrome.extension.sendMessage(trackingInfo, function(response) {
					  
					 });

			    }

			}

		    // Only accept our messages
		    if (typeof message != 'object' || message === null || message.target != 'page') return;

		    message.frameURL = frameURL;
		    // chrome.extension.sendMessage(message);
		}, false);

		/*
		if (isTopFrame) {
			// Code to be executed only if this is the top frame content script!

			// Sends a message to the background when the DOM of the inspected page is ready
			// (typically used by the panel to check if the backbone agent is on the page).
			window.addEventListener('DOMContentLoaded', function() {
			    chrome.extension.sendMessage({
			        target: 'page',
			        name: 'ready'
			    });
			}, false);
		}
		*/

	})();

	document.addEventListener("send-api-data", function(data) {
	    chrome.runtime.sendMessage("get-api-data");
	});

	document.addEventListener("send-reporting-options", function(data) {
	    chrome.runtime.sendMessage("get-reporting-options");
	});
	

	// chrome.runtime.addListener(function(message, sender, sendResponse) {
	try {
		chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
		    
			// User Secret and Name
		    if (message.userName && message.userSecret) {

		    	// console.log('in the USERNAME & USERSECRET PASS state');

		    	var uN = false;
			    var uS = false;

		    	if (message.userName) {
			    	uN = message.userName;
			    }
			    if (message.userSecret) {
			    	uS = message.userSecret;
			    }

			    function sendApiData() {
					var apiData = new CustomEvent("setApiData", { 
					  	"detail" : { 	
					  		"user" : uN,
					  		"secret" : uS 
					  	}	
					});
				  	document.dispatchEvent(apiData);
				};
				sendApiData();
		    }

		    // Report Options
		    if (message.from && message.to && message.days) {

		    	// console.log('in the REPORT OPTIONS PASS state');

			    (function sendReportOptions() {
					var reportOption = new CustomEvent("setReportOptions", { 
					  	"detail" : { 	
					  		"from" : message.from,
					  		"to" : message.to,
					  		"days" : message.days
					  	}	
					});
				  	document.dispatchEvent(reportOption);
				})();
		    }
		    

		});
	} catch(errs) {
		// hmmm...
	}
	

	window.____apTr = true;	

}