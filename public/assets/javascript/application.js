window.App = {};

// this size will be the camera size
var game = new Phaser.Game(1024, 768, Phaser.WEBGL, 'test', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

var isoGroup, player;

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

        var size = 32;

        var yIterations = Math.round(game.physics.isoArcade.bounds.frontY / size);
        var xIterations = Math.round(game.physics.isoArcade.bounds.frontX / size);

        var temp;
        var i = 0;

        if(true){
        _(yIterations).times(function(y){
            _(xIterations).times(function(x){
                temp = game.add.isoSprite(x * size, y * size, 0, 'tileset', null, isoGroup);
                temp.anchor.set(0.5, 1);
                temp.smoothed = true;
                temp.body.moves = false;
                i++;
            });
        });
        }

        this.cursors = game.input.keyboard.createCursorKeys();
        // Create another cube as our 'player', and set it up just like the cubes above.
        player = game.add.isoSprite(128, 128, 39, 'cube', 0, isoGroup);
        player.tint = 0x86bfda;
        player.anchor.set(0.5);
        game.physics.isoArcade.enable(player);
        player.body.collideWorldBounds = true;

        // Set up our controls.
        this.cursors = game.input.keyboard.createCursorKeys();

        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
        ]);

        var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


        // Make the camera follow the player.
        game.camera.follow(player);
    },
    update: function () {
        // Move the player at this speed.
        var speed = 500;

        if (this.cursors.up.isDown) {
            player.body.velocity.y = -speed;
        }
        else if (this.cursors.down.isDown) {
            player.body.velocity.y = speed;
        }
        else {
            player.body.velocity.y = 0;
        }

        if (this.cursors.left.isDown) {
            player.body.velocity.x = -speed;
        }
        else if (this.cursors.right.isDown) {
            player.body.velocity.x = speed;
        }
        else {
            player.body.velocity.x = 0;
        }

        // Our collision and sorting code again.
        // game.physics.isoArcade.collide(isoGroup);
        game.iso.topologicalSort(isoGroup);
    },
    render: function () {
        game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
    }
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');

