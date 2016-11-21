
// detect and Trigger the EXPLORER
// if site is not on BLACKLIST

// // console.info("PAGE LOAD RUN JS");
// // console.info("jQuery check #1: " + typeof jQuery);

window.analytics = window.analytics || {};
window.analytics._findMyJQuery = false;
window.analytics._myJQueryVersion = false;

var blackList = [
	'saml.autodesk.com',
	'share.autodesk.com',
	'tracker.autodesk.com',
	'wiki.autodesk.com',
	'connect.autodesk.com',
	'meet.autodesk.com',
	'mail.o365.autodesk.com',
	'engineering.autodesk.com',
	'ariba.autodesk.com',
	'aicconnect.autodesk.com',
	'bi.autodesk.com',
	'git.autodesk.com',
	'ideas.autodesk.com',
	'jira.autodesk.com',
	'mktplanner.autodesk.com',
	'analytics.autodesk.com',
	'accounts.autodesk.com',
	'account.autodesk.com',
	'internal.autodesk.com',
	'marketing.autodesk.com',
	'splunk.cloud.autodesk.com',
	// added 7.21.16
	'mktplanner-stg.autodesk.com',
	'bistg.autodesk.com',
	// added 9.8.16
	'mydesk.autodesk.com',
	// added 10.4.16
	'cq-feedback.autodesk.com'
];

var passBlackList = true;

for (index in blackList) {
	var blackSite = blackList[index];
	var thisSiteHost = window.top.document.location.host;
	var thisSiteHostName = window.top.document.location.hostname;		
	if (blackSite === thisSiteHostName || blackSite === thisSiteHost) {
		passBlackList = false;
	}
}


// if (passBlackList) console.info('WAFER --> valid site');

// Font Awesome CSS (append it NOW)
var fontAwesome = document.createElement('link');
fontAwesome.href = chrome.extension.getURL('/css/font-awesome.css');
fontAwesome.type = 'text/css'
fontAwesome.rel = 'stylesheet'
fontAwesome.id = 'wafer-font-awesome-css';
// (window.top.document.head||window.top.document.documentElement).appendChild(fontAwesome);

/*
(function attachStyleSheet(){
	var link = document.createElement('link');
	link.type = 'text/css';
	link.rel = 'stylesheet';
	link.href = 'chrome-extension://obfcndackhiakjaaffgmdigimdldoepa/css/font-awesome.css';
	window.top.document.head.appendChild(link);
})();
*/

// Notifications CSS
var notifCSS = document.createElement('link');
notifCSS.href = chrome.extension.getURL('notifications.css');
notifCSS.type = 'text/css'
notifCSS.rel = 'stylesheet'
notifCSS.id = 'wafer-notifications-css';
// (window.top.document.head||window.top.document.documentElement).appendChild(notifCSS);


// Cookie functions
function getCookie(name) {
 	var value = "; " + document.cookie;
  	var parts = value.split("; " + name + "=");
  	if (parts.length == 2) return parts.pop().split(";").shift();
};
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
};
function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

