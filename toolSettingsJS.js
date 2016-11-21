

// initial settings for TMS Options

var _tmsOptionSelected = false;
var _tmsSpaceSelected = false;
var _disableActive = false;

var _fromDate = false;
var _toDate = false;
var _reportDays = false;

window.slackID = false;

function showStorage(){
	chrome.storage.local.get(function(result){

		console.log('CURRENT STORAGE');
		console.log(result);

	});
};

// Initialize the Date Range picker
$( "#report-date-option-range" ).daterangepicker({
	change: function(event, data) { 
		// console.log('new Date Range values');
		updateDateRange();
	},
	clear: function(event, data) { 
		// console.log('resetting Default to 30 days');
		var actives = $('.report-option-active');
		actives.removeClass('report-option-active');	
		setReportOption('30');
		$('[data-report-date-option="30"]').addClass('report-option-active');
		$('[data-report-date-option="custom"]').addClass('select-custom-option').removeClass('report-option-active');
			var dateOptionMsg = "Select a Date Range using the widget below";
			$('#report-date-option-msg').html(dateOptionMsg);
		
	},
	applyOnMenuSelect: false,
	datepickerOptions : {
		numberOfMonths : 2
	},
	icon: false,
	presetRanges: [

	 {
         text: 'Yesterday',
         dateStart: function() { return moment().subtract('days', 1) },
         dateEnd: function() { return moment().subtract('days', 1) }
     }, {
         text: 'Last 90 Days',
         dateStart: function() { return moment().subtract('days', 90) },
         dateEnd: function() { return moment().subtract('days', 1) }
     }, {
         text: 'Q4-FY16',
         dateStart: function() { return moment("20151101", "YYYYMMDD") },
         dateEnd: function() { return moment("20160131", "YYYYMMDD") }
     }, {
         text: 'Q1-FY17',
         dateStart: function() { return moment("20160201", "YYYYMMDD") },
         dateEnd: function() { return moment("20160430", "YYYYMMDD") }
     }, {
         text: 'Q2-FY17',
         dateStart: function() { return moment("20160501", "YYYYMMDD") },
         dateEnd: function() { return moment("20160731", "YYYYMMDD") }
     }, {
         text: 'Q3-FY17',
         dateStart: function() { return moment("20160801", "YYYYMMDD") },
         dateEnd: function() { return moment("20161031", "YYYYMMDD") }
     }
     /*
     , {
         text: 'Next Week',
         dateStart: function() { return moment().add('weeks', 1).startOf('week') },
         dateEnd: function() { return moment().add('weeks', 1).endOf('week') }
     }

     */
     ]
});

// check for the rewrite and CHECK if it's activated
chrome.storage.local.get(function(result){

	console.log('TOOL SETTINGS INITIAL STATE ON LOAD');
	console.log(result);
	// console.log('running initial State');

	// rewriting Spaces
	var rewrite = result['rewriteActive'] === true ? true : false;
	var inject = result['injectActive'] === true ? true : false;
	var disable = result['disableActive'] === true ? true : false;
	var space = result['spaceRewrite'] || false;
	var customSpace = result['customSpace'] || false;

	if (customSpace) {
		_tmsSpaceSelected = false;
		// console.log('adding CUSTOM SPACE as Active');
		var spaceVal = space;
		if (spaceVal) $('#waf-tools-rewrite-space').val(spaceVal);
	}
	else if (space) {
		_tmsSpaceSelected = true;
		// console.log('adding SPACE as Active');
		$('[data-tms-space="' + space + '"]').addClass('tms-space-active');
	}
	if (rewrite || inject || disable) {
		_tmsOptionSelected = true;
		if (rewrite) { $('[data-tms-option="rewrite"]').addClass('tms-option-active'); }
		if (inject) { $('[data-tms-option="inject"]').addClass('tms-option-active'); }
		if (disable) { 
			$('[data-tms-option="disable"]').addClass('tms-option-active'); 
			_disableActive = true;
		}
	}
	if (_tmsOptionSelected && _tmsSpaceSelected) {
		$('#tms-option-current').addClass('tms-settings-valid ');
		$('#tms-space-current').addClass('tms-settings-valid ');
	}

	renderValidOptions();

	// geo Spoof
	var geoSpoofActive = result['geoSpoofActive'] === true ? true : false;
	var geoSpoofIP = result['geoSpoofIP'] || false;
	var geoSpoofName = result['geoSpoofName'] || false;

	// console.log("GEO spoof detes");
	// console.log(geoSpoofActive);
	// console.log(geoSpoofIP);
	// console.log(geoSpoofName);

	if (geoSpoofActive && geoSpoofName) {
		// console.log('adding the class');
		$('[data-tools-geo-name="' + geoSpoofName + '"]').addClass('geo-option-active');
		$('#geo-' + geoSpoofName).addClass('geo-name-active');
	}

	// API stuff
	var apiUserName = result['apiUserName'] || false;
	var apiSecret = result['apiUserSecret'] || false;
	
	window.slackID = apiUserName;

	if (apiUserName && apiSecret) {
		APIworkflow('pass',false);
	}
	else {
		APIworkflow('need-data');
	}

	// Reporting Options
	_fromDate = result['reportFromDate'] || false;
	_toDate = result['reportToDate'] || false;
	_reportDays = result['reportNumberDays'] || false;


	if (_fromDate && _toDate && _reportDays) {
		// do something
		// update the widget to show selections

		var dateOptionMsg = "Select a Date Range using the widget below";

		if (_reportDays == "7") {
			$('[data-report-date-option="7"]').addClass('report-option-active');
		} else if (_reportDays == "30") {
			$('[data-report-date-option="30"]').addClass('report-option-active');
		} else if (_reportDays.indexOf('custom') > -1) {

			var from, to = false;
			
			if (_fromDate) {
				// select the FROM date
				from = new Date(_fromDate);
			} 
			if (_toDate) {
				// select the TO date
				to = new Date(_toDate);
			}

			$( "#report-date-option-range" ).daterangepicker("setRange", {start: from, end: to});

			if (_fromDate && _toDate) {
				$('[data-report-date-option="custom"]').addClass('report-option-active');
				dateOptionMsg = "the Date Range below is currently in use";
			} else {
				$('[data-report-date-option="custom"]').addClass('select-custom-option');
				dateOptionMsg = "Select a Date Range using the widget below";
			}

			var dateOptionsDiv = $('#report-date-options');
			dateOptionsDiv.slideToggle().removeClass('hidden');
			$('#report-date-option-msg').html(dateOptionMsg);


		}
	}

	// Nexus Test Toggle
	var _checkNexusTest = result['nexusTest'];
	if (_checkNexusTest) {
		if (_checkNexusTest == "on") {
			$('#nexus-test-on').addClass('nexus-test-active');
			$('#nexus-test-toggle').removeClass('fa-toggle-off').addClass('fa-toggle-on');
		}
		else {
			$('#nexus-test-off').addClass('nexus-test-active');
		}
	}
	else {
		$('#nexus-test-off').addClass('nexus-test-active');
	}
	
});


