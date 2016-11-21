// pieces that always need to load ONCE

window.____waferBaseSet = window.____waferBaseSet || false;

var isDeployed = window.____waferBaseSet;

if (!isDeployed) {

	// jQuery minified
	var apiPull = document.createElement('script');
	apiPull.src = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/js/apiPull.js';

	// jQuery minified
	var jqueryJS = document.createElement('script');
	jqueryJS.src = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/jqueryInject.js';

	// appTracking
	// var appT = document.createElement('script');
	// appT.src = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/appTracking.js';

	// pep
	var pepJS = document.createElement('script');
	pepJS.src = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/pep.js';
	pepJS.id = 'wafer-pep-js';

	// the WAFER Base
	var base = document.createElement('script');
	base.src = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/js/waferBase.js';

	// the WAFER Charts
	var charts = document.createElement('script');
	charts.src = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/js/reportCharts.js';

	// Artifakt font
	var artifakt = document.createElement('link');
	artifakt.href = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/css/loadArtifakt.css';
	artifakt.type = 'text/css';
	artifakt.rel = 'stylesheet';

	// Font Awesome CSS (append it NOW)
	var fontAwesome = document.createElement('link');
	fontAwesome.href = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/css/font-awesome.css';
	fontAwesome.type = 'text/css'
	fontAwesome.rel = 'stylesheet'
	fontAwesome.id = 'wafer-font-awesome-css';

	// style sheet
	var styleSheet = document.createElement('link');
	styleSheet.href = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/vBeta.css';
	styleSheet.type = 'text/css'
	styleSheet.rel = 'stylesheet'
	styleSheet.id = 'wafer-style-css';

	// WAFER Reporting style sheet
	var reportStyle = document.createElement('link');
	reportStyle.href = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/css/reportStubStyle.css';
	reportStyle.type = 'text/css'
	reportStyle.rel = 'stylesheet'
	reportStyle.id = 'wafer-report-style-css';

	var whereToGo = (window.top.document.head || window.top.document.documentElement);

	whereToGo.appendChild(artifakt);
	whereToGo.appendChild(fontAwesome);
	whereToGo.appendChild(jqueryJS);
	whereToGo.appendChild(styleSheet);
	whereToGo.appendChild(reportStyle);
	
	setTimeout(function(){
		whereToGo.appendChild(apiPull);
	//	whereToGo.appendChild(appT);
		whereToGo.appendChild(pepJS);
		whereToGo.appendChild(base);
		whereToGo.appendChild(charts);

		// then try to update the logos for the PJAX nonesense
		try {
			
			var isPjax = typeof pjax !== "undefined" || typeof pjax_load !== "undefined" ? true : false;
			if (isPjax) {

				$('#waf-debug-logo').attr('src','chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/exploreLogo.png');
				$('#waf-debug-close-button').attr('src','chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/closeX.png');
				$('.waf-report-close-button').attr('src','chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/closeX.png');

			}
		} catch(err) {
			// PJAX stuff went silly
		}

	},100);

	window.____waferBaseSet = true;

}
else {
	// console.log("BASE PIECES ALREADY DEPLOYED");
}
