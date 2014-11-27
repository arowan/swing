Core.protoype.beforePreload = function () {

    this.network = new Network('http://localhost');
    this.network.socket.on('connected', function (data) {
        this.users.push(new Player(data));
        App.preload();
    })
}


Core.prototype.preload = function () {
    console.log('preload');

    this.players = [];
    this.ready = false;

    core = this;


};