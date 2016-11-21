var whereToGo = (window.top.document.head||window.top.document.documentElement);

/*
// Message Relaying JS
var relay = document.createElement('script');
relay.src = chrome.extension.getURL('/js/msgRelay.js');
whereToGo.appendChild(relay);
*/

// Link Eval JS
var linkEval = document.createElement('script');
linkEval.src = chrome.extension.getURL('/js/linkEval.js');
whereToGo.appendChild(linkEval);

// Reporting Tool
var reportTool = document.createElement('script');
reportTool.src = chrome.extension.getURL('/js/reportJS.js');

setTimeout(function(){
	whereToGo.appendChild(reportTool);	
},250);