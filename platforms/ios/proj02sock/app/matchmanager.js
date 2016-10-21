
var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var scrollViewModule = require("ui/scroll-view");
var frameModule = require("ui/frame");
var switchModule = require("ui/switch");

var context;
var rtswitch;
var match;



function pageLoaded(args) {
    var page = args.object;
	
	rtswitch=page.getViewById("rtswitch");
	var matchlabel=page.getViewById("matchlabel");
	
	context=page.navigationContext;
   console.log(JSON.stringify(context));   
    match=context.match;
	
	matchlabel.text="Gestione match "+match.doc.matchid+" - "+match.doc.atletaname;
	
    

}


function rtChanged(args){
	 console.log("Property Changed!");
    console.log("Event name:" + args.eventName);
    console.log("Object:" + args.object);
    console.log("propertyname:" + args.propertyName);
    console.log("value:" + args.value)
	
}

function butplusTap(args){
	
	//console.log(JSON.stringify(args));
	console.log("tap");
}



function onNavBtnTap(args){
	
		frameModule.topmost().goBack();
	
}




exports.onNavBtnTap=onNavBtnTap;
exports.butplusTap=butplusTap;
exports.rtChanged=rtChanged;
exports.pageLoaded = pageLoaded;
