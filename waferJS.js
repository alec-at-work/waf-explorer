
/*
chrome.storage.local.get(function(result){
	// console.log(result);
	if (result['debugMode'] === 'on') {
		$('#popup').attr('data-active','on');
		$('#modeText').html('ON').removeClass('off').addClass('on');
		$('#enable').html('Disable').removeClass('enableOff').addClass('enableOn');
	}
	else {
		$('#popup').attr('data-active','off');
		$('#modeText').html('OFF').removeClass('on').addClass('off');
		$('#enable').html('Enable').removeClass('enableOn').addClass('enableOff');
	}
});
*/

window._debugMode;

// get the state of the tool from Local Storage
function checkState(){
	chrome.storage.local.get(function(result){
		// console.log('[[ the state of the tool ]]');
		// console.log(result);
		if (result['debugMode'] === 'on') {
			$('#popup').attr('data-active','on');
			// $('#modeText').html('ON').removeClass('off').addClass('on');
			$('#wafer-launch').addClass('wafer-on');
			// $('#toggler').removeClass('tool-off').addClass('tool-on');
			// $('#enable').html('Disable').removeClass('enableOff').addClass('enableOn');
			window._debugMode = true;
			// console.log('debugMode is TRUE');
		}
		else {
			$('#popup').attr('data-active','off');
			$('#wafer-launch').removeClass('wafer-on');
			window._debugMode = false;
			// console.log('debugMode is FALSE');
			// $('#modeText').html('OFF').removeClass('on').addClass('off');
			// $('#toggler').removeClass('tool-on').addClass('tool-off');
			// $('#enable').html('Enable').removeClass('enableOn').addClass('enableOff');
		}

		if (result['apiValidUser'] === 'true') {
			$('#report-options').removeClass('hidden');
		}
		else {
			$('#report-credentials').removeClass('hidden');
		}

		// indicate the rewrite space
		var _inject = false;
		var _rewrite = false;
		var msgSpace = $('#plusMessage');
		var theSpace = $('#plusSpace');
		var msg = '';
		var space = '';
		if (result['rewriteActive']) {
			window.spaceRewrite = result['rewriteActive'];
			if (result['rewriteActive'] === "true") _rewrite = true;
		}
		if (result['injectActive']) {
			window.spaceInject = result['injectActive'];
			if (result['injectActive'] === "true") _inject = true;
		}
		if (result['spaceRewrite']) {
			space = result['spaceRewrite'];
		}

		if (_inject && _rewrite) {
			msg = "Both inject and rewrite are active, please turn off one.";
			space = '';
		}
		else if (_inject) {
			msg = "INJECT of ";
		}
		else if (_rewrite) {
			msg = "REWRITE to ";
		}

		// unhide the message space
		if (_inject || _rewrite) {
			$('#plusIndicator').removeClass('hidden');	
		}
		else {
			$('#plusIndicator').addClass('hidden');	
		}

		// check the API status
		if (result['apiValidUser']) {
			var isValidAPI = result['apiValidUser'];

			if (isValidAPI === "true") {
				$('#wafer-report').removeClass('wafer-report-off');
			}
		}
		
		// append it to the popup
		msgSpace.html(msg);
		theSpace.html(space);
	});
};

// run it at first
checkState();


/*

$('#enable').on('click', function(e) {
	e.preventDefault();
	// var newText = 'this-thing-worked';
	var curState = $('#popup').attr('data-active');
	var newState = curState === 'on' ? 'off' : 'on';
	// console.log("current state = " + curState);
	// console.log("new state = " + newState);
	//if (newText != '') {
	//	// console.log("new text input: " + newState);
		var someInformation = 'debugMode=' + newState.toString();
		// console.log('passing this info >>> ' + someInformation); 
	   	chrome.extension.sendMessage(someInformation, function(response) {
	  
	   	});	
	//}
	/*
	var someInformation1 = 'hi';
   	chrome.extension.sendMessage(someInformation1, function(response) {
      
   	});	
   	chrome.storage.local.get(function(result){// console.log(result)});
   	checkState();
   	/
});
*/

function fireWhenUrl(fun) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		// console.log(tabs);
		// console.log(tabs[0]);
		// return ;
		fun(tabs[0].url);
	});
};

