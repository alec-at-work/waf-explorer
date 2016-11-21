

(function(){

	try {
		//alert("GEO data cleared!");

		// console.info('clearing GEO data for Demandbase');
		
		// clear the initial cookie flag
		document.cookie = 'dmdbase_flag' + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/";
		
		// console.info('cookie flag was deleted');
		// clear local storage
		
		localStorage.removeItem('s_dmdbase');
		localStorage.removeItem('dmdbase_full');
		
		// console.info('local storage was deleted');

		try {
			// clear the clientContext from AEM
			if (typeof window.adsk !== "undefined") {
				if (typeof window.adsk.clientContext !== "undefined") {
					if (typeof window.adsk.clientContext.removeStore !== "undefined") {
						// console.log('removing the clientContext values for demandbase');
						window.adsk.clientContext.removeStore('demandbase');
					}
				}
			}
		} catch(err){
			// checking & clearing AEM clientContext didn't work
		}

	} catch(err) {
		// console.info('error clearing the GEO data for Demandbase');
	}
})();