// MENU CONTROLS

$('[data-tools-menu]').on('click', function(e){

	// e.preventDefault();

	// Handle the menu options selected
	var target = $(e.target);
	target.addClass('active-option');

	// prevent any disabled actions
	if (target.hasClass('waf-tools-inactive')) return;

	var otherOptions = $('[data-tools-menu]').not(target);
	otherOptions.attr('data-tools-active', false);	
	otherOptions.removeClass('active-option');
	
	var option = target.attr('data-tools-menu');
	// console.log('clicked this one: ' + option);
	
	// Toggle the Visibility
	var toggleItem = $('#waf-tools-content-' + option);
	
	// just close it?
	if (toggleItem.attr('data-tools-visible') === "true") {
		return;
		/*
		// console.log('just close it!');
		target.removeClass('active-option');
		toggleItem.attr('data-tools-visible','false').slideToggle(128);
		return;
		*/
	}
	else {
		// console.log('another menu thing...');
		// Menu
		var newMenuValue = target.attr('data-tools-active') == true ? false : true;
			target.attr('data-tools-active', newMenuValue);	

		// Sections
		var alreadyVis = $('[data-tools-visible="true"]');
		alreadyVis.attr('data-tools-visible','false').slideToggle(128, function(){
			setTimeout(function(){
				toggleItem.attr('data-tools-visible','true').slideToggle(128);
			},129);
		}());
		return;
	}
		

	// analytics.debug.state.setStateCookie();
});


// TMS Rewrite, Inject, OFF options

$('[data-tms-option]').on('click', function(e){

	var tar = $(e.target);
	var which = tar.attr('data-tms-option');

	// method
	var method = false;
	var other1 = false;
	var other2 = false;

	if (which === 'rewrite') {
		method = rewriteActive;
		other1 = disableActive;
		other2 = injectActive;
	} 
	if (which === 'inject') {
		method = injectActive;
		other1 = disableActive;
		other2 = rewriteActive;
	} 
	if (which === 'disable') {
		method = disableActive;
		other1 = rewriteActive;
		other2 = injectActive;
	} 

	// find all Actives
	var actives = $('.tms-option-active');

	// if it's the same, turn it off
	if (actives[0] === tar[0]) {
		if (method) {
			other1(false);
			other2(false);
			actives.removeClass('tms-option-active');
			method(false);	
			renderTMSoutput('option', false);
		}
	}
	else {
		other1(false);
		other2(false);
		actives.removeClass('tms-option-active');
		// add the active class to the TMS tool
		tar.addClass('tms-option-active');
		renderTMSoutput('option', which);
		method(true);
		
	}


});


	function nexusTestToggle(onOff) {

		var nexusToggle = 'nexusTest=' + (onOff).toString();
		// console.log('passing this info as the SPACE >>> ' + newSpaceInfo); 
	   	chrome.extension.sendMessage(nexusToggle, function(response) {
	  
	   	});	

	};


