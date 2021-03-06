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
        Phaser.AUTO,
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
    this.manager.network = this; //do not like this

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
        console.log("Removing player: " + data);
        this.manager.remove(data);
    }.bind(this));

};

'use strict';


//var Player = function (object) {
//    Character.call(this, object);
//};
//
//Player.prototype = Object.create(Character.prototype);
//Player.prototype.constructor = Player;

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

/**
 * Created by Al on 10/12/2014.
 */

// Basic store object for adding, removing and finding. to be used as part of "client manager"

function Store (inventory) {
    this.inventory = inventory || [];

    this.searchHash = function (key, value) {
        var hash = {};
        hash[key] = value;
        return hash;
    };

    this.splice = function (index) {
        this.inventory.splice(index, 1);
    };
}

Store.prototype = {
    addObject: function (object) {
        this.inventory.push(object);
        return this.inventory.indexOf(object);
    },
    removeObject: function (object) {
        var index;
        index = this.inventory.indexOf(object);
        this.splice(index);
    },
    removeIndex: function (index) {
        this.splice(index);
    },
    getObject: function (index) {
        return this.inventory[index];
    },
    findObject: function (key, value) {
        return _.findWhere(this.inventory, this.searchHash(key, value));
    },
    findMatching: function (key, value) {
        return _.where(this.inventory, this.searchHash(key, value));
    },
    findIndex: function (key, value) {
        var object = this.findObject(key, value);
        return this.inventory.indexOf(object);
    }
};

// if module, so it'll work both server and client side.
if (module) module.exports = Store;
'use strict';

var Map = function (width, height) {
    this.width = width;
    this.height = height;

    this.tiles = [];
    for (var x = 0; x < width; x++) {
        this.tiles[x] = [];
        for (var y = 0; y < height; y++) {
            this.tiles[x][y] = new Tile();
        }
    }

    this.description = "default description";
};

Map.prototype = {

};

/**
 * Created by Ben on 03/12/2014.
 */

var Tile = function() {
    this.tiletype = null;
    this.contents = [];
    this.passable = true;
}

Tile.prototype = {

}