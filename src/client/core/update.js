'use strict';

Core.prototype.update = function () {
    if (this.network.ready) {
        this.processUpdate()
    }
}

var keyReset = false;
Core.prototype.processUpdate = function () {
    var game = this.game;
    var player = this.manager.user;

    if (game.cursors.left.justPressed() && !keyReset) {
            keyReset = true;
        player.left();
    }

    if (game.cursors.right.justPressed() && !keyReset) {
            keyReset = true;
        player.right();
    }

    if (game.cursors.up.justPressed() && !keyReset) {
            keyReset = true;
        player.up();
    }

    if (game.cursors.down.justPressed() && !keyReset) {
            keyReset = true;
        player.down();
    }

    if (game.cursors.left.justReleased() || game.cursors.right.justReleased() || game.cursors.up.justReleased() || game.cursors.down.justReleased()) {
        keyReset = false;
    }

    _.each(this.manager.updates, function(player) {
        var p = this.manager.getPlayer(player);
        p.move(player.x, player.y);
    }.bind(this));

    this.manager.updates = [];
};