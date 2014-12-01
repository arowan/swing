'use strict';

var Core = function () {
    this.network = new Network('http://localhost');
    this.map = new Map();
};

$(document).ready(function(){
    window.App = new Core();

    var game = new Phaser.Game(
        1024,
        768,
        Phaser.WEBGL,
        'parentElement'
    );

    game.state.add('Boot', App);
    game.state.start('Boot');

})

'use strict';

Core.prototype.create = function () {
    console.log('create');
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

    game.cursors = game.input.keyboard.createCursorKeys();

};
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
'use strict';
Core.prototype.render = function () {
    this.game.debug.text((this.game.time.fps || '--') + ' <- fps | users -> ' + this.network.users.length, 2, 14, "#fff" );
}
'use strict';

Core.prototype.update = function () {
    if (this.network.ready) {
        this.processUpdate()
    }
}

Core.prototype.processUpdate = function () {
    console.log('update');
};


//
//
//
//var BasicGame = function (game) { };
//
//BasicGame.Boot = function (game) { };
//
//var isoGroup, player;
//var tileSize = 32;
//var keyReset = false;
//
//BasicGame.Boot.prototype =
//{
//    preload: function () {
//        game.time.advancedTiming = true;
//
//        game.plugins.add(new Phaser.Plugin.Isometric(game));
//        game.load.atlasJSONHash('tileset', 'images/tileset.png', 'map/tileset.json');
//        game.load.image('cube', 'images/cube.png');
//
//        // this is the size of the map total
//        game.world.setBounds(0, 0, 2048, 2048);
//        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
//
//        game.iso.anchor.setTo(0.5, 0.05);
//
//        this.netPlayer = null;
//
//        this.socket = ;
//        this.socket.on('newUser', function(data){
//            netPlayer = data;
//        });
//
//
//    },
//
//    create: function () {
//
//        isoGroup = game.add.group();
//
//        isoGroup.enableBody = true;
//        isoGroup.physicsBodyType = Phaser.Plugin.Isometric.ISOARCADE;
//
//        var tileArray = [];
//        tileArray[0] = 'water';
//        tileArray[1] = 'sand';
//        tileArray[2] = 'grass';
//        tileArray[3] = 'stone';
//        tileArray[4] = 'wood';
//        tileArray[5] = 'watersand';
//        tileArray[6] = 'grasssand';
//        tileArray[7] = 'sandstone';
//        tileArray[8] = 'bush1';
//        tileArray[9] = 'bush2';
//        tileArray[10] = 'mushroom';
//        tileArray[11] = 'wall';
//        tileArray[12] = 'window';
//
//;
//
//        var yIterations = Math.round(game.physics.isoArcade.bounds.frontY / tileSize);
//        var xIterations = Math.round(game.physics.isoArcade.bounds.frontX / tileSize);
//
//        var temp;
//        var i = 0;
//
//        if (true) {
//            _(yIterations).times(function (y) {
//                _(xIterations).times(function (x) {
//                    temp = game.add.isoSprite(x * tileSize, y * tileSize, 0, 'tileset', null, isoGroup);
//                    temp.anchor.set(0.5, 1);
//                    temp.smoothed = true;
//                    temp.body.moves = false;
//                    i++;
//                });
//            });
//        }
//
//        this.cursors = game.input.keyboard.createCursorKeys();
//
//        // Create another cube as our 'player', and set it up just like the cubes above.
//
//        player = game.add.isoSprite(this.netPlayer.x, this,newPlayer.y, 0, 'tileset', tileArray[10], isoGroup);
//        player.tint = 0x86bfda;
//        player.anchor.set(0.5, 1);
//        game.physics.isoArcade.enable(player);
//        player.body.collideWorldBounds = true
//
//        game.camera.follow(player);
//
//        this.moveTo = null;
//    },
//    update: function () {
//        // Move the player at this speed.
//        //var speed = 300;
//
//        //  only move when you click
//        //if (game.input.mousePointer.isDown)
//        //{
//        //    var input = [game.input.x, game.input.y];
//        //    if (this.moveTo != input) {
//        //        this.moveTo = input;
//        //    }
//        //}
//        this.moveTo = null;
//
//
//        if (this.cursors.left.justPressed() && !keyReset) {
//            keyReset = true;
//            this.moveTo = [player.isoX - tileSize, player.isoY];
//            console.log("left is down");
//        }
//        else if (this.cursors.right.justPressed() && !keyReset) {
//            keyReset = true;
//            this.moveTo = [player.isoX + tileSize, player.isoY];
//            console.log("right is down");
//        }
//        else if (this.cursors.up.justPressed() && !keyReset) {
//            keyReset = true;
//            this.moveTo = [player.isoX, player.isoY - tileSize];
//            console.log("up is down");
//        }
//        else if (this.cursors.down.justPressed() && !keyReset) {
//            keyReset = true;
//            this.moveTo = [player.isoX, player.isoY + tileSize];
//            console.log("down is down");
//        }
//
//        if (this.cursors.left.justReleased() || this.cursors.right.justReleased() || this.cursors.up.justReleased() || this.cursors.down.justReleased()) {
//            keyReset = false;
//        }
//            //  400 is the speed it will move towards the mouse
//        if (this.moveTo) {
//            if (player.body.x != this.moveTo[0] || player.body.y != this.moveTo[1]) {
//                console.log("attempting to move to " + this.moveTo[0] + "," + this.moveTo[1] + " from " + player.isoX + "," + player.isoY);
//                player.body.x = this.moveTo[0];
//                player.body.y = this.moveTo[1];
//                //game.physics.arcade.moveToXY(player, this.moveTo[0], this.moveTo[1], speed);
//            }
//        }
//
//    },
//    render: function () {
//        game.debug.text((game.time.fps || '--') + " playerX:" + player.isoX + " player Y:" + player.isoY, 2, 14, "#a7aebe" );
//    }
//};
//
//game.state.add('Boot', BasicGame.Boot);
//game.state.start('Boot');
//

'use strict';

var Map = function () {

};
'use strict';

var Network = function (host) {
    this.users = [];
    this.ready = false;
    this.socket = io.connect(host);

    this.socket.on('connected', function (data) {
        this.users.push(new Player(data));
        this.ready = true;
    }.bind(this));

};
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