function launchWafer(perma) {
	var perma = perma || false;
	
	// first check whether to turn it off...
	// console.log(_debugMode);
	if (_debugMode) {
		_debugMode = false;
		// console.log('turning OFF Active Debug Mode'); 
		/*
		chrome.extension.sendMessage('debugMode=off', function(response) {
		  		// analytics tracking...
				var eventObj = { 
			    	eventCategory: 'WAFER Inspector',
			    	eventAction: 'Toggle Autoload OFF',
			    	eventLabel: '',
			    	title: '',
				    page: 'wafer.html',
				    dimension1: 'extension'
				};
				var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
					// console.log('passing this Event to Analytics Tracking >>> ');
					// console.log(eventObj);
			   	chrome.extension.sendMessage(trackingInfo, function(response) {
			  
			   	});
		   	});	
		$('#wafer-launch').removeClass('wafer-on')
		*/
	}

	// then decide to launch it
	else {
		// console.log('no Active Debug Mode detected'); 
		chrome.tabs.executeScript(null, {file: "launchWafer.js"});

		/*
			var execWhenDone = function(current){
				var activePage = current || 'wafer.html';
				// analytics tracking...
				var eventObj = { 
			    	eventCategory: 'WAFER Inspector',
			    	eventAction: 'Launch Tool',
			    	eventLabel: 'launch attempt',
			    	title: '',
				    page: activePage //,
				    // dimension1: 'extension'
				};
				var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
					// console.log('passing this Event to Analytics Tracking >>> ');
					// console.log(eventObj);
			   	chrome.extension.sendMessage(trackingInfo, function(response) {
			  
			   	});	
			}
			
			fireWhenUrl(execWhenDone);
		*/
			_debugMode = true;
			// then set it as 'waferExplorerOn' = true
			/*
			if (perma) {
				chrome.extension.sendMessage('debugMode=on', function(response) {
				  		// analytics tracking...
						var eventObj = { 
					    	eventCategory: 'WAFER Inspector',
					    	eventAction: 'Toggle Autoload ON',
					    	eventLabel: '',
					    	title: '',
						    page: 'wafer.html',
						    dimension1: 'extension'
						};
						var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
							// console.log('passing this Event to Analytics Tracking >>> ');
							// console.log(eventObj);
					   	chrome.extension.sendMessage(trackingInfo, function(response) {
					  
					   	});	
				   	});	
				$('#wafer-launch').addClass('wafer-on');
			}
			*/

	}
};


/****
// LAUNCH the WAFER
$('#wafer-launch').on('click', function(e){
	// console.log('LAUNCH WAFER!');
	launchWafer(false);

});
***/


// CODE FOR HOLDING AND ACTIVATING

(function WAFERlaunch(){

	window.wait = 0;
	//window.waitForPress;

	// LAUNCH the WAFER
	$('#wafer-launch').on('mousedown touchstart', function(e){
		
		// console.log('mouse touch on WAFER LAUNCH!');
		e.preventDefault();
		window.waitForPress = setInterval(function(){
			window.wait += 100;
			// console.log('counting... ' + wait);
			if (window.wait >= 1000) {
				// console.log('LAUNCH WAFER! + hold');
				launchWafer(true);	
				clearInterval(waitForPress);
			}
		},100);
		
	});

	$('#wafer-launch').on('mouseup touchend', function(e){
		// console.log('mouse touch ENDED for WAFER LAUNCH!');
		if (window.wait < 1000) {
			launchWafer(false);
		}
		window.wait = 0;
		clearInterval(window.waitForPress);
	});

})();


/* 
$('#toggler').on('click', function(e) {
	e.preventDefault();
	// var newText = 'this-thing-worked';
	var curState = $('#popup').attr('data-active');
	var newState = curState === 'on' ? 'off' : 'on';
	// console.log("current state = " + curState);
	// console.log("new state = " + newState);
	//if (newText != '') {
	//	// console.log("new text input: " + newState);
		var someInformation = 'debugMode=' + newState.toString();
		// console.log('passing this info >>> ' + someInformation); 
	   	chrome.extension.sendMessage(someInformation, function(response) {
	  
	   	});	
	//}
	/*
	var someInformation1 = 'hi';
   	chrome.extension.sendMessage(someInformation1, function(response) {
      
   	});	
   	chrome.storage.local.get(function(result){// console.log(result)});
   	checkState();
	//    	* /
});

// LAUNCH the WAFER
$('#wafer-launch').on('click', function(e){
	e.preventDefault();
	chrome.tabs.executeScript(null, {file: "launchWafer.js"});

});
*/




// LAUNCH the REPORTER
$('#wafer-report-traffic').on('click', function(e){
	var invalid = $(e.target).hasClass('wafer-report-off');
	if (!invalid) {
		e.preventDefault();
		chrome.tabs.executeScript(null, {file: "/js/launchTrafficReport.js"});	
	}
});

// LAUNCH the REPORTER
$('#wafer-report-mobile').on('click', function(e){
	var invalid = $(e.target).hasClass('wafer-report-off');
	if (!invalid) {
		e.preventDefault();
		chrome.tabs.executeScript(null, {file: "/js/launchMobileReport.js"});	
	}
});

