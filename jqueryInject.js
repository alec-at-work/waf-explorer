// jQuery check and inject

(function(){
		
	window.analytics = window.analytics || {};
	analytics.debug = analytics.debug || {};
	
	analytics.debug.jQueryExists = false;
	var noJQuery = true;

//	console.info('loaded jQueryInject.js');

//	console.log('jquery check!');
	if (typeof jQuery !== "undefined") {
	//	console.log('found $');
		if (typeof jQuery.fn.jquery !== "undefined") {
			// // console.log('found $.fn.jquery');
			// // console.log(document.getElementById('wafer-jquery-js'));

			var validVersion = true;
			var version = (jQuery.fn.jquery.split('.'))[0] + '.' + (jQuery.fn.jquery.split('.'))[1];

			// alert('jquery detected version: ' + version);

			switch (version) {
				case '1.0' :
				case '1.1' :
				case '1.2' :
				case '1.3' :
				case '1.4' :
				case '1.5' :
				case '1.6' :
				case '1.7' :
				//case '1.12' :
					validVersion = false;
					break;
			}

			if (document.getElementById('wafer-jquery-js') === null && validVersion) {
				
		//		// console.info('jQUERY INJECT --> a valid version was detected');
				noJQuery = false;
				window.analytics._findMyJQuery = 'valid';
				window.analytics._myJQueryVersion = version;

		//		console.log('jQUERY as VALID is now set');
		//		console.log(window.analytics._findMyJQuery + ' -> ' + window.analytics._myJQueryVersion);

			}
			analytics.debug.jQueryExists = true;
		}
	}
	if ( noJQuery ) {
		(function attachJQuery(){

			// alert('attaching jQuery because the version was.. ' + version);

			setTimeout(function(){
			//	console.info('jQUERY INJECT --> Injecting Extension version');
				window.analytics._findMyJQuery = 'injected valid version';
				var head = document.head;
				var jqueryJS = document.createElement('script');
				jqueryJS.type = 'text/javascript';
				jqueryJS.src = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/jquery.min.recent.js';
				jqueryJS.id = 'wafer-jquery-js';
				head.appendChild(jqueryJS);	
			}, 10);
		})();
	}
})();
