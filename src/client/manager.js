'use strict';

var Manager = function () {
    this.store = [];
    this.game = null;
    this.group = null;
    this.network = null;
    this.user = null; // dont like this. 

    this.updates = [];
};

Manager.prototype = {
    addUser: function (player) {
        var p = new Player(player, this);
        this.user = p;
        if (this.game && this.group) {
            p.buildSprite(this.game, this.group, true);
        }
    },
    add: function (player) {
        console.log("Add was called for player ID " + player.id);
        console.log(this.user);
        if ((this.user && player && player.id != this.user.id) || this.user == null) {
            console.log("Inner loop reached");
            var p = new Player(player, this);
            this.store.push(p);
            if (this.game && this.group) {
                console.log("Calling buildSprite for player ID " + p.id)
                p.buildSprite(this.game, this.group, false);
            }
       }
    },
    remove: function (player){
        console.log("Removing player ID " + player.id)
        var p = this.getPlayer(player);
        this.group.remove(p.sprite);
        var index = this.store.indexOf(p);
        this.store.splice(index, 1);
    },
    update: function (player) {
        this.updates.push(player);
        //var p = this.getPlayer(player);
        //p.move(player.x, player.y);
    },
    getPlayer: function (player) {
        if (player.id == this.user.id) {
            console.log("getPlayer attempting to return local user object");
            return this.user;
        }
        console.log("getPlayer attempting to return player id " + player.id);
        var foundPlayer =  _.findWhere(this.store, {id: player.id});
        console.log("Found player with ID: " + foundPlayer.id);
        return foundPlayer;
    },
    buildSprites: function () {
        console.log("building sprite for user, id: " + this.user.id);
        this.user.buildSprite(this.game, this.group, true); // dont like this.
        _.each(this.store, function (player) {
            console.log("building sprite for player, id: " + player.id);
            player.buildSprite(this.game, this.group, false);
        }.bind(this))
    },
    setGameAndGroup: function (game, group) {
        this.game = game;
        this.group = group;
        this.buildSprites();
    },
    emitMove: function (player) {
        if (player) {
            this.network.socket.emit('move', player.attributes);
        }
    }
};
