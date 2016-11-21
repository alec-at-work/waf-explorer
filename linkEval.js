
// LINK TRACKING EVALUATION
// FOR USE WITH THE ADOBE REPORTING API

(function evaluateLinkTracking() {

// console.log("BUILDING LINK EVALUTATION DATA...");

window.analytics = window.analytics || {};
var aA = window.analytics.reporting = window.analytics.reporting || {};

aA.types = [
	'[data-wat-link]',
	'[data-wat-link-section] a',
	'[data-wat-linkname]',
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
		d.trackVal = target.text();
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
						v21val = linkSectionTrack(obj);
						break;
					case 2 :
						v21val = linkNameTrack(obj);
						break;
					case 3 : 
						v21val = scottHuotTracking(obj);
						break;
				};
			})();
		} catch(e) {
			// console.log('it broke on this one...');
			// console.log(obj);
		}
		aA.evalData[evalCount] = {
			'v21' : v21val,
			'linkObj' : obj
		};
		evalCount += 1;
	});

};

var cleanList = [];
$.each(analytics.reporting.evalData, function(index, obj){
	var checkVal = obj['v21'];
	var newOne = cleanList.indexOf('checkVal') > -1 ? false : true;
	if (newOne) {
		cleanList.push(checkVal);
	}
});
analytics.reporting.evalArray = cleanList;

var _evalString = '';
for(var _j = 0; _j < cleanList.length; _j += 1) {
	_evalString += '"' + cleanList[_j] + '"';
	if (_j + 1 < cleanList.length) _evalString += ',';
}
analytics.reporting.evalString = _evalString


})();

   