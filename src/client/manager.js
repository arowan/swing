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
        var p = new Player(player, this);
        this.store.push(p);
        if (this.game && this.group) {
            p.buildSprite(this.game, this.group, false);
        }
    },
    remove: function (player){
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
        return _.findWhere(this.store, {id: player.id});
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