$('#nexus-test-toggle').on('click', function(e){
	// check which class it has

	var isActive = $(e.target).hasClass('fa-toggle-off') ? false : true;
	
	// turn it off
	if (isActive) {
		$(e.target).removeClass('fa-toggle-on').addClass('fa-toggle-off');
		$('#nexus-test-on').removeClass('nexus-test-active');
		$('#nexus-test-off').addClass('nexus-test-active');
		nexusTestToggle('off');
	}
	// turn it on
	else {
		$(e.target).removeClass('fa-toggle-off').addClass('fa-toggle-on');
		$('#nexus-test-on').addClass('nexus-test-active');
		$('#nexus-test-off').removeClass('nexus-test-active');
		nexusTestToggle('on');
	}

});

$('[data-tms-space]').on('click', function(e){

	if (!_disableActive) {

		var tar = $(e.target);
		var which = tar.attr('data-tms-space');

		// find all Actives
		var actives = $('.tms-space-active');

		// if it's the same, turn it off
		if (actives[0] === tar[0]) {
			actives.removeClass('tms-space-active');
			renderTMSoutput('space', false);
			setSpace(false);
		}
		else {
			actives.removeClass('tms-space-active');
			// add the active class to the TMS tool
			tar.addClass('tms-space-active');
			renderTMSoutput('space', which);
			setSpace(which);
			// setCustomSpace(false);
		}
	}
});


// var _tempSpace = false;

$('#waf-tools-rewrite-space').on('keyup', function(e){

	var _x = $(e.target);
	var newSpace = _x.val();

	var actives = $('.tms-space-active');
	actives.removeClass('tms-space-active');
	
//	_tempSpace = newSpace;
	
	if (newSpace === "") {
		renderTMSoutput('space', false);
		setSpace(false);
		setCustomSpace(false);
	} else {
		renderTMSoutput('space', newSpace);
		setSpace(newSpace);
		setCustomSpace(true);
	}

	

});


function renderTMSoutput(option, onOff) {
 
	switch(option) {
		case 'option' :
			if (onOff) {	
				_tmsOptionSelected = true;
			}
			else {
				_tmsOptionSelected = false;
			}
			break;
		case 'space' :
			if (onOff) {
				_tmsSpaceSelected = true;
			}
			else {
				_tmsSpaceSelected = false;
			}
			break;
	};

	// validate the settings
	renderValidOptions();

}

function renderValidOptions() {

	// // console.log('in render valid optoins');
	var advancedOn = false;
	var option = $('#tms-option');
	var space = $('#tms-space');

	// what OPTION is selected
	var options = $('.tms-option-active');
	var _optionOn = options.length > 0 ? (options.attr('data-tms-option')) : false;
	
	// what SPACE is selected
	var spaces = $('.tms-space-active');
	var _spaceOn = spaces.length > 0 ? (spaces.attr('data-tms-space')) : false;

	// console.log('Space on?');
	// console.log(_spaceOn);

	if (!_spaceOn) {
		// console.log('Space wasnt on so checking for custom');
		var checkCustom = $('#waf-tools-rewrite-space').val();
		// console.log(checkCustom);
		if (checkCustom !== "") {
			_spaceOn = checkCustom;
		}	
	}

	// set a Space value
	if (_spaceOn) {
		space.html(_spaceOn);
	}
//	else if (_tempSpace && _tempSpace !== "") {
//		space.html(_tempSpace)
//		_spaceOn = true;
//	}
	else {
		space.html('---');
	}	

	// then do the waterfall of render
	if (_optionOn) {
		// check if DISABLE is on
		if (_optionOn === 'disable') {
			advancedOn = true;
			option.html('DISABLED');
			// overwrite the space value to indicate OFF
			space.html('---');
		}
		// check if REWRITE + SPACE is on
		else if (_optionOn === 'rewrite') {
			option.html('REWRITE');
			if (_spaceOn) {
				advancedOn = true;
			}
		}

		// check if INJECT + SPACE is on
		else if (_optionOn === 'inject') {
			option.html('INJECT');
			if (_spaceOn) {
				advancedOn = true;
			}
		}

		// check is NEXUS-TEST is on

	}
	else {
		option.html('none active');
	}

	
	if (advancedOn) {
		$('#tms-space-current').addClass('tms-settings-valid');
		$('#tms-option-current').addClass('tms-settings-valid');
	} else {
		$('#tms-space-current').removeClass('tms-settings-valid');
		$('#tms-option-current').removeClass('tms-settings-valid');
	}

}

