
(function loadNotices($){

// console.log('in NOTIFICATIONS.js');
// console.log('jQUERY @ load of JS');
// console.log(window.analytics._findMyJQuery);

var checkIt = localStorage.getItem('waferData');
// console.log(JSON.parse(checkIt));

var sendResults = JSON.parse(checkIt);

processNotices(sendResults);

localStorage.removeItem('waferData');

/*
chrome.storage.local.get(function(result){
	//	alert("Data Grabbed for Notices");
	// // console.log('NOTICES DATA...');
	// // console.log(result);
	processNotices(result);
});

*/

function processNotices(result) {

	var rewriteNote, injectNote, spaceUsedNote = false;
	var geoSpoof, geoSpoofSpecific, geoSpoofIP, geoSpoofName, geoSpoofIPSpecific, disableOn = false;

	// CHECK FEATURES
	var bubblesYeah = false;

	// REWRITES and INJECTS
	if (result['rewriteActive']) {
		if (result['rewriteActive'] === true) {
			if (result['spaceRewrite']) {
				rewriteNote = true;
				bubblesYeah = true;			
			}
		}
		if (window.validRewrite) {
			bubblesYeah = true;	
		}
	}
	if (result['disableActive']){
		if (result['disableActive'] === true) {
			disableOn = true;
			bubblesYeah = true;		
		}
	}
	if (result['injectActive']) {
		if (result['injectActive'] === true) {
			injectNote = true;
			bubblesYeah = true;		
		}
		if (window.validInject) {
			bubblesYeah = true;		
		}
	}
	if (result['spaceRewrite']) {
		spaceUsedNote = result['spaceRewrite'];
	}

	// GEO Spoofs
	if (result['geoSpoofActive'] === true) {
		geoSpoof = true;
		bubblesYeah = true;
		if (result['geoSpoofIP']) {
			geoSpoofIP = result['geoSpoofIP'];
		}	
		if (result['geoSpoofName']) {
			geoSpoofName = result['geoSpoofName'];
			geoSpoofName = geoSpoofName.toUpperCase();

			/*
			geoSpoofName = (function capitalizeFirstLetter() {
				var string = result['geoSpoofName'];
			    return string.charAt(0).toUpperCase() + string.slice(1);
			})();
			*/
		}
	}
	/*
	if (result['geoSpoofSpecificActive'] === "true") {
		geoSpoofSpecific = true;
		if (result['geoSpoofSpecificIP']) {
			geoSpoofIPSpecific = result['geoSpoofSpecificIP'];
		}	
	}
	*/

	/*
	// console.log('about to try MESSAGES');
	// console.log(typeof jQuery);
	
	// console.log('jQuery check before notice bubbles');
	// console.log(typeof window.top.$);
	*/

	// CREATE MESSAGES
	// the main Bubble Holder
	var _bubbleHolder = $('<div id="waf-debug-notification-bubble" />');
	
	/*
	var _bubbleHolder = document.createElement("div");
		_bubbleHolder.setAttribute('id','waf-debug-notification-bubble');
		*/

	var bstrapBubble;
	if (injectNote && rewriteNote) {
		// // console.log("Both are on!");
		bstrapBubble = $('<div class="waf-debug-notification-bubble-holder waf-debug-notification-error" />');
		bstrapBubble.html('error: both REWRITE & INJECT are ACTIVE');
		bstrapBubble.append($('<img class="wafer-notice-logo" src="chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/bar/inactiveLogoReal.png" />'));
		bstrapBubble.append($('<i class="fa fa-exclamation waf-debug-notice-symbol" style="font-family:FontAwesome"  aria-hidden="true"/ >'));
		bstrapBubble.append($('<img class="wafer-notice-close-button" src="chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/closeX.png" />'));

		/*
		Pure JavaScript version
			bstrapBubble = document.createElement("div");
				bstrapBubble.classList.add('waf-debug-notification-bubble-holder');
				bstrapBubble.classList.add('waf-debug-notification-error');
				bstrapBubble.innerHTML ='error: both REWRITE & INJECT are ACTIVE';

			var icon = document.createElement("i");
				icon.classList.add('fa');
				icon.classList.add('fa-exclamation');
				icon.classList.add('waf-debug-notice-symbol');
				icon.setAttribute('aria-hidden', true);

			bstrapBubble.appendChild(icon);
		*/
	}
	else if (injectNote) {
		// // console.log("Inject is ON");
		bstrapBubble = $('<div class="waf-debug-notification-bubble-holder waf-debug-notification-rewrite" />');
		var text = ('an INJECT of <b>' + spaceUsedNote + '</b> is ACTIVE').toString();
		bstrapBubble.html(text);
		bstrapBubble.append($('<img class="wafer-notice-logo" src="chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/bar/inactiveLogoReal.png" />'));
		bstrapBubble.append($('<i class="fa fa-cogs waf-debug-notice-symbol waf-notice-tms" style="font-family:FontAwesome" aria-hidden="true"/ >'));
		bstrapBubble.append($('<img class="wafer-notice-close-button" src="chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/closeX.png" />'));
	}
	else if (rewriteNote) {
		// // console.log("Rewrite is ON");
		bstrapBubble = $('<div class="waf-debug-notification-bubble-holder waf-debug-notification-rewrite" />');
		var text = ('a REWRITE to <b>' + spaceUsedNote + '</b> is ACTIVE').toString();
		bstrapBubble.html(text);
		bstrapBubble.append($('<img class="wafer-notice-logo" src="chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/bar/inactiveLogoReal.png" />'));
		bstrapBubble.append($('<i class="fa fa-cogs waf-debug-notice-symbol waf-notice-tms" style="font-family:FontAwesome" aria-hidden="true"/ >'));
		bstrapBubble.append($('<img class="wafer-notice-close-button" src="chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/closeX.png" />'));
	}
	if (injectNote || rewriteNote) {
	//	alert('adding to the bubble');
		_bubbleHolder.append(bstrapBubble);
	}

	
	var dbdataBubb;
	if (geoSpoof && !geoSpoofSpecific) {
		// // console.log("GEO Spoof is ON");
		dbdataBubb = $('<div class="waf-debug-notification-bubble-holder waf-debug-notification-geo-spoof" />');
		if (geoSpoofName) dbdataBubb.html('a Demandbase GEO Spoof of <b>' + geoSpoofName + '</b> is on');
		else dbdataBubb.html('a Demandbase GEO Spoof is on');
		dbdataBubb.append($('<img class="wafer-notice-logo" src="chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/bar/inactiveLogoReal.png" />'));
		dbdataBubb.append($('<i class="fa fa-globe waf-debug-notice-symbol waf-notice-geo" style="font-family:FontAwesome" aria-hidden="true"/ >'));
		dbdataBubb.append($('<img class="wafer-notice-close-button" src="chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/closeX.png" />'));
	}
	else if (!geoSpoof && geoSpoofSpecific) {
		// // console.log("GEO Spoof is ON");
		dbdataBubb = $('<div class="waf-debug-notification-bubble-holder waf-debug-notification-geo-spoof" />');
		dbdataBubb.html('a specific IP Demandbase GEO Spoof is on');
		dbdataBubb.append($('<img class="wafer-notice-logo" src="chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/bar/inactiveLogoReal.png" />'));
		dbdataBubb.append($('<i class="fa fa-globe waf-debug-notice-symbol waf-notice-geo" style="font-family:FontAwesome" aria-hidden="true"/ >'));
		dbdataBubb.append($('<img class="wafer-notice-close-button" src="chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/closeX.png" />'));
	}
	else if (geoSpoof && geoSpoofSpecific) {
		// // console.log("GEO Spoof is ON");
		dbdataBubb = $('<div class="waf-debug-notification-bubble-holder waf-debug-notification-error" />');
		dbdataBubb.html('error: both GEO Spoof types are active');
		dbdataBubb.append($('<img class="wafer-notice-logo" src="chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/bar/inactiveLogoReal.png" />'));
		dbdataBubb.append($('<i class="fa fa-exclamation waf-debug-notice-symbol waf-notice-geo" style="font-family:FontAwesome" aria-hidden="true"/ >'));
		dbdataBubb.append($('<img class="wafer-notice-close-button" src="chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/closeX.png" />'));
	}

	if (geoSpoof || geoSpoofSpecific) {
	//	alert('adding to the bubble');
		_bubbleHolder.append(dbdataBubb);
	}
	
	var disableBubb;
	if (disableOn) {
		disableBubb = $('<div class="waf-debug-notification-bubble-holder waf-debug-notification-disabled" />');
		disableBubb.html('TMS / Bootstrap is <b>disabled</b>');
		disableBubb.append($('<img class="wafer-notice-logo" src="chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/bar/inactiveLogoReal.png" />'));
		disableBubb.append($('<i class="fa fa-ban waf-debug-notice-symbol waf-notice-disabled" style="font-family:FontAwesome" aria-hidden="true"/ >'));
		disableBubb.append($('<img class="wafer-notice-close-button" src="chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/closeX.png" />'));
		_bubbleHolder.append(disableBubb);
	}

	// Then append any messages...
	if (bubblesYeah) {
		// alert("time to append now");
		
		$(window.top.document['body']).append(_bubbleHolder);

			// PURE JavaScript version
		// window.top.document.body.appendChild(_bubbleHolder);

		
		// reset Font Awesome elements?
		setTimeout(function(){
		//	// console.log('resetting FontAwesome');
			$('.wf-active .fa').css('font-family','FontAwesome');	
			// $('#waf-debug-notification-bubble').css('webkit-font-smoothing','auto');
		},8);
		

		$('#waf-debug-notification-bubble').fadeTo("slow", 1.0, function(){
			$('.waf-debug-notification-bubble-holder').on('click', function(e){
				$(this).remove();
			});



			$('.waf-notice-tms').on('click', function(e){
				e.stopImmediatePropagation();
			   	chrome.extension.sendMessage('openSettingsTMS', function(response) {
			  
			   	});	
			});
			$('.waf-notice-geo').on('click', function(e){
				e.stopImmediatePropagation();
				chrome.extension.sendMessage('openSettingsGEO', function(response) {
			  
			   	});	
			});

			/*
			setTimeout(function(){
				if ($('#waf-debug-notification-bubble')) {
					$('#waf-debug-notification-bubble').fadeTo("slow", 0.0, function(){
						$('#waf-debug-notification-bubble').remove();
					});	
				}
			},4000);
			*/
		});
	}
}

})(jQuery);