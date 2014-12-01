'use strict';

Core.prototype.preload = function () {
    console.log('preload');
    var game = this.game;

    game.time.advancedTiming = true;

    game.plugins.add(new Phaser.Plugin.Isometric(game));
    game.load.atlasJSONHash('tileset', 'images/tileset.png', 'map/tileset.json');
    game.load.image('cube', 'images/cube.png');

    // this is the size of the map total
    game.world.setBounds(0, 0, 2048, 2048);
    game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);

    game.iso.anchor.setTo(0.5, 0.05);

};