//var vmModule = require("./main-view-model");
var application = require("application");
var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var scrollViewModule = require("ui/scroll-view");
var SocketIO = require('nativescript-socket.io');
var LabelModule = require("ui/label");
var observable = require("data/observable");

//var SocketIO = require('nativescript-socketio');
//var socketIO = new SocketIO("http://tkdr.herokuapp.com");
//require('nativescript-websockets');
/*var mySocket = new WebSocket("ws://tkdr.herokuapp.com", [  "protocol","http" ]);
mySocket.addEventListener('open', function (evt) { console.log("We are Open"); evt.target.send("Hello"); });
mySocket.addEventListener('message', function(evt) { console.log("We got a message: ", evt.data); evt.target.close(); });
mySocket.addEventListener('close', function(evt) { console.log("The Socket was Closed:", evt.code, evt.reason); });
mySocket.addEventListener('error', function(evt) { console.log("The socket had an error", evt.error); });*/
var frameModule = require("ui/frame");
var count=42;


var userimg="~/img/user.png";

var socket;

/*socketIO.on("notification",function(data){
	
	console.log(data);
	
});*/

var menu=[{name:"ChatKwonDo"},{name: "Atleti"},{name: "Gare"},{name: "Societa"},{name: "Impostazioni"},{name: "Connessioni"},{name: "Logout"},{name: "News"}/*,{name:"Chiudi AppKwonDo"},{name:"Chat2"}*/];


function bindSocket() {
	
	 console.log(SocketIO);
    SocketIO.enableDebug();
	 
	//var url="http://9.71.92.105:3000";
	var url=global.rooturl;
	//var url="http://192.168.1.108:3000";
	//var url="http://tnssrv01.mybluemix.net";
    console.log("connecting to socket server at "+url);
	global.socket = SocketIO.connect(url, {
        log: true,
        secure: false
        //forceWebsockets: true,
    });
	
	console.log("socket");
	console.log(global.socket);
	
	

	
	
	//socket=global.socket;
    global.socket.on('getnickname', function(data) {
        console.log('globalsock.getnickname', JSON.stringify(data));
    });
	
	global.socket.on('chatmsg', function(data) {
		
		

        //console.log('global.chatmsg');
		console.log("global.chatmsg "+JSON.stringify(data));
		/*
		console.log(JSON.stringify(data));
		data.isRight=false;
		data.img="~/img/user.png";
		if (data.nickname==global.nickname) data.isRight=true;
		//console.log("chat length: "+chat.length);
		chat.push(data);
		var lv1=view.getViewById(page, "lv1");
		//lv1.items=chat;
		lv1.refresh();
		lv1.scrollToIndex(chat.length-1);
		*/
		
		var currpage = frameModule.topmost().currentPage;
		console.log(currpage);
		
		
    });
	
	global.socket.on('error', function(error) {
        console.log('global.socket', 'error', error);
    });

    global.socket.on('connect', function() {
        console.log('global.socket', 'connect');
        /*
        setTimeout(function() {
            console.log('socket', 'emit', 'hi');
            socket.emit('hi');
        }, 1000);

        setTimeout(function() {
            console.log('socket', 'emit', 'ack');
            socket.emit('ack');
        }, 2000);

        setTimeout(function() {
            console.log('socket', 'emit', 'getAckDate');
            socket.emit('getAckDate', 'whatever', function(data) {
                console.log('socket', 'emit', 'getAckDate', 'ack', data);
            });
        }, 3000);

        setTimeout(function() {
            console.log('socket', 'emit', 'getDate');
            socket.emit('getDate');
        }, 4000);

        setTimeout(function() {
            console.log('socket', 'emit', 'getDateObj');
            socket.emit('getDateObj');
        }, 5000);

        setTimeout(function() {
            console.log('socket', 'emit', 'getUtf8');
            socket.emit('getUtf8');
        }, 6000);
		
		*/

    });

    global.socket.on('hi', function(data) {
        console.log('global.socket', 'on', 'hi');
    });

    global.socket.on('ack', function(data) {
        console.log('global.socket', 'on', 'ack');
        data();
    });

    global.socket.on('takeDate', function(data) {
        console.log('global.socket', 'on', 'takeDate', data);
    });

    global.socket.on('takeDateObj', function(data) {
        console.log('global.socket', 'on', 'takeDateObj', JSON.stringify(data));
    });

   global.socket.on('takeUtf8', function(data) {
        console.log('global.socket', 'on', 'takeUtf8', data);
    });

	
	
}

