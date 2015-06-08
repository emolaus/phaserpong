function ServerTalk() {
    this.socket = null;
    this.IP = '188.226.175.184';
    this.dataCallback = null;
    this.hostCallback = null;
}
ServerTalk.prototype.init = function (io, usessh) {
    if (usessh)
        this.socket = io('https://' + this.IP, {secure: true});
    else 
        this.socket = io('http://' + this.IP);
    console.log(this.socket);

}
ServerTalk.prototype.sendGameData = function(data) {
    this.socket.emit('game data', data);
}
ServerTalk.prototype.registerDataCallback = function (callback) {
    this.dataCallback = callback;
    this.socket.on('server game data', function (msg) {
        this.dataCallback(msg);
    });
}
ServerTalk.prototype.isHostCallback = function (callback) {
    this.hostCallback = callback;
    this.socket.on('registered', function (msg) {
        var info = msg.host ? 'host' : 'not host';
        console.log('Game registered. You are ' + info);
        callback(msg.host);
    });
}