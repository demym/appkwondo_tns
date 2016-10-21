var appModule = require("application");
var vmModule = require("./main-view-model");
var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var scrollViewModule = require("ui/scroll-view");
var tabViewModule = require("ui/tab-view");
var frameModule = require("ui/frame");
var segmentedBarModule = require("ui/segmented-bar");
var gestures = require("ui/gestures");
var labelModule = require("ui/label");
var repeaterModule = require("ui/repeater");
var observableArrayModule = require("data/observable-array");
var observable = require("data/observable");
var activityIndicatorModule = require("ui/activity-indicator");
var count=42;
var gara;
var matchesbyprog={};
var matchesbyatleta={};
var cronaca={};
var page;
var lvprog;
var lvatleta;
var lvcronaca;
var sbprog;
var fetched=false;
var array;
var garatitle;
var barsindex=0;
var barselectedIndex = new observable.Observable(barsindex);
var garaid;
var isLoading=false;

barselectedIndex.addEventListener(observable.Observable.propertyChangeEvent, function (x) {
    alert(x);
});

function pageLoaded(args) {
    page = args.object;
// Bind the busy property of the indicator to the isLoading property of the image
	
	garaid=page.navigationContext;
	console.log("garaid: "+garaid);
    appModule.resources["getMatchesStyle"] = getMatchesStyle;
	appModule.resources["getMatchStyle"] = getMatchStyle;
	var lv1=view.getViewById(page, "lvx");
	fetchMatches(garaid,function(){
		  //console.log("matches "+matchesbyprog.rows.length)
		  //page.bindingContext = vmModule.atletiViewModel;
		  lvprog=view.getViewById(page, "lvprog");
		  lvatleta=view.getViewById(page, "lvatleta");
		  lvcronaca=view.getViewById(page, "lvcronaca");
		  /*sbprog=view.getViewById(page, "sbprog");
		  var observer = sbprog.on(gestures.GestureTypes.tap, function (args) {
			console.log("Tap on sbprog");
		  });*/
		  
		 
		  setMatchesStyle();
		  //lvatleta.items=gara.matchesbyatleta;
		  
		 
		  lvcronaca.items=gara.cronaca.rows;
		  lvprog.visibility="visible";
		  array = new observableArrayModule.ObservableArray(matchesbyprog.rows);
		  
		  lvprog.items = matchesbyprog.rows;
		  
		  lvatleta.items=matchesbyatleta.rows;
		  lvatleta.visibility="visible";
		  lvcronaca.visibility="visible";
		  	fetched=true;
			
		  garatitle=view.getViewById(page, "garatitle");
		  garatitle.text=gara.gara.rows[0].doc.title; 	
		  
		
	});

}

function byprogTap(args){
	
	console.log('Clicked byprog');
	//var lv1=view.getViewById(page, "lvx");
	barselectedIndex=0;
	lvprog.visibility="visible";
	lvatleta.visibility="collapsed";
	lvcronaca.visibility="collapsed";
	//lvprog.items = matchesbyprog.rows;
}

function byatletaTap(args){
	console.log('Clicked byatleta');
	//var lv1=view.getViewById(page, "lvx");
	barselectedIndex=1;
	lvprog.visibility="collapsed";
	lvatleta.visibility="visible";
	lvcronaca.visibility="collapsed";
	//lvatleta.items = matchesbyatleta;
}

function bycronacaTap(args){
	console.log('Clicked bycronaca');
	//var lv1=view.getViewById(page, "lvx");
	barselectedIndex=2;
	lvprog.visibility="collapsed";
	lvatleta.visibility="collapsed";
	lvcronaca.visibility="visible";
	
	//lvcronaca.items = cronaca.rows;
}


function barTap(args){
	var index = args.index;
    alert('Clicked tab with index ' + index);
	
}

function tabTap(args) {
	
	var index = args.index;
    console.log('Clicked tab with index ' + index);
	var lv1=view.getViewById(page, "lvx");
	if (index=="0"){
		
		  lv1.items = gara.matchesbyprog.rows;
		
	}
	
	if (index=="1"){
		
		  lv1.items = gara.matchesbyatleta;
		
	}
	
	
	
	
}

