
var debug = true;
var requestCounter = 0;
function extDebug(debugObject){
	if (debug){
		// console.log(debugObject)
	}
}
// check for devtools so no errors are shown
if(typeof chrome.devtools != 'undefined'){
	// on change of page render a separator
	chrome.devtools.network.onNavigated.addListener(function(url) {
		renderNewPage (url)

	});
	// on network request process the request
	chrome.devtools.network.onRequestFinished.addListener(function(request) {
		filterTagRequests (request);
	});
}
// only process tags that are in the providers array based on url
function filterTagRequests (request){

	for (var i = 0; i < providers.length; i++) {

		if (request.request.url.indexOf(providers[i].providerUrl) != -1){

			// check for GA and AA POSTs
			var whichOne = false;
			var checkPost = request.request.url.indexOf('metrics.autodesk.com') > -1 ? true : false;
			if (!checkPost) {
				checkPost = request.request.url.indexOf('www.google-analytics.com/collect') > -1 ? true : false;
			}

			var type = request.request.method;

			var provider;
			var req;

			// alert("a " + type + " request for " + providers[i]['providerId'] + " --> " + request.response.status);

			// make sure only 200 STATUS requests get through...
			var validRequest = false;
			if (typeof request.response !== "undefined") {
				if (typeof request.response.status !== "undefined") {
					validRequest = request.response.status === 200 ? true : false;
					// alert("request is valid!");
				}
			} 

			if (checkPost && type === "POST") {

				try {
					// alert(decodeURIComponent(request.request.postData.text));
					var newData = [];
					var rawData = request.request.postData.text.split('&');

					$.each(rawData, function(ind,keyVal){
						var split = keyVal.split('=');
						var paramObj = {
							'name' : split[0],
							'value' : split[1]
						};
						newData.push(paramObj);
					});

				// 	alert(JSON.stringify(newData));
					request.request.queryString = newData;
				} catch(err) {

				}
			}

			req = request.request;
			var renderThis = true;

			// check if it should NOT be rendered
			if (type === "GET") {
				var checkHeaders = req.queryString;
				$.each(checkHeaders, function(index, object){
					var checkObj = object['name'] === 'tid' ? true : false;
					if (checkObj) {
						//	alert(JSON.stringify(object));
						// 	alert(object['value']);
						//	alert(checkObj['value']);
						var dontTrack = object['value'] == 'UA-60717701-8' ? true : false;
						if (dontTrack) {
							// alert("found a request to cancel");
							renderThis = false;
						}
					}
				});
			}
			
			provider = providers[i];

			// alert("provider is: " + JSON.stringify(provider));
			if (validRequest && renderThis) {
				try {
					renderRequest(provider, req, type);		
				} catch(wrong) {
					// alert(wrong);
				}
				
			}
			return;
		}
	};
}


