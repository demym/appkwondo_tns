var application = require("application");
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


//END GLOBALS




application.start({ moduleName: "login" });
