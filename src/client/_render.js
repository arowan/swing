Core.prototype.beforeRender = function () {
    App.render();
}

Core.prototype.render = function () {
    this.game.debug.text((this.game.time.fps || '--') + this.players.length, 2, 14, "#fff" );
}