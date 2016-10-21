var application = require("application");
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
//application.mainModule = "main-page";
//application.mainModule = "homepage";

application.cssFile = "./app.css";
application.resources["visitedwebview"] = false;

//GLOBALS

global.mysocieta={
	name: "ASD TAEKWONDO ROZZANO",
	id: "20160217220400"
	
};

global.nickname="demykwondroid";
global.socket;

global.rooturl="http://tkdr.herokuapp.com";
global.atleti={};
global.user={};



global.getAtletaById=function(id) {
	
	//var atleti=appModule.resources["atleti"];
	var atleti=global.atleti;
    console.log("atleti: "+atleti.rows.length);
	var retvalue={};
	
	for (var i=0; i<atleti.rows.length; i++){
		
		var row=atleti.rows[i];
		var doc=row.doc;
		if (doc.id==id) {
			
			
			return doc;
		}
		
	}
	
	return retvalue;
}


global.getCategoria=function(dn,referral_date)
	{
	
	 
     var cat="senior a";		 
	 var curyear=new Date().getFullYear();
	 //console.log("curyear "+curyear)
	 if (referral_date) {
	  var arrd=referral_date.split("/");
      var annogara=arrd[2];
	  curyear=annogara;
	 }
	 //sdebug("curyear: "+curyear);
     
	 if (dn.trim()=="") {
		 return "senior b";
	 }
     var ar=dn.split(".");	
     var byear=ar[2];	 
	 
	 var eta=parseInt(curyear,10)-parseInt(byear,10);
	 //sdebug("calcolo età: "+eta);
	 
	 if ((eta>=18) && (eta<=35)) cat="senior a"; 
	 if ((eta>=15) && (eta<=17)) cat="junior"; 
	 if ((eta>=12) && (eta<=14)) cat="cadetti a"; 
	 if ((eta>=10) && (eta<=11)) cat="cadetti b"; 
	 if (eta>35) cat="senior b";
	 if (eta<10) cat="esordienti";
	
	 
	 return cat	
		
	}

global.filterRows=function($m,filt,exact) {
		 if (!exact) exact=false;
		 console.log("filterrows: ")
		 //console.log($m)
		 var $retrows={
			 rows: []
		 };
		 var rows = $m.rows; //[{person:"me", age :"30"},{person:"you",age:"25"}];
         
		 for (var i=0; i<rows.length; i++){
			 
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



 
// or with TypeScript: 
// import {LoadingIndicator} from "nativescript-loading-indicator"; 
 
global.loader = new LoadingIndicator();

global.loaderOptions = {
  message: 'Caricamento...',
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
 
	 
global.loaderShow=function(opt){

 if (!opt){
   opt=global.loaderOptions;
   

 }
 global.loader.show(opt);

}	 

global.loaderHide=function(){
	global.loader.hide();
}


//END GLOBALS




application.start({ moduleName: "login" });
