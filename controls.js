	
/*

// Check whether version is updated and, if so, clear data
chrome.runtime.onConnect.addListener(function(details){
    if(details.reason == "install"){
        console.log("This is a first install!");
    }else if(details.reason == "update"){
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
});
*/

/***********************
	GOOGLE ANALYTICS
*************************/

var service = analytics.getService('wafer_app');
var tracker = service.getTracker('UA-60717701-8');
// secretIdAnon
window.__sID = null;

// Send Events and Dimensions
var sendEvent = function(category, action, label, title, page, dim1, dim2) {
	// console.log("page for GA is: " + page);

	setTimeout(function(){
		console.log('sending ' + category + ' ' + action);
		console.log(__sID);

		var newEvent = analytics.EventBuilder.builder()
		    .category(category)
		    .action(action)
		    //.title(title)
		    //.page(page)
		   //  .screenName(page)
		   	.dimension({index: 1, value: __sID})
		   	.dimension({index: 2, value: page})
		   	// .dimension()
		    // .dimension(1, __sID)
		    // .dimension(2, page);
		tracker.send(newEvent.label(label));
	},100);
};

var sendView = function(where) {
	console.log('sending this VIEW: ' + where);
	tracker.sendAppView(where);
};

// END OF GOOGLE ANALYTICS CODE

// GET THE LOCAL STORAGE SETTINGS...

window.spaceRewrite = false;
window.spaceInject = false;
window.spaceDisable = false;
window.debugMode = false;
window.rewriteActive = false;
window.injectRewrite = false;
window.geoSpoofActive = false;
window.geoSpoofSet = false;
window.geoSpoofIP = false;
window.geoSpoofName = false;
window.customSpace = false;
window.nexusTestToggle = '';

function showStorage(){
	chrome.storage.local.get(function(result){ 
		console.log(result); return result; 
	});
};

function checkGeoSpoof(){
	chrome.storage.local.get(function(result){ 
		if (result['geoSpoofActive'] === true) {
			console.log('setting GEO Spoof Active!');
			window.geoSpoofActive = result['geoSpoofActive'];
		}
		if (result['geoSpoofSet'] === true) {
			console.log('setting GEO Spoof as SET!');
			window.geoSpoofSet = result['geoSpoofSet'];
		}
	});
};

console.log('running the INITIAL STORAGE CHECK');
chrome.storage.local.get(function(result){
	var injectRewrite = false;
	if (result['spaceRewrite']) {
		window.spaceRewrite = result['spaceRewrite'];
		if (result['spaceRewrite'] === true) window.injectRewrite = true;
		else window.injectRewrite = false;
	}
	if (result['injectActive']) {
		window.spaceInject = result['injectActive'];
		if (result['injectActive'] === true) window.injectRewrite = true;
		else window.injectRewrite = false;
	}
	if (result['debugMode'] === 'on') {
		window.debugMode = 'on';
	//	toggleIcon();
	}
	else {
		window.debugMode = 'off';
	//	toggleIcon();
	}
	if (result['rewriteActive'] === true) {
		window.rewriteActive = true;
	}
	else {
		window.rewriteActive = false;
	}	
	if (result['geoSpoofActive'] === true || result['geoSpoofActive'] === 'true') {
		window.geoSpoofActive = true;	
	} else window.geoSpoofActive = false;

	if (result['geoSpoofIP']) {
		window.geoSpoofIP = result['geoSpoofIP'];	
	}
	if (result['geoSpoofSet']) {
		window.geoSpoofSet = result['geoSpoofSet'];	
	}

	if (result['geoSpoofName']) {
		window.geoSpoofName = result['geoSpoofName'];	
	}

	if (result['nexusTest']) {
		if (result['nexusTest'] == 'on') {
			window.nexusTestToggle = '-test';		
		}
	}
	if (result['disableActive']) {
		window.spaceDisable = true;
	//	toggleIcon();
	}
	//toggleIcon();
});


// ADD LISTENERS TO RELAY COMMANDS