function matchTap(args){
	
	var target = args.object;
	console.log(target);
	var idx = target.index;
	
	
	
	var index=args.index;
	console.log("index",idx+" - "+index)
	var atl=matchesbyprog.rows[index].doc;
	//var atl=lvprog.items[idx].doc;
	var aid=atl.atletaid;
	//alert(aid);
	
	//alert(index+ " - " +atl.atletaname)
	//garatitle.text=index+ " - " +atl.atletaname;
	var mbp=renderByProg(gara.matchesbyprog,true);
	
	
	
	var ret=filterRows(mbp,{atletaid: aid});
	ret.garaid=garaid;
	
	
	frameModule.topmost().navigate({
		moduleName: "matchesatleta",
		context: ret
		
	});
	
	
}


function onNavBtnTap(args){
	
	frameModule.topmost().navigate({
		moduleName: "gare",
		context: {}
		
	});
	
	
}

function matchAtletaTap(args){
	
	
	
	var index=args.index;
    //alert(index);
	
	var atl=matchesbyatleta.rows[index];
	console.log(atl);
	
	
	
	var aid=atl.id;
	//alert(aid);
	
	var mbp=renderByProg(gara.matchesbyprog,true);
	
	
	
	var ret=filterRows(mbp,{atletaid: aid});
	
	ret.garaid=garaid;
	
	frameModule.topmost().navigate({
		moduleName: "matchesatleta",
		context: ret
		
	});
	
	//var mbp=renderByProg(gara.matchesbyprog,true);
	
	//var ret=filterRows(matchesbyprog,{atletaid: aid});
	
	return;
	
	frameModule.topmost().navigate({
		moduleName: "matchesatleta",
		context: ret
		
	});
	
	
	
}


function renderByProg(obj,include_dd_no){
	
	if (!include_dd_no) include_dd_no=false;
	var ret={
		rows: []
	}
	for (var i=0; i<obj.rows.length; i++){
		
		var doc=obj.rows[i].doc;
		
		var d=doc.disputato.toLowerCase();
		var dd=doc.dadisputare.toLowerCase();
		var v=doc.vinto.toLowerCase();
		
		if (dd=="yes") {
			
			if (d=="yes") {
				if (v=="yes") {
					doc.imgurl="res://matchok";
					doc.risultext="Vinto, risultato: "+doc.risultato;
					
				} else {
					
					doc.imgurl="res://matchko";
					doc.risultext="Perso, risultato: "+doc.risultato;
				}
				
				if (doc.medagliamatch.toLowerCase()!="none"){
					
					doc.imgurl="res://medaglia_"+doc.medagliamatch;
					
				}
				
				
			} else {
				doc.imgurl="res://matchtoplay";
				doc.risultext="Non disputato"
			}
			
			
			var doc2={
				doc: doc
				
			}
			ret.rows.push(doc2);
			
		} else {
			
			
			if (include_dd_no==true){
				doc.imgurl="res://matchnull";
			    doc.risultext=""
				var doc2={
				doc: doc
				
			}
				ret.rows.push(doc2);
				
			} 
			
			
		}
		
		
	}
	
	return ret;
	
	
}


function renderByAtleta(obj){
	
	var ret={
		rows: []
	}
	for (var i=0; i<obj.rows.length; i++){
		
		var doc=obj.rows[i].doc;
		
		var d=doc.disputato.toLowerCase();
		var dd=doc.dadisputare.toLowerCase();
		var v=doc.vinto.toLowerCase();
		
		if (dd=="yes") {
			
			if (d=="yes") {
				if (v=="yes") {
					doc.imgurl="res://matchok";
					doc.risultext="Vinto, risultato: "+doc.risultato;
					
				} else {
					
					doc.imgurl="res://matchko";
					doc.risultext="Perso, risultato: "+doc.risultato;
				}
				
				if (doc.medagliamatch.toLowerCase()!="none"){
					
					doc.imgurl="res://medaglia_"+doc.medagliamatch;
					
				}
				
				
			} else {
				doc.imgurl="res://matchtoplay";
				doc.risultext="Non disputato"
			}
			
			
			var doc2={
				doc: doc
				
			}
			ret.rows.push(doc2);
			
		} else {
			
			
		}
		
		
	}
	
	return ret;
	
	
}