function rewriteActive(on) {
	var on = on || false;
	if (on) {
		// console.log('turning ON the Rewrite');
	   	chrome.extension.sendMessage('rewriteActive', function(response) {
	  		// alert(response);
	   	});
   	}
   	else {
		// console.log('turning off the Rewrite'); 
	   	chrome.extension.sendMessage('rewriteOff', function(response) {
	  		// alert(response);
	   	});
	}
}
function injectActive(on){
	var on = on || false;
	if (on) {
		// console.log('turning ON the Inject');
	   	chrome.extension.sendMessage('injectActive', function(response) {
	  		// alert(response);
	  		var error = chrome.runtime.lastError;
	   	});	
	}
	else {
		// console.log('turning off the Inject'); 
	   	chrome.extension.sendMessage('injectOff', function(response) {
	  		// alert(response);
	   	});	
	}	
};

function disableActive(on) {
	var on = on || false;
	if (on) {
		// console.log('turning ON the Disable Bootstrap');
		_disableActive = true;
	   	chrome.extension.sendMessage('disableActive', function(response) {
	  		// alert(response);
	   	});	
	   	$('.tms-space-active').removeClass('tms-space-active');
	}
	else {
		// console.log('turning OFF the Disable Bootstrap');
		_disableActive = false;
	   	chrome.extension.sendMessage('disableOff', function(response) {
	  		// alert(response);
	   	});	
	   	$('.tms-option-active').removeClass('tms-option-active');
	}
}

function setSpace(which){
	var which = which || false;
	if (which) {
		var newSpaceInfo = 'newSpace=' + (which).toString();
		// console.log('passing this info as the SPACE >>> ' + newSpaceInfo); 
	   	chrome.extension.sendMessage(newSpaceInfo, function(response) {
	  
	   	});		
	}
	else {
		var clearSpace = 'clearSpaceData';
		// console.log('clearing Space info'); 
	   	chrome.extension.sendMessage(clearSpace, function(response) {
	  
	   	});		
	}	
}

function setCustomSpace(which){
	var which = which || false;
	if (which) {
		var customSpace = 'customSpace';
	   	chrome.extension.sendMessage(customSpace, function(response) {
	  
	   	});		
	}
	else {
		var clearCustom = 'clearCustomSpace';
	   	chrome.extension.sendMessage(clearCustom, function(response) {
	  
	   	});		
	}
	
}


// GEO SPOOF CONTROLS
		
		/*
		$('#geo-spoof-advanced').on('click', function(e){

			var target = $('#geo-spoof-advanced-container');
			var checkAdvancedShow = target.hasClass('hide-me') ? true : false;
			if (!checkAdvancedShow) {
				target.slideToggle(128).removeClass('hide-me');
			}
			else {
				target.slideToggle(128).addClass('hide-me');
			}
		});
		*/


$('[data-tools-geo-spoof-ip]').on('click', function(e){
	
	var _x = $(e.target);
	
	// find all Actives
	var actives = $('.geo-option-active');
	var nameds = $('.geo-name-active');

	if (actives[0] === _x[0]) {
		clearGeoSpoof();
	}
	else {
		actives.removeClass('geo-option-active');
		nameds.removeClass('geo-name-active');
		// add the active class to the GEO tool
		_x.addClass('geo-option-active');

		// // console.log(_x.val());
		var ip = _x.attr('data-tools-geo-spoof-ip');
		var name = _x.attr('data-tools-geo-name');

		var geoNamer = $('#geo-' + name);
		geoNamer.addClass('geo-name-active');

		// send the new geoSpoofIP
		setGeoSpoof(ip,name);
	}

});

/*
$('#custom-geo-ip').on('change', function(e){
	console.log("changed me!");
	console.log("custom IP is now: " + $(e.target).val());
});
*/

$('#tms-clear-settings').on('click', function(e){
	clearTmsSettings();
});

$('#geo-clear-settings').on('click', function(e){
	clearGeoSpoof();
});

$('#api-clear-settings').on('click', function(e){
	clearApiSettings();
});

$('#options-clear-settings').on('click', function(e){
	clearReportOptions();
});

$('.all-clear-settings').on('click', function(e){
	clearTmsSettings();
	clearGeoSpoof();
	clearApiSettings();
	clearReportOptions();
});


function clearTmsSettings(){
	$('.tms-option-active').removeClass('tms-option-active');
	$('.tms-space-active').removeClass('tms-space-active');
	$('#waf-tools-rewrite-space').val('');

	$('#nexus-test-on').removeClass('nexus-test-active');
	$('#nexus-test-off').addClass('nexus-test-active');
	$('#nexus-test-toggle').removeClass('fa-toggle-on').addClass('fa-toggle-off');
	
	   	chrome.extension.sendMessage('clearSpaceData', function(response) { });
	   	chrome.extension.sendMessage('clearCustomSpace', function(response) { });
	   	chrome.extension.sendMessage('rewriteOff', function(response) { });
	   	chrome.extension.sendMessage('injectOff', function(response) { });
	   	chrome.extension.sendMessage('disableOff', function(response) { });
	   	chrome.extension.sendMessage('clearNexusTest', function(response) { });
	   	
	// console.log('cleared TMS settings'); 
	renderValidOptions();
};

