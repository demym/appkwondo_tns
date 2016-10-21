var appModule = require("application");
var vmModule = require("./main-view-model");
var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var frameModule = require("ui/frame");

var matches;
var lvprog;
var lbtitle;
var page;

function pageLoaded(args) {
	console.log("pageloaded matychesatleta");
    page = args.object;
	matches=page.navigationContext;
	console.log("matches: "+JSON.stringify(matches));

	
	lvprog=view.getViewById(page, "lvprog");
	lbtitle=view.getViewById(page, "lbtitle");
    lvprog.visibility="visible";
	lvprog.items = matches.rows;
	lbtitle.text="Match per "+matches.rows[0].doc.atletaname;
		  

}

function onNavBtnTap(args){
	
	frameModule.topmost().navigate({
		moduleName: "gara",
		context: {}
		
	});
	
	
}





exports.onNavBtnTap=onNavBtnTap;
exports.pageLoaded = pageLoaded;