function fetchMatches(id,callback) {
	var url=global.rooturl+"/gare/fullgarabyid/"+id+"?societaid=20160217220400";
	console.log(url)
	fetch(url).then(function (response) { return response.json(); }).then(function (r) {
		
	 gara=r;	
    // Argument (r) is JSON object!
	 //console.log("matchesbyprog rows: "+r.matchesbyprog.rows.length)
	 matchesbyprog=filterRows(r.matchesbyprog,{ dadisputare: "yes"});
	 
	 renderByProg(matchesbyprog);
	 //console.log(JSON.stringify(matchesbyprog));
	 
	 matchesbyatleta=r.matchesbyatleta;
	 //matchesbyatleta=renderByAtleta(r.matchesbyatleta);
	 cronaca=r.cronaca;
	 
	  console.log("matchesbyprog: "+matchesbyprog.rows.length);
		  console.log("matchesbyatleta: "+matchesbyatleta.rows.length);
		  console.log("cronaca: "+cronaca.rows.length);
	 
	 
	 if (callback) callback(r);
}, function (e) {
    // Argument (e) is Error!
	alert("Errore: "+e);
});
	
	
}

var getMatchStyle=function(m) {
	
	
	//var m=value[i];
			var d=m.disputato.toLowerCase();
			var dd=m.dadisputare.toLowerCase();
			var v=m.vinto.toLowerCase();
			var mid=m.matchid;
			
			var cl="non disputato"
			if (dd=="yes") {
					 
					 if (d=="yes") {
						 
						 if (v=="yes"){
							 cl="vinto"
						 } else cl="perso";
		 
						 
					 }
					 
					 
			} else {
					 
					 cl="danondisputare";
					 
			}
			
			
	//console.log("getmatchstyle result class for match "+mid+": ",cl);
	return cl;
}


var setMatchesStyle =function() {
	var matl=gara.matchesbyatleta;
	for (var j=0; j<matl.length; j++) {
	    var result="";
		var value=matl[j].matchesarray;
		for (var i=0; i<value.length; i++){
			var m=value[i];
			var d=m.disputato.toLowerCase();
			var dd=m.dadisputare.toLowerCase();
			var v=m.vinto.toLowerCase();
			var mid=m.matchid;
			
			var cl="non disputato"
			if (dd=="yes") {
					 
					 if (d=="yes") {
						 
						 if (v=="yes"){
							 cl="vinto"
						 } else cl="perso";
		 
						 
					 }
					 
					 
			} else {
					 
					 cl="danondisputare";
					 
			}
			
			//if (result.trim()!="") result+=","
			//result+=mid;
			
			gara.matchesbyatleta[j].matchesarray[i].matchclass=cl;
		}
	}	
        
}


var getMatchesStyle =function (value) {
	    var result="";
		for (var i=0; i<value.length; i++){
			var m=value[i];
			var d=m.disputato.toLowerCase();
			var dd=m.dadisputare.toLowerCase();
			var v=m.vinto.toLowerCase();
			var mid=m.matchid;
			
			var cl="non disputato"
			if (dd=="yes") {
					 
					 if (d=="yes") {
						 
						 if (v=="yes"){
							 cl="vinto"
						 } else cl="perso";
		 
						 
					 }
					 
					 
			} else {
					 
					 cl="danondisputare";
					 
			}
			
			//if (result.trim()!="") result+=","
			//result+=mid;
		}
        return result;
}

var getMatchesStyle_old =function (value) {
	    var result="";
		for (var i=0; i<value.length; i++){
			var m=value[i];
			var d=m.disputato;
			var dd=m.dadisputare;
			var v=m.vinto;
			var mid=m.matchid;
			
			if (result.trim()!="") result+=","
			result+=mid;
		}
        return result;
}

function lvatletaItemLoading2(args) {
	  var listView= args.object;
    var listViewBindingContent = listView.bindingContext;
    var item = args.view;
    var itemBindingContext = args.view.bindingContext;
	console.log(args.index)
	/*console.log(listViewBindingContent);
	console.log(item);
	console.log(itemBindingContext);*/
}

