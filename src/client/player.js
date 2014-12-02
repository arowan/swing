'use strict';

var Player = function (object, manager) {
    this.attributes = _.defaults(object, {
        id: null,
        x: 0,
        y: 0
    });
    this.id = this.attributes.id; // need to rethink this also
    this.speed = 32;
    this.manager = manager;
};

Player.prototype = {
    buildSprite: function (game, group, camera) {
        var items = ['mushroom', 'stone', 'bush2', 'window'];
        var sprite = game.add.isoSprite(this.attributes.x, this.attributes.y, 0, 'tileset', _.sample(items), group);

        game.physics.isoArcade.enable(sprite);
        if (camera) game.camera.follow(sprite);

        sprite.anchor.set(0.5, 1);
        sprite.body.collideWorldBounds = true;

        this.sprite = sprite;
        return sprite;
    },
    move: function (x, y) {
        this.attributes.x = x;
        this.attributes.y = y;
        this.sprite.body.x = this.attributes.x;
        this.sprite.body.y = this.attributes.y;
    },
    left: function () {
        var x, y;
        x = this.attributes.x - this.speed;
        y = this.attributes.y;
        this.move(x, y);
        this.manager.emitMove(this);
    },
    right: function () {
        var x, y;
        x = this.attributes.x + this.speed;
        y = this.attributes.y;
        this.move(x, y);
        this.manager.emitMove(this);
    },
    up: function () {
        var x, y;
        x = this.attributes.x;
        y = this.attributes.y - this.speed;
        this.move(x, y);
        this.manager.emitMove(this);
    },
    down: function () {
        var x, y;
        x = this.attributes.x;
        y = this.attributes.y + this.speed;
        this.move(x, y);
        this.manager.emitMove(this);
    }
};