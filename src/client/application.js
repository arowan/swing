var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'test', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

var isoGroup, player;

BasicGame.Boot.prototype =
{
    preload: function () {
        game.time.advancedTiming = true;

        game.plugins.add(new Phaser.Plugin.Isometric(game));
        game.load.atlasJSONHash('tileset', 'images/tileset.png', 'map/tileset.json');

        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);

        game.iso.anchor.setTo(0.5, 0.1);
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

        var tiles = [
            9, 2, 1, 1, 4, 4, 1, 6, 2, 10, 2,
            2, 6, 1, 0, 4, 4, 0, 0, 2, 2, 2,
            6, 1, 0, 0, 4, 4, 0, 0, 8, 8, 2,
            0, 0, 0, 0, 4, 4, 0, 0, 0, 9, 2,
            0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0,
            11, 11, 12, 11, 3, 3, 11, 12, 11, 11, 11,
            3, 7, 3, 3, 3, 3, 3, 3, 7, 3, 3,
            7, 1, 7, 7, 3, 3, 7, 7, 1, 1, 7
        ];


        var size = 32;

        var i = 0, tile;
        for (var y = size; y <= game.physics.isoArcade.bounds.frontY - size; y += size) {
            for (var x = size; x <= game.physics.isoArcade.bounds.frontX - size; x += size) {
                // this bit would've been so much cleaner if I'd ordered the tileArray better, but I can't be bothered fixing it :P
                tile = game.add.isoSprite(x, y, 0, 'tileset', tileArray[tiles[i]], isoGroup);
                tile.anchor.set(0.5, 1);
                tile.smoothed = false;
                tile.body.moves = false;
                //if (tiles[i] === 4) {
                //    tile.isoZ += 6;
                //}
                //if (tiles[i] <= 10 && (tiles[i] < 5 || tiles[i] > 6)) {
                //    tile.scale.x = game.rnd.pick([-1, 1]);
                //}
                //if (tiles[i] === 0) {
                //    water.push(tile);
                //}
                i++;
            }
        }

        // player.animations.add('up', [2], 10, true);
        // player.animations.add('down', [0], 10, true);
        // player.animations.add('right', [1], 10, true); // broken should be 3. not sure why it dosnt work :(
        // player.animations.add('left', [1], 10, true);
        //player.anchor.set(0.5);
        //game.physics.isoArcade.enable(player);
        //player.body.collideWorldBounds = true;

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
        //var speed = 100;
        //var moving = false;
        //
        //if (this.cursors.up.isDown) {
        //    player.body.velocity.y = -speed;
        //    // player.animations.play('up');
        //    moving = true;
        //}
        //else if (this.cursors.down.isDown) {
        //    player.body.velocity.y = speed;
        //    // player.animations.play('down');
        //    moving = true;
        //}
        //else {
        //    player.body.velocity.y = 0;
        //}
        //player.body.velocity.y = 0;
        //
        //if (this.cursors.left.isDown) {
        //    player.body.velocity.x = -speed;
        //    // player.animations.play('left');
        //    moving = true;
        //}
        //else if (this.cursors.right.isDown) {
        //    player.body.velocity.x = speed;
        //    // player.animations.play('right');
        //    moving = true;
        //}
        //else {
        //    player.body.velocity.x = 0;
        //}
        //
        //if (!moving){
        //    // player.animations.stop();
        //}
        //
        //game.physics.isoArcade.collide(isoGroup);
        //game.iso.topologicalSort(isoGroup);
    },
    render: function () {
        isoGroup.forEach(function (tile) {
            game.debug.body(tile, 'rgba(189, 221, 235, 0.6)', false);
        });
        game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
        // game.debug.text(Phaser.VERSION, 2, game.world.height - 2, "#ffff00");
    }
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');

