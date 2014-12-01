'use strict';
Core.prototype.render = function () {
    this.game.debug.text((this.game.time.fps || '--') + ' <- fps | users -> ' + this.network.users.length, 2, 14, "#fff" );
}