var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'test', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

var isoGroup, player;

BasicGame.Boot.prototype =
{
    preload: function () {
        game.load.image('cube', 'images/cube.png');

        // game.load.spritesheet('man', 'images/man.png', 80, 106, 3);

        game.load.image('tileset', 'images/basic_ground_tiles.png');
        game.load.tilemap('map', 'map/test.json', null, Phaser.Tilemap.TILED_JSON);

        game.time.advancedTiming = true;

        game.plugins.add(new Phaser.Plugin.Isometric(game));
        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);


        game.iso.anchor.setTo(0.5, 0.2);


    },
    create: function () {

        isoGroup = game.add.group();
        //

        game.physics.isoArcade.gravity.setTo(0, 0, -500);

        map = game.add.tilemap('map');
        map.addTilesetImage('tileset');

        layer = map.createLayer('test');
        layer.resizeWorld();
        map.setCollitionBetween(0,100);

        layer.debug = true;

        // var cube;
        // for (var xx = 256; xx > 0; xx -= 160) {
        //     for (var yy = 256; yy > 0; yy -= 160) {  
        //         cube = game.add.isoSprite(xx, yy, 0, 'cube', 0, isoGroup);
        //         cube.anchor.set(0.5);

        //         // Enable the physics body on this cube.
        //         game.physics.isoArcade.enable(cube);

        //         cube.body.collideWorldBounds = true;

        //         cube.body.bounce.set(1, 1, 0.2);

        //         cube.body.drag.set(100, 100, 0);
        //     }
        // }

        player = game.add.isoSprite(0, 0, 0, 'cube', 0, isoGroup);
        // player.animations.add('up', [2], 10, true);
        // player.animations.add('down', [0], 10, true);
        // player.animations.add('right', [1], 10, true); // broken should be 3. not sure why it dosnt work :(
        // player.animations.add('left', [1], 10, true);
        player.anchor.set(0.5);
        game.physics.isoArcade.enable(player);
        player.body.collideWorldBounds = true;

        this.cursors = game.input.keyboard.createCursorKeys();

        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.SPACEBAR
        ]);

        var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        space.onDown.add(function () {
            player.body.velocity.z = 300;
        }, this);
    },
    update: function () {
        var speed = 100;
        var moving = false;

        if (this.cursors.up.isDown) {
            player.body.velocity.y = -speed;
            // player.animations.play('up');
            moving = true;
        }
        else if (this.cursors.down.isDown) {
            player.body.velocity.y = speed;
            // player.animations.play('down');
            moving = true;
        }
        else {
            player.body.velocity.y = 0;
        }

        if (this.cursors.left.isDown) {
            player.body.velocity.x = -speed;
            // player.animations.play('left');
            moving = true;
        }
        else if (this.cursors.right.isDown) {
            player.body.velocity.x = speed;
            // player.animations.play('right');
            moving = true;
        }
        else {
            player.body.velocity.x = 0;
        }

        if (!moving){
            // player.animations.stop();
        }

        game.physics.isoArcade.collide(isoGroup);
        game.iso.topologicalSort(isoGroup);
    }
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');