chrome.extension.onMessage.addListener(function(myMessage, sender, sendResponse){

	console.log('MESSAGE = ' + myMessage);

	if (myMessage.indexOf('debugMode') > -1) {
		var newMode = myMessage.split('=');
		// debugMode = (newMode[1].toString());
		//console.log('new debug mode');
		//console.log(debugMode);
		var setMode = newMode[1].toString();
		window.debugMode = setMode;
		chrome.storage.local.set({'debugMode': setMode }, function() {
		  // Notify that we saved.
		 // toggleIcon();
		});
	}

	if (myMessage.indexOf('newSpace') > -1) {
		var newSpace = myMessage.split('=');
		var setSpace = window.spaceRewrite = newSpace[1].toString();
		
		console.log('> New Space >>> ' + window.spaceRewrite);
		chrome.storage.local.set({'spaceRewrite': setSpace }, function(details) {
		  // Notify that we saved.
		  console.log(details);
		});
	}

		if (myMessage === 'clearSpaceData') {
			chrome.storage.local.remove('spaceRewrite', function(details) {
				
			});
			chrome.storage.local.remove('customSpace', function(details) {
			  // Notify that we saved.
			  console.log(details);
			});
			window.spaceRewrite = false;
		}

	if (myMessage === 'customSpace') {
		window.customSpace = true;
		chrome.storage.local.set({'customSpace': window.customSpace }, function(details) {
		  // Notify that we saved.
		  console.log(details);
		});
	}
			if (myMessage === 'clearCustomSpace') {
				window.customSpace = false;
				chrome.storage.local.remove('customSpace', function(details) {
				  // Notify that we saved.
				  console.log(details);
				});
				chrome.storage.local.remove('spaceRewrite', function(details) {
				  // Notify that we saved.
				  console.log(details);
				});
				window.spaceRewrite = false;
			}

	if (myMessage.indexOf('nexusTest') > -1) {
		var nexusTest = myMessage.split('=');
		var nexusToggle = nexusTest[1].toString();
		if (nexusToggle == "on") {
			window.nexusTestToggle = '-test';	
		}
		else if (nexusToggle == "off") {
			window.nexusTestToggle = '';	
		}
		
		console.log('> Nexus Test Toggle >>> ' + nexusToggle);
		chrome.storage.local.set({'nexusTest': nexusToggle }, function(details) {
		  // Notify that we saved.
		  console.log(details);
		});
	}

		if (myMessage === 'clearNexusTest') {
			
			window.nexusTestToggle = '';	
			
			console.log('> Clearing Nexus Test Toggle');
			chrome.storage.local.remove('nexusTest', function(details) {
			  // Notify that we saved.
			  console.log(details);
			});
		}

	if (myMessage === 'rewriteActive') {
		
		window.rewriteActive = true;
		
		if (window.rewriteActive === true || window.spaceInject === true) window.injectRewrite = true;
		else window.injectRewrite = false;
		
		chrome.storage.local.set({'rewriteActive': true }, function(details) {
		  // Notify that we saved.
		  console.log(details);
		 // toggleIcon();
		});
	}

		if (myMessage === 'rewriteOff') {
			window.rewriteActive = false;
			
			if (window.rewriteActive === true || window.spaceInject === true) window.injectRewrite = true;
			else window.injectRewrite = false;
			
			chrome.storage.local.remove('rewriteActive', function(details) {

			//  toggleIcon();
			});
		}
	
	if (myMessage === 'injectActive') {
		
		window.spaceInject = true;
		if (window.rewriteActive === true || window.spaceInject === true) window.injectRewrite = true;
		else window.injectRewrite = false;
		chrome.storage.local.set({'injectActive': true }, function(details) {
		  // Notify that we saved.
		  console.log(details);
		//  toggleIcon();
		});
	}

		if (myMessage === 'injectOff') {
			window.spaceInject = false;
			
			if (window.rewriteActive === true || window.spaceInject === true) window.injectRewrite = true;
			else window.injectRewrite = false;
			
			chrome.storage.local.remove('injectActive', function(details) {

			//  toggleIcon();
			});
		}

	if (myMessage === 'disableActive') {
		
		window.spaceDisable = true;

		if (window.rewriteActive === true || window.spaceInject === true) window.injectRewrite = true;
		else window.injectRewrite = false;

		chrome.storage.local.set({'disableActive': true }, function(details) {
		  // Notify that we saved.
		  console.log(details);
		//  toggleIcon();
		});
		chrome.storage.local.set({'spaceRewrite': 'off' }, function(details) {
		  // Notify that we saved.
		  console.log(details);
		});
		window.spaceRewrite = 'off';
	}

		if (myMessage === 'disableOff') {
			window.spaceDisable = false;
			
			if (window.rewriteActive === true || window.spaceInject === true) window.injectRewrite = true;
			else window.injectRewrite = false;
			
			chrome.storage.local.remove('disableActive', function(details) {

			//  toggleIcon();
			});
		//	chrome.storage.local.remove('spaceRewrite', function(details) {

			//  toggleIcon();
		//	});

		}

	// GEO Spoofing

	if (myMessage.indexOf('geoSpoofIP') > -1) {

		var activeGEO = myMessage.split('=');
		var geoDetes = activeGEO[1].split(';');

		window.geoSpoofIP = geoDetes[0].toString();
		window.geoSpoofName = geoDetes[1].toString();
		window.geoSpoofSet = false;
		window.geoSpoofActive = true;

		console.log('new geoSpoofIP = ' + geoSpoofIP);
		console.log('new geoSpoofName = ' + geoSpoofName);

		chrome.storage.local.set({'geoSpoofIP': geoSpoofIP }, function(details) {
		  console.log(details);
		  // chrome.storage.local.set({'geoSpoofHasRun': "no" }, function(details) { });
		});
		chrome.storage.local.set({'geoSpoofName': geoSpoofName }, function(details) {

		});
		chrome.storage.local.set({'geoSpoofActive': true }, function(details) {
			chrome.storage.local.set({'geoSpoofSet': false }, function(details) {

			});
		});
	}
	if (myMessage === 'clearGeoSpoof') {

		window.geoSpoofIP = '';
		window.geoSpoofName = '';
		window.geoSpoofSet = false;
		window.geoSpoofActive = false;

		console.log('removing geoSpoofIP');
		console.log('removing geoSpoofName');

		chrome.storage.local.remove('geoSpoofIP', function(details) {
		  console.log(details);
		});
		chrome.storage.local.remove('geoSpoofName', function(details) {
		  console.log(details);
		});
		chrome.storage.local.remove('geoSpoofActive', function(details) {
			chrome.storage.local.remove('geoSpoofSet', function(details) {

			});			
		});

	}

	if (myMessage === 'clearApiData') {

		console.log('removing apiUserName');
		console.log('removing apiUserSecret');
		console.log('removing apiUserSecret');
		window.api._user = false;
		window.api._secret = false;
		window.api.validUser = false;
		__sID = null;

		chrome.storage.local.remove('apiUserName', function(details) {
		  	console.log('removed apiUserName');
		  	console.log(details);
		});
		chrome.storage.local.remove('apiUserSecret', function(details) {
			console.log('removed apiUserSecret');
		  	console.log(details);
		});
		chrome.storage.local.remove('apiValidUser', function(details) {
			console.log('removed apiValidUser');
		  	console.log(details);
		});
	
	}

	// Reporting API specific message

	if (myMessage.indexOf('apiUserName') > -1) {
		var userName = myMessage.split('=');
		window.api_userName = userName[1].toString();

		chrome.storage.local.set({'apiUserName': api_userName }, function(details) {
		  // Notify that we saved.
		  console.log(details);
		  setAPIstate('user');

		});
	}

	if (myMessage.indexOf('apiUserSecret') > -1) {
		var userSecret = myMessage.split('=');
		window.api_userSecret = userSecret[1].toString();

		// store the secret "id"
		// var secretIdAnon = api_userSecret.substring(0,6);
		// analytics.tracking.dimension({ 'dimension':'dimension1', 'value': secretIdAnon });
		
		chrome.storage.local.set({'apiUserSecret': api_userSecret }, function(details) {
		  // Notify that we saved.
		  console.log(details);
		  setAPIstate('secret');
		});
	}

	// Reporting OPTIONS Mesages

	if (myMessage.indexOf('reportToDate') > -1) {
		var to = myMessage.split('=');
		window.toDate = to[1].toString();

		chrome.storage.local.set({'reportToDate': toDate }, function(details) {
		  // Notify that we saved.
		  console.log(details);
		  // setAPIstate('user');

		});
	}

	if (myMessage.indexOf('reportFromDate') > -1) {
		var from = myMessage.split('=');
		window.fromDate = from[1].toString();

		chrome.storage.local.set({'reportFromDate': fromDate }, function(details) {
		  // Notify that we saved.
		  console.log(details);
		  // setAPIstate('user');

		});
	}

	if (myMessage.indexOf('reportNumberDays') > -1) {
		var number = myMessage.split('=');
		window.reportDays = number[1].toString();

		chrome.storage.local.set({'reportNumberDays': reportDays }, function(details) {
		  // Notify that we saved.
		  console.log(details);
		  // setAPIstate('user');

		});
	}

	if (myMessage === "clearReportOptions") {


	}


	// Analytics Tracking Message Listeners...

		// EVENTS
		if (myMessage.indexOf('_gaEvent') > -1) {
			var _tD = JSON.parse((myMessage.split('=')[1]));
			console.log("received this EVENT to track...");
			console.log(_tD);
			// category, action, label, title, page, dim1, dim2
			sendEvent(_tD['eventCategory'],_tD['eventAction'],_tD['eventLabel'],_tD['title'],_tD['page'],_tD['dimension1'],_tD['dimension2']);
		}

		// VIEWS
		if (myMessage.indexOf('_gaView') > -1) {
			var _viewURL = (myMessage.split('View='))[1];
			//console.log("received this VIEW to track: " + _viewURL);
			sendView(_viewURL);
		}


		// BUBBLE CLICKS
		// open TMS Settings
		if (myMessage === 'openSettingsTMS') {
			chrome.tabs.create({url: 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/toolSettings.html#tms'});
		}
		if (myMessage === 'openSettingsGEO') {
			chrome.tabs.create({url: 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/toolSettings.html#geo'});	
		}

 });




// END MESSAGING RELAY

window.api = window.api || {};
window.api.validUser = window.api.validUser || false;
window.api._user = window.api._user || false;
window.api._secret = window.api._secret || false;

function setAPIstate(value) {
	var value = value || false;
	switch (value){
		case 'user' :
			window.api._user = true;
			break;
		case 'secret' :
			window.api._secret = true;
			break;
		default : 
			break;
	};
	if (window.api._secret && window.api._user) {
		window.api.validUser = true;

		// set the user ID when all is valid, if not set
		if (__sID !== null) {
			var pID = window.api_userName.split('.');
				var p1 = pID[0].substring(0,1).toLowerCase();
				var p2 = '';
				if (typeof pID[1] !== 'undefined') {
					p2 = pID[1].substring(0,1).toLowerCase();
				}
			__sID = window.api_userSecret.substring(0,6) + '-' + p1 + p2;
		}
	
		chrome.storage.local.set({'apiValidUser': 'true' }, function(details) {
		  // Notify that we saved.
		  console.log(details);
		});
	}
}

var toggleCallBack = function() {
  if(chrome.runtime.lastError) {
    // Something went wrong
    console.warn("Whoops.. " + chrome.runtime.lastError.message);
    console.warn(chrome.runtime.lastError);
    // Maybe explain that to the user too?
  } else {
    console.log("it worked!");
  }
};

function toggleIcon() {

	console.log('Toggle Icon!');
	// if (dM === 'off') chrome.browserAction.setIcon({path:"logoOff2small.png"});
	// else chrome.browserAction.setIcon({path:"logoActivesmall.png"});
	// console.log('debugMode = ' + window.debugMode);
	// console.log('inject OR rewrite = ' + window.injectRewrite);
	var mode = window.debugMode === 'on' ? true : false;
	var extraMode = (window.injectRewrite === true || window.geoSpoofActive === true) ? true : false;

	console.log('WAFER mode = ' + mode);
	console.log('extra mode ? ' + extraMode);
	
	if (mode && extraMode) {
		console.log('activeLogoReal_plus');
		chrome.browserAction.setIcon({ "path" : { "38" : "bar/activeLogoReal_plus.png" } }, toggleCallBack);
	}
	else if (mode && !extraMode) {
		console.log('activeLogoReal');
		chrome.browserAction.setIcon({ "path" : { "38" : "bar/activeLogoReal.png" } }, toggleCallBack);
	}
	else if (!mode && extraMode) {
		console.log('inactiveLogoReal_plus');
		chrome.browserAction.setIcon({ "path" : { "38" : "bar/inactiveLogoReal_plus.png" } }, toggleCallBack);
	}
	else if (!mode && !extraMode) {
		console.log('inactiveLogoReal');
		chrome.browserAction.setIcon({ "path" : { "38" : "bar/inactiveLogoReal.png" } }, toggleCallBack);
	}

};
		
	setTimeout(function(){
		
		if (typeof chrome !== 'undefined') {
			if (typeof chrome.webRequest !== 'undefined') {
				console.log('webRequest READY!');
			}
		}
		else {
			console.log('chrome not found...');
		}

	},10);

console.log('<<>> Chrome WebRequest function is being set...');

// ENSIGHTEN INTERCEPT
// listen for Web Requests and redirect
window.finalSpaceURL;
chrome.webRequest.onBeforeRequest.addListener(
    function(details, callback) {
    	
    	console.log("Ensighten data...");
    	console.log(details);
    	// var URL = details.url;

    	var initialURL = 'https://nexus.ensighten.com/adsk/';
    
    	if (window.nexusTestToggle == "-test") {
    		initialURL = 'https://nexus-test.ensighten.com/adsk/';
    	}

    	console.log('rewrite active? ' + window.rewriteActive);
    	console.log('space disable? ' + window.spaceDisable);
    	console.log('space inject? ' + window.spaceInject);
    	console.log('space= ' + window.spaceRewrite);

		if ((window.rewriteActive === true || window.spaceDisable) && window.spaceInject !== true && window.spaceRewrite) {
			
			// analytics tracking...
			chrome.tabs.getSelected(null, function(tab) { 
			    var URLinUse = tab.url;
			    var action = 'Bootstrap Rewrite';
			    if (window.spaceRewrite === "off") action = 'Bootstrap Disable';
				var eventObj = { 
			    	eventCategory: 'Page Load Features',
			    	eventAction: action,
			    	eventLabel: spaceRewrite,
			    	title: URLinUse,
				    page: URLinUse
				};
					// console.log('passing this Event to Analytics Tracking >>> ');
					// console.log(eventObj);
				sendEvent(eventObj['eventCategory'],eventObj['eventAction'],eventObj['eventLabel'],
					eventObj['title'],eventObj['page'],eventObj['dimension1'],eventObj['dimension2']);
			});

			window.finalSpaceURL = (initialURL + window.spaceRewrite 
				+ '/Bootstrap.js').toString();
			// alert('space rewrite is ON! ' + finalSpaceURL);

			console.log("final ENSIGHTEN URL");
			console.log(window.finalSpaceURL);
		}
		else {
			var pointUrl = (details.url).toString();
			if (window.nexusTestToggle == "-test") {
				pointUrl = pointUrl.replace('nexus.ensighten.com','nexus-test.ensighten.com');
			}
			window.finalSpaceURL = pointUrl;
		}
		return {redirectUrl: window.finalSpaceURL};			
    },
    {
    	urls: ['*://nexus.ensighten.com/adsk/*/Bootstrap.js*','*://nexus-test.ensighten.com/adsk/*/Bootstrap.js*'],
	 	types: ['script'] 
	 		//["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"}
	},
	['blocking']
);
console.log('<<>> Chrome WebRequest Ensighten Listener set...');


// GEO SPOOF
// listen for Demandbase request and redirect
chrome.webRequest.onBeforeRequest.addListener(
    function(details, callback) {
    	
    	var finalDemandURL;
    	console.log('found a Demand-b call');

    	checkGeoSpoof();

    	console.log(window.geoSpoofActive);
    	console.log(window.geoSpoofSet);
    	console.log(details);

    	// var URL = details.url;

    	var runDemandbaseSpoof = false;

    	runDemandbaseSpoof = window.geoSpoofActive && !window.geoSpoofSet;
    	
    	console.info("RUN DEMANDBASE SPOOF ?? " + runDemandbaseSpoof);
    	console.info(window.geoSpoofActive);
    	console.info(window.geoSpoofSet);

		if (runDemandbaseSpoof) {
			console.log("Demandbase GEO Spoof of " + window.geoSpoofName + ' -> ' + window.geoSpoofIP);
			finalDemandURL = (details.url + '&query=' + window.geoSpoofIP).toString();

			// analytics tracking...
			chrome.tabs.getSelected(null, function(tab) { 
			    var URLinUse = tab.url;
				var eventObj = { 
			    	eventCategory: 'Page Load Features',
			    	eventAction: 'Demandbase GEO Spoof',
			    	eventLabel: geoSpoofName,
			    	title: URLinUse,
				    page: URLinUse
				};
					// console.log('passing this Event to Analytics Tracking >>> ');
					// console.log(eventObj);
				sendEvent(eventObj['eventCategory'],eventObj['eventAction'],eventObj['eventLabel'],
					eventObj['title'],eventObj['page'],eventObj['dimension1'],eventObj['dimension2']);
			});

		}
		else {
			// console.log('no GEO Spoof for Demandbase');
			// finalDemandURL = (details.url).toString();
			finalDemandURL = (details.url + '&clear').toString();
		}
		return {redirectUrl: finalDemandURL};			
    },
    {
    	urls: ['*://api.demandbase.com/api/v2/ip.json?&key=079be9510fd6964f419dd8df1a1d2295'],
	 	types: ['xmlhttprequest'] 
	 		//["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"}
	},
	['blocking']
);
console.log('<<>> Chrome WebRequest Listener set for GEO Spoof...');


// handle Wordpress issues when they include jQuery

/*
window.wordPressSite = false;

chrome.webRequest.onBeforeRequest.addListener(
    function(details, callback) {
    	
    	console.info("found WordPress content");
    	console.info(details);
    		
    	window.wordPressSite = true;
    	console.info('wordPressSite is ' + window.wordPressSite);

		return {redirectUrl: window.finalSpaceURL};			
    },
    {
    	urls: ['*://* /wp-content/*'],
	 	types: ['script'] 
	 		//["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"}
	},
	['blocking']
);
*/ 


// use the Main Frame request listener to look for new pages loading....
window.badSite = false;
chrome.webRequest.onBeforeRequest.addListener(
    function(details, callback) {
    	
    	console.log('found this MAIN_FRAME REQUEST');
    	console.log(details.url);
    	if (details.url.indexOf('cadmanager.autodesk.co') > -1) {
			badSite = true;
		}
		else {
			badSite = false;
		}

			
    },
    {
    	urls: ['*://*/*'],
	 	types: ['main_frame'] 
	 		//["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"}
	},
	['blocking']
);
console.log('<<>> Chrome WebRequests WordPress jQuery set...');
chrome.webRequest.onBeforeRequest.addListener(
    function(details, callback) {

    //	chrome.tabs.get(details.tabId, function(tab) {
		    
	    console.info('checking Google AJAX (jQuery) resources');
    	console.info('valid site to turn off jQuery = ' + badSite);
    	
    	if (badSite) {
    		console.info("will turn off Google jQuery for Wordpress");
    		console.info(details);
    		return { redirectUrl: 'off://off.off.off/off.js' };		
    	}
    	else return;

	//	});
    	
    	console.log('past this request');
    	console.log(details.url);
			
    },
    {
    	urls: ['*://ajax.googleapis.com/*/jquery/*'],
	 	types: ['script'] 
	 		//["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"}
	},
	['blocking']
);
console.log('<<>> Chrome WebRequests WordPress jQuery set...');

// ADD IN MESSAGING RELAYING FOR PASSING DATA TO CONTENT SCRIPTS

	chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	    
	    // API Credentials
	    if (message == "get-api-data") {
	    	// get the values from local storage and RUN IT!
			chrome.storage.local.get(function(result){
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs){

					var pID = result['apiUserName'].split('.');
						var p1 = pID[0].substring(0,1).toLowerCase();
						var p2 = '';
						if (typeof pID[1] !== 'undefined') {
							p2 = pID[1].substring(0,1).toLowerCase();
						}
					__sID = result['apiUserSecret'].substring(0,6) + '-' + p1 + p2;

					console.log("sending USER DATA");
				    chrome.tabs.sendMessage(tabs[0].id, {
				    	userName: result['apiUserName'],
				    	userSecret: result['apiUserSecret']
				    }, function(response) {});  
				});
			});	
	    } 

	   	// Reporting Options
	    if (message == "get-reporting-options") {
	    	// get the values from local storage and RUN IT!

	    	console.log("RECEIVED request for REPORTING OPTIONS");

			chrome.storage.local.get(function(result){
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs){

					// console.log("about to send REPORT Options data from this set");
					// console.log(result);

					if (result['reportToDate'] && result['reportToDate'] && result['reportToDate']) {
						console.log("sending STORED report Options");
						chrome.tabs.sendMessage(tabs[0].id, {
					    	from: result['reportFromDate'],
					    	to: result['reportToDate'],
					    	days: result['reportNumberDays']
					    }, function(response) {});  	
					} else {
						console.log("sending DEFAULT report Options");
						chrome.tabs.sendMessage(tabs[0].id, {
					    	from: 'blank',
					    	to: 'blank',
					    	days: 30
					    }, function(response) {});  
					}

				    
				});
			});	
	    } 
	});



/*

		HERE
	
*/

// Notifications JS
// This code relays info - via message bubbles - to the user that's
// relevant to the context in which the tool is being used
// Rewrite, Inject, GEO Spoof, etc.

