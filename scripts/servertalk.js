var sendDataInterval = 30;
var displayPackSentInterval = 10000;
function ServerTalk() {
    this.socket = null;
    this.IP = '188.226.175.184';
    this.dataCallback = null;
    // If sendData contains data, send it.
    this.sendData = null;
    //For debug
    this.countSentData = 0;
}
ServerTalk.prototype.init = function (io, usessh) {
    if (usessh)
        this.socket = io('https://' + this.IP, {secure: true});
    else 
        this.socket = io('http://' + this.IP);
    var self = this;
    setInterval(function () {
        if (!self.sendData) return;
        self.socket.emit('game data', self.sendData);
        self.sendData = null;
        // Debug output
        //var modVal = displayPackSentInterval / sendDataInterval;
        //if (self.countSentData % modVal == 0) console.log('Sent packet #' + self.countSentData);
        //self.countSentData++;
    }, sendDataInterval);
    
    this.socket.on('game data', function (data) {
        //console.log('Data received:');
        //console.log(data);
        if (self.dataCallback) self.dataCallback(data);
    });
    this.socket.on('test', function (msg){
        console.log(msg.msg);
    });
    return socket;
}
ServerTalk.prototype.sendGameData = function(data) {
    this.sendData = data;
}
ServerTalk.prototype.registerDataCallback = function (callback) {
    this.dataCallback = callback;

}
ServerTalk.prototype.isHostCallback = function (callback) {
    this.socket.on('registered', function (msg) {
        var info = msg.host ? 'host' : 'guest';
        console.log('Game registered. You are ' + info);
        callback(msg);
    });
}
ServerTalk.prototype.onRemoveOpponent = function (callback) {
    this.socket.on('remove opponent', function () {
        callback();
    });
}
ServerTalk.prototype.onAddOpponent = function (callback) {
    this.socket.on('add opponent', function () {
        callback();
    });
}