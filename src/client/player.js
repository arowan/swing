'use strict';

var Player = function (object) {
    this.attributes = _.defaults(object, {
        id: null,
        x: 0,
        y: 0
    });
};

Player.prototype = {
    buildSprite: function (game, group) {
        var sprite = game.add.isoSprite(this.attributes.x, this.attributes.y, 0, 'tileset', 'mushroom', group);
        sprite.anchor.set(0.5, 1);
        sprite.body.collideWorldBounds = true;
        game.physics.isoArcade.enable(sprite);
        return sprite;
    }
}