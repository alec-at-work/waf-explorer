
var myAnalytics = {
	'dimension1' : 'extension',
	'dimension2' : false
};


// the tool itself
var s = document.createElement('script');
s.src = chrome.extension.getURL('vBeta.js');

// the base pieces for the itself
var base = document.createElement('script');
base.src = chrome.extension.getURL('/js/basePieces.js');

var whereToGo = (window.top.document.head || window.top.document.documentElement);

// whereToGo.appendChild(logo);
// whereToGo.appendChild(closeX);
// whereToGo.appendChild(styleSheet);

// append the BASE pieces
whereToGo.appendChild(base);

setTimeout(function(){
	whereToGo.appendChild(s);
},200);

/*
// Message Relaying JS
var relay = document.createElement('script');
relay.src = chrome.extension.getURL('/js/msgRelay.js');
whereToGo.appendChild(relay);
*/

// Then check Data Parameters for Tracking
chrome.storage.local.get(function(result){
	var _headerInject, _activeRewrite, _spaceRewrite = false;

	if (result['injectActive'] === 'true') {
		_headerInject = true;
	}
	if (result['rewriteActive'] === 'true') {
		_activeRewrite = true;
	}
	if (result['spaceRewrite']) {
		_spaceRewrite = result['spaceRewrite'];
		
	}

	// Inject Dimension Set
	if (_headerInject && !_activeRewrite ) {
		myAnalytics['dimension2'] = ('inject Bootstrap: ' + _spaceRewrite).toString()	
	}
	// Rewrite Active Set
	else if (!_headerInject && _activeRewrite ) {
		myAnalytics['dimension2'] = ('rewrite Bootstrap: ' + _spaceRewrite).toString()
	}
	// normal mode
	else {
		myAnalytics['dimension2'] = ('no advanced settings').toString()
	}

});