function lvatletaItemLoading(args) {
		  
			   
			 //if (fetched) return; 
			  //console.log("creating atleti item "+args.index);
			  var index=args.index;

		 
			  var stackview=args.view.getViewById("stack");
			  var sv2=args.view.getViewById("sv2")
			  var lbnome=new labelModule.Label();
			  lbnome.text=gara.matchesbyatleta[index].nome;
				 lbnome.cssClass="atleta";
			   console.log("listview itemloadingevent "+lbnome.text)	 
				 
			 if (!stackview.getViewById("muzio")) {
				 
               				
			
				 var ma=lvatleta.items[index].matchesarray;
				 //console.log("ma.length: "+ma.length)
				 	 var lbnome=new labelModule.Label();
				 for (var i=0; i<ma.length; i++) {
				 var label=new labelModule.Label();
			
				 label.id="muzio";
				 label.text=ma[i].matchid+" ";
				 
				 
				 var cl="nondisputato";
				 var d=ma[i].disputato.toLowerCase();
				 var dd=ma[i].dadisputare.toLowerCase();
				 var v=ma[i].vinto.toLowerCase();
				 
				 if (dd=="yes") {
					 
					 if (d=="yes") {
						 if (v=="yes"){
							 cl="vinto"
						 } else cl="perso";
						 
						 
						 
					 }
					 
					 
				 } else {
					 
					 cl="danondisputare";
					 
				 }
				 
				 label.cssClass=cl;
				 
				 //console.log("adding label with matchid "+ma[i].matchid)
				 lvatleta.items[index].loaded="ok";
				 stackview.addChild(label);
					 
					 
				 }
				
				 
				} 
			  sv2.addChild(lbnome);
			  
		    //args.view = new labelModule.Label();
			//args.view.text = "eccheccazz";
			
			//args.view.getViewById("stack").addChild(label);
			
		

	
	
}



 function filterRows($m,filt,exact) {
		 if (!exact) exact=false;
		 colog("filterrows: ")
		 //console.log($m)
		 var $retrows={
			 rows: []
		 };
		 var rows = $m.rows; //[{person:"me", age :"30"},{person:"you",age:"25"}];
         
		 
		 for (var i=0; i<rows.length; i++) {
		 //$(rows).each(function(i){
			 
			 var row=rows[i];
			 var eligible=true;
			 
			 for(var key in row.doc){
			 // console.log("key: "+key + " . "+ row.doc[key]);
              for (var fkey in filt){
				  if (fkey==key) {
					  //console.log("found key ---->"+fkey);
					  var v1=filt[fkey].toLowerCase();
					  if (v1.trim()!="")
					  {	  
					  var v2=row.doc[key].toLowerCase();
					  if (exact)
					  {
							if (v2.trim()==v1.trim()){
						 // console.log("found !: "+v2);
						 
							} else {
								eligible=eligible && false;
							}
					  } else {
							if (v2.indexOf(v1)>-1){
							// console.log("found !: "+v2);
						 
							} else {
								eligible=eligible && false;
							}
						  
						  
					  }
					  
					  }
					  
				  }
			  } 
            }
			if (eligible)  $retrows.rows.push(row);
    	 }
		 
		return $retrows; 
	 }
	 
function colog(txt) {
	console.log(txt);
	
}


function refreshGara(args){
	isLoading=true;
	garatitle.text="Caricamento...."
	fetchMatches(garaid,function(){
		 
		  setMatchesStyle();
		  //lvatleta.items=gara.matchesbyatleta;
		  
		 
		  lvcronaca.items=gara.cronaca.rows;
		  lvprog.visibility="visible";
		  //array = new observableArrayModule.ObservableArray(matchesbyprog.rows);
		  
		  lvprog.items = matchesbyprog.rows;
		  lvatleta.visibility="visible";
		  lvcronaca.visibility="visible";
		  fetched=true;
		  garatitle.text=gara.gara.rows[0].doc.title; 
		  isLoading=false;
	});		  
		  
	
}


exports.showIscritti=function() {
	
	frameModule.topmost().navigate({
		moduleName: "iscritti",
		context: {
			iscritti: gara.gara.rows[0].doc.myiscritti,
			gara: gara
		}
		
	});
	
}

exports.lvatletaItemLoading2 = lvatletaItemLoading2;
exports.lvatletaItemLoading = lvatletaItemLoading;
exports.bycronacaTap = bycronacaTap;
exports.byatletaTap = byatletaTap;
exports.byprogTap = byprogTap;
exports.pageLoaded = pageLoaded;
exports.matchTap = matchTap;
exports.barTap = barTap;
exports.onNavBtnTap=onNavBtnTap;
exports.barselectedIndex=barselectedIndex;
exports.refreshGara=refreshGara;
exports.isLoading=isLoading;

exports.matchAtletaTap = matchAtletaTap;