function clearGeoSpoof(){

	$('.geo-option-active').removeClass('geo-option-active');
	$('.geo-name-active').removeClass('geo-name-active');
	var spoofOff = 'clearGeoSpoof';
	// console.log('turned off Geo Spoof'); 
	   	chrome.extension.sendMessage(spoofOff, function(response) {
	  		
	   	});
};

function setGeoSpoof(ip,name){
	var newIPspoof = 'geoSpoofIP=' + (ip + ';' + name).toString();
	// console.log('passed this info as the IP >>> ' + newIPspoof); 
	   	chrome.extension.sendMessage(newIPspoof, function(response) {
	  		
	   	});	
}

function clearApiSettings(){
	var clearAPI = 'clearApiData';
	window.slackID = false;
	// console.log('clear Adobe API data'); 
	   	chrome.extension.sendMessage(clearAPI, function(response) {
				
	   	});
	   	APIworkflow('need-data');	
};

function clearReportOptions(){
	var clearOptions = 'clearReportOptions';

	_fromDate = false;
	_toDate = false;
	_reportDays = false;

	var actives = $('.report-option-active');
		actives.removeClass('report-option-active');		
		
	$( "#report-date-option-range" ).daterangepicker('clearRange');
	var dateOptionMsg = "Select a Date Range using the widget below";
	$('#report-date-option-msg').html(dateOptionMsg);

	var dateOptionsDiv = $('#report-date-options');
	var isOpen = dateOptionsDiv.hasClass('hidden') ? false : true;
	if (isOpen) {
		dateOptionsDiv.slideToggle().addClass('hidden');
	}
	$('[data-report-date-option="custom"]').removeClass('select-custom-option').removeClass('report-option-active');
	
	setReportOption('30');
	$('[data-report-date-option="30"]').addClass('report-option-active');

	   	chrome.extension.sendMessage(clearOptions, function(response) {
				
	   	});
	   		
};

// "Click" whatever the HASH is...

var locHashValue = document.location.hash;
switch(locHashValue) {
	case '#tms' :
		$('[data-tools-menu="tms-settings"]').click();
		break;
	case '#geo' :
		$('[data-tools-menu="geo-settings"]').click();
		break;
	case '#api' :
		$('[data-tools-menu="api-settings"]').click();
		break;
	case '#contact' :
		$('[data-tools-menu="contact-forms"]').click();
		break;
	case '#options' :
		$('[data-tools-menu="report-options"]').click();
		break;
	default:
		break;
};


// REPORTING API SETTINGS
	
window.validAPIsettings = false;

$('#waf-tools-report-validate-settings').on('click', function(e){

	window.user = getUserName();
	window.secret = getUserSecret();

	// check that things were actually submitted
	var userSubmitted = window.user == "" ? false : true;
	var secretSubmitted = window.secret == "" ? false : true;
	
	if (userSubmitted && secretSubmitted) {
		APIworkflow('checking');
		runValidateAPI();	
	} else if (userSubmitted && !secretSubmitted) {
		alert('Please enter your user "secret".');
	} else if (!userSubmitted && secretSubmitted) {
		alert('Please enter your user name, without the ":Autodesk" portion.');
	} else {
		alert('Please enter the requested credentials');
	}


});

