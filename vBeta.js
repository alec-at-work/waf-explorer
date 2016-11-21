

(function buildDebugTool($){
	
	try {

		var __goo = function($){

		// INTIALIZE
		window.analytics = window.analytics || {};

		var _debugSkeleton=$('<div id=waf-debug-edge>\n<div id=waf-debug-block><img id=waf-debug-logo src=chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/exploreLogo.png><img id=waf-debug-close-button src=chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/closeX.png>\n<div id=waf-debug-main-menu>\n<div data-debug-menu=info>PAGE</div>\n<div data-debug-menu=analyze>ANALYZE</div>\n<div data-debug-menu=tools>OTHER</div>\n</div>\n<div class=debug-content id=waf-debug-content-info data-debug-visible=0>\n<div class=debug-content-options>\n<div data-debug-submenu-info=info>Details</div>\n<div data-debug-submenu-info=data>Data</div>\n<div data-debug-submenu-info=performance>Performance</div>\n</div>\n<div id=waf-debug-info-info data-debug-sub-visible=0><i class=waf-debug-info-descrip>Page-level Details</i>\n<div id=waf-debug-info-page>\n<div class=waf-debug-content-holder>\n<div class=waf-debug-holder>\n<div class="waf-debug-holder-stack waf-debug-holder-a">Page Name</div>\n<div class="waf-debug-holder-stack waf-debug-holder-b" id=waf-debug-data-layer-pagename>...</div>\n</div>\n<div class=waf-debug-holder>\n<div class="waf-debug-holder-stack waf-debug-holder-a">Product Name</div>\n<div class="waf-debug-holder-stack waf-debug-holder-b" id=waf-debug-data-layer-product>...</div>\n</div>\n<div class=waf-debug-holder>\n<div class="waf-debug-holder-stack waf-debug-holder-a">Campaign</div>\n<div class="waf-debug-holder-stack waf-debug-holder-b" id=waf-debug-campaign-type>...</div>\n</div>\n<div class=waf-debug-holder>\n<div class="waf-debug-holder-stack waf-debug-holder-a">Environment</div>\n<div class="waf-debug-holder-stack waf-debug-holder-b" id=waf-debug-data-layer-instance>...</div>\n</div>\n<div class=waf-debug-holder>\n<div class="waf-debug-holder-stack waf-debug-holder-a">Report Suite</div>\n<div class="waf-debug-holder-stack waf-debug-holder-b" id=waf-debug-data-report-suite>...</div>\n</div>\n</div><i class=waf-debug-info-descrip>other Services</i>\n<div id=waf-debug-info-services>\n<div class=waf-debug-content-holder>\n<table id=waf-debug-tracking-services-table>\n<tr class=waf-debug-tracking-header>\n<td>name\n<td>active\n<tr>\n<td class=waf-debug-tracking-table-name>Foresee\n<td data-waf-debug-track-service=foresee>no\n<tr>\n<td class=waf-debug-tracking-table-name>Marketo (Munchkin)\n<td data-waf-debug-track-service=marketo-munchkin>no\n<tr>\n<td class=waf-debug-tracking-table-name>Marketo (Form)\n<td data-waf-debug-track-service=marketo-aem>no\n<tr>\n<td class=waf-debug-tracking-table-name>Test & Target (TnT)\n<td data-waf-debug-track-service=tnt>no\n<tr>\n<td class=waf-debug-tracking-table-name>active TnT mbox\n<td data-waf-debug-track-service=tnt-mbox>no</table>\n</div>\n</div>\n</div>\n</div>\n<div id=waf-debug-info-data data-debug-sub-visible=0>\n<i class=waf-debug-info-descrip>\ndetails related to\n<b id=waf-debug-hide-nurture-container>Nurture</b>\nmarketing\n</i>\n<div id=waf-debug-data-nurture-obj>\n<div class="waf-debug-content-holder waf-debug-data-nurture-obj-display">\nnot detected\n</div>\n</div>\n<i class=waf-debug-info-descrip>details of the\n<b id=waf-debug-hide-data-layer-container>digitalData</b>\nJSON object</i>\n<div id=waf-debug-data-layer>\n<div class="waf-debug-content-holder waf-debug-data-layer-display">\nnot detected\n</div>\n</div>\n</div>\n<div id=waf-debug-info-performance data-debug-sub-visible=0><i class=waf-debug-info-descrip>Page performance metrics</i>\n<div id=waf-debug-performance>\n<div class=waf-debug-content-holder>\n<div class=waf-debug-holder>\n<div class="waf-debug-holder-stack waf-debug-holder-b">Page Load Latency</div>\n<div class="waf-debug-holder-stack waf-debug-holder-a" id=waf-debug-req-latency>...</div>\n</div>\n<div class=waf-debug-holder>\n<div class="waf-debug-holder-stack waf-debug-holder-b">TMS Errors</div>\n<div class="waf-debug-holder-stack waf-debug-holder-a" id=waf-debug-req-tms-errors>...</div>\n</div>\n<div class=waf-debug-holder>\n<div class="waf-debug-holder-stack waf-debug-holder-b">Responsive Breakpoint</div>\n<div class="waf-debug-holder-stack waf-debug-holder-a" id=waf-debug-req-breakpoint>...</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n<div class=debug-content id=waf-debug-content-analyze data-debug-visible=0>\n<div class=debug-content-options>\n<div data-debug-submenu-track=inspect>Inspector</div>\n<div data-debug-submenu-track=requirements>Requirements</div>\n</div>\n<div id=waf-debug-track-requirements data-debug-sub-visible=0><i class=waf-debug-info-descrip>Requirements for Foundation</i>\n<div id=waf-debug-info-reqs>\n<div class=waf-debug-content-holder>\n<div class=waf-debug-holder>\n<div class="waf-debug-holder-stack waf-debug-holder-a">jQuery</div>\n<div class="waf-debug-holder-stack waf-debug-holder-b" id=waf-debug-req-jquery>...</div>\n</div>\n<div class=waf-debug-holder>\n<div class="waf-debug-holder-stack waf-debug-holder-a">Data Layer</div>\n<div class="waf-debug-holder-stack waf-debug-holder-b" id=waf-debug-req-data-layer>...</div>\n</div>\n<div class=waf-debug-holder>\n<div class="waf-debug-holder-stack waf-debug-holder-a">TMS</div>\n<div class="waf-debug-holder-stack waf-debug-holder-b" id=waf-debug-req-tms>...</div>\n</div>\n</div>\n</div>\n</div>\n<div id=waf-debug-track-inspect data-debug-sub-visible=0><i class=waf-debug-info-descrip>on-page Link Tagging</i>\n<div id=waf-debug-info-tagging>\n<div class=waf-debug-content-holder>\n<table id=waf-debug-tracking-options>\n<tr class=waf-debug-tracking-header>\n<td>tracking type\n<td>show\n<td>count\n<tr>\n<td class=waf-debug-tracking-table-name>Links\n<td>\n<input type=checkbox class=waf-debug-checkbox data-waf-debug-track=links>\n<br>\n<td data-waf-debug-track-count=links>\n<tr>\n<td class=waf-debug-tracking-table-name>Nurture Links\n<td>\n<input type=checkbox class=waf-debug-checkbox data-waf-debug-track=nurture>\n<br>\n<td data-waf-debug-track-count=nurture>\n<tr>\n<td class=waf-debug-tracking-table-name>Buy Links (Path to Purchase)\n<td>\n<input type=checkbox class=waf-debug-checkbox data-waf-debug-track=buy>\n<br>\n<td data-waf-debug-track-count=buy>\n<tr>\n<td class=waf-debug-tracking-table-name>Cloud Trials\n<td>\n<input type=checkbox class=waf-debug-checkbox data-waf-debug-track=cloud>\n<br>\n<td data-waf-debug-track-count=cloud>\n<tr>\n<td class=waf-debug-tracking-table-name>Social Share\n<td>\n<input type=checkbox class=waf-debug-checkbox data-waf-debug-track=social>\n<br>\n<td data-waf-debug-track-count=social>\n</table>\n</div>\n</div>\n<div class=waf-debug-tracking-remove-inactive id=waf-debug-tracking-remove>Remove Highlighting</div><i class=waf-debug-info-descrip>hover over tagged elements to inspect</i>\n<div id=waf-debug-hover-inspect></div><i class=waf-debug-info-descrip>any <b>v21</b> values detected will show below</i>\n<div id=waf-debug-hover-report-data><b id=waf-debug-hover-report-data-output></b>\n</div>\n<div id=waf-debug-inspect-setting>\n<input type=checkbox checked data-debug-inspect-type=mouseenter> <span id=waf-debug-inspect-type-msg>leave values after hover</span>\n</div>\n</div>\n</div>\n<div class=debug-content id=waf-debug-content-tools data-debug-visible=0>\n<div class=debug-content-options>\n<div data-debug-submenu-tools=tms-details>TMS Inspector</div>\n<div data-debug-submenu-tools=report>Contact</div>\n</div>\n<div id=waf-debug-tools-tms-details data-debug-sub-visible=0><i class=waf-debug-info-descrip>TMS deployments on this page</i>\n<div id=waf-tool-tms-details>\n<div data-debug-tms-get-deployments=true>Get the Deployments</div>\n</div><i class="waf-debug-info-descrip hidden" id=tms-deployments-descrip>synchronously loaded deployments appear <b style=color:red>red</b></i>\n</div>\n<div id=waf-debug-tools-report data-debug-sub-visible=0><i class=waf-debug-info-descrip>contact the team</i>\n<div id=waf-tool-buttons-holder>\n<div class=waf-tool-button data-debug-report=bug>Report a Bug</div>\n<div class=waf-tool-button data-debug-report=feature>Request a Feature</div>\n<div class=waf-tool-button data-debug-report=other>or Other</div>\n</div>\n<div class=waf-tools-append id=waf-debug-report-append></div>\n</div>\n</div>\n<div id=waf-debug-main-status>\n<div class=debug-main-status><i>S T A T U S :</i>\n</div>\n<div class=debug-main-status id=waf-debug-status></div>\n</div>\n</div>\n<div id=waf-debug-drag-top></div>\n<div id=waf-debug-drag-bottom></div>\n</div>');
		// var _debugSkeleton=$('<div id="waf-debug-edge">\n	\n	<div id="waf-debug-block">\n		<img id="waf-debug-logo" src="chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/exploreLogo.png"></img>\n		<img id="waf-debug-close-button" src="chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/closeX.png"></img>\n		\n		<!-- MAIN MENU -->\n\n		<div id="waf-debug-main-menu">\n			<div data-debug-menu="info">PAGE</div>\n			<div data-debug-menu="analyze">ANALYZE</div>\n			<div data-debug-menu="tools">OTHER</div> \n		</div>\n\n		<!--  PAGE SECTION  -->\n\n		<div id="waf-debug-content-info" class="debug-content" data-debug-visible="0">\n\n			<div class="debug-content-options">\n				<div data-debug-submenu-info="info">Details</div>\n				<div data-debug-submenu-info="tags">Link Tags</div>\n				<div data-debug-submenu-info="data-layer">Data Layer</div>\n			</div>\n			\n			<!-- PAGE DETAILS -->\n			<div id="waf-debug-info-info" data-debug-sub-visible="0">			\n				<!-- <div id="waf-debug-content-info" class="debug-content" data-debug-visible="0"> -->\n				\n				<!-- Page Level / digitalData Details -->\n				<i class="waf-debug-info-descrip">Page-level Details</i>\n				<div id="waf-debug-info-page">\n					<div class="waf-debug-content-holder">\n						<div class="waf-debug-reqs-holder-a">\n							<div class="waf-debug-reqs-holder-stack">Environment</div>\n							<div class="waf-debug-reqs-holder-stack">Page Name</div>\n							<div class="waf-debug-reqs-holder-stack">Product Name</div>					\n						</div>\n						<div class="waf-debug-reqs-holder-b">\n							<div id="waf-debug-data-layer-instance" class="waf-debug-reqs-holder-stack">...</div>\n							<div id="waf-debug-data-layer-pagename" class="waf-debug-reqs-holder-stack">...</div>\n							<div id="waf-debug-data-layer-product" class="waf-debug-reqs-holder-stack">...</div>\n						</div>					\n					</div>\n				\n				<!-- Supported Tracking Services -->\n				<i class="waf-debug-info-descrip">other Services</i>\n				<div id="waf-debug-info-services">\n					<div class="waf-debug-content-holder">\n						<table id="waf-debug-tracking-services-table">\n							<tr class="waf-debug-tracking-header">\n								<td>name</td>\n								<td>active</td>\n							</tr>\n							<tr>\n								<td class="waf-debug-tracking-table-name">Foresee</td>\n								<td data-waf-debug-track-service="foresee">no</td>\n							</tr>\n							<tr>\n								<td class="waf-debug-tracking-table-name">Marketo</td>\n								<td data-waf-debug-track-service="marketo">no</td>\n							</tr>\n							<tr>\n								<td class="waf-debug-tracking-table-name">Test & Target</td>\n								<td data-waf-debug-track-service="tnt">no</td>\n							</tr>\n						</table>\n					</div>\n				</div>\n				\n				</div>\n			</div>\n\n			<!-- LINK TRACKING TAGS -->\n			<div id="waf-debug-info-tags" data-debug-sub-visible="0">\n				<!-- Supported Tracking Types -->\n				<i class="waf-debug-info-descrip">on-page Link Tagging</i>\n				<div id="waf-debug-info-tagging">\n					<div class="waf-debug-content-holder">\n						<table id="waf-debug-tracking-options">\n							<tr class="waf-debug-tracking-header">\n								<td>tracking type</td>\n								<td>show</td>\n								<td>count</td>\n							</tr>\n							<tr>\n								<td class="waf-debug-tracking-table-name">Links</td>\n								<td><input type="checkbox" data-waf-debug-track="links" class="waf-debug-checkbox"><br></td>\n								<td data-waf-debug-track-count="links"></td>\n							</tr>\n						<!--	<tr>\n								<td class="waf-debug-tracking-table-name">Trials</td>\n								<td><input type="checkbox" data-waf-debug-track="trials" class="waf-debug-checkbox"><br></td>\n								<td data-waf-debug-track-count="trials"></td>\n							</tr> -->\n							<tr>\n								<td class="waf-debug-tracking-table-name">Cloud Trials</td>\n								<td><input type="checkbox" data-waf-debug-track="cloud" class="waf-debug-checkbox"><br></td>\n								<td data-waf-debug-track-count="cloud"></td>\n							</tr>\n							<tr>\n								<td class="waf-debug-tracking-table-name">Social Share</td>\n								<td><input type="checkbox" data-waf-debug-track="social" class="waf-debug-checkbox"><br></td>\n								<!-- <td><div class="waf-debug-track-select-color" data-waf-debug-track="social">off</div></td> -->\n								<td data-waf-debug-track-count="social"></td>\n							</tr>\n						</table>\n					</div>\n				</div>\n\n				<div id="waf-debug-tracking-remove" class="waf-debug-tracking-remove-inactive">Remove Highlighting</div>\n\n			</div>\n\n			<!-- DATA LAYER -->\n			<div id="waf-debug-info-data-layer" data-debug-sub-visible="0">			\n				<!-- <div id="waf-debug-content-info" class="debug-content" data-debug-visible="0"> -->\n				<!-- Foundation Requirements -->\n				<i class="waf-debug-info-descrip">details of the (<b>digitalData</b>) JSON object</i>\n				<div id="waf-debug-data-layer">\n					<div class="waf-debug-content-holder waf-debug-data-layer-display">\n						not detected\n					</div>\n				</div>\n			</div>\n		</div>\n\n		<!--  ANALYZE SECTION  -->\n		<div id="waf-debug-content-analyze" class="debug-content" data-debug-visible="0">\n			\n			<div class="debug-content-options">\n				<div data-debug-submenu-track="requirements">Requirements</div>\n				<div data-debug-submenu-track="performance">Performance</div>\n				<div data-debug-submenu-track="inspect">Inspector</div>\n			</div>\n		\n			<!-- FOUNDATION REQUIREMENTS -->\n			<div id="waf-debug-track-requirements" data-debug-sub-visible="0">\n			\n				<!-- Foundation Requirements -->\n				<i class="waf-debug-info-descrip">Requirements for Foundation</i>\n				<div id="waf-debug-info-reqs">\n					<div class="waf-debug-content-holder">\n						<div class="waf-debug-reqs-holder-a">\n							<div class="waf-debug-reqs-holder-stack">jQuery</div>\n							<div class="waf-debug-reqs-holder-stack">Data Layer</div>\n							<div class="waf-debug-reqs-holder-stack">TMS</div>				\n						</div>\n						<div class="waf-debug-reqs-holder-b">\n							<div id="waf-debug-req-jquery" class="waf-debug-reqs-holder-stack">...</div>\n							<div id="waf-debug-req-data-layer" class="waf-debug-reqs-holder-stack">...</div>\n							<div id="waf-debug-req-tms" class="waf-debug-reqs-holder-stack">...</div>\n						</div>\n					</div>\n				</div>\n\n		 	</div>\n\n		 	<!-- PERFORMANCE -->\n			<div id="waf-debug-track-performance" data-debug-sub-visible="0">			\n				<!-- <div id="waf-debug-content-info" class="debug-content" data-debug-visible="0"> -->\n				<!-- Foundation Requirements -->\n				<i class="waf-debug-info-descrip">Page performance metrics</i>\n				<div id="waf-debug-performance">\n					<div class="waf-debug-content-holder">\n						<div class="waf-debug-reqs-holder-b">\n							<div class="waf-debug-reqs-holder-stack">Page Load Latency</div>\n							<div class="waf-debug-reqs-holder-stack">Time to Page Load Tracking</div>\n							<div class="waf-debug-reqs-holder-stack">TMS Load Time</div>\n							<div class="waf-debug-reqs-holder-stack">TMS Errors</div>\n							<div class="waf-debug-reqs-holder-stack">Responsive Breakpoint</div>								\n						</div>\n						<div class="waf-debug-reqs-holder-a">\n							<div id="waf-debug-req-latency" class="waf-debug-reqs-holder-stack">...</div>\n							<div id="waf-debug-req-page-load-track" class="waf-debug-reqs-holder-stack">...</div>\n							<div id="waf-debug-req-tms-load-time" class="waf-debug-reqs-holder-stack">...</div>\n							<div id="waf-debug-req-tms-errors" class="waf-debug-reqs-holder-stack">...</div>\n							<div id="waf-debug-req-breakpoint" class="waf-debug-reqs-holder-stack">...</div>\n						</div>\n					</div>\n				</div>\n			</div>\n\n			 <!-- INSPECTOR -->\n			<div id="waf-debug-track-inspect" data-debug-sub-visible="0">\n				<!-- Hover to unveil tagging -->\n				<i class="waf-debug-info-descrip">hover over tagged elements to inspect</i>\n				<div id="waf-debug-hover-inspect"></div>\n				<div id="waf-debug-inspect-setting">\n					<input type="checkbox" data-debug-inspect-type="mouseenter">\n					<span id="waf-debug-inspect-type-msg">leave values after hover</span>\n				</div>\n			</div>\n		</div>\n		\n		\n\n		<!-- TOOLS -->\n\n		<div id="waf-debug-content-tools" class="debug-content" data-debug-visible="0">\n		\n			<div class="debug-content-options">\n					<div data-debug-submenu-tools="tms-details">Explore the TMS</div>\n					<div data-debug-submenu-tools="report">Contact the Team</div>\n			</div>\n\n			<!-- Explore the TMS -->\n			<div id="waf-debug-tools-tms-details" data-debug-sub-visible="0">\n				<i class="waf-debug-info-descrip">TMS deployments on this page</i>\n				<div id="waf-tool-tms-details">\n					<div data-debug-tms-get-deployments="false">Get the Deployments</div>\n					<!-- \n					<div data-debug-tms-space="dotcom" class="waf-debug-tms-space">DOTCOM</div>\n						<div data-debug-tms-space-details="dotcom" class="waf-debug-tms-details">\n							stuff\n						</div>\n					<div data-debug-tms-space="micro" class="waf-debug-tms-space">MICRO</div>\n						<div data-debug-tms-space-details="micro" class="waf-debug-tms-details"></div>\n					<div data-debug-tms-space="flex" class="waf-debug-tms-space">FLEX</div>\n						<div data-debug-tms-space-details="flex" class="waf-debug-tms-details"></div>\n					<div data-debug-tms-space="partner" class="waf-debug-tms-space">PARTNERS</div>\n						<div data-debug-tms-space-details="partner" class="waf-debug-tms-details"></div>\n					<div data-debug-tms-space="optimization" class="waf-debug-tms-space">OPTIMIZATION</div>\n						<div data-debug-tms-space-details="optimization" class="waf-debug-tms-details"></div>\n					-->\n				</div>\n			</div>\n			<!-- Contact the Team -->\n			<div id="waf-debug-tools-report" data-debug-sub-visible="0">\n				<i class="waf-debug-info-descrip">contact the team</i>\n				<div id="waf-tool-buttons-holder">\n					<div data-debug-report="bug" class="waf-tool-button">Report a Bug</div>\n					<div data-debug-report="feature" class="waf-tool-button">Request a Feature</div>\n					<div data-debug-report="other" class="waf-tool-button">or Other</div>\n				</div>\n				<div id="waf-debug-report-append" class="waf-tools-append"></div>\n			</div>\n\n		</div>\n		\n		<!-- STATUS -->\n\n		<div id="waf-debug-main-status">\n			<div class="debug-main-status"><i>S T A T U S : </i></div>\n			<div id="waf-debug-status" class="debug-main-status"></div>\n		</div>\n\n	</div>\n	\n	<!-- DRAGGABLE PIECES -->\n	<div id="waf-debug-drag-top"></div>\n	<div id="waf-debug-drag-bottom"></div>\n</div>');

		// add in the STYLINGs
	/*	(function attachStyleSheet(){
			var head = document.head;
			var link = document.createElement('link');
			link.type = 'text/css';
			link.rel = 'stylesheet';
			link.href = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/vBeta.css';
			head.appendChild(link);
		})();
	*/

		analytics.screens = analytics.screens || {};
		analytics.screens.ready = false;

		// CHANGE FROM HERE DOWN WITH A JS FILE...
		analytics.reporting = analytics.reporting || {};
		analytics.evaluation = analytics.evaluation || {};
		analytics.debug = analytics.debug ||
		{
			'version' : '1.1',
			'active' : false,
			'jquery' : false,
			'datalayer' : false,
			'tms' : false,
			'tmsSpace' : false,
			'tmsVersion' : false,
			'trackingOn' : false,
			'reportSuite' : false,
			'pageName' : false,
			'pageInstance' : false,
			'pageProduct' : false,
			'campaignType' : false,
			'pageLatency' : false,
			'tmsLatency' : false,
			'tmsErrors' : false,
			'breakpoint' : false
		};
		analytics.debug.trackObjs = {
			'links' : ('[data-wat-link], [data-wat-link-section] a, [data-wat-linkname],' + 
				' [data-wat-link-chat], [data-wat-link-oxygen], [data-wat-link-reseller]'),
			'nurture' : '[data-nurture-tracking]',
			'cloud' : '[data-wat-cloud]',
			'social' : '[data-wat-social]',
			'buy' : '[data-wat-buy-online], [data-wat-buy-reseller]'
		};

			// add Scott Huot check for certain sections
			if (document.location.href.indexOf('\/campaigns\/') > -1 || document.location.href.indexOf('\/subscription\/') > -1) {
				analytics.debug.trackObjs['links'] += ', .adsk-content a';
			}

		var trackObjsLen = (function countObjs(){
			var num = 0;
			for (ind in analytics.debug.trackObjs) {
				num += 1;
			}
			return num;
		})();

		analytics.debug.inspectTheseTags = (function buildString(){
			var count = 1;
			var these = '';
			for (index in analytics.debug.trackObjs) {
				these += analytics.debug.trackObjs[index];
				if (count < trackObjsLen) these += ', ';
				count += 1;
			}
			return these;
		})();

		// analytics.debug.inspectTheseTags = "[data-wat-link], [data-wat-link-section] a, [data-wat-linkname], [data-wat-cloud], [data-wat-social]";

		analytics.debug.services = {
			'foresee' : false,
			'marketo' : false,
			'tnt' : false
		};

		// maintain the user state
		analytics.debug.state = {
			'hasState' : false,
			'mainSection' : true,
			'pageInfo' : false,
			'tracking' : false,
			'tools' : false
		};

		analytics.debug.stateMap = {
			'mainSection' : ['[data-debug-menu="info"]'],
			'pageInfo' : ['[data-debug-submenu-info="info"]'],
			'tracking' : false,
			'tools' : false
		};

		/*
		analytics.debug.tracking = { };
		analytics.debug.tracking.event = function(tObj) {
			var codedObj = JSON.stringify(tObj);
			var trackThis  = ("trackEvent=" + codedObj).toString();
			chrome.extension.sendMessage(trackThis, function(response) { alert(response) });
		};
		*/

		analytics.debug.state._current = [];

		analytics.debug.state._default = ['[data-debug-menu="info"]',
			'[data-debug-submenu-info="info"]',
			'[data-debug-submenu-tools="report"]',
			'[data-debug-submenu-track="inspect"]'];

		// some properties
		analytics.debug.inspect = {
			'leaveHover' : true,
			'clickInspect' : false,
			// 'inspectType' : 'hover'
			'inspectType' : 'mouseenter'
		};
		
	    analytics.debug.state.setCookie = function(cname, cvalue, exdays) {
	      var d = new Date();
	      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	      var expires = "expires=" + d.toGMTString();
	      // ENCODE the cookie string
	      var encodedVal = encodeURIComponent(cvalue);

	      // detect the location, but use Autodesk.com for default
	      var detectedDomain = '.autodesk.com';
	      var checkDomain = document.location.host ? document.location.host.split('.') : false;
	      if (checkDomain) {
	          detectedDomain = '.' + checkDomain[1] + '.' + checkDomain[2];
	      }
	      // analytics.checks.debugLog('detected domain: ' + detectedDomain);
	      document.cookie = cname + "=" + encodedVal + "; " + expires + ";domain=" + detectedDomain + ";path=/";
	    }

	    analytics.debug.state.getCookie = function(cname) {
	      var name = cname + "=";
	      var ca = document.cookie.split(';');
	      for (var i = 0; i < ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') c = c.substring(1);
	        if (c.indexOf(name) != -1) {
	          var cookieVal = c.substring(name.length, c.length);
	          // check for encoding... 
	          var codeCheck = cookieVal.indexOf("%3A") > -1 ? true : false;

	          if (codeCheck) {
	            // return a DECODED cookie string...
	            return decodeURIComponent(cookieVal);
	          } else {
	            // return the non-Encoded string...
	            return cookieVal;
	          }
	        }
	      }
	      return false;
	    }

	    analytics.debug.state.setToolState = function(goMenuTrack) {

	    	var goMenuTrack = goMenuTrack || false;
	      	// use the CLASSES to find and clean the values
			var stateArray = [];
			var tagNamesForTracking = [];
			var runThruMenus = $('.waf-debug-menu-selected');
			$.each(runThruMenus, function(key,obj){
				// get the data-debug tags from the objects and assemble in an Array
				var dataTags = $(obj).context.dataset;
				$.each(dataTags, function(tag,value){
					tag = 'data-' + tag;
					var tagName = tag.replace(/^[a-z]|[A-Z]/g, 
						function(v, i) { return i === 0 ? v : "-" + v.toLowerCase() });
					var storeThisTag = escape(tagName + '="' + value + '"' );
				//	// console.log(storeThisTag);
					stateArray.push(storeThisTag);
				})
			});
			var runThruOthers = $('.waf-debug-other-selected');
			$.each(runThruOthers, function(key,obj){
				// get the data-debug tags from the objects and assemble in an Array
				var dataTags = $(obj).context.dataset;
				$.each(dataTags, function(tag,value){
					tag = 'data-' + tag;
					var tagName = tag.replace(/^[a-z]|[A-Z]/g, 
						function(v, i) { return i === 0 ? v : "-" + v.toLowerCase() });
					var storeThisTag = escape(tagName + '="' + value + '"' );
				//	// console.log(storeThisTag);
					stateArray.push(storeThisTag);
				})
			});
		//	// console.log(stateArray);
			var setThisNewState = 'newState=' + JSON.stringify(stateArray);
			if (typeof chrome !== 'undefined') {
				if (typeof chrome.extension !== 'undefined') {
					chrome.extension.sendMessage(setThisNewState, function(response) {
		  
		   			});
				}	
			}
	      	analytics.debug.state.setCookie('_adsk_debug_tool_state',JSON.stringify(stateArray), 30);
	     // 	if (goMenuTrack) {
	      	//	_goMenuTracking();	
	     // 	}
	    }

	    function getParameterByName(name, url) {
		    if (!url) url = window.location.href;
		    name = name.replace(/[\[\]]/g, "\\$&");
		    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		        results = regex.exec(url);
		    if (!results) return null;
		    if (!results[2]) return '';
		    return decodeURIComponent(results[2].replace(/\+/g, " "));
		}

	    function _goMenuTracking() {
	    	// find the TOOL STATE and send it to GA as an event
	      	setTimeout(function(){
		      	(function GAtoolSate(){

		      		// FIND MENUS THAT ARE OPEN
		      		var opens = $('.waf-debug-menu-selected:visible');
		      		var menu = [];
		      		var submenu = [];
		      		for (var _g = 0; _g < opens.length; _g += 1) {
		      			var switchMe = opens[_g]['dataset'];
		      			$.each(switchMe, function(index,value) {
			      			switch(index) {
			      				case 'debugMenu' :
			      					menu.push(value);
			      					break;
			      				case 'debugSubmenuTools' :
			      				case 'debugSubmenuTrack' :
			      				case 'debugSubmenuInfo' :
			      					submenu.push(value)
			      					break;
			      				default :
			      					break;
			      			}
		      			});
		      		}

		      		/*
		      		var toggleTrackObj = { 
		      			title: digitalData.page.pageName,
				    	eventCategory: 'Tool Navigation',
				    	eventAction: 'Menus Selected',
				    	eventLabel: (menu[0] || 'closed') + ' > ' + (submenu[0] || 'closed') 	// d.locationVal + " \x3e " + d.trackVal
					};

						// need to update this to log it
					// log the event in GA
					window.postMessage("track-get-tms-deployments",document.location.href);
		      		
					*/

		      	})();
		      },230);
	    };

	    

	    /*
	    analytics.debug.state.toggleState = function() {
	    	var _state = _checkHasState || analytics.debug.state.getCookie('_adsk_debug_tool_state');
	    	var _stateArr = _state.split(',');
	    	$.each(_stateArr, function(index, opt){
	    		var split = opt.split(':');
	    		var checkMe = $('[data-debug-' + split[0] + '="' + split[1] + '"]');	//.click();
	    		checkMe.trigger('click');
	    	});
	    };
		*/

	    	// REMAKE THIS ONE INTO THE TOGGLE STATE FUNCTION
	    	// AND SAVE THE DATA (ENCODED) FOR THE COOKIE / LOCAL STORAGE
	    	// BOOKMARKLET VERSION

	    analytics.debug.state.toggleState = function(newState) {
	    //	// console.log(newState);
	    	for (var i = 0; i < newState.length; i += 1) {
	    		// // console.log('executing STATE click');
	    		// // console.log(newState);
	    		$(newState[i]).trigger('click');
	    	}   	
	    	analytics.screens.ready = true;
	    };

		// // console.log('debugMode = ' + analytics.debug.active);

		if (!analytics.debug.active) {

		//	// console.log('no Debug Mode detected');		

			analytics.debug.active = true;
			$('html').append(_debugSkeleton);
			analytics.screens.array.push('waf-debug-edge');

			setTimeout(function(){
				window.analytics.screens.restackStubs('waf-debug-edge',false);
			},128);

			try {
				window.analytics.screens.attachPep('waf-debug-edge',true);
			} catch(err) {
				// console.log('couldn\'t attach PEP to WAFER MAIN');
			}
		
			function detectmob() { 
			 if( navigator.userAgent.match(/Android/i)
			 || navigator.userAgent.match(/webOS/i)
			 || navigator.userAgent.match(/iPhone/i)
			 || navigator.userAgent.match(/iPad/i)
			 || navigator.userAgent.match(/iPod/i)
			 || navigator.userAgent.match(/BlackBerry/i)
			 || navigator.userAgent.match(/Windows Phone/i)
			 ){
			    return true;
			  }
			 else {
			    return false;
			  }
			}

			// Check for jQuery
			(function jQueryCheck(){
				if (analytics.debug.jQueryExists) {  
						analytics.debug.jquery = jQuery.fn.jquery;
				    	// var _v = analytics.debug.jquery;
				}

			})();

			// Check for Data Layer (digitalData)
			var dataLayerCheck = function (){
				var _exists = typeof(window.digitalData) !== 'undefined' ? true : false;
				var _legacy = (typeof (window.adsk) !== 'undefined') ? (typeof(window.adsk.s) !== 'undefined' ? true : false) : false;
				if (_exists) {
					analytics.debug.datalayer = true;
					var _pageExists = typeof(window.digitalData.page) !== 'undefined' ? true : false;
					if (_pageExists) {
						analytics.debug.pageName = window.digitalData.page.pageName || false;
						analytics.debug.pageInstance = window.digitalData.pageInstanceID || false;
					}
					// PRODUCTS value check
					// first check for the eStore version
					var eStoreCheck = typeof window.digitalData.siteCatalyst !== 'undefined' ? (typeof window.digitalData.siteCatalyst.newProductsList !== 'undefined' ? window.digitalData.siteCatalyst.newProductsList : false) : false;
					// then check the new flavor on DCOM / MICRO / FLEX
					var dcomCheck = typeof window.analytics !== 'undefined' ? 
										(typeof window.analytics.helper !== 'undefined' ? 
											(typeof window.analytics.helper.getProductsValue !== 'undefined' ? 
												analytics.helper.getProductsValue() : false) : false) : false;
					// then check other types
					var _productExists = typeof window.digitalData.product !== 'undefined' ? true : false;
					
					if (eStoreCheck) {
						analytics.debug.pageProduct = eStoreCheck || false;
					}
					else if (dcomCheck) {
						analytics.debug.pageProduct = dcomCheck || false;	
					}
					else if (_productExists) {
						var _pNExists = typeof window.digitalData.product.productName !== 'undefined' ? true : false;
						if (_pNExists) {
							analytics.debug.pageProduct = window.digitalData.product.productName || false;	
						}
					}
					else {
						var _productsExists =  typeof window.digitalData.products !== 'undefined' ? true : false;
						if (_productsExists) {
							var _mPNExists = '';
							for (var _yy = 0; _yy < window.digitalData.products.length; _yy += 1) {
								_mPNExists += window.digitalData.products[_yy]['productAnalyticsName'];
								if (_yy + 1 < window.digitalData.products.length) {
									_mPNExists += '; ';
								}
							}
							if (_mPNExists !== '') {
								analytics.debug.pageProduct = _mPNExists || false;	
							}
						}
					}

					// Campaign Type check
					var internalCamp = document.location.search.indexOf('mktvar004') > -1 ? true : false;
					var externalCamp = document.location.search.indexOf('mktvar002') > -1 ? true : false;
					if (internalCamp) {
						analytics.debug.campaignType = getParameterByName('mktvar004') + ' (internal)';
					}
					else if (externalCamp) {
						analytics.debug.campaignType = getParameterByName('mktvar002') + ' (external)';	
					}

					// put the details in the Data Layer tab
					try {
						var _injectDD = JSON.stringify(window.digitalData, null, 1);  //	"\t"); 
						var _dd = window.digitalData	// ;
							,_preject = JSON.stringify(_dd, undefined, 2),
		    				_injectDD = _preject.replace(/\n/g, "<br>").replace(/[ ]/g, "&nbsp;");

		    			$.each(_dd, function(step, subObj){
		    			//	// console.log("step = " + step);
		    			//	// console.log("subObj = " + subObj);
		    				// First Level containers
		    				var firstLevel = $('<div class="waf-debug-data-layer-step" />').html(step);
		    				if (typeof subObj === 'object') {
		    				//	alert('found a subObject!');
		    				}
		    			});
					} catch(e) {
						// console.log('error converting Data Layer');
						var _injectDD = "error processing Data Layer";
					}
					

	    			$('#waf-debug-data-layer .waf-debug-content-holder').empty();
					$('#waf-debug-data-layer .waf-debug-content-holder').html(_injectDD);
				}
				else if (_legacy) {
					analytics.debug.legacy = true;
					var _pageExists = typeof(window.adsk.s.pageName) !== 'undefined' ? true : false;
					if (_pageExists) {
						analytics.debug.pageName = window.adsk.s.pageName || false;
					}
				}

			};
			dataLayerCheck();
			analytics.debug.getDataLayer = dataLayerCheck;

			/*
			// Check for Data Layer (digitalData)
			var sObjCheck = function (){
				var _exists;
				var _exists = (function(){
					try {
						return typeof(analytics.sitecatalyst.sObj) !== 'undefined' ? true : false;	
					}
					catch(e) {
						return false;
					}
				})();
				// // console.log('about to run >>> sObjCheck() <<<<');
				if (_exists) {
					// analytics.debug.sObj = true;
					
					function ObjectLength( object ) {
					    var length = 0;
					    for( var key in object ) {
					        if(object.hasOwnProperty(key)) length += 1;
					    }
					    return length;
					};

					// put the details in the SiteCatalyst Obj tab
					var _injectSObj, _events;
					var _eVars = {};
					var _props = {};
					var _listVars = {};
					try {
						var tempS = analytics.sitecatalyst.sObj();
						$.each(tempS, function(index,val){

							if (index.indexOf('eVar') > -1) {
								var newIndex = parseInt((index.split('eVar'))[1]);
								_eVars[newIndex] = {
									'value' : (val !== "" ? val : '[no value]'),  
									'name' : 'eVar' + newIndex,
									'class' : 'waf-debug-nurture-data-bubble'
								};
							}
							else if (index.indexOf('prop') > -1) {
								var newIndex = parseInt((index.split('prop'))[1]);
								_props[newIndex] = {
									'value' : (val !== "" ? val : '[no value]'),
									'name' : 'prop' + newIndex,
									'class' : 'waf-debug-sc-data-prop'
								};
							} 
							else if (index.indexOf('list') > -1) {
								var newIndex = parseInt((index.split('list'))[1]);
								_listVars[newIndex] = {
									'value' : (val !== "" ? val : '[no value]'),
									'name' : 'listVar' + newIndex,
									'class' : 'waf-debug-sc-data-listvar'
								};
							}
							else if (index === 'events') {
								_events = [{
									'value' : (val !== "" ? val : '[no value]'),
									'name' : 'events',
									'class' : 'waf-debug-sc-data-events'
								}]
							}
						});
					
						// inject them into the space for sObj data
						var runEm = [_eVars,_props,_listVars,_events];
						var presentation = '#waf-debug-data-nurture-obj .waf-debug-content-holder';
						$(presentation).empty();
						$.each(runEm, function(index,obj){
							$.each(obj, function(index,data){
								var scDcontainer = $('<div class="waf-debug-nurture-data-holder" />');
								var scName = data['name'];
								var scVal = data['value'];
								var scBubbleName = $('<div class="' + data['class'] + ' waf-debug-data-descrip" />');
									scBubbleName.html(scName);
								var scBubbleVal = $('<div class="' + data['class'] + '" />');
									scBubbleVal.html(scVal);

								scDcontainer.append(scBubbleName).append(scBubbleVal);
								$(presentation).append(scDcontainer);
							});
						});
						var scDcontainer = $('<div class="waf-debug-nurture-data-holder" />');
						var scDdata = $('<div />');
					} catch(e) {
						// console.log('error grabbing SiteCatalyst Obj');
						_injectSObj = $("<p />");
							_injectSObj.html('no sObj detected');
						var presentation = '#waf-debug-data-nurture-obj .waf-debug-content-holder';
						$(presentation).empty();
						$(presentation).append(_injectSObj);
					}
				}
				else {
					return;
				}

			};
			// sObjCheck();
			analytics.debug.getSiteCatObj = sObjCheck;
			*/

			// Check for Nurture Data (aka Marketo for now)
			var nurtureDataCheck = function (){

				var _nurtureExists = typeof mktoClickLinkMetadata !== "undefined" ? mktoClickLinkMetadata : false;
				if (_nurtureExists) {

					var nurtureData = [];
					
					// create some bubbles for the data	
					$.each(_nurtureExists, function(index,val){
						
						nurtureData.push({
							'value' : (val !== "" ? val : '<i>blank</i>'),  
							'name' : index,
							'class' : 'waf-debug-nurture-data-bubble'
						});
						
					});

					var nurDcontainer = $('<div class="waf-debug-nurture-data-holder" />');
					
					// inject them into the space for sObj data
					var presentation = '#waf-debug-data-nurture-obj .waf-debug-content-holder';
					$(presentation).empty();
	
					$.each(nurtureData, function(index,obj){
				
						var nurDcontainer = $('<div class="waf-debug-nurture-data-holder" />');
						var nurName = obj['name'];
						var nurVal = obj['value'];
						var nurBubbleName = $('<div class="' + obj['class'] + ' waf-debug-data-descrip" />');
							nurBubbleName.html(nurName);
						var nurBubbleVal = $('<div class="' + obj['class'] + '" />');
							nurBubbleVal.html(nurVal);

						nurDcontainer.append(nurBubbleName).append(nurBubbleVal);
						$(presentation).append(nurDcontainer);

					});
					
					// var nurDdata = $('<div />');
				}
				else {
					return;
				}

			};
			analytics.debug.getNurtureData = nurtureDataCheck;


			// Check for Tag Management System (Ensighten)
			(function tmsCheck(){

			//	alert('tms check!');
				var _exists = typeof(window.Bootstrapper) !== 'undefined' ? true : false;
				if (_exists) {
					analytics.debug.tms = true;
					var space = 'null';
					var version = 'null';

					// activate the GET deployments button

					/** OFF FOR NOW

					$('[data-debug-tms-get-deployments]').attr('data-debug-tms-get-deployments',true);

					**/

					// set the SPACE detected...
					if (typeof (Bootstrapper.ensightenOptions) !== "undefined")
			        {
			            if (typeof (Bootstrapper.ensightenOptions.publishPath) !== "undefined") {
			            	var _space = Bootstrapper.ensightenOptions.publishPath.split('_');
			                analytics.debug.tmsSpace = _space[0];
			                analytics.debug.tmsEnviron = _space[1];		    
			            }
			            if (typeof (Bootstrapper.ensightenOptions.client) !== "undefined")
			                analytics.debug.tmsVersion = Bootstrapper.ensightenOptions.generatedOn;
			        }
				//	// console.log('TMS space detected: ' + analytics.debug.tmsSpace);
				//	// console.log('TMS version detected: ' + analytics.debug.tmsEnviron);
					// set the REPORT SUITE
					if (analytics.debug.tmsEnviron === 'prod') {
						analytics.debug.reportSuite = 'New Autodesk Global'
					}
					else if (analytics.debug.tmsEnviron === 'qa' || analytics.debug.tmsEnviron === 'stg') {
						analytics.debug.reportSuite = 'new adsk dev'
					}
					else {
						analytics.debug.reportSuite = 'Web Analytics DEV'
					}
				}
			})();

			// PERFORMANC MEASURES 
			(function getPerformanceForPage(){
				// a function to use to check that page is loaded
				window.onload = function(){
					analytics.debug.pageLatency = 0;
					if (typeof window.performance !== 'undefined' && window.performance.timing) {
						var perfData = window.performance.timing; 
						var pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
						analytics.debug.pageLatency = pageLoadTime + 'ms';
					}
					else {
						return false;
					}
					
				}();

				function checkWindowSize(){
					var _windowWidth = window.innerWidth;
				    var Large = _windowWidth >= 1025 ? true : false;
				    var Medium = _windowWidth >= 642 && _windowWidth <= 1024 ? true : false;
				    var Small = _windowWidth <= 641 ? true : false;

				    var validCount = (Large ? 1 : 0) + (Medium ? 1 : 0) + (Small ? 1 : 0);
				   
				    // check some parameters and set values
				    if (validCount === 1) {
				    	analytics.debug.breakpoint = Large ? 'Large' : (Medium ? 'Medium' : (Small ? 'Small' : false));
				    }
				};
				// run it once
				checkWindowSize();
				analytics.debug.checkBreakpoint = checkWindowSize;

				// TMS performance
				if (typeof Bootstrapper !== 'undefined') {
					// alert("Bootstrap found");
					// alert(Bootstrapper.reportedErrors.length);
					analytics.debug.tmsErrors = (Bootstrapper.reportedErrors.length).toString() || false;
				}
				
			})();

			// fill out the Debugger tool
			(function populateDataInTool(){	

				function processThis(which, _val){
					// process each accordingly
					var _data;
					var _class = false;
					var _obj;
					switch (which) {
						case 'jquery' :
							_data = _val ? _val.toString() : 'does not exist';
							_class = _val ? 'waf-debug-req-exists' : 'waf-debug-req-missing';
							_obj = $('#waf-debug-req-jquery');
							break;
						case 'datalayer' :
							_data = _val ? 'exists' : 'does not exist';
							_class = _val ? 'waf-debug-req-exists' : 'waf-debug-req-missing';
							_obj = $('#waf-debug-req-data-layer');
							break;
						case 'tms' : 
							_data = _val ? analytics.debug.tmsSpace : 'does not exist';
							_class = _val ? 'waf-debug-req-exists' : 'waf-debug-req-missing';
							_obj = $('#waf-debug-req-tms');
							break;
						case 'instance' : 
							_data = _val ? analytics.debug.tmsEnviron : 'does not exist';
							_class = _val ? 'waf-debug-data-exists' : 'waf-debug-data-missing';
							_obj = $('#waf-debug-data-layer-instance');
							break;
						case 'suite' : 
							_data = _val ? analytics.debug.reportSuite : 'does not exist';
							_class = _val ? 'waf-debug-data-exists' : 'waf-debug-data-missing';
							_obj = $('#waf-debug-data-report-suite');
							break;
						case 'pagename' : 
							_data = _val ? _val : 'does not exist';
							_class = _val ? 'waf-debug-data-exists' : 'waf-debug-data-missing';
							_obj = $('#waf-debug-data-layer-pagename');
							break;
						case 'product' : 
							_data = _val ? _val : 'does not exist';
							_class = _val ? 'waf-debug-data-exists' : 'waf-debug-data-missing';
							_obj = $('#waf-debug-data-layer-product');
							break;
						case 'campaign-type' :
							_data = _val ? _val : 'does not exist';
							_class = _val ? 'waf-debug-data-exists' : 'waf-debug-data-missing';
							_obj = $('#waf-debug-campaign-type');
							break;
						case 'finalCheck' :
							_obj = false;
							var statusVal = _val ? 'WAF supported' : 'not WAF supported';
							var statusColor = _val ? 'green' : 'red';
							var newStatus = $('<b id="waf-status-message" />');
							newStatus.html(statusVal).css('color', statusColor);
							$('#waf-debug-status').append(newStatus);
							break;
						case 'latency' :
							_data = _val ? _val : 'still loading';
							_class = _val ? 'waf-debug-data-exists' : 'waf-debug-data-missing';
							_obj = $('#waf-debug-req-latency');
							break;
						case 'page-load-track' :
							
							break;
						case 'tms-load-time' :
							_data = _val ? _val : 'n/a';
							_class = _val ? 'waf-debug-data-exists' : 'waf-debug-data-missing';
							_obj = $('#waf-debug-req-tms-load-time');
							break;
						case 'tms-errors' :
						//	alert('in the errors');
						//	alert(_val);
							_data = _val ? _val : 'n/a';
							_class = _val ? 'waf-debug-data-exists' : 'waf-debug-data-missing';
							_obj = $('#waf-debug-req-tms-errors');
							break;
						case 'breakpoint' :
							_data = _val ? _val : 'error';
							_class = _val ? 'waf-debug-data-exists' : 'waf-debug-data-missing';
							_obj = $('#waf-debug-req-breakpoint');
							break;
						/*
						case 'sObj' :
							analytics.debug.getSiteCatObj();
							break;
							*/
						case 'nurture' :
							analytics.debug.getNurtureData();
							break;
						default : 
							break;
					};

					// // console.log(which + ' -> data -> ' + _data);
					if (_obj) _obj.html(_data).addClass(_class);
				};

				// process the FULL CHECK
				var validTMScheck = analytics.debug.jquery && analytics.debug.datalayer && analytics.debug.tms;
				processThis('finalCheck', validTMScheck);

				// Requirements
				processThis('jquery', analytics.debug.jquery);
				processThis('datalayer', analytics.debug.datalayer);
				processThis('tms', analytics.debug.tms);
				// Page Properties
				processThis('instance', analytics.debug.tms);
				processThis('suite', analytics.debug.reportSuite);
				processThis('pagename', analytics.debug.pageName);
				processThis('product', analytics.debug.pageProduct);
				processThis('campaign-type', analytics.debug.campaignType)
				// Performance
				processThis('latency', analytics.debug.pageLatency);
				var _TMSloadTime = validTMScheck ? analytics.debug.tmsLatency : false;
				processThis('tms-load-time', _TMSloadTime);
				var _TMSerrors = validTMScheck ? analytics.debug.tmsErrors : false;
				processThis('tms-errors', _TMSerrors);
				processThis('breakpoint', analytics.debug.breakpoint);

				// processThis('sObj', false);
				processThis('nurture', false);
				
				// enable Breakpoint to be updated as pages are resized
			    $(window).resize(function() {
		            analytics.debug.checkBreakpoint();
					processThis('breakpoint', analytics.debug.breakpoint);       
		        });

	            // DOM observer to watch for any changes
	            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	            var observer = new MutationObserver(function() {
	              	analytics.debug.getDataLayer();
	              	processThis('datalayer', analytics.debug.datalayer);   
	              	processThis('pagename', analytics.debug.pageName);
					processThis('product', analytics.debug.pageProduct);
					// processThis('sObj', false);    
	              });
	              observer.observe(document.body, {
	                childList: true,
	                subtree: true,
	                attributes: false,
	                characterData: false,
	              });

				// get COUNTS for all the TRACKING ITEMS
				(function doAllCounts(){
					function processCounts(which) {
						var _theLinks = $(analytics.debug.trackObjs[which])
						var _linksCount = _theLinks.length;
						var _linksFound = $('[data-waf-debug-track-count="' + which + '"]');
						if (_linksFound) _linksFound.html(_linksCount);
					};

					// loop through each of the objects in the thing.
					var trackWhat = analytics.debug.trackObjs;
					$.each(trackWhat, function(index, obj){
						// if (index !== 'scottHuot') 
						processCounts(index);
					});

				})();

				// CHECK THE SERVICES AVAILABLE...
				(function checkForServices(){

					// Marketo Munchkin
					var _mktoExists = typeof mktoMunchkin !== 'undefined' ? true : false;
					if (_mktoExists) {
						$('[data-waf-debug-track-service="marketo-munchkin"]').html('yes').addClass('waf-debug-req-exists');
					}
					else {
						$('[data-waf-debug-track-service="marketo-munchkin"]').addClass('waf-debug-req-missing');
					}

					// Marketo Form (AEM)
					var _mktoAEMexists = typeof marketoAEM !== 'undefined' ? true : false;
					if (_mktoAEMexists) {
						$('[data-waf-debug-track-service="marketo-aem"]').html('yes').addClass('waf-debug-req-exists');
					}
					else {
						$('[data-waf-debug-track-service="marketo-aem"]').addClass('waf-debug-req-missing');
					}

					// Test and Target
					var _TNTExists = typeof TNT !== 'undefined' ? true : false;
					if (!_TNTExists) {
						try {
							_TNTExists = typeof adobe.target !== 'undefined' ? true : false;
						} catch(err) {
							// error checking for Target
						}
					}
					if (_TNTExists) {
						$('[data-waf-debug-track-service="tnt"]').html('yes').addClass('waf-debug-req-exists');
					}
					else {
						$('[data-waf-debug-track-service="tnt"]').addClass('waf-debug-req-missing');
					}

					// Test and Target MBOX
					var _mboxExists = typeof ttMETA !== 'undefined' ? true : false;
					if (_mboxExists) {
						$('[data-waf-debug-track-service="tnt-mbox"]').html('yes').addClass('waf-debug-req-exists');
					}
					else {
						$('[data-waf-debug-track-service="tnt-mbox"]').addClass('waf-debug-req-missing');
					}

					// Foresee
					var _foreseeExists = typeof $$FSR !== 'undefined' ? true : false;
					if (_foreseeExists) {
						$('[data-waf-debug-track-service="foresee"]').html('yes').addClass('waf-debug-req-exists');
					}
					else {
						$('[data-waf-debug-track-service="foresee"]').addClass('waf-debug-req-missing');
					}

				})();
				
			//	// console.log(analytics.debug);

			})();

			
			// then apply the STATE
			if (analytics.debug.state.hasState) {
				setTimeout(function(){
					alert("...what... State?!");
					// now use the CHROME EXTENSION FIRST, 
					var executeThisState;
					if (analytics.debug.state.whatState === 'extension') {
						executeThisState = analytics.debug.state._current;
					}
					else if (analytics.debug.state.whatState === 'cookie') {
						var alreadyState = analytics.debug.state.getCookie('_adsk_debug_tool_state');
						executeThisState = JSON.parse(unescape(alreadyState));
					}
					
					analytics.debug.state.toggleState(executeThisState);	
				//	setTimeout(function(){ _goMenuTracking(); }, 250);
					
				},250);
			}
			else {
				setTimeout(function(){
					analytics.debug.state.toggleState(analytics.debug.state._default);	
				//	setTimeout(function(){ _goMenuTracking(); }, 250);

				},500);
			}
			
			$('[data-debug-menu]').on('click', function(e){

			//	e.preventDefault();
				var target = $(e.target);

				// prevent any disabled actions
				if (target.hasClass('waf-debug-inactive')) return;

				var otherOptions = $('[data-debug-menu]').not(target);
				otherOptions.removeClass('waf-debug-menu-selected');
				
				var option = target.attr('data-debug-menu');
			//	// console.log('clicked this one: ' + option);
				
				var actionItem = $('#waf-debug-content-' + option);
				target.toggleClass('waf-debug-menu-selected');
				
				// VISIBILITY
				var alreadyVis = $('[data-debug-visible="1"]');
				var justClose = actionItem.attr('data-debug-visible') === "1" ? true : false;
			//	// console.log("just close it? " + justClose);
				if (justClose) target.removeClass('waf-debug-menu-selected');
				
				alreadyVis.attr('data-debug-visible','0').slideToggle(128, 'swing', function(){
					setTimeout(function(){
						if (!justClose) actionItem.attr('data-debug-visible','1').slideToggle(128, 'swing');
					},129);
				}());

				analytics.debug.state.setToolState(true);
			});

			$('[data-debug-submenu-info]').on('click', function(e){
				
			//	e.preventDefault();
				var target = $(e.target);

				// prevent any disabled actions
				if (target.hasClass('waf-debug-inactive')) return;

				var otherOptions = $('[data-debug-submenu-info]').not(target);
				otherOptions.removeClass('waf-debug-menu-selected');
				
				if (!target.hasClass('waf-debug-menu-selected')) target.addClass('waf-debug-menu-selected');

				var option = target.attr('data-debug-submenu-info');
			//	// console.log('clicked this one: ' + option);
				
				var actionItem = $('#waf-debug-info-' + option);

				// VISIBILITY
				var thisSection = target.parent($('.debug-content-options')).parent($('.debug-content'));
				var alreadyVis = thisSection.find($('[data-debug-sub-visible="1"]'));
				var justClose = actionItem.attr('data-debug-sub-visible') === "1" ? true : false;
			//	// console.log("just close it? " + justClose);
				
				if (justClose) target.removeClass('waf-debug-menu-selected');

				alreadyVis.attr('data-debug-sub-visible','0').slideToggle(128, 'swing', function(){
					setTimeout(function(){
						if (!justClose) actionItem.attr('data-debug-sub-visible','1').slideToggle(128, 'swing');
					},129);
				}());

				analytics.debug.state.setToolState(true);
			});

			$('[data-debug-submenu-track]').on('click', function(e){

			//	e.preventDefault();
				var target = $(e.target);

				// prevent any disabled actions
				if (target.hasClass('waf-debug-inactive')) return;

				var otherOptions = $('[data-debug-submenu-track]').not(target);
				otherOptions.removeClass('waf-debug-menu-selected');
				
				if (!target.hasClass('waf-debug-menu-selected')) target.addClass('waf-debug-menu-selected');
				
				var option = target.attr('data-debug-submenu-track');
			//	// console.log('clicked this one: ' + option);
				
				var actionItem = $('#waf-debug-track-' + option);

				// VISIBILITY
				var thisSection = target.parent($('.debug-content-options')).parent($('.debug-content'));
				var alreadyVis = thisSection.find($('[data-debug-sub-visible="1"]'));
			//	// console.log(alreadyVis);
				var justClose = actionItem.attr('data-debug-sub-visible') === "1" ? true : false;
			//	// console.log("just close it? " + justClose);

				if (justClose) target.removeClass('waf-debug-menu-selected');
				
				alreadyVis.attr('data-debug-sub-visible','0').slideToggle(128, 'swing', function(){
					setTimeout(function(){
						if (!justClose) actionItem.attr('data-debug-sub-visible','1').slideToggle(128, 'swing');
					},129);
				}());

				analytics.debug.state.setToolState(true);
			});

			$('[data-debug-submenu-tools]').on('click', function(e){

			//	e.preventDefault();
				var target = $(e.target);

				// prevent any disabled actions
				if (target.hasClass('waf-debug-inactive')) return;

				var otherOptions = $('[data-debug-submenu-tools]').not(target);
				otherOptions.removeClass('waf-debug-menu-selected');
				
				if (!target.hasClass('waf-debug-menu-selected')) target.addClass('waf-debug-menu-selected');
				
				var option = target.attr('data-debug-submenu-tools');
			//	// console.log('clicked this one: ' + option);
				
				var actionItem = $('#waf-debug-tools-' + option);

				// VISIBILITY
				var thisSection = target.parent($('.debug-content-options')).parent($('.debug-content'));
				var alreadyVis = thisSection.find($('[data-debug-sub-visible="1"]'));
			//	// console.log(alreadyVis);
				var justClose = actionItem.attr('data-debug-sub-visible') === "1" ? true : false;
			//	// console.log("just close it? " + justClose);

				if (justClose) target.removeClass('waf-debug-menu-selected');
				
				alreadyVis.attr('data-debug-sub-visible','0').slideToggle(128, 'swing', function(){
					setTimeout(function(){
						if (!justClose) actionItem.attr('data-debug-sub-visible','1').slideToggle(128, 'swing');
					},129);
				}());

				analytics.debug.state.setToolState(true);
			});

			// Tracking Toggle Controls
			analytics.debug.state.toggleTracking = function(whichVals, open) {
				var whichVals = whichVals || [];
				var open = open || false;

				// run through the array and toggle
				$.each(whichVals, function(index, value){
					if (open) { 
					//	// console.log('adding class to: ' + value);
						$(value).addClass('waf-debug-tracking-active');
					//	$(value).addClass('waf-debug-other-selected');
					} else {
					//	// console.log('removing class from: ' + value);
						$(value).removeClass('waf-debug-tracking-active');
					//	$(value).removeClass('waf-debug-other-selected');
					}
				});

				// then check if there is any active tracking and turn on the Red button
				var _checkActives = $('[data-waf-debug-track]:checked');
				var _activesExist = _checkActives.length > 0 ? true : false;
				var _secretTracking = $('.adsk-content a').hasClass('waf-debug-tracking-active');
			//	// console.log('number of Actives: ' + _activesExist);
				if (_activesExist || _secretTracking) {
					$('#waf-debug-tracking-remove').removeClass('waf-debug-tracking-remove-inactive');
					$('#waf-debug-tracking-remove').addClass('waf-debug-tracking-remove-active');
				}
				else {
					$('#waf-debug-tracking-remove').addClass('waf-debug-tracking-remove-inactive');
					$('#waf-debug-tracking-remove').removeClass('waf-debug-tracking-remove-active');
				}

			};

			$('[data-waf-debug-track]').on('click', function(e){

				e.stopImmediatePropagation();
				var target = $(e.target);
				var trackWhat = target.attr('data-waf-debug-track');
				var checkedState = target.is(':checkbox:checked') ? true : false;

			//	// console.log(trackWhat + ' -> checked:' + checkedState);
				
				var sendTargets = [];
				sendTargets.push(analytics.debug.trackObjs[trackWhat]);

				if (checkedState) {
					// add the tracking

					var msg = "track-highlighting-of-wats=" + trackWhat;
					window.postMessage(msg,document.location.href);

					target.addClass('waf-debug-other-selected');
					analytics.debug.state.toggleTracking(sendTargets,true);

						/* track in GA
						var addTrackingObj = { 
					    	eventCategory: 'Highlight Tracking',
					    	eventAction: 'Toggled ON',
					    	eventLabel: trackWhat	
						};
						analytics.debug.tracking.event(addTrackingObj);
						*/
				}
				else {
					target.removeClass('waf-debug-other-selected');
					analytics.debug.state.toggleTracking(sendTargets,false);
				}
				// update the State Cookie
				analytics.debug.state.setToolState();
			});

			$('#waf-debug-tracking-remove').on('click', function(e){
				e.stopImmediatePropagation();
				var isActive = $(e.target).hasClass('waf-debug-tracking-remove-active');
				if (isActive) {
			//		// console.log('tracking is active, will remove it');
					var allTrackingOpts = [];
					$.each(analytics.debug.trackObjs, function(index, obj){
						allTrackingOpts.push(analytics.debug.trackObjs[index]);
						$('[data-waf-debug-track="' + index + '"]').prop('checked',false).removeClass('waf-debug-other-selected');
					});
					analytics.debug.state.toggleTracking(allTrackingOpts,false);
					
					/* fire the tracking off to GA
					(function waferGA(){
						var _GAObj = { 
					    	eventCategory: 'Highlight Tracking',
					    	eventAction: 'all OFF',
					    	eventLabel: 'fill-this-in' 	// d.locationVal + " \x3e " + d.trackVal
						};
						analytics.debug.tracking.event(_GAObj);			
					})();
	*/
				}
				analytics.debug.state.setToolState();
			});

			$('#waf-debug-hide-data-layer-container').on('click', function(e){
				$('.waf-debug-data-layer-display').slideToggle().css('overflow','auto');
			});

			$('#waf-debug-hide-nurture-container').on('click', function(e){
				$('.waf-debug-data-nurture-obj-display').slideToggle().css('overflow','auto');
			});

			/* now add in some SECRET OPTIONS
			$(window).on('hashchange', function(e){
				// alert(window.location.hash);
				e.preventDefault();
				var checkHash = window.location.hash;
				switch (checkHash) {
					case '#scottHuot' :
						var sendTargets = [];
						sendTargets.push(analytics.debug.trackObjs['scottHuot']);
						analytics.debug.state.toggleTracking(sendTargets, true);
						break;
					default : 
						break;
				};
			});
			*/

			
			// TOOLS / REPORTING
			$('[data-debug-report]').on('click', function(e){
			//	e.preventDefault();
				var targetVal = $(e.target).attr('data-debug-report');

				// // console.log('You clicked on ' + targetVal);

				var newForm = $('<form id="waf-debug-report-form" data-waf-debug-form="' + targetVal + '" class="waf-debug-report-form" ' +
					' onsubmit="return analytics.debug.formSubmit();" />');
				var newInput = $('<textarea maxlength="340" id="waf-debug-form-input" class="waf-debug-report-input" ' +
					' onsubmit="analytics.debug.formSubmit();" />');
				var whoInput = $('<textarea maxlength="100" id="waf-debug-form-username" class="waf-debug-report-username" />');
					whoInput.attr('placeholder','enter your email address here');
				var newSubmit = $('<button id="waf-debug-submit-form" onclick="analytics.debug.formSubmit();"/>');
					newSubmit.html('Submit');
				var newCancel = $('<button id="waf-debug-cancel-form" onclick="analytics.debug.formCancel();"/>');
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

				var msg = "track-contact-form-open=" + targetVal;
				window.postMessage(msg,document.location.href);

				newInput.attr('placeholder',message);
				newForm.append(newInput).append(whoInput);

				// then append the form and slide it open
				var appendSpace = $('#waf-debug-report-append');
				appendSpace.append(newForm).append(newSubmit).append(newCancel);
				//appendSpace.append(newSubmit).append(newCancel);

				// close the buttons, slide out the Form
				$('#waf-tool-buttons-holder').slideToggle(128, 'swing', function(){
					setTimeout(function(){
						appendSpace.slideToggle(128);
					},129);
				}());

			});

				// when a FORM is submitted
			    analytics.debug.formSubmit = function(){
					var appendSpace = $('#waf-debug-report-append');
					var formSpace = appendSpace.children();
					var whichForm = formSpace.attr('data-waf-debug-form');
					alert("Thanks, your " + whichForm + " form was submitted.");
					
					var channel, username;
					var thisURL = document.location.href;
					var text = $('#waf-debug-form-input').val();
					var username = $('#waf-debug-form-username').val();

					// then check that there is info here...


					text = text + ' [submitted from: ' + thisURL + ']';

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
					if (window.analytics.reporting.user.userName) {
						username = username + ' (' + window.analytics.reporting.user.userName + ')';
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
				           	var msg = "track-contact-form-success=" + whichForm;
							window.postMessage(msg,document.location.href);
				        },
				        error: function (e) {
				        	var msg = "track-contact-form-failure=" + whichForm;
							window.postMessage(msg,document.location.href);
				            // console.log("ERROR!");
				            // console.log(e);
				        }
				    }); 
				    	var msg = "track-contact-form-submit=" + whichForm;
						window.postMessage(msg,document.location.href);

					appendSpace.slideToggle(128, function(){
						setTimeout(function(){
							$('#waf-tool-buttons-holder').slideToggle(128);
							formSpace.remove();
						},129);
					}());
					return false;
				};

				// when a FORM is Cancelled
				analytics.debug.formCancel = function(){
					var appendSpace = $('#waf-debug-report-append');
					var formSpace = appendSpace.children();
					var whichForm = formSpace.attr('data-waf-debug-form');
					// alert("Cancelling the " + whichForm + " form");

					appendSpace.slideToggle(128, function(){
						setTimeout(function(){
							$('#waf-tool-buttons-holder').slideToggle(128);
							formSpace.remove();
						},129);
					}());
					return false;
				};
			
			// GET THE TMS DEPLOYMENT DETAILS...

			function buildTMSdetails(){
				var putHere = $('#waf-tool-tms-details');
				var details = analytics.debug._tmsDeployments;

				$.each(details, function(space, deployments){
	            //  // console.log("building out data for: " + space);
	                var newDiv = $('<div data-debug-tms-space="' + space + '" class="waf-debug-tms-space" />');
	                var howMany = deployments.length;
	                newDiv.html(space + ' (' + howMany + ')');
	                // // console.log("THIS IS HOW MANY!");
	                // // console.log(howMany);
	                var detailsDiv = $('<div data-debug-tms-space-details="' + space + '" class="waf-debug-tms-details">');
	                var listDiv = $('<div class="waf-debug-tms-details-list" />');
	                var list = $('<ol />');
	                for (var _c = 0 ; _c < howMany ; _c += 1){
	                //  // console.log(howMany[_c]);
	                    if (!deployments[_c]['async']) list.append(($("<li />").append($("<b class='waf-debug-tms-sync-condition' />").html(deployments[_c]['name']))));
	                    else list.append($("<li />").html(deployments[_c]['name']));
	                }
	                listDiv.append(list);
	                detailsDiv.append(listDiv);
	                putHere.append(newDiv);
	                putHere.append(detailsDiv);
	            }); 

				$('#tms-deployments-descrip').removeClass('hidden');

				// show details when the divs are clicked...
				$('[data-debug-tms-space]').on('click', function(e){
					var which = $(e.target);
					var thisOne = which.attr('data-debug-tms-space');

					// console.log("click on details for: " + thisOne);
					// shut others if open
					var findOpens = $('[data-debug-tms-space-details]').filter(':visible');
					var checkOpen = findOpens.attr('data-debug-tms-space-details');

					if (checkOpen != thisOne) findOpens.slideToggle();
					// then open new one
					$('[data-debug-tms-space-details="' + thisOne + '"]').slideToggle();

				});
			}

			$('[data-debug-tms-get-deployments="true"]').on('click', function(){
				
				// log the event in GA
				window.postMessage("track-get-tms-deployments",document.location.href);

				// replace the button with a spinner...
				var spinner = $('<img src="chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/loading.gif" id="waf-debug-tms-loading-details" />');
				$(this).remove();
				$("#waf-tool-tms-details").append(spinner);

				// MANAGE API Stub
	            (function () {
	 
	                // window.checkTheseIDs = {};
	 
	                window.analytics = window.analytics || {};
	                analytics.debug = analytics.debug || {};
	                analytics.debug._tmsData = {};
	                analytics.debug._tmsDeployments = {};
	                analytics.debug._tmsPath = Bootstrapper.ensightenOptions.publishPath;
	                analytics.debug._tmsSpaces = {};
	                analytics.debug._tmsSpaceNames = {};
	                analytics.debug._tmsSpacesLoop = 0;
	 
	                var debugXHR = new XMLHttpRequest();
	 
	                // URL stubs for the API endpoint
	                var authorizationUrlStub = 'https://manage-api.ensighten.com/auth/token';
	                
	                // OAUTH2 details
	                var client_acct = 'adsk';
	                var client_id = 'wafer.tool3';
	                var client_secret = 'Aut0d3sk!';
	 
	                // access pieces
	                var accessKey = btoa(client_acct + ':' + client_id + ':' + client_secret);
	                var accessURL = authorizationUrlStub;   // + additionalStub;
	 
	                // open an ASYNC request
	                debugXHR.open('POST', accessURL, true);
	                
	 
	                // debugXHR.withCredentials = true;
	                debugXHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	                debugXHR.setRequestHeader('Authorization', 'Basic ' + accessKey);
	 
	                debugXHR.onreadystatechange = function (tmsData) {  
	                    if (debugXHR.readyState === 4) {  
	                        // alert("about to send...");
	                        // Success
	                        if (debugXHR.status === 200) {  
	                         //   // console.log("Ensighten Lookup Success");
	                            analytics.debug._auth = JSON.parse(tmsData.target.response);
	                          //  // console.log(analytics.debug._auth);
	                            // run through all the IDs
	                            var TMSidList = Bootstrapper.getRunDeploymentIds();
	                           // var TMSidList = [259371,256933,288049,296549];
	                          //  $.each(TMSidList, function(index, ID){
	                            //    // console.log("looking up data for: " + ID);
	                         //   // console.log(TMSidList);
	                            processIDdata(TMSidList);
	                           // });
	                        } 
	                        else {
	                            // console.log("Ensighten Lookup Failed");
	                        }
	                    }  
	                }; 
	 
	                var getIDdata = function(whichID, last){
	                    var last = last || false;
	 
	                    var aD = analytics.debug._auth;
	 
	                    var debugDataXHR = new XMLHttpRequest();
	 
	                    // URL stubs for the API endpoint
	                    var dataUrlStub = 'https://manage-api.ensighten.com/manage/deployments/search'; 
	 
	                    // open an ASYNC request
	                    debugDataXHR.open('POST', dataUrlStub, true);
	 
	                   // // console.log('access token: ' + aD.access_token);
	 
	                    debugDataXHR.setRequestHeader('Content-Type', 'application/json');
	                    debugDataXHR.setRequestHeader('Authorization', 'Bearer ' + aD.access_token); 
	                    debugDataXHR.setRequestHeader('Accept', 'application/json');
	                    
	                    var _details = JSON.stringify({
	                        "fields": "id, spaceId, name, isCustomApp, status, executionTime, comments, code, dependentDeployments, conditionIds, creationDate",
	                        "sort": "+name",
	                        "filters": {
	                            "id" : whichID
	                        }
	                    });
	 
	                    debugDataXHR.onreadystatechange = function (realTmsData) {  
	                        if (debugDataXHR.readyState === 4) {  
	                            // alert("about to send...");
	                            // Success
	                            if (debugDataXHR.status === 200) {  
	                             //   // console.log("Ensighten Lookup for " + whichID + " Success");
	                                /*
	                                if (typeof checkTheseIDs[whichID] !== "undefined") {
	                                    checkTheseIDs[whichID]['count'] += 1; 
	                                } else {
	                                    checkTheseIDs[whichID] = {
	                                        'count' : 1,
	                                        'data' : false
	                                    };
	                                }
	                                */
	                                var _rData = JSON.parse(realTmsData.target.response);
	                                //// console.log("deployment data");
	                                // // console.log(_rData);
	 
	                                analytics.debug._tmsData[whichID] = _rData;
	                       //         if (!analytics.debug._tmsSpaces[_rData['spaceId']]) {
	                        //          analytics.debug._tmsSpaces[_rData['spaceId']] = false;
	                        //        }
	                                if (last) {
	                               //   // console.log("DONE WITH DEPLOYMENTS");
	                                    setTimeout(function(){
	                                        runThroughSpaces();
	                                    },250);
	                                }
	                                
	                            } 
	                            else {
	                                // console.log("Ensighten Lookup for " + whichID + " Failed");
	                            }
	                        }  
	                    }; 
	                    // send the request
	                    debugDataXHR.send(_details); 
	                };  
	 
	                    function isInArray(value, array) {
	                      return array.indexOf(value) > -1;
	                    }
	 
	                var runThroughSpaces = function(){
	                    var spacesArray = [];
	                    //// console.log(analytics.debug._tmsData);
	                    $.each(analytics.debug._tmsData, function(deploymentID, array){
	                        $.each(array, function(index,deployInfo) {
	                        //  // console.log(deployInfo['spaceId']);
	                        //  // console.log(isInArray(deployInfo['spaceId'], spacesArray));
	                            if (!isInArray(deployInfo['spaceId'], spacesArray)) {
	                                spacesArray.push(deployInfo['spaceId']);
	                            }
	                            // getSpaceDetails(deployInfo['spaceId'], deployInfo, deployInfo['name']);      
	                        });
	 
	                    });
	                //  // console.log("DONE DONE DONE!!");
	                //  // console.log(spacesArray);
	                    analytics.debug._tmsSpaces = spacesArray;
	                    getSpaceDetails();
	                };
	 
	                    var spaceDetailsAPI = function( whichID, total ) {
	                    
	                        var aD = analytics.debug._auth;
	                        var spaceDataXHR = new XMLHttpRequest();
	                        var dataUrlStub = 'https://manage-api.ensighten.com/manage/spaces/' + whichID;
	 
	                        spaceDataXHR.open('GET', dataUrlStub); //, true);
	 
	                        spaceDataXHR.setRequestHeader('Authorization', 'Bearer ' + aD.access_token); 
	                        spaceDataXHR.setRequestHeader('Accept', 'application/json');
	 
	                        spaceDataXHR.onreadystatechange = function (TMSspaceData) {  
	                            if (spaceDataXHR.readyState === 4) {  
	                                // alert("about to send...");
	                                // Success
	                                if (spaceDataXHR.status === 200) { 
	                                    analytics.debug._tmsSpacesLoop += 1;
	                                    // // console.log(analytics.debug._tmsSpacesLoop + " --> " + total); 
	                                    // // console.log("SPACE data returned!!!");
	                                    // // console.log(TMSspaceData);
	                                    
	                                    var _space = JSON.parse(TMSspaceData.target.response);
	                                    //// console.log("SPACE DETAILS");
	                                    //// console.log(_space);
	 
	 
	                                    // // console.log(_space[0]['publishPaths'])
	                                    var _spacePaths = _space[0]['publishPaths'];
	                                    var _spaceName = _space[0]['name'];
	 
	                                    $.each(_spacePaths, function(index, detes){
	 
	                                        var theSpace = detes['publishPath'] == analytics.debug._tmsPath ? true : false;
	                                       // // console.log(detes);
	                                      // // console.log(_spacePaths);
	                                        if (theSpace) {
	                                       //   // console.log(detes);
	                                       //   // console.log(_spaceName);
	                                       //   // console.log(_space[0]['id']);
	                                            analytics.debug._tmsSpaceNames[_spaceName] = analytics.debug._tmsSpaceNames[_spaceName] || [];
	                                            analytics.debug._tmsSpaceNames[_spaceName].push(_space[0]['id']);
	 
	                                            /*
	                                            analytics.debug._tmsSpaceNames[detes['publishPath']]['id'];
	                                            analytics.debug._tmsSpaceNames = analytics.debug._tmsSpaceNames || {};
	                                            analytics.debug._tmsSpaceNames[deployment['spaceId']] = _spaceName;
	                                            // console.log("matching space! " + detes['publishPath'] + " = " + analytics.debug._tmsPath + " --> " + _spaceName);
	                                            // console.log(_spacePaths);
	                                            // console.log(detes);
	                                            // console.log(deployment);
	                                            // then store the data...
	                                            storeIDdata(_spaceName, deploymentName);
	                                     //       if (realLast) {
	                                     //           clearInterval(manageAPIperformance);
	                                     //           $('#waf-debug-tms-loading-details').remove();
	                                                // $('#waf-tool-tms-details').html("Manage API done in " + analytics.debug.manageAPItiming + "seconds!");
	                                     //           buildTMSdetails();
	                                     //       }
	                                                    */
	                                        }
	                                        else {
	                                            return;
	                                        }
	                                        
	                                    });
	 
	                                    if (analytics.debug._tmsSpacesLoop === total) {
	                                    //  // console.log('done getting all space data returned');
	                                        putDeploymentsInSpaces();
	                                    }
	 
	                                
	                                } 
	                                else {
	                                    // console.log("Ensighten Lookup for Space ID: " + whichID + " Failed");
	                                    // // console.log(realTmsData);
	                                }
	                            }  
	                        }; 
	                     //   // console.log('getting SPACE data');
	                        // send the request for Space details
	                        spaceDataXHR.send(); 
	                    }
	 
	                var putDeploymentsInSpaces = function( ){
	                    $.each(analytics.debug._tmsData, function(index,obj){
	                        $.each(obj, function(indexN, data){
	                            var deploySpaceId = data['spaceId'];
	                            var deploymentName = data['name'];
	                            // can grab other data here too...
	                        //  // console.log(data);
	                            
	                            var asyncCondition = (data['conditionIds'].length > 0) ? true : false;
	                            $.each(analytics.debug._tmsSpaceNames, function(spaceName, spaceData){
	                                $.each(spaceData, function(indexZ, matchSpaceID){
	                                    if (deploySpaceId === matchSpaceID) {
	                                        analytics.debug._tmsDeployments[spaceName] = analytics.debug._tmsDeployments[spaceName] || [];
	                                        analytics.debug._tmsDeployments[spaceName].push({
	                                            'name' : deploymentName,
	                                            'async' : asyncCondition
	                                        });
	                                    }
	                                });
	                            });
	                        });
	 
	                    });
	 
	                    // everything is done now
	                    $('#waf-debug-tms-loading-details').remove();
	                    buildTMSdetails();
	 
	                };  
	 
	                var getSpaceDetails = function( ){ 
	                    analytics.debug._tmsSpacesLoop = 0;
	                    var howMany = analytics.debug._tmsSpaces.length;
	                //  // console.log('going to run through ' + howMany);
	                    var ii = 0;
	                    for (ii; ii < howMany; ii += 1) {
	                  //      // console.log("need to get space data: " + ii);
	                        spaceDetailsAPI(analytics.debug._tmsSpaces[ii], howMany);
	                    }
	 
	                };
	 
	                var processIDdata = function(_data) {
	                    // how many records
	                    var _len = _data.length;
	                 //   // console.log("data that's passed!");
	                 //   // console.log(_data);
	                    // then run through and check the Spaces for each Deployment...
	                    // and put the deployment names there...
	                    for (_x = 0; _x < _len; _x += 1) {       
	                        var deployID = _data[_x]; 
	                        analytics.debug._tmsData[deployID] = [];
	                        if (_x == _len - 1) {
	                            getIDdata(deployID, true);
	                        }
	                        else getIDdata(deployID);
	                    }      
	                };
	 
	                var storeIDdata = function(space, name) {
	                    if (typeof analytics.debug._tmsData[space] === "undefined") {
	                        analytics.debug._tmsData[space] = {
	                            'deployments' : new Array()
	                        };
	                    }
	                    // // console.log(name);
	                    analytics.debug._tmsData[space]['deployments'].push(name);
	                };
	 
	                analytics.debug.manageAPItiming = 0;
	                var manageAPIperformance = setInterval(function () {
	                    analytics.debug.manageAPItiming += 1;
	                }, 1000);
	 
	                // open the API
	                debugXHR.send('grant_type=password');    
	 
	            })();
	 
	        });

			/*
			// psuedo class for hover over data-wat-* tags
			try {
				jQuery.expr.pseudos.attr = $.expr.createPseudo(function(arg) {
				    var regexp = new RegExp(arg);
				    return function(elem) {
				        for(var i = 0; i < elem.attributes.length; i++) {
				            var attr = elem.attributes[i];
				            if(regexp.test(attr.name)) {
				                return true;
				            }
				        }
				        return false;
				    };
				});
			} catch(e) {
				// console.log('unable to create jQuery pseudo function for HOVER inspect');
			}
			*/

			// if it's a mobile, enable the Click to Inspect method
			// otherwise make it Hover (the default)
			if (detectmob()) {
				$('[data-debug-inspect-type]').attr('data-debug-inspect-type',"click");			
				$("#waf-debug-inspect-type-msg").html('enable click inspecting');
				analytics.debug.inspect.inspectType = 'click';
			}

			function mergeDataSets(obj1,obj2){
			    var obj3 = {};
			  //  // console.log('first data set');
			  //  // console.log(obj1);
			  //  // console.log('second data set');
			  //  // console.log(obj2);
			    for (var attrname in obj1) { 
			    	if (!obj3[attrname]) obj3[attrname] = obj1[attrname]; 
			    }
			    for (var attrname in obj2) { 
			    	if (!obj3[attrname]) obj3[attrname] = obj2[attrname]; 
			    }
			    return obj3;
			}
			function cleanDataSet(obj) {
				var cleanSet = {};
				$.each(obj, function(index, value){
				 	// console.log('dataSet value');
				 	// console.log(index);
					// console.log(value);
					// console.log(index.substring(0,16));
					if (index.substring(0,3) === 'wat') {
						// console.log("VALID WAT TAG!!!");
						cleanSet[index] = value;
					}
					else if (index.substring(0,16) === 'nurtureTracking') {
						// console.log("VALID NURTURE TAG!!!");
						var temp, i, l;
						var mktoVal = value.split("&");
					    for (i = 0, l = mktoVal.length; i < l; i++) {
					        temp = mktoVal[i].split('=');
					        // params[temp[0]] = temp[1];
					        cleanSet[temp[0]] = temp[1];
					    }
					    // mktoVal = params;
						//cleanSet[index] = value;
					}
				});
				return cleanSet;
			};

			function inspectTargetAndParents(target){
				var parents = $(target).parents();
				var dataTags1 = target.context.dataset;
			//	// console.log('target DataSet');
			//	// console.log(dataTags1);
				$.each(parents, function(index, elem){
			//		// console.log($(elem));
					var dataTagsX = $(elem).context.dataset;
			//		// console.log('parent DataSet');
			//		// console.log(dataTagsX);
					dataTags1 = mergeDataSets(dataTags1,dataTagsX);
			//		// console.log('new Merged DataSet');
			//		// console.log(dataTags1);
				});
				var cleanData = cleanDataSet(dataTags1);
				return cleanData;
			};

			function checkElementMatchForData(elem) {
				var found = false;
				$.each(analytics.evaluation.evalData, function(index,obj){
					// var checkElemMatch = $(elem)[0] === $(obj['linkObj'][0]) ? true : false;
					// var checkElemMatch = $(elem)[0] === obj['linkObj'] ? true : false;
					var checkElemMatch = elem[0] === obj['linkObj'] ? true : false;
					if (checkElemMatch && !found) {
						var matchVal = obj.v21;
						$('#waf-debug-hover-report-data-output').html(matchVal);
						found = true;
					//	$('[data-waf-debug-report-api]').attr('data-waf-debug-report-api',matchVal);
					}
				});
			};

			// the click or hover function
			// hover to INSPECT data-wat-* tags

			$(document).on(analytics.debug.inspect.inspectType, analytics.debug.inspectTheseTags, function(e){
			//$(document).on(analytics.debug.inspect.inspectType, ":attr('^data-wat-')", function(e){
				//// console.log("found a DATA-WAT-* tag");
				var adI = analytics.debug.inspect;
				if (adI.inspectType === 'click' && !adI.clickInspect) return;
				else {
					if (adI.inspectType === 'click') e.preventDefault();
					$('#waf-debug-hover-inspect').empty();

					// var thisTarget = $(e.target);
					var thisTarget = $(this);

					// find the target, depending on the type
					if ($(this).attr('data-wat-link-section')) {
						var anotherTarget = thisTarget;
					}
					else {
						var anotherTarget = $(this);	
					}
					checkElementMatchForData(anotherTarget);

					var dataTags = inspectTargetAndParents(thisTarget);
				//	// console.log('final tags...');
				//	// console.log(dataTags);
					
					var table = $('<table id="waf-debug-tracking-inspect-table" />');
					var header = $('<tr class="waf-debug-tracking-header"><td>tag</td><td>value</td></tr>');
					table.append(header);

					$.each(dataTags, function(key, value){
				//		// console.log(key.split('wat').pop() + ' = ' + value);
						var newRow = $('<tr>');
						var tagName = key.split('wat').pop().replace(/^[a-z]|[A-Z]/g, function(v, i) {
								        return i === 0 ? v.toUpperCase() : "-" + v.toLowerCase();
								    });  // "This is not a pain"
						var newTag = $('<td class="waf-debug-inspect-name" />').html(tagName.toLowerCase());			
						var newValue = $('<td class="waf-debug-inspect-value" />').html(value);

						newRow.append(newTag).append(newValue);
						table.append(newRow);
					});

					// show the table
					$('#waf-debug-hover-inspect').append(table);
				}
				
			});
			/*
			$(document).on(analytics.debug.inspect.inspectType, '.adsk-content a', function(e){
				$('#waf-debug-hover-inspect').empty();
				var scottHuot = (document.location.href.indexOf('/campaigns/') > -1 || document.location.href.indexOf('/subscription/') > -1) ? true : false;
				if (scottHuot) {
					var trackedVia = $('<p><i>tracked via the <b>Scott Huot</b> method</i></p>');
					$('#waf-debug-hover-inspect').append(trackedVia);

					var anotherTarget = $(this);
					checkElementMatchForData(anotherTarget);
				}

			});
			*/

			// then remove on Hover Off
			$(document).on('mouseleave', analytics.debug.inspectTheseTags, function(e){
			//$(document).on('mouseleave', ":attr('^data-wat-'), .adsk-content a", function(e){
				if (!analytics.debug.inspect.leaveHover && analytics.debug.inspect.inspectType === 'mouseenter') {
					$('#waf-debug-hover-inspect').empty();	
					$('#waf-debug-hover-report-data-output').html('');
				}
			});	
					
			// toggle the inspect setting
			$('#waf-debug-inspect-setting input').on('click', function(e){
				var inspectType = $(this).attr('data-debug-inspect-type');
				if (inspectType === 'mouseenter') analytics.debug.inspect.leaveHover = $(this).prop('checked');
				else if (inspectType === 'click') analytics.debug.inspect.clickInspect = $(this).prop('checked');
				if ($(this).prop('checked')) {
					$(this).addClass('waf-debug-other-selected');

				}
				else {
					$(this).removeClass('waf-debug-other-selected');
				}
				analytics.debug.state.setToolState();
			});


			// then SHOW the tool...
			$('#waf-debug-block').css('visibility','visible');

			// then adjust the TABLE cells to handle weird behavior on some sites
			$('#waf-debug-edge td').css('padding','0px');
			$('#waf-debug-tracking-options input').css('z-index','1100000');
			$('#waf-debug-tracking-options input').css('opacity','1');
			// $('[data-debug-menu]').css('color', 'gray');
			// $('[data-debug-menu] .waf-debug-menu-selected').css('color', 'gray');

			// LINK REPORTING
			/* ************* */

				// LINK TRACKING EVALUATION
				// FOR USE WITH THE ADOBE REPORTING API

				(function evaluateLinkTracking() {

					// // console.log("BUILDING LINK EVALUTATION DATA...");

					window.analytics = window.analytics || {};
					var aA = window.analytics.evaluation = window.analytics.evaluation || {};

					aA.types = [
						'[data-wat-link]',
						'[data-wat-linkname]',
						'[data-wat-link-section] a',
						'.adsk-content a'
					];
					aA.evals = {};

					var stop = aA.types.length;
					var go = 0;
					for (go; go < stop; go += 1){
						aA.evals[go] = $(aA.types[go]);
					};

					var linkIndividualTrack = function(newThis) {
						var target = $(newThis);        
						var v21link = {
							eVar21: "",
							prop21: "D\x3dv21",
							events: "event21",
							type: "link",
							allEvent: ""
						};
						var d = {
							trackVal: "",
							page: "",
							locationVal: ""
						};
						var link = v21link;
						
						if (digitalData.page.pageName) d.page = digitalData.page.pageName;
						if (target.attr("data-wat-val")) d.trackVal = target.attr("data-wat-val");
						else d.trackVal = target.text();
						if (target.attr("data-wat-loc")) d.locationVal = target.attr("data-wat-loc");
						d.trackVal = d.trackVal.trim().toLowerCase();
						d.page = d.page.trim().toLowerCase();
						d.locationVal = d.locationVal.trim().toLowerCase();
						link.eVar21 = d.locationVal + " \x3e " + d.page + " \x3e " + d.trackVal;
						link.eVar21.toLowerCase();

					   	return link.eVar21;
					};

					var linkSectionTrack = function(newThis) {
					      var sectionLink = {
					          eVar21: "",
					          prop21: "D\x3dv21",
					          events: "event21",
					          type: "link",
					          allEvent: ""
					      };
					      
					      var target = $(newThis);
					      var section = $(($(target).parents('[data-wat-link-section]'))[0]);
					      var d = {
					          trackVal: "",
					          page: "",
					          locationVal: ""
					      };
					      d.locationVal = section.attr("data-wat-link-section") ? section.attr("data-wat-link-section") : 'content';
					     
					      if (target.attr("data-wat-val")) d.trackVal = target.attr("data-wat-val");
					      else d.trackVal = target.text();
					      if (digitalData.page.pageName) d.page = digitalData.page.pageName;
					      if (target.attr("data-wat-loc")) d.trackVal = target.attr("data-wat-loc") + ":" + d.trackVal;
					      else if (target.parents("[data-wat-loc]").length) {
					          var $parent = target.parents("[data-wat-loc]");
					          d.trackVal = target.parents("[data-wat-loc]").attr("data-wat-loc") + ":" + d.trackVal
					      } else if (section.attr("data-wat-loc")) d.trackVal = section.attr("data-wat-loc") +
					          ":" + d.trackVal;
					      d.trackVal = d.trackVal.trim().toLowerCase();
					      d.page = d.page.trim().toLowerCase();
					      d.locationVal = d.locationVal.trim().toLowerCase();
					      sectionLink.eVar21 = d.locationVal + " \x3e " + d.page + " \x3e " + d.trackVal;
					      sectionLink.eVar21.toLowerCase();

					      return sectionLink.eVar21;
					};

					var linkNameTrack = function(newThis) {
					      var target = $(newThis);            
					      var link = {
					          eVar21: "",
					          prop21: "D\x3dv21",
					          events: "event21",
					          type: "link",
					          allEvent: ""
					      };
					      var d = {
					          trackVal: "",
					          page: "",
					          locationVal: ""
					      };
					      if (digitalData.page.pageName) d.page = digitalData.page.pageName;
					      if (target.attr("data-wat-linkname")) d.trackVal =
					          target.attr("data-wat-linkname");
					      else d.trackVal = 'value-missing';
					      d.trackVal = d.trackVal.trim().toLowerCase();
					      d.page = d.page.trim().toLowerCase();
					      // the default location here is content
					      d.locationVal = ('content').toLowerCase();
					      link.eVar21 = d.locationVal + " \x3e " + d.page + " \x3e " + d.trackVal;
					      link.eVar21.toLowerCase();
					      
					      return link.eVar21;
					};

					var scottHuotTracking = function(link){
						var track = ($(link).text() ? $(link).text() + " (" + ($("a:contains(" + $(link).text() + ")").index($(link)) + 1) + ")" : $(link).find("img:first").attr("src") + " (" + ($('img[src\x3d"' + $(link).find("img:first").attr("src") + '"]').index($(link).find("img:first")) + 1) + ")").replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g, " ");
						var page_name = "";
						if (digitalData.page.pageName) page_name = digitalData.page.pageName;
						var value = ("content" + " \x3e " + page_name + " \x3e " + track).toLowerCase();
						return value;
					};

					aA.evalData = {};

					var stop2 = aA.types.length;
					go = 0;
					var evalCount = 0;
					for (go; go < stop2; go += 1){
						var thisOne = aA.evals[go];
						$.each(thisOne, function(index, obj){
							var v21val = '';
							try {
								(function(){
									switch (go){
										case 0 : 
											v21val = linkIndividualTrack(obj);
											break;
										case 1 :
											v21val = linkNameTrack(obj);
											break;
										case 2 :
											v21val = linkSectionTrack(obj);
											break;
										case 3 : 
											v21val = scottHuotTracking(obj);
											break;
									};
								})();
							} catch(e) {
							//	// console.log('it broke on this one...');
							//	// console.log(obj);
							}
							aA.evalData[evalCount] = {
								'v21' : v21val,
								'linkObj' : obj
							};
							evalCount += 1;
						});

					};

					var cleanList = [];
					$.each(analytics.evaluation.evalData, function(index, obj){
						var checkVal = obj['v21'];
						var newOne = cleanList.indexOf('checkVal') > -1 ? false : true;
						if (newOne) {
							cleanList.push(checkVal);
						}
					});
					analytics.evaluation.evalArray = cleanList;

					var _evalString = '';
					for(var _j = 0; _j < cleanList.length; _j += 1) {
						_evalString += '"' + cleanList[_j] + '"';
						if (_j + 1 < cleanList.length) _evalString += ',';
					}
					analytics.evaluation.evalString = _evalString


					})();

			// END LINK REPORTING SECTION
			/** ***************/

		}
		else {
			// console.log('WAFER Tool Already Launched...');
		}

		};
		// end GO function

		var launchIt = $('#waf-debug-edge').length === 0 ? true : false;
		// // console.log($('#waf-debug-edge'));
		if (launchIt) {
			// console.log('launching WAFER');
			__goo(jQuery);
			
			var msg = "track-wafer-inspector-launch-success";
			window.postMessage(msg,document.location.href);
		}
		else {
			// console.log('launch WAFER already');
		}

	}
	catch(err) {
		var msg = "track-wafer-inspector-launch-failure";
		window.postMessage(msg,document.location.href);
	}

})(jQuery);
