window.App = {};

// this size will be the camera size
var game = new Phaser.Game(1024, 768, Phaser.WEBGL, 'test', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

var isoGroup, player;
var tileSize = 32;
var keyReset = false;

BasicGame.Boot.prototype =
{
    preload: function () {
        game.time.advancedTiming = true;

        game.plugins.add(new Phaser.Plugin.Isometric(game));
        game.load.atlasJSONHash('tileset', 'images/tileset.png', 'map/tileset.json');
        game.load.image('cube', 'images/cube.png');

        // this is the size of the map total
        game.world.setBounds(0, 0, 2048, 2048);
        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);

        game.iso.anchor.setTo(0.5, 0.05);
    },

    create: function () {

        isoGroup = game.add.group();

        isoGroup.enableBody = true;
        isoGroup.physicsBodyType = Phaser.Plugin.Isometric.ISOARCADE;

        var tileArray = [];
        tileArray[0] = 'water';
        tileArray[1] = 'sand';
        tileArray[2] = 'grass';
        tileArray[3] = 'stone';
        tileArray[4] = 'wood';
        tileArray[5] = 'watersand';
        tileArray[6] = 'grasssand';
        tileArray[7] = 'sandstone';
        tileArray[8] = 'bush1';
        tileArray[9] = 'bush2';
        tileArray[10] = 'mushroom';
        tileArray[11] = 'wall';
        tileArray[12] = 'window';

        var yIterations = Math.round(game.physics.isoArcade.bounds.frontY / tileSize);
        var xIterations = Math.round(game.physics.isoArcade.bounds.frontX / tileSize);

        var temp;
        var i = 0;

        if (true) {
            _(yIterations).times(function (y) {
                _(xIterations).times(function (x) {
                    temp = game.add.isoSprite(x * tileSize, y * tileSize, 0, 'tileset', null, isoGroup);
                    temp.anchor.set(0.5, 1);
                    temp.smoothed = true;
                    temp.body.moves = false;
                    i++;
                });
            });
        }

        this.cursors = game.input.keyboard.createCursorKeys();

        // Create another cube as our 'player', and set it up just like the cubes above.
        player = game.add.isoSprite(0, 0, 0, 'tileset', tileArray[10], isoGroup);

        player.tint = 0x86bfda;
        player.anchor.set(0.5);
        game.physics.isoArcade.enable(player);
        player.body.collideWorldBounds = true;

        game.camera.follow(player);

        this.moveTo = null;
    },
    update: function () {
        // Move the player at this speed.
        //var speed = 300;

        //  only move when you click
        //if (game.input.mousePointer.isDown)
        //{
        //    var input = [game.input.x, game.input.y];
        //    if (this.moveTo != input) {
        //        this.moveTo = input;
        //    }
        //}
        this.moveTo = null;


        if (this.cursors.left.justPressed() && !keyReset) {
            keyReset = true;
            this.moveTo = [player.isoX - tileSize, player.isoY];
            console.log("left is down");
        }
        else if (this.cursors.right.justPressed() && !keyReset) {
            keyReset = true;
            this.moveTo = [player.isoX + tileSize, player.isoY];
            console.log("right is down");
        }
        else if (this.cursors.up.justPressed() && !keyReset) {
            keyReset = true;
            this.moveTo = [player.isoX, player.isoY - tileSize];
            console.log("up is down");
        }
        else if (this.cursors.down.justPressed() && !keyReset) {
            keyReset = true;
            this.moveTo = [player.isoX, player.isoY + tileSize];
            console.log("down is down");
        }

        if (this.cursors.left.justReleased() || this.cursors.right.justReleased() || this.cursors.up.justReleased() || this.cursors.down.justReleased()) {
            keyReset = false;
        }
            //  400 is the speed it will move towards the mouse
        if (this.moveTo) {
            if (player.body.x != this.moveTo[0] || player.body.y != this.moveTo[1]) {
                console.log("attempting to move to " + this.moveTo[0] + "," + this.moveTo[1] + " from " + player.isoX + "," + player.isoY);
                player.body.x = this.moveTo[0];
                player.body.y = this.moveTo[1];
                //game.physics.arcade.moveToXY(player, this.moveTo[0], this.moveTo[1], speed);
            }
        }

    },
    render: function () {
        game.debug.text((game.time.fps || '--') + " playerX:" + player.isoX + " player Y:" + player.isoY, 2, 14, "#a7aebe" );
    }
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');