$('#waf-tools-report-validate-retry').on('click', function(e){

	APIworkflow('need-data');

});

	function trackAPIworkflow(action, label){
		var eventObj = { 
	    	eventCategory: 'WAFER Adobe Reporting API',
	    	eventAction: ('API ' + action).toString(),
	    	eventLabel: label,
	    	title: '',
		    page: 'apiWorkFlow',
		    dimension1: 'extension'	
		};
		var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
			// console.log('passing this Event to Analytics Tracking >>> ');
			// console.log(eventObj);
	   	chrome.extension.sendMessage(trackingInfo, function(response) {
	  
	   	});	
	};

	// API Rendering function
	var APIworkflow = function(state, track){
		var state = state || false;
		var go = track === false ? false : true;
		if (state) {
			switch (state){
				case 'need-data' :
					$('#api-checking').addClass('hide-me');
					$('#api-instructions').removeClass('hide-me');
					$('#waf-tools-api-not-set').removeClass('hide-me');
					$('#waf-tools-api-checking').addClass('hide-me');
					$('#api-settings-fail').addClass('hide-me');
					$('#api-settings-valid').addClass('hide-me');
					$('#waf-tools-api-retry').addClass('hide-me');
					$('#waf-tools-api-valid').addClass('hide-me');
					// trackAPIworkflow('workflow','input credentials');
					$('#waf-tools-report-api-user').val('');
					$('#waf-tools-report-api-secret').val('');
					break;
				case 'fail' :
					$('#api-checking').addClass('hide-me');
					$('#waf-tools-api-checking').addClass('hide-me');
					$('#api-settings-fail').removeClass('hide-me');
					$('#waf-tools-api-retry').removeClass('hide-me');
					trackAPIworkflow('workflow','fail - invalid credentials');
					break;
				case 'checking' :
					$('#waf-tools-api-not-set').addClass('hide-me');
					$('#api-instructions').addClass('hide-me');
					$('#api-checking').removeClass('hide-me');
					$('#waf-tools-api-checking').removeClass('hide-me');
					trackAPIworkflow('workflow','checking credentials');
					break;
				case 'pass' :
					$('#api-checking').addClass('hide-me');
					$('#waf-tools-api-checking').addClass('hide-me');
					$('#api-settings-valid').removeClass('hide-me');
					$('#waf-tools-api-valid').removeClass('hide-me');
					$('#api-instructions').addClass('hide-me');
					$('#waf-tools-api-not-set').addClass('hide-me');
					if (go) {
						trackAPIworkflow('workflow','success - valid credentials');	
					}
					break;
			};
		}
	};

	// a public function to pass everything through...
	var callAPI = function(_reportName, _method, _params) {
		var _reportName = _reportName || 'no-name';
		var _method = _method || false;
		if (_method) {
			// console.log("calling the API");
			_callAPI(_reportName, _method, _params);	
		}
	}

	// the ACTUAL function to call the Adobe Analytic API
	var _callAPI = function(_rN, _m, _p) {

		var username = window.user + ':Autodesk';
		var secret   = window.secret;
		var method   = _m;
		var endpoint = 'api.omniture.com';
		var params   = _p;

		// console.log('userName --> ' + window.user + ':Autodesk');
		// console.log('secret --> ' + window.secret);
		// console.log('making next request: ' + _rN);
		MarketingCloud.makeRequest(username, secret, method, params, endpoint, 
			function(response) {
				// split out the data, and find the Report ID
		    	var tempData = JSON.parse(response.responseText);
		    	var tempReportID = tempData.reportID;
		    	// console.log(tempData);
		    	if (typeof tempData['error'] !== "undefined") {
		    		APIworkflow('fail');
		    	}
		    	else {
		    		
		    		APIworkflow('pass');
			    	storeAPIdata();
			    	window.slackID = window.user;	
		    		
		    	}
			}, function(){
				APIworkflow('fail');
			});
		return false;

	};

	var runValidateAPI = function() {

		// Validate the Report with user info
		var validate = { 
			"reportDescription":{
				"reportSuiteID":"autodesk-new-gl"
		    }
		};

		try {
			callAPI('validate-report', 'Report.Queue', validate);
		} catch(e) {
			// console.log('validate-report failure');
		}

	};

	var getUserName = function(){
		var val = $('#waf-tools-report-api-user').val(); 
		return val;

	}
	var getUserSecret = function(){
		var val = $('#waf-tools-report-api-secret').val().trim();
		return val;
	}

	var storeAPIdata = function(){
		// user Name
		var userName = getUserName();
		var apiUserName = 'apiUserName=' + (userName).toString();
		// console.log('passing this info about userName >>> ' + userName); 
			chrome.extension.sendMessage(apiUserName, function(response) {
		  
		   	});

		// user Secret
		var userSecret = getUserSecret();
		var apiUserSecret = 'apiUserSecret=' + (userSecret).toString();
		// console.log('passing this info about userSecret >>> ' + userSecret); 
			chrome.extension.sendMessage(apiUserSecret, function(response) {
		  
		   	});
	};


		var getOptionVal = function(which){
			var val;
			if (which === "to")
				val = $('#waf-tools-report-to-date').val().trim();
			if (which === "from")
				val = $('#waf-tools-report-from-date').val().trim();
			if (which === "days")
				val = $('#waf-tools-report-number-days').val().trim();
			return val;
		}


	var storeReportOption = function(){
		
		// set the TO Date
		var toOption = getOptionVal('to');
		var reportToDate = 'reportToDate=' + (toOption).toString();
			chrome.extension.sendMessage(reportToDate, function(response) {
		  
		   	});
		// set the FROM Date
		var fromOption = getOptionVal('from');
		var reportFromDate = 'reportFromDate=' + (fromOption).toString();
			chrome.extension.sendMessage(reportFromDate, function(response) {
		  
		   	});
		// set the NUMBER of DAYS
		var daysOption = getOptionVal('days');
		var reportNumDays = 'reportNumberDays=' + (daysOption).toString();
			chrome.extension.sendMessage(reportNumDays, function(response) {
		  
		   	});
	};


	$('[data-tools-contact]').on('click', function(e){
		//	e.preventDefault();
		var targetVal = $(e.target).attr('data-tools-contact');

		// // console.log('You clicked on ' + targetVal);

		var newForm = $('<form id="waf-debug-report-form" data-waf-debug-form="' + targetVal + '" class="waf-debug-report-form" />');
		var newInput = $('<textarea maxlength="340" id="waf-debug-form-input" class="waf-debug-report-input" />');
		var whoInput = $('<textarea maxlength="100" id="waf-debug-form-username" class="waf-debug-report-username" />');
			whoInput.attr('placeholder','enter your email address here');
		var newSubmit = $('<button id="waf-debug-submit-form"  />');
			newSubmit.html('Submit');
		var newCancel = $('<button id="waf-debug-cancel-form" />');
			newCancel.html('Cancel');

		var message;
		switch (targetVal) {
			case 'bug' :
				message = "Please briefly describe the bug you found. (340 character max)";
				break;
			case 'feature' :
				message = "Please describe the feature you would like to see, and why you think it would be valuable. (340 character max)";
				break;
			case 'other' :
				message = "Enter you message to the team here. (340 character max)";
				break;
			default : 
				break
		};

			var eventObj = { 
		    	eventCategory: 'Advanced Features',
		    	eventAction: 'Contact Form View',
		    	eventLabel: targetVal,
		    	title: '',
			    page: 'toolSettings.html#contact',
			    dimension1: 'extension'	
			};
			var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
				// console.log('passing this Event to Analytics Tracking >>> ');
				// console.log(eventObj);
		   	chrome.extension.sendMessage(trackingInfo, function(response) {
		  
		   	});	

		newInput.attr('placeholder',message);
		newForm.append(newInput).append(whoInput);

		// then append the form and slide it open
		var appendSpace = $('#tools-contact-append');
		appendSpace.append(newForm).append(newSubmit).append(newCancel);
		//appendSpace.append(newSubmit).append(newCancel);

		// close the buttons, slide out the Form
		$('#contact-tool-buttons-holder').slideToggle(128, 'swing', function(){
			setTimeout(function(){
				appendSpace.slideToggle(128);
			},129);
		}());

	});

		window.contact = {};
		// when a FORM is submitted
	    contact.formSubmit = function(){
			var appendSpace = $('#tools-contact-append');
			var formSpace = appendSpace.children();
			var whichForm = formSpace.attr('data-waf-debug-form');
			alert("Thanks, your " + whichForm + " form was submitted.");
			
			var channel, username;
			var thisURL = document.location.href;
			var text = $('#waf-debug-form-input').val();
			var username = $('#waf-debug-form-username').val();

			// then check that there is info here...


			text = text + ' [submitted from: Chrome Extension]';

			switch(whichForm) {
				case 'bug' :
					channel = '#wafer-bug';
					username = username;
					break;
				case 'feature' :
					channel = '#wafer-feature-request';
					username = username;
					break;
				case 'other' :
					channel = '#wafer-other';
					username = username;
					break;
				default :
					break;
			}

			// include the AA ID in the user name if available
			if (window.slackID) {
				username = username + ' (' + window.slackID + ')';
			}

			// then fire it off to SLACK
			$.ajax({
            	url: 'https://hooks.slack.com/services/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',
		        type: 'POST',
		        data: {
		        	"payload" :
		        	JSON.stringify({
		        		"channel" : channel,
					 	"username" : username, 
						"text" : text, 
						"icon_emoji" : ":adsk:"
					})
				},
		        success: function (response) {

					var eventObj = { 
				    	eventCategory: 'Advanced Features',
				    	eventAction: 'Contact Form Success',
				    	eventLabel: whichForm,
				    	title: '',
					    page: 'toolSettings.html#contact',
					    dimension1: 'extension'	
					};
					var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
						// console.log('passing this Event to Analytics Tracking >>> ');
						// console.log(eventObj);
				   	chrome.extension.sendMessage(trackingInfo, function(response) {
				  
				   	});	
		        },
		        error: function (e) {
		        	var eventObj = { 
				    	eventCategory: 'Advanced Features',
				    	eventAction: 'Contact Form Failure',
				    	eventLabel: whichForm,
				    	title: '',
					    page: 'toolSettings.html#contact',
					    dimension1: 'extension'	
					};
					var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
						// console.log('passing this Event to Analytics Tracking >>> ');
						// console.log(eventObj);
				   	chrome.extension.sendMessage(trackingInfo, function(response) {
				  
				   	});	
		            // console.log("ERROR!");
		            // console.log(e);
		        }
		    }); 

			var eventObj = { 
		    	eventCategory: 'Advanced Features',
		    	eventAction: 'Contact Form Submit',
		    	eventLabel: whichForm,
		    	title: '',
			    page: 'toolSettings.html#contact',
			    dimension1: 'extension'	
			};
			var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
				// console.log('passing this Event to Analytics Tracking >>> ');
				// console.log(eventObj);
		   	chrome.extension.sendMessage(trackingInfo, function(response) {
		  
		   	});	

			appendSpace.slideToggle(128, function(){
				setTimeout(function(){
					$('#contact-tool-buttons-holder').slideToggle(128);
					formSpace.remove();
				},129);
			}());
			return false;
		};

		// when a FORM is Cancelled
		contact.formCancel = function(){
			var appendSpace = $('#tools-contact-append');
			var formSpace = appendSpace.children();
			var whichForm = formSpace.attr('data-waf-debug-form');
			// alert("Cancelling the " + whichForm + " form");

			appendSpace.slideToggle(128, function(){
				setTimeout(function(){
					$('#contact-tool-buttons-holder').slideToggle(128);
					formSpace.remove();
				},129);
			}());
			return false;
		};


		$(document).on('click', '#waf-debug-submit-form', function(){
			contact.formSubmit();
		});
		$(document).on('click', '#waf-debug-cancel-form', function(){
			contact.formCancel();
		});
		$(document).on('submit', '#waf-debug-form-input', function(){
			contact.formSubmit();
		});
		$(document).on('submit', '#waf-debug-report-form', function(){
			contact.formSubmit();
		});


		function setReportFormVal(days,from,to) {
			console.log('setting INPUT values of ' + days + ' ' + from + ' ' + to);
			$('#waf-tools-report-number-days').val(days);
			$('#waf-tools-report-from-date').val(from);
			$('#waf-tools-report-to-date').val(to);
		};