// render the request
function renderRequest(provider, request, type){

	//alert("a " + type + " request has the following render data...");

	requestCounter ++;
	var $tagContainer = $("<div>", {class: "tagContainer " + provider.providerClass, 'data-type': provider.providerType, html: requestCounter + ". " + provider.providerName});
	var $tagRequest = $("<div>", {class: "tagRequest ", html: request.url});
	var $tagParamsContainer = $("<div>", {class: "tagParamsContainer"});
	$tagParamsContainer.hide();
	$tagContainer.click(function() {
		selectTagContainer(this);
	});

	// different treatment for GET and POST
	if (type === "GET") {
	}
	else if (type === "POST") {
	}

	$tagContainer.append($tagParamsContainer,$tagRequest);
	var params = request.queryString;
	if (typeof request.postData != 'undefined' && provider.providerClass !== "adobe" && provider.providerClass !== "googleUniversal"){
		params = request.postData.params;
	}
	if (params.length != 0){
		processParameters(params, provider, $tagParamsContainer)

	} else {
		var $noparamsDiv = $("<div>", {class: "noParams", html:"No Parameters present. <br> Request is: <strong>" + request.url +"</strong>"});
		$tagParamsContainer.append($noparamsDiv)
	}
	$('#container').prepend($tagContainer);

	if (!isTypeChecked(provider.providerType)){
		$tagContainer.hide(); 
		return;
	}
	if (isSelectLatest()) {selectTagContainer($tagContainer)};

}
// process the parameters and render them in a hidden div until they are shown
function processParameters(params,provider,tagContainer){

	// create flat object from Params	
	// put parameters in single array based on being in the provider order array
	// if not in provider order array put them in an unclassified array
	var oParams = {}
	var oParamsUnordered = {}
	for (var i = 0; i < params.length; i++) 
    {
    	params[i].name = params[i].name.replace(/\./g, "")
    	if ($.inArray(params[i].name,provider.providerParamsOrder) == -1){
    		oParamsUnordered[params[i].name] = unescape(params[i].value);
    	}
    	oParams[params[i].name] = unescape(params[i].value);

    }
    // process parameters based on the provider order and  render them
	for (var i = 0; i < provider.providerParamsOrder.length; i++) 
    {	
    	var item = provider.providerParamsOrder[i]
    	// if the array has a heading render it as such. Allows for some html structure of the page
    	if(item.match("^HEADING|") != ""){
    		var heading = item.split('HEADING|')[1]
    		var $paramDiv = $("<div>", {class: "tagParamHeading", html: heading});
			tagContainer.append($paramDiv)
    	}else{
    		if (typeof oParams[item] != 'undefined'){
    			var paramName =  item;
		        if (typeof  provider.providerParams[item] != 'undefined'){
		        	paramName =  provider.providerParams[item];
		        }
		        if (item == "events" && typeof oParams[item] != 'undefined'){
		        	oParams[item] = processEvents(oParams[item]);
		        }
				renderParams(item, paramName, oParams[item],tagContainer);
    		}
    	}
    }
    // use js to iterate over object as jquery was breaking
	for (var pKey in oParamsUnordered) {
		 if (oParamsUnordered.hasOwnProperty(pKey)) {
			renderParams(pKey, pKey, oParamsUnordered[pKey],tagContainer);
		 }
	}
 
}
// handle the rendering of the parameter divs
function renderParams (paramKey, paramName, paramValue, tagContainer){
	var $paramKeyDiv = $("<div>", {class: "tagParamKey", html: paramKey});
	var $paramNameDiv = $("<div>", {class: "tagParamName", html: paramName});
	var $paramValueDiv = $("<div>", {class: "tagParamValue", html: paramValue});
	var $paramDiv = $("<div>", {class: "tagParam"});
	$paramDiv.append($paramKeyDiv,$paramNameDiv,$paramValueDiv)
	tagContainer.append($paramDiv)

}
// rendering for the page request on navigation change
function renderNewPage(url){
	var $newPageDiv = $("<div>", {class: "newPage", html: "New page: " + url});
		$('#container').prepend($newPageDiv);
		requestCounter = 0;
}
//renders separator line
function renderSeparator (){
	var $separatorDiv = $("<div>", {class: "separator"});
	$('#container').prepend($separatorDiv);
}
// when tag item is clicked show the details. also called on auto display of latest
function showDetail(tagContainer){
	var $tempContents = $(tagContainer).find('.tagParamsContainer').clone()
	$('#detail').html($tempContents.show())
	//$(tagContainer).find('.tagParamsContainer').show()
}
// return true or false if checkbbox is checked to automatically select latest hit
function isSelectLatest (){
	if($('#selectLatest:checked').length >0) return true;
	return false;
}
function isTypeChecked (type){
	var checkbox = "#" + type;
	if($('input[name="'+ type + '"]:checked').length >0) return true;
	return false;
}
// function called when a hit is selected to highlight it
function selectTagContainer(tagContainer){
	$('.tagContainer').removeClass('selected')
	  showDetail(tagContainer);
	  $(tagContainer).addClass( "selected" )
}
// extra processing for SC events array so they are more readable
function processEvents(paramValue){
	aParamValue = paramValue.split(',')
	var newParamValue = [];
	for (var i = 0; i < aParamValue.length; i++) {
		if(typeof adobeEvents[aParamValue[i]] != 'undefined'){
			newParamValue.push(adobeEvents[aParamValue[i]] )
		}else{
			newParamValue.push(aParamValue[i]) ;
		}
	};
	return newParamValue.toString();
}

// check the height of the header and dynamically set the Detail container
  var header = $('.wa-inspector-header');
  var div_height = header.height();
  // console.log(div_height);
  $('.wa-inspector-detail').css('padding-top',div_height + 'px');