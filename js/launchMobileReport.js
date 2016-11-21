var whereToGo = (window.top.document.head||window.top.document.documentElement);

// the base pieces for the itself
var base = document.createElement('script');
base.src = chrome.extension.getURL('/js/basePieces.js');

// Traffic Report smiple jS
var report = document.createElement('script');
report.src = chrome.extension.getURL('/js/report_mobile.js');

// append the Base Pieces
whereToGo.appendChild(base);	

setTimeout(function(){
	whereToGo.appendChild(report);	
},50);