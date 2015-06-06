function ServerTalk() {
    this.socket = null;
    this.IP = '188.226.175.184';
    this.dataCallback = null;
}
ServerTalk.prototype.init = function (io, usessh) {
    if (usessh)
        this.socket = io('https://' + this.IP, {secure: true});
    else 
        this.socket = io('http://' + this.IP);
    console.log(this.socket);
    
    
    this.socket.on('registered', function (msg) {
        if (msg.host)
            console.log('You are host');
        else 
            console.log('You are player 2');
    });

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