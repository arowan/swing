'use strict';

var Core = function () {
    this.manager = new Manager();
    this.network = new Network('http://80.1.153.15', this.manager);
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
'use strict';

Core.prototype.preload = function () {
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
    this.game.debug.text((this.game.time.fps || '--') + ' <- fps | users -> ' + this.manager.store.length, 2, 14, "#fff" );
}
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
/**
 * Created by Ben on 03/12/2014.
 */

function helloWorld() {
    return "Hello world!";
}

function anotherFunction() {


}

var Person = function() {};

Person.prototype.helloSomeone = function(toGreet) {
    return this.sayHello() + " " + toGreet;
};

Person.prototype.sayHello = function() {
    return "Hello";
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
        console.log("Add was called for player ID " + player.id);
        console.log(this.user);
        if ((this.user && player && player.id != this.user.id) || this.user == null) {
            console.log("Inner loop reached");
            var p = new Player(player, this);
            this.store.push(p);
            if (this.game && this.group) {
                console.log("Calling buildSprite for player ID " + p.id)
                p.buildSprite(this.game, this.group, false);
            }
       }
    },
    remove: function (player){
        console.log("Removing player ID " + player.id)
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
        if (player.id == this.user.id) {
            console.log("getPlayer attempting to return local user object");
            return this.user;
        }
        console.log("getPlayer attempting to return player id " + player.id);
        var foundPlayer =  _.findWhere(this.store, {id: player.id});
        console.log("Found player with ID: " + foundPlayer.id);
        return foundPlayer;
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

'use strict';

var Network = function (host, manager) {

    this.manager = manager;
    this.manager.network = this; //do not like this.

    this.player = null;
    this.ready = false;
    this.socket = io.connect(host);

    this.socket.on('connected', function (data) {
        this.manager.addUser(data);
    }.bind(this));

    this.socket.on('addPlayer', function (data) {
        this.manager.add(data);
    }.bind(this));

    this.socket.on('otherPlayers', function (data) {
        _.each(data, function (player){
            console.log("Adding player ID " + player.id);
            this.manager.add(player);
        }.bind(this));
        this.ready = true;
    }.bind(this));

    this.socket.on('updatePlayer', function (data) {
        this.manager.update(data);
    }.bind(this));

    this.socket.on('removePlayer', function (data) {
        this.manager.remove(data);
    }.bind(this));

};
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