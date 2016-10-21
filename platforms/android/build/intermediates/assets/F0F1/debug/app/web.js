var application = require("application");
var webViewModule = require("ui/web-view");
var frameModule = require("ui/frame");
var web;

function pageLoaded(pargs) {
    page = pargs.object;
	console.log("pageLoaded",pargs);
	
	if (application.android) {
        application.android.on(application.AndroidApplication.activityBackPressedEvent, backEvent);
    }
	
	var webView = new webViewModule.WebView();
	
	
	web = page.getViewById("webView");
	
	var visited=application.resources["visitedwebview"];
	console.log("visited: "+visited);
	
	

 web.on(webViewModule.WebView.loadFinishedEvent, function (args) {
	console.log("webview loaded");
    var message;
    if (!args.error) {
        message = "WebView finished loading " + args.url;
    }
    else {
        message = "Error loading " + args.url + ": " + args.error;
    }
	console.log(message);
});

  /* if (!visited)
   {*/
    web.url = "http://tkdr.herokuapp.com/index.html?head=no";
	application.resources["visitedwebview"] = true;
	//} 

}


function pageUnloaded() {
	

    // We only want to un-register the event on Android
    if (application.android) {
        application.android.off(application.AndroidApplication.activityBackPressedEvent, backEvent);
    }

	
}


function onNavBtnTap(args){
	
	frameModule.topmost().navigate({
		moduleName: "homepage",
		context: {}
		
	});
	
	
}

function backEvent(args) {
  //if (iRefuseToGoBack) { args.cancel = true; }
  console.log("back event");
  web.goBack();
  args.cancel=true;
}

exports.onNavBtnTap=onNavBtnTap;
exports.pageLoaded = pageLoaded;
exports.pageUnloaded = pageUnloaded;