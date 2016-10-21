var appModule = require("application");
var vmModule = require("./main-view-model");
var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var scrollViewModule = require("ui/scroll-view");
var frameModule = require("ui/frame");
var observableModule = require("data/observable");
var source = new observableModule.Observable();
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
 
// or with TypeScript: 
// import {LoadingIndicator} from "nativescript-loading-indicator"; 
 
var loader = new LoadingIndicator();

var loaderOptions = {
  message: 'Loading...',
  progress: 0.65,
  android: {
    indeterminate: true,
    cancelable: false,
    max: 100,
    progressNumberFormat: "%1d/%2d",
    progressPercentFormat: 0.53,
    progressStyle: 1,
    secondaryProgress: 1
  },
  ios: {
    details: "Additional detail note!",
    square: false,
    margin: 10,
    dimBackground: true,
    color: "#4B9ED6",
    mode: ""// see iOS specific options below 
  }
};


var iscritti="";
var jIscritti=[];
var garaid;
var parms;
var datagara;
var lv1;
var page;

exports.iscrittiTap=function(args){

	var idx=args.index;
var aid=jIscritti[idx].atletaid;

var ret=global.filterRows(parms.gara.matchesbyprog,{atletaid: aid});
	
  ret.garaid=parms.gara.gara.rows[0].doc.id;
	
	frameModule.topmost().navigate({
		moduleName: "matchesatleta",
		context: ret
		
	});

}

exports.onNavBtnTap=function(args){
	
	
	frameModule.topmost().navigate({
		moduleName: "gara",
		context: garaid
		
	});
	
	
}



exports.pageLoaded=function(args) {
    page = args.object;
    parms=page.navigationContext;
    iscritti=parms.iscritti;
	garaid=parms.gara.gara.rows[0].doc.id;
	datagara=parms.gara.gara.rows[0].doc.data;

    console.log(iscritti);
    lv1=view.getViewById(page, "lv1");
	//source.fanculo="fanculo";
	//page.bindingContext = source;
	//console.log("binding page");

   refreshIscritti();



}


function refreshIscritti(){
	loader.show({message: "Caricamento in corso..."});
 var arr=iscritti.split(",");
	
	if (iscritti.trim()=="") arr=[];
	
	jIscritti=[];
	for (var i=0; i<arr.length; i++){
		
		var atl=global.getAtletaById(arr[i]);
		
		var newel={
			atletaid: arr[i],
			atletaname: atl.cognome+" "+atl.nome
		}
		//console.log(JSON.stringify(parms.gara));
	var $mfa=global.filterRows(parms.gara.matchesbyprog,{ "atletaid": arr[i]},true);
	var atl=global.getAtletaById(arr[i]);
	    var categoria=global.getCategoria(atl.datanascita,datagara).toUpperCase();
	    newel.matchcount=$mfa.rows.length;
		newel.categoria=categoria;
        //console.log("matchesforatleta: " ,$mfa.rows.length);
		jIscritti.push(newel)
		
		
	}
	
	
    lv1.items=jIscritti;
	lv1.refresh();
	loader.hide();

}





exports.refreshIscritti=refreshIscritti;