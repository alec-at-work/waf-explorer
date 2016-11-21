

// console.log('<<>> REWRITE.JS activated');

/*
chrome.webRequest.onAuthRequired.addListener(
    function (details, callback) {
        alert("hiii!");
        // console.log('onAuthRequired', details);
        callback({
            authCredentials: {username: "alpha", password: "beta"}
        });
    },
    {urls: ['<all_urls>']},
    ['asyncBlocking']
);
*/

/*
var doSpaceRewrite = function(){
	chrome.storage.local.get(function(result){
		// console.log('<<>> [[ the state of the tool ]]');
		// console.log(result);
		if (result['spaceRewrite']) {
			window.theSpacePoint = result['spaceRewrite'].toString();
		}
		if (result['rewriteActive'] == 'true') {
			window.rewriteActive = true;
		}
		else {
			window.rewriteActive = false;
		}
	});
};
// run the Initial State at load
// console.log('<<>> doing space Rewrite function');
doSpaceRewrite();
*/


// console.log('<<>> Chrome WebRequest function is being set...');
// listen for Web Requests
chrome.webRequest.onBeforeRequest.addListener(
    function(details, callback) {
    	
    	// doSpaceRewrite();

    	var finalSpaceURL = '';
    	// var URL = details.url;
		// return {redirectUrl: 'https://nexus.ensighten.com/adsk/micro_stg/Bootstrap.js'};		
		chrome.storage.local.get(function(result){
			// console.log('<<>> [[ the state of the tool ]]');
			// console.log(result);
			var theSpacePoint = '';
			
			alert('the rewrite is active? ' + result['rewriteActive']);
			
			if (result['spaceRewrite']) {
				theSpacePoint = result['spaceRewrite'].toString();
			}
			if (result['rewriteActive'] == 'true') {
				var newSpaceURL = 'https://nexus.ensighten.com/adsk/' + theSpacePoint + '/Bootstrap.js';
				alert(newSpaceURL);
		    	finalSpaceURL = newSpaceURL;
			}
		});

		//alert("found a NEXUS call");	
		// return {redirectUrl: newSpaceURL};	
		return {redirectUrl: finalSpaceURL};	

		
    },
    {
    	urls: ['*://nexus.ensighten.com/adsk/*/Bootstrap.js'],
	 	types: ['script'] 
	 		//["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"}
	},
	['blocking']
);
// console.log('<<>> Chrome WebRequest function set...');