function pageLoaded(args) {
	
	//registerPush();
    var page = args.object;
	

	
    //page.bindingContext = vmModule.mainViewModel;
	var lv1=view.getViewById(page, "lv1");
	var lb1=view.getViewById(page,"lb1");
	var lb2=view.getViewById(page,"lb2");
	console.log(lb1);
	lb1.text="Ciao "+global.user.nickname+", benvenuto in AppKwonDo";
	lb2.text="";
	if (global.user.role.toLowerCase()=="tkdradmin") lb2.text="Accesso amministratore eseguito";
	
	bindSocket();
	
	for (var i=0; i<menu.length; i++) {
		
		//menu[i].img=userimg.replace("user.",menu[i].name.toLowerCase()+".");
		//menu[i].img="res://"+menu[i].name.toLowerCase();
		menu[i].img="res://user";
	}
	
	lv1.items=menu;
		
    		
		
	fetchAtleti(function(data){
		 
		  //application.resources["atleti"] = data;
		  global.atleti=data;
		
		 
		  //lb1.text=atleti.rows.length+" atleti";
		
	});
	
	
}

/*

function registerPush(){
	var settings = {
        // Android settings 
        senderID: '866111544630', // Android: Required setting with the sender/project number 
        notificationCallbackAndroid: function(message) { // Android: Callback to invoke when a new push is received. 
            console.log(JSON.stringify(message));
            alert(JSON.stringify(message));            
        },
  
        // iOS settings 
        badge: true, // Enable setting badge through Push Notification 
        sound: true, // Enable playing a sound 
        alert: true, // Enable creating a alert 
  
        // Callback to invoke, when a push is received on iOS 
        notificationCallbackIOS: function(message) {
            alert(JSON.stringify(message));
        }
    };
         
    pushPlugin.register(settings,
        // Success callback 
        function(token) {
              // if we're on android device we have the onMessageReceived function to subscribe 
            // for push notifications 
            if(pushPlugin.onMessageReceived) {
                pushPlugin.onMessageReceived(settings.notificationCallbackAndroid);
            }
  
            alert('Device registered successfully : ' + token);
            viewModel.set("regId", token);
        },
        // Error Callback 
        function(error){
            console.log(error);
            alert(error.message);
        }
    );
	
}
*/
function listViewItemTap(args) {
	var index = args.index;
	var mitem=menu[index].name.toLowerCase();
    console.log('Clicked item with index ' + index);
    if (mitem=="atleti") frameModule.topmost().navigate("atleti");
	if (mitem=="gare") frameModule.topmost().navigate("gare");
	if (mitem=="societa") frameModule.topmost().navigate("societa");
	if (mitem=="tabs") frameModule.topmost().navigate("tabs");
	if (mitem=="chatkwondo") frameModule.topmost().navigate("chat");
	if (mitem=="chat2") frameModule.topmost().navigate("chat2");
	if (mitem=="logout") {
		global.nickname="";
		global.user={};
		frameModule.topmost().navigate("login");
	}	
}

function fetchAtleti(callback) {
	
	fetch(global.rooturl+"/atleti/findall").then(function (response) { return response.json(); }).then(function (r) {
    // Argument (r) is JSON object!
	
	 
	 console.log("atleti rows: "+r.rows.length);
	 
	 if (callback) callback(r);
}, function (e) {
    // Argument (e) is Error!
	alert("Errore: "+e);
	callback(e);
});
}

exports.pageLoaded = pageLoaded;
exports.listViewItemTap = listViewItemTap;

