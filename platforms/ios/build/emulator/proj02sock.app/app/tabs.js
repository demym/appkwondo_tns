var vmModule = require("./main-view-model");
var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var scrollViewModule = require("ui/scroll-view");
var frameModule = require("ui/frame");
var tabViewModule = require("ui/tab-view");
var segmentedBarModule = require("ui/segmented-bar");
var webViewModule = require("ui/web-view");
var webView = new webViewModule.WebView();

function pageLoaded(args) {
    var page = args.object;
	webView.on(webViewModule.WebView.loadFinishedEvent, function (args) {
    var message;
	console.log("webview loaded")
    if (!args.error) {
        message = "WebView finished loading " + args.url;
    }
    else {
        message = "Error loading " + args.url + ": " + args.error;
    }
	console.log("webview message: "+message);
});
	
    webView.src = 'http://tkdr.herokuapp.com';

	
  
}





exports.pageLoaded = pageLoaded;
