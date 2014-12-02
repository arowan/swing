'use strict';

Core.prototype.create = function () {
    var game = this.game;

    // all this is mapping stuff, needs sorting out. for now just build a basic map.
    var mapGroup = game.add.group();
    mapGroup.physicsBodyType = Phaser.Plugin.Isometric.ISOARCADE;

    var tileSize = 32;
    var yIterations = Math.round(game.physics.isoArcade.bounds.frontY / tileSize);
    var xIterations = Math.round(game.physics.isoArcade.bounds.frontX / tileSize);

    var temp;
    var i = 0;

    _(yIterations).times(function (y) {
        _(xIterations).times(function (x) {
            temp = game.add.isoSprite(x * tileSize, y * tileSize, 0, 'tileset', null, mapGroup);
            temp.anchor.set(0.5, 1);
            temp.smoothed = true;
            i++;
        });
    });
    // --- end mapping stuff

    var playerGroup = game.add.group();
    playerGroup.physicsBodyType = Phaser.Plugin.Isometric.ISOARCADE;

    this.manager.setGameAndGroup(game, playerGroup);

    game.cursors = game.input.keyboard.createCursorKeys();

};