// if the site is NOT on the BLACKLIST, activate the WAFER...
if (passBlackList) {
	
	// (window.top.document.head||window.top.document.documentElement).appendChild(fontAwesome);

	function checkSpoofForGEO(){
		chrome.storage.local.get(function(result){
		//	// console.log(result);

			console.info('CHROME LOCAL STORAGE RESULT');
			console.info(result);	
			localStorage.setItem('waferData',JSON.stringify(result));

			var geoSpoof = false;
			var ipMismatch = true;
			
			// GEO Spoofs
			if (result['geoSpoofActive'] === true) {
				geoSpoof = true;
			}
			if (result['geoSpoofIP']) {
				var spoofIp = result['geoSpoofIP'];
				var dbStr = localStorage['dmdbase_full'];
				if (typeof dbData !== "undefined") {
					var dbData = dbStr.split(':');
					var dbIP = dbData[dbData.length - 1];
					var isAnIp = (dbIP.split('.')).length === 4 ? true : false;
					
					if (isAnIp) {
						if (spoofIp === dbIP) {
							ipMismatch = false;
						}
					}
				}
				else {
					// alert('nothing htere!');
				}
			}
			if (geoSpoof && ipMismatch) {
				// do the GEO Spoof
			}

			/*

				... updated logic to only check against IP address in Local Storage
				and the one set from Local Storage to see if it needs to run....

					// GEO Spoof has been processed
					var goSpoof = false;
					if (typeof result['geoSpoofSet'] !== "undefined") {
					//	// console.log('in here...');
						var check = result['geoSpoofSet'];
					//	// console.log(check);
						if (check === false) {
							goSpoof = true;
						} 
					}

				//	// console.log('WAFER DEBUG: goSpoof = ' + goSpoof);

					var needsGeoSpoof = false;
					if (geoSpoof || goSpoof) {
				//		// console.log("WAFER DEBUG - GEO spoof ACTIVE");
						// check if there's a GEO Spoof active and if needed clear old data	
						var checkSpoof = getCookie('dmdbase_spoof');
						if (typeof checkSpoof === "undefined" || goSpoof) {
				//			// console.log("WAFER DEBUG - needs GEO Spoof");
							needsGeoSpoof = true;
						} else {
				//			// console.log("WAFER DEBUG - no need for GEO Spoof");
						}
						if (needsGeoSpoof) {

				//			// console.log("WAFER DEBUG - deleting old data and setting dmdbase_spoof");

							// delete data that's already stored
							deleteCookie('dmdbase_flag');
							localStorage.removeItem('s_dmdbase');
							localStorage.removeItem('dmdbase_full');

							// then set the cookie to know to ignore it
							setCookie('dmdbase_spoof',true,1);
							chrome.storage.local.set({'geoSpoofSet': true }, function(details) {

							});
						}
					}
					else {
					//	// console.log("WAFER DEBUG - GEO spoof INACTIVE");
						var clearSpoof = getCookie('dmdbase_spoof');
						if (typeof clearSpoof !== "undefined") {

					//		// console.log("WAFER DEBUG - clearing Spoof data");

							// clear the SPOOFED data
							deleteCookie('dmdbase_flag');
							deleteCookie('dmdbase_spoof');
							localStorage.removeItem('s_dmdbase');
							localStorage.removeItem('dmdbase_full');
						}
						else {
					//		// console.log("WAFER DEBUG - no Spoof data, should be good");
						}
					}
			*/
		});
	};
	checkSpoofForGEO();

	var isItActive = false;
	var rewriteActive = false;
	var injectHeader = false;
	var spaceToInject = false;
	var disableActive = false;
	window.validInject = false;
	window.validRewrite = false;
	window.nexusTestToggle = '';

	var myAnalytics = {
		'dimension1' : 'extension',
		'dimension2' : false
	};

	chrome.storage.local.get(function(result){

		// alert("pageLoadRun - checking Local Storage for Chrome (INJECT)");

		//// console.log('APP data');
		//// console.log(result);

		// window.localStorageExtension = result;

		if (result['debugMode'] === 'on') {
			isItActive = true;
		}
		if (result['injectActive'] === true) {
			injectHeader = true;
		}
		if (result['disableActive'] === true) {
			disableActive = true;
		}
		if (result['rewriteActive'] === true) {
			rewriteActive = true;
		}
		if (result['spaceRewrite']) {
			spaceToInject = result['spaceRewrite'];
		}
		if (result['nexusTest']) {
			if (result['nexusTest'] == "on") {
				window.nexusTestToggle = '-test';
			}
		}

		// code for INJECTING a HEADER
		(function injectHeaderHandler(){
			var injectHeaderCount = 150;
			var injectHeaderLoop = setInterval(function() {

				var headerExists = document.getElementsByTagName('head') ? true : false;

				if (injectHeaderCount > 0 && !headerExists) {
					injectHeaderCount -= 1;

					 // // console.log("<< INJECT LOOP >> -1");

					return;
				}
				else if (headerExists) {
					
					var checkTMS = document.querySelectorAll('script[src^="//nexus.ensighten.com/adsk"]' && 'script[src$="Bootstrap.js"]');
					var nexusExists = checkTMS.length > 0 ?  true : false;
				//	// console.log('nexus Found? ' + nexusExists);

					if (nexusExists) {
						window.validRewrite = true;
					}
					
					if (!nexusExists && spaceToInject && injectHeader && !rewriteActive && !disableActive) {

						window.validInject = true;

						var _here = (window.top.document.head||window.top.document.documentElement);
						var _inject = document.createElement('script');
						_inject.src = ('//nexus' + window.nexusTestToggle + '.ensighten.com/adsk/' + spaceToInject + '/Bootstrap.js').toString();
						
					//	// console.log("<< INJECT LOOP >> actual inject: " + _inject.src);
						_here.appendChild(_inject);

						// track it
						var eventObj = { 
					    	eventCategory: 'Page Load Features',
					    	eventAction: 'Inject Bootstrap',
					    	eventLabel: spaceToInject,
					    	title: window.top.document.href,
					    	page: window.top.document.href
						};
						var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
					   	chrome.extension.sendMessage(trackingInfo, function(response) {
					  
					   	});	
					}

					clearInterval(injectHeaderLoop);
					return false;
				} else {

					// // console.log("<< INJECT LOOP >> clearing the loop ");

					clearInterval(injectHeaderLoop);
					return false;
				}
			}, 20);
		})();
		/*
		if (result['savedState'] === 'yes') {
			alert("found saved state!");
			window.analytics = window.analytics || {};
			analytics.debug = analytics.debug || {};
			analytics.debug.state = analytics.debug.state || {};
			analytics.debug.state._current = JSON.parse(unescape(result['currentState']));
		}
		*/

		// Inject Dimension Set
		if (injectHeader && !rewriteActive ) {
			myAnalytics['dimension2'] = ('inject Bootstrap: ' + spaceToInject).toString();
		}
		// Rewrite Active Set
		else if (!injectHeader && rewriteActive ) {
			myAnalytics['dimension2'] = ('rewrite Bootstrap: ' + spaceToInject).toString();
		}
		// normal mode
		else {
			myAnalytics['dimension2'] = ('no advanced settings').toString();
		}
	});

	/*
	// close button
	var closeX = document.createElement('img');
	closeX.src = chrome.extension.getURL('closeX.png');
	closeX.id = 'wafer-close-img';

	// logo
	var logo = document.createElement('img');
	logo.src = chrome.extension.getURL('exploreLogo.png');
	logo.id = 'wafer-logo-img';
	*/

	// alert("pageLoadRun - building some elements");

	// pep
	var pepJS = document.createElement('script');
	pepJS.src = chrome.extension.getURL('pep.js');
	pepJS.id = 'wafer-pep-js';

	// jQuery minified
	var jqueryJS = document.createElement('script');
	jqueryJS.src = chrome.extension.getURL('jqueryInject.js');
	// jqueryJS.id = 'wafer-jquery-js';

	// style sheet
	var styleSheet = document.createElement('link');
	styleSheet.href = chrome.extension.getURL('vBeta.css');
	styleSheet.type = 'text/css';
	styleSheet.rel = 'stylesheet';
	styleSheet.id = 'wafer-style-css';

	// Artifakt font
	var artifakt = document.createElement('link');
	artifakt.href = chrome.extension.getURL('/css/loadArtifakt.css');
	artifakt.type = 'text/css';
	artifakt.rel = 'stylesheet';

	// WAFER Base
	var waferBase = document.createElement('script');
	waferBase.src = chrome.extension.getURL('/js/waferBase.js');

	// the WAFER Inspector
	var s = document.createElement('script');
	s.src = chrome.extension.getURL('vBeta.js');

	/*
	// WAFER reporting Base
	var reportBase = document.createElement('script');
	reportBase.src = chrome.extension.getURL('/js/reportBase.js');
	*/

	// WAFER reporting Charts
	var reportCharts = document.createElement('script');
	reportCharts.src = chrome.extension.getURL('/js/reportCharts.js');

	
	// WAFER Reporting style sheet
	var reportStyle = document.createElement('link');
	reportStyle.href = chrome.extension.getURL('/css/reportStubStyle.css');
	reportStyle.type = 'text/css'
	reportStyle.rel = 'stylesheet'
	reportStyle.id = 'wafer-report-style-css';

	// Notifications JS
	var notifications = document.createElement('script');
	notifications.src = chrome.extension.getURL('/js/notifications.js');

	// PJAX handling
	var pjax = document.createElement('script');
	pjax.src = chrome.extension.getURL('/js/pjaxFix.js');

	var noticesSent = false;
	var fontLoad = false;
	
	// console.info('WAFER -- > setting Set Interval for INTERACTIVE STATE');


	/** moved the CSS to always inject... **/

	var whereToGo = (window.top.document.head||window.top.document.documentElement);	
	// load the css
	whereToGo.appendChild(fontAwesome);
	whereToGo.appendChild(notifCSS);
	whereToGo.appendChild(styleSheet);
	whereToGo.appendChild(reportStyle);
	whereToGo.appendChild(artifakt);
	fontLoad = true;	


	var readyStateCheckInterval = setInterval(function() {

	//	var whereToGo = (window.top.document.head||window.top.document.documentElement);	
	//	if (!fontLoad) {
		//	console.info('WAFER -- > appending ARTIFAKT');
	//		whereToGo.appendChild(artifakt);
	//		fontLoad = true;	
	//	}
		
		var windowState = window.top.document.readyState;
		if (windowState === "interactive" || windowState === "complete") {
				
		//	console.log("WAFER --> PAGE IS INTERACTIVE");

			// load the jQuery evaluator logic
			setTimeout(function(){
				whereToGo.appendChild(jqueryJS);
			},250);

			/*
	
			moved this out of here, up to always execute

			// load the css
			whereToGo.appendChild(fontAwesome);
			whereToGo.appendChild(notifCSS);
			whereToGo.appendChild(styleSheet);
			whereToGo.appendChild(reportStyle);
			*/

			setTimeout(function(){
			// if (!noticesSent) {
				//// console.log('sending notices...');
				

				// sendNotices();
				// console.log('WAFER --> APPENDING NOTIFICATIONS JS');
				whereToGo.appendChild(notifications);
				
				window.top

				//noticesSent = true;	
				//

				// attach PEP
				whereToGo.appendChild(pepJS);

				// attach Report Base
				whereToGo.appendChild(waferBase);
				setTimeout(function(){
				//	whereToGo.appendChild(reportStyle);
				//	whereToGo.appendChild(reportBase);
					whereToGo.appendChild(reportCharts);
				},50);

				clearInterval(readyStateCheckInterval);
				
				window.__waferBaseSet = true;

				// insert a way to handle PJAX pages
				try {
					whereToGo.appendChild(pjax);
				} catch(err) {

				}

				/*
				setTimeout(function(){

				    if (isItActive) {
				    //	var whereToGo = (window.top.document.head||window.top.document.documentElement);
					//	whereToGo.appendChild(logo);
					//	whereToGo.appendChild(closeX);
						whereToGo.appendChild(styleSheet);

						setTimeout(function(){
						//	alert("pageLoadRun - appending the WAFER");
							// whereToGo.appendChild(pepJS);
							whereToGo.appendChild(s);
						},500);

						// analytics tracking...
						var viewMsg = ('_gaView=' + window.top.document.location).toString();
						chrome.extension.sendMessage(viewMsg, function(response) { });

						var eventObj = { 
					    	eventCategory: 'Page Load Features',
					    	eventAction: 'Launch Wafer',
					    	eventLabel: '',	//myAnalytics.dimension2,
					    	title: window.top.document.href,
					    	page: window.top.document.href
					    	//,
						    //dimension1: myAnalytics['dimension1'],
						    //dimension2: myAnalytics['dimension2']
						};
						var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
							// // console.log('passing this Event to Analytics Tracking >>> ');
							// // console.log(eventObj);
					   	chrome.extension.sendMessage(trackingInfo, function(response) {
					  
					   	});	
				    }
					// clearInterval(readyStateCheckInterval);
				},500);
				*/
			},500);
		}
	}, 250);

}

