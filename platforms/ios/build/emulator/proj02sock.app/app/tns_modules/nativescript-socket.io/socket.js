'use strict';
var helpers = require("./helpers");
function connect(uri, options) {
    var socket = new Socket(uri, options || {});
    socket.connect();
    return socket;
}
exports.connect = connect;
var debug = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
};
function defaultDebug() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    args = args.map(function (value) {
        if (typeof value === 'object' && value) {
            try {
                value = JSON.stringify(value);
            }
            catch (e) {
                value = value.toString();
            }
        }
        return value;
    });
    args.unshift('nativescript-socket.io');
    console.log.apply(console, args);
}
function enableDebug(debugFn) {
    if (debugFn === void 0) { debugFn = defaultDebug; }
    debug = debugFn;
}
exports.enableDebug = enableDebug;
function disableDebug() {
    debug = function () { };
}
exports.disableDebug = disableDebug;
var Socket = (function () {
    function Socket(uri, options) {
        if (options === void 0) { options = {}; }
        this._listenerMap = new Map();
        this.ios = SocketIOClient.alloc();
        this.ios.initWithSocketURLOptions(NSURL.URLWithString(uri), options);
    }
    Socket.prototype.connect = function () {
        this.ios.connect();
    };
    Socket.prototype.disconnect = function () {
        this.ios.disconnect();
    };
    Object.defineProperty(Socket.prototype, "connected", {
        get: function () {
            return this.ios && this.ios.connected();
        },
        enumerable: true,
        configurable: true
    });
    Socket.prototype.on = function (event, callback) {
        var listener = function (data, ack) {
            var payload = Array.prototype.slice.call(data);
            if (typeof ack === 'undefined') {
                ack = null;
            }
            else if (typeof ack === 'object' && ack && !(ack.width)) {
                ack = null;
            }
            payload = payload.map(helpers.deserialize);
            debug('on', event, payload, ack ? 'ack' : '');
            if (ack) {
                var _ack = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    debug('on', event, 'ack', args);
                    args = args.map(helpers.serialize);
                    ack.width.apply(ack, args);
                };
                payload.push(_ack);
            }
            callback.apply(null, payload);
        };
        return this;
        var listenerId = this.ios.onCallback(event, listener);
        this._listenerMap.set(callback, listenerId);
        return this;
    };
    Socket.prototype.off = function (event, listener) {
        debug('off', event, listener);
        if (listener) {
            listener = this._listenerMap.get(listener);
            if (listener) {
                this.ios.offWithId(listener);
                this._listenerMap.delete(listener);
            }
        }
        else {
            this.ios.off(event);
        }
        return this;
    };
    Socket.prototype.emit = function (event) {
        var payload = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            payload[_i - 1] = arguments[_i];
        }
        var ack = payload.pop();
        if (typeof ack === 'undefined') {
            ack = null;
        }
        else if (typeof ack !== 'function') {
            payload.push(ack);
            ack = null;
        }
        debug('emit', event, payload, ack ? 'ack' : '');
        payload = payload.map(helpers.serialize);
        if (ack) {
            var _ack = function (args) {
                args = Array.prototype.slice.call(args).map(helpers.deserialize);
                debug('emit', event, 'ack', args);
                ack.apply(null, args);
            };
            this.ios.emitWithAckWithItems(event, payload)({
                timeoutAfter: 0,
                callback: _ack
            });
        }
        else {
            this.ios.emitWithItems(event, payload);
        }
    };
    return Socket;
}());
exports.Socket = Socket;
//# sourceMappingURL=socket.js.map