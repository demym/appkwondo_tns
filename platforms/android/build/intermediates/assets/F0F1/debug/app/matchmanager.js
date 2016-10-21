
var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var scrollViewModule = require("ui/scroll-view");
var frameModule = require("ui/frame");
var switchModule = require("ui/switch");

var context;
var rtswitch;
var match;
var page;


function pageLoaded(args) {
    page = args.object;
	
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

	var button = args.object;
	var ris=page.getViewById("risult1");
 
	console.log(button.id);

	var arrp=ris.text.split("-");
	var p1=parseInt(arrp[0],10);
    var p2=parseInt(arrp[1],10);
	//var p1="0";
	//var p2="0";

    if (button.id=="butplus1") p1++;
	if (button.id=="butplus2") p2++;

	if (button.id=="butminus1") p1--;
	if (button.id=="butminus2") p2--;

	if (p1<0) p1=0;
	if (p2<0) p2=0;


	var result=String(p1)+"-"+String(p2);
	

    ris.text=result;

	console.log("tap ");
}



function onNavBtnTap(args){
	
		frameModule.topmost().goBack();
	
}




exports.onNavBtnTap=onNavBtnTap;
exports.butplusTap=butplusTap;
exports.rtChanged=rtChanged;
exports.pageLoaded = pageLoaded;
