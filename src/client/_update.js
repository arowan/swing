'use strict';

Core.prototype.update = function () {
    if (this.network.ready) {
        this.processUpdate()
    }
}

Core.prototype.processUpdate = function () {
    var game = this.game;
    var player = this.manager.user;

    if (game.cursors.left.justPressed()) {
        player.left();
    }

    if (game.cursors.right.justPressed()) {
        player.right();
    }

    if (game.cursors.up.justPressed()) {
        player.up();
    }

    if (game.cursors.down.justPressed()) {
        player.down();
    }

    _.each(this.manager.updates, function(player) {
        var p = this.manager.getPlayer(player);
        p.move(player.x, player.y);
    }.bind(this));

    this.manager.updates = [];
};