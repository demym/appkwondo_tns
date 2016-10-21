//var createViewModel = require("./main-view-model").createViewModel;
var SocketIO = require('nativescript-socket.io');
var textFieldModule = require("ui/text-field");
var listViewModule = require("ui/list-view");
var view = require("ui/core/view");
var timer = require("timer");

/*function onNavigatingTo(args) {
    var page = args.object;
    //page.bindingContext = createViewModel();
}
exports.onNavigatingTo = onNavigatingTo;*/

var socket;
var page;
var tf1;
var chat=[];

function onTap(){
	console.log("ontap");
	var tf1=view.getViewById(page, "tf1");
	//var ht1=view.getViewById(page, "ht1");
	//ht1.html="<b>ciao frantoio</b>";
	
	console.log(tf1.text);
	socket.emit('chatmsg', {nickname: "tns", text: tf1.text});
	
}

function onLoaded(args) {
    page = args.object;
	console.log("page loaded");
	
	var lv1=view.getViewById(page, "lv1");
	lv1.items=chat;
   
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
		console.log(data);
		chat.push(data);
		//console.log("chat length: "+chat.length);
		var lv1=view.getViewById(page, "lv1");
		//lv1.items=chat;
		lv1.refresh();
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

exports.onLoaded = onLoaded;
exports.onTap=onTap;
