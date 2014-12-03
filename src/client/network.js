'use strict';

var Network = function (host, manager) {

    this.manager = manager;
    this.manager.network = this; //do not like this.

    this.player = null;
    this.ready = false;
    this.socket = io.connect(host);

    this.socket.on('connected', function (data) {
        this.manager.addUser(data);
    }.bind(this));

    this.socket.on('addPlayer', function (data) {
        this.manager.add(data);
    }.bind(this));

    this.socket.on('otherPlayers', function (data) {
        _.each(data, function (player){
            console.log("Adding player ID " + player.id);
            this.manager.add(player);
        }.bind(this));
        this.ready = true;
    }.bind(this));

    this.socket.on('updatePlayer', function (data) {
        this.manager.update(data);
    }.bind(this));

    this.socket.on('removePlayer', function (data) {
        this.manager.remove(data);
    }.bind(this));

};