// LAUNCH the REPORTER
$('#wafer-report-industry').on('click', function(e){
	var invalid = $(e.target).hasClass('wafer-report-off');
	if (!invalid) {
		e.preventDefault();
		chrome.tabs.executeScript(null, {file: "/js/launchIndustryReport.js"});	
	}
});

// LAUNCH the REPORTER
$('#wafer-report-campaigns').on('click', function(e){
	var invalid = $(e.target).hasClass('wafer-report-off');
	if (!invalid) {
		e.preventDefault();
		chrome.tabs.executeScript(null, {file: "/js/launchNavReport.js"});	
	}
});

// LAUNCH the REPORTER
$('#wafer-report-scroll').on('click', function(e){
	var invalid = $(e.target).hasClass('wafer-report-off');
	if (!invalid) {
		e.preventDefault();
		chrome.tabs.executeScript(null, {file: "/js/launchScrollReport.js"});	
	}
});


chrome.extension.onMessage.addListener(function(extMsg) {
	// $('#output').html(extMsg);
	if (extMsg === 'newModeStored') {
		// console.log('new Mode Saved');
		checkState();	
	}
	if (extMsg.indexOf('checkThis') >-1 ) {
		var data = extMsg.split('=');
		// console.log("check data... ");
		// console.log(data);
	}
	if (extMsg.indexOf('thisStateSaved') > -1) {
		var savedState = extMsg.split('=');
		// console.log("check saved state... ");
		// console.log(savedState);
	}

	if (extMsg === "sendApiData") {

	}
	
});


// LINK TO THE WIKI / INFO

$('#information-link').on('click', function(e) {
	e.preventDefault();
	chrome.tabs.create({url: 'https://wiki.autodesk.com/x/ntJVDg'});

	// analytics tracking...
	var eventObj = { 
    	eventCategory: 'WAFER Links',
    	eventAction: 'Wiki Link Click',
    	eventLabel: '',
    	title: '',
	    page: 'wafer.html',
	    dimension1: 'extension'
	};
	var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
		// console.log('passing this Event to Analytics Tracking >>> ');
		// console.log(eventObj);
   	chrome.extension.sendMessage(trackingInfo, function(response) {
  
   	});	
});

$('#open-settings').on('click', function(e) {
	e.preventDefault();
	chrome.tabs.create({url: '/toolSettings.html'});
		
		/*
		chrome.windows.create({'url': 'toolSettings.html', 'type': 'popup'}, function(window) {
	   	
	   	});
		*/

	// analytics tracking...
	var eventObj = { 
    	eventCategory: 'WAFER Links',
    	eventAction: 'Advanced Setting Link',
    	eventLabel: 'open',
    	title: '',
	    page: 'wafer.html',
	    dimension1: 'extension'	
	};
	var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
		// console.log('passing this Event to Analytics Tracking >>> ');
		// console.log(eventObj);
   	chrome.extension.sendMessage(trackingInfo, function(response) {
  
   	});	
});


$('#open-contact').on('click', function(e) {
	e.preventDefault();
	chrome.tabs.create({url: '/toolSettings.html#contact'});
		
	// analytics tracking...
	var eventObj = { 
    	eventCategory: 'WAFER Links',
    	eventAction: 'Contact Us Link',
    	eventLabel: 'open',
    	title: '',
	    page: 'wafer.html',
	    dimension1: 'extension'	
	};
	var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
		// console.log('passing this Event to Analytics Tracking >>> ');
		// console.log(eventObj);
   	chrome.extension.sendMessage(trackingInfo, function(response) {
  
   	});	
});


$('#wafer-report-api-data').on('click', function(e) {
	e.preventDefault();
	chrome.tabs.create({url: '/toolSettings.html#api'});
		
		/*
		chrome.windows.create({'url': 'toolSettings.html', 'type': 'popup'}, function(window) {
	   	
	   	});
		*/

	// analytics tracking...
	var eventObj = { 
    	eventCategory: 'WAFER Links',
    	eventAction: 'Report Options',
    	eventLabel: 'Enter API Information',
    	title: '',
	    page: 'wafer.html',
	    dimension1: 'extension'	
	};
	var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
		// console.log('passing this Event to Analytics Tracking >>> ');
		// console.log(eventObj);
   	chrome.extension.sendMessage(trackingInfo, function(response) {
  
   	});	
});


function clearData(){
	chrome.storage.local.clear(function() {
	    var error = chrome.runtime.lastError;
	    if (error) {
	        console.error(error);
	    }
	});
};

