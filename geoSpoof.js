// GEO Spoof Script for Page Loads

(function geoSpoofFromExtension(){

	var geoSpoofActive, geoSpoofSpecificActive, geoSpoofON = false;

	var runGEOdataCheck = function() {

		// console.info('geoSpoofSpecificActive= ' + geoSpoofSpecificActive);
		// console.info('geoSpoofActive= ' + geoSpoofActive);

		var clearCurrentData = ((geoSpoofSpecificActive === true && geoSpoofActive !== true) ||
			(geoSpoofSpecificActive !== true && geoSpoofActive === true)) ? true : false;

		// now just make sure it needs to be set
		clearCurrentData = clearCurrentData && !geoSpoofON;

		// console.info('running GEO Check');
		// console.info('result to clear? ' + clearCurrentData);

		if (clearCurrentData) {
			var clearDB = document.createElement('script');
			clearDB.src = chrome.extension.getURL('clearGEOdata.js');
			var whereToGo = (window.top.document.head||window.top.document.documentElement);
			whereToGo.appendChild(clearDB);

			// analytics tracking...
			var eventObj = { 
		    	eventCategory: 'Advanced Features',
		    	eventAction: 'GEO Spoof',
		    	eventLabel: 'GEO Spoof of Demandbase API',
		    	title: window.top.document.href,
	    		page: window.top.document.href
			};
			var trackingInfo = ('_gaEvent=' + JSON.stringify(eventObj)).toString();
				// // console.log('passing this Event to Analytics Tracking >>> ');
				// // console.log(eventObj);
		   	chrome.extension.sendMessage(trackingInfo, function(response) {
		  
		   	});	
		}
	}

	chrome.storage.local.get(function(result){
		if (result['geoSpoofActive'] === true) geoSpoofActive = true;	
		if (result['geoSpoofSpecificActive'] === true) geoSpoofSpecificActive = true;	
		if (result['geoSpoofSet'] === true) geoSpoofON = true;

		if (result['geoSpoofIP']) {
			//	alert('this is the IP thats being set: ' + result['geoSpoofIP']);
		}
			
		runGEOdataCheck();

		if (result['geoSpoofActiveName']) {
			window.geoSpoofActiveName = result['geoSpoofActiveName'];
		}
		
	});

})();
