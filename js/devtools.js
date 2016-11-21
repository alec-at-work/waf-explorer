/*
 Copyright (C) 2012 Observepoint LLC. All rights reserved.
*/
chrome.devtools.panels.create("WA Inspector", "img/icon.png", "panel.html", function(a) {
   // var c, d, e;
   
  /*  c = chrome.extension.connect({
        name: "observepoint"
    });
    c.postMessage({
        action: "setTabMap",
        tabId: chrome.devtools.inspectedWindow.tabId
    });
    c.onMessage.addListener(function(b) {
        "addTag" === b.action && a.windowObj.addTag(b.data, !1);
        "updateTag" === b.action && a.windowObj.addTag(b.data, !0);
        "addVariables" === b.action && a.windowObj.addVariables(b.data);
        "updateAverageLoadTime" === b.action && a.windowObj.updateAverageLoadTime();
        if ("downloadFile" === b.action) return a.windowObj.downloadFile(b.data)
    });
    a.onShown.addListener(function(b) {
        a.windowObj = b;
        return b.background = c
    });
    a.onHidden.addListener(function(b) {
        a.windowObj = b;
        return b.background = c
    });*/
    /*e = a.createStatusBarButton("img/toggleClearButton1.png", "Clearing tags on navigation", !1);
    d = !0;
    e.onClicked.addListener(function() {
        if (d) return d = !1, e.update("img/toggleClearButton2.png",
            "Tags persist through navigation", !1), a.windowObj.clearContent = a.windowObj.clearContentOff;
        d = !0;
        e.update("img/toggleClearButton1.png", "Clearing tags on navigation", !1);
        return a.windowObj.clearContent = a.windowObj.clearContentDefault
    });
    a.createStatusBarButton("img/clearContentButton.png", "Clear tag requests", !1).onClicked.addListener(function() {
        return a.windowObj.clearContentDefault()
    });
    return a.createStatusBarButton("img/download.png", "Export data", !1).onClicked.addListener(function() {
        return a.windowObj.exportContent()
    })*/
});
