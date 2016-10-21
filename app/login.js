//var vmModule = require("./main-view-model");
var application = require("application");
var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var scrollViewModule = require("ui/scroll-view");
var http = require("http");

var frameModule = require("ui/frame");



var u,p;



function pageLoaded(args) {
	
	//registerPush();
    var page = args.object;
	u=page.getViewById("username");
    p=page.getViewById("password");
	
}


function loginTap(){
	
	//alert(u.text+"-"+p.text);
	doLogin();
}


function doLogin(){

var user={
	email: u.text,
	password: p.text
}

http.request({
    url: global.rooturl+"/atleti/login",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    content: JSON.stringify(user)
}).then(function (response) {
     result = response.content.toJSON();
     console.log(JSON.stringify(result));
	 
	 if (result.loggedin){
		 
		 if (String(result.loggedin)=="true") {
			 
			 global.user={
				 nickname: user.email,
				 role: result.role
			 }
			 
			 global.nickname=global.user.nickname;
			 
			 frameModule.topmost().navigate("homepage");
			 
		 } else {
			 
		    alert("Dati di accesso non validi");	
		 }
		 
	 }
	 
}, function (e) {
    console.log("Error occurred " + e);
});	
	
}

exports.pageLoaded = pageLoaded;
exports.loginTap=loginTap;