function setReportOption(which, data) {
	
	var data = data || false;
	console.log('setting report options for: ' + which);
	switch (which) {
		case '7' :

			// set the NumberDays to 7
			// set the other values to true
			setReportFormVal(7,true,true);

			break;
		case '30' :

			// set the NumberDays to 30
			// set the other values to true
			setReportFormVal(30,true,true);
			
			break;
		case 'custom' :

			var first = 'custom:' + data.days;
			setReportFormVal(first,data.from,data.to);
			// set the NumberDays to custom:X (X being the number)
			// set the other values to TO and FROM

				// clear the active options and set the Custom to "active"
					// find all Actives
					var actives = $('.report-option-active');
					actives.removeClass('report-option-active');	
					$('[data-report-date-option="custom"]').removeClass('select-custom-option').addClass('report-option-active');
						var dateOptionMsg = "the Date Range below is currently in use";
						$('#report-date-option-msg').html(dateOptionMsg);
			break;
		default :
			break;
	};

	storeReportOption();

};


$(document).on('click', '[data-report-date-option]', function(e){

	var tar = $(e.target);
	var which = tar.attr('data-report-date-option');

	// find all Actives
	var actives = $('.report-option-active');

	// if it's the same, turn it off
	if (which !== "custom") {

		var dateOptionsDiv = $('#report-date-options');
		var isOpen = dateOptionsDiv.hasClass('hidden') ? false : true;
		if (isOpen) {
			$('[data-report-date-option="custom"]').removeClass('select-custom-option');
			dateOptionsDiv.slideToggle().addClass('hidden');
		}
		if (actives[0] === tar[0]) {
			// actives.removeClass('report-option-active');
			
			// setReportOption(false);
		}
		else {
			actives.removeClass('report-option-active');	
			tar.addClass('report-option-active');
		
			setReportOption(which);
		}
	} else {
		// actives.removeClass('report-option-active');

		var dateOptionsDiv = $('#report-date-options');
		var isOpen = dateOptionsDiv.hasClass('hidden') ? false : true;
		if (!isOpen) {
			tar.addClass('select-custom-option');

			var dateOptionMsg = "Select a Date Range using the widget below";
			$('#report-date-option-msg').html(dateOptionMsg);

			try {
				updateDateRange();	
			} catch(err) {
				console.log("Date Range picker not ready yet");
			}
			
			dateOptionsDiv.slideToggle().removeClass('hidden');

		}
	}

});

