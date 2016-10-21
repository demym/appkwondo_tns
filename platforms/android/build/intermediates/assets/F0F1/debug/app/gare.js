var appModule = require("application");
var vmModule = require("./main-view-model");
var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var scrollViewModule = require("ui/scroll-view");
var frameModule = require("ui/frame");
var observableModule = require("data/observable");
var source = new observableModule.Observable();
var gestures = require("ui/gestures");

var count=42;
var gare={};
var page;
var lv1;
var countlabel;

var getMinchia =function (value) {
        var result = value.toUpperCase();
        return result;
}

var getIscrittiLength =function (value) {
	    var result=0;
		if (value.trim()!="") result = value.split(",").length;
		result+=" iscritti";
        return result;
}



function onNavBtnTap(args){
	
	frameModule.topmost().navigate({
		moduleName: "homepage",
		context: {}
		
	});
	
	
}



function pageLoaded(args) {
    page = args.object;
	appModule.resources["getMinchia"] = getMinchia;
	appModule.resources["getIscrittiLength"] = getIscrittiLength;
	//source.fanculo="fanculo";
	//page.bindingContext = source;
	console.log("binding page");
	lv1=view.getViewById(page, "lv1");
	countlabel=view.getViewById(page, "count");

lv1.on(listViewModule.ListView.itemLoadingEvent, function (args) {
		 //console.log("loading");
		 var stack=args.view;
    /*if (!args.view) {
        // Create label if it is not already created.
        args.view = new labelModule.Label();
    }*/
    //var stack=args.getViewById("stack");
    stack.on(gestures.GestureTypes.longpress, function (args) {
       console.log("long press" + args);
	});
});

	refreshGare(function(){

     

});

	



}


function refreshGare(callback){
global.loaderShow();
	fetchGare(function(){
		  
		  console.log("gare "+gare.rows.length)
		  
		  //var lv1=view.getViewById(page, "lv1");
		  //var count=view.getViewById(page, "count");
		  lv1.items = gare.rows;
		  countlabel.text=gare.rows.length+" gare";
		  global.loaderHide();
		  
		
	});

}

function gareTap(args) {
	var index = args.index;
    console.log('Clicked item with index ' + index);
	var gara=gare.rows[index];
	console.log(gara.doc.title+" - "+gara.doc.id);
	frameModule.topmost().navigate({
		moduleName: "gara",
		context: gara.doc.id
		
	});
	
}
function fetchGare(callback) {
	fetch(global.rooturl+"/gare/findall").then(function (response) { return response.json(); }).then(function (r) {
    // Argument (r) is JSON object!
	 //alert("rows: "+r.rows.length)
	 gare=r;
	 if (callback) callback();
}, function (e) {
    // Argument (e) is Error!
	alert("Errore: "+e);
});
	
	
}




exports.onNavBtnTap=onNavBtnTap;
exports.pageLoaded = pageLoaded;
exports.gareTap = gareTap;
exports.refreshGare = refreshGare;