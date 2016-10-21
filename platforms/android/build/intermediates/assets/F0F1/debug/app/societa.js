
var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var scrollViewModule = require("ui/scroll-view");
var frameModule = require("ui/frame");
var count=42;
var atleti={};
function pageLoaded(args) {
    var page = args.object;
  
	var lv1=view.getViewById(page, "lv1");
	fetchAtleti(function(){
		  console.log("binding page");
		  console.log("societa "+atleti.rows.length)
		  //page.bindingContext = vmModule.atletiViewModel;
		  var lv1=view.getViewById(page, "lv1");
		  lv1.items = atleti.rows;
		
	});
}

function listViewItemTap(args) {
	var index = args.index;
    console.log('Clicked item with index ' + index);
	
}
function fetchAtleti(callback) {
	fetch(global.rooturl+"/societa/findall?societaid="+global.mysocieta.id).then(function (response) { return response.json(); }).then(function (r) {
    // Argument (r) is JSON object!
	 //alert("rows: "+r.rows.length)
	 atleti=r;
	 if (callback) callback();
}, function (e) {
    // Argument (e) is Error!
	alert("Errore: "+e);
});
	
	
}


function onNavBtnTap(args){
	
	frameModule.topmost().navigate({
		moduleName: "homepage",
		context: {}
		
	});
	
	
}

exports.onNavBtnTap=onNavBtnTap;



exports.pageLoaded = pageLoaded;
exports.listViewItemTap = listViewItemTap;