$(document).on('click', '.select-custom-option', function(e){

	console.log('in the Select Custom Option!');

	var dateOptionsDiv = $('#report-date-options');
	var isOpen = dateOptionsDiv.hasClass('hidden') ? false : true;
	if (isOpen) {
		console.log('in isOpen');
		$('[data-report-date-option="custom"]').removeClass('select-custom-option');
		dateOptionsDiv.slideToggle().addClass('hidden').removeClass('select-custom-option');
	} else {
		console.log('failed isOpen');
	}

});

/* Date Helper functions for setting Report Option data */
	
	function getDate(day){
		var theDate = new Date(day);
	    var dd = day.getDate();
	    var mm = day.getMonth()+1; 
	    var yyyy = day.getFullYear(); 
	    console.log(theDate);
	    console.log(yyyy + '-' + mm + '-' + dd);
		return yyyy + '-' + mm + '-' + dd;
	};
	function dateDiff(day1, day2){
		var calc = Math.round((day2-day1)/(1000*60*60*24)) + 1;
		console.log('day diff = ' + calc);
		return calc;
	};


function updateDateRange(){

	var data = $("#report-date-option-range").daterangepicker("getRange");
	var fromDate = getDate(data.start) || false; 
	var toDate = getDate(data.end) || false;
	var daysInRange = dateDiff(data.start, data.end) || false;

	if (fromDate && toDate && daysInRange) {
		setReportOption('custom',{
			'days' : daysInRange,
			'from' : fromDate,
			'to' : toDate
		});	
	}
		
};
