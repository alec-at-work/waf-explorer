try {

	// console.log('WAFER --> setting PJAX handling');
	// console.log(typeof jQuery);

	$(document).bind('pjax:render', function() {
		window.__waferBaseSet = false;
		var base = document.createElement('script');
	    base.src = 'chrome-extension://ffghmaniegcbhebmfpkdppncjlfbhimj/js/basePieces.js';
	    (window.top.document.head||window.top.document.documentElement).appendChild(base);
	    // alert("PJAX HIJACK!");
	});

} catch(err) {

}