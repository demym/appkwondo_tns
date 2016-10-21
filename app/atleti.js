var appModule = require("application");
var vmModule = require("./atleti-view-model");
var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var scrollViewModule = require("ui/scroll-view");
var LabelModule = require("ui/label");
var frameModule = require("ui/frame");
var count=42;
var atleti={};
var lb1;
function pageLoaded(args) {
    var page = args.object;
    
	var lv1=view.getViewById(page, "lv1");
	console.log("lv1: "+lv1);
	lb1=page.getViewById("lb1");
	//lb1.text="Caricamento in corso...";
	fetchAtleti(function(data){
		global.atleti=data;
		  console.log("binding page");
		  console.log("atleti "+global.atleti.rows.length)
		  var lv1=view.getViewById(page, "lv1");
		   lv1.items = global.atleti.rows;
		  //appModule.resources["atleti"] = atleti;
		  
		 lb1=page.getViewById("lb1");
		  lb1.text=atleti.rows.length+" atleti";
		
	});
}


function onNavBtnTap(args){
	
	frameModule.topmost().navigate({
		moduleName: "homepage",
		context: {}
		
	});
	
	
}


function listViewItemTap(args) {
	var index = args.index;
    console.log('Clicked item with index ' + index);
	
}
function fetchAtleti(callback) {
	
	fetch("http://tkdr.herokuapp.com/atleti/findall").then(function (response) { return response.json(); }).then(function (r) {
    // Argument (r) is JSON object!
	 //alert("rows: "+r.rows.length)
	 atleti=r;
	 if (callback) callback(r);
}, function (e) {
    // Argument (e) is Error!
	alert("Errore: "+e);
	callback(e);
});
	
	
}


exports.pageLoaded = pageLoaded;
exports.listViewItemTap = listViewItemTap;
exports.onNavBtnTap=onNavBtnTap;