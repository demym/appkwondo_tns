//var createViewModel = require("./main-view-model").createViewModel;
var SocketIO = require('nativescript-socket.io');
var textFieldModule = require("ui/text-field");
var listViewModule = require("ui/list-view");
var view = require("ui/core/view");
var ChatViewModule = require("nativescript-chatview");
var frameModule = require("ui/frame");
var http = require("http");


var timer = require("timer");

/*function onNavigatingTo(args) {
    var page = args.object;
    //page.bindingContext = createViewModel();
}
exports.onNavigatingTo = onNavigatingTo;*/

var socket;
var page;
var tf1;
var lv1;

var chat=[{
	time: "201609011024",
	text: "eccoce",
	nickname: "tns"
},
{
	time: "201609011024",
	text: "e allura",
	nickname: "manlio"
},
{
	time: "201609011024",
	text: "ciao fagiano",
	nickname: "gordo"
},
{
	time: "201609011024",
	text: "ciao mosca",
	nickname: "tns"
}
];
 

var nickname=global.nickname;
var userimg="~/img/user.png";

function rightizeChat(){
	
	for (var i=0; i<chat.length; i++){
		var ch=chat[i];
		ch.img="~/img/user.png";
		var isRight=false;
		if (ch.nickname){
			
		
			if (ch.nickname.toLowerCase()==nickname) isRight=true;
			
			//console.log("isright for nick "+ch.nickname+": "+isRight);
		
			
		}
		ch.isRight=isRight;
		chat[i]=ch;
		
		
	}
	
	
}

function onTap(){
	console.log("ontap");
	var tf1=view.getViewById(page, "tf1");
	//var ht1=view.getViewById(page, "ht1");
	//ht1.html="<b>ciao frantoio</b>";
	
	console.log(tf1.text);
	
	
	var chatmsg= {
		nickname: nickname,
		sockid: socket.id,
		text: tf1.text,
		img: userimg
	}
	//socket.emit('chatmsg', chatmsg);
	postChat(chatmsg);
	
	
	//chat.push(chatmsg);
	//refreshChat();
	
}


function postChat(msg){

http.request({
    url: global.rooturl+"/chat/put",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    content: JSON.stringify(msg)
}).then(function (response) {
     result = response.content.toJSON();
     console.log(result);
}, function (e) {
    console.log("Error occurred " + e);
});	
	
}


function refreshChat(){
	
	var lv1=view.getViewById(page, "lv1");
	rightizeChat(chat);
	lv1.refresh();
	lv1.scrollToIndex(chat.length-1);
	
}

function onLoaded(args) {
    page = args.object;
	console.log("page loaded");
	
	lv1=view.getViewById(page, "lv1");
	//doAddOnMessageReceivedCallback();
	
	
	
	
	
	
	
   
    console.log(SocketIO);
    SocketIO.enableDebug();
	 
	//var url="http://9.71.92.105:3000";
	var url="http://tkdr.herokuapp.com";
	//var url="http://192.168.1.108:3000";
	//var url="http://tnssrv01.mybluemix.net";
    console.log("connecting to socket server at "+url);
	socket = SocketIO.connect(url, {
        log: true,
        secure: false
        //forceWebsockets: true,
    });
	
	console.log("socket");
	console.log(socket);
	
	

	
	
	//socket=global.socket;
    socket.on('getnickname', function(data) {
        console.log('getnickname', data);
    });
	
	socket.on('chatmsg', function(data) {
        console.log('chatmsg');
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
		
		
    });
	
	socket.on('error', function(error) {
        console.log('socket', 'error', error);
    });

    socket.on('connect', function() {
        console.log('socket', 'connect');
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

    socket.on('hi', function(data) {
        console.log('socket', 'on', 'hi');
    });

    socket.on('ack', function(data) {
        console.log('socket', 'on', 'ack');
        data();
    });

    socket.on('takeDate', function(data) {
        console.log('socket', 'on', 'takeDate', data);
    });

    socket.on('takeDateObj', function(data) {
        console.log('socket', 'on', 'takeDateObj', JSON.stringify(data));
    });

    socket.on('takeUtf8', function(data) {
        console.log('socket', 'on', 'takeUtf8', data);
    });


	
	fetchChat(function(data){
		chat=data.rows;
		rightizeChat(chat);
		lv1.items=chat;
		lv1.scrollToIndex(chat.length-1);
	});
	
}

function getTime(){
    var now = new Date();
    
    var hours = now.getHours();
    return numberToString(hours == 12 ? 12 : (hours % 12)) + ":" + numberToString(now.getMinutes()) + " " + 
           (hours < 13 ? "AM" : "PM");
}

function numberToString(n) {
    var str = "" + n;
    if (n < 10) {
        str = "0" + str;
    }
    return str;
}


function fetchChat(callback) {
	
	fetch("http://tkdr.herokuapp.com/chat/get").then(function (response) { return response.json(); }).then(function (r) {
    // Argument (r) is JSON object
	 if (callback) callback(r);
}, function (e) {
    // Argument (e) is Error!
	alert("Errore: "+e);
	callback(e);
});
	
	
}


function onNavBtnTap(args){
	
	frameModule.topmost().navigate({
		moduleName: "homepage",
		context: {}
		
	});
	
	
}


function scrollTop(){
	lv1.scrollToIndex(0);
	
}

function scrollBottom(){
	lv1.scrollToIndex(chat.length-1);
	
}

function doAddOnMessageReceivedCallback() {
    LocalNotifications.addOnMessageReceivedCallback(
        function(notificationData) {
            dialogs.alert({
                title: "Notification received",
                message: "ID: " + notificationData.id +
                "\nTitle: " + notificationData.title +
                "\nBody: " + notificationData.body,
                okButtonText: "Excellent!"
            });
        }
    );
}

exports.scrollBottom=scrollBottom;
exports.scrollTop=scrollTop;
exports.onNavBtnTap=onNavBtnTap;
exports.onLoaded = onLoaded;
exports.onTap=onTap;
