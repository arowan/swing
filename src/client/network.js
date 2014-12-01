'use strict';

var Network = function (host) {
    this.users = [];
    this.ready = false;
    this.socket = io.connect(host);

    this.socket.on('connected', function (data) {
        this.users.push(new Player(data));
        this.ready = true;
    }.bind(this));

};