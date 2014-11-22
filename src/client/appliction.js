var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'images/sky.png');
    game.load.image('ground', 'images/platform.png');
    game.load.image('star', 'images/star.png');
    game.load.spritesheet('dude', 'images/dude.png', 32, 48);

}

var player;
var platforms;
var cursors;

var stars;
var score = 0;
var scoreText;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Finally some stars to collect
    stars = game.add.group();

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    
}

function update() {

    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

}

function collectStar (player, star) {
    
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

}

// EnemyTank = function (index, game, player, bullets) {

//     var x = game.world.randomX;
//     var y = game.world.randomY;

//     this.game = game;
//     this.health = 3;
//     this.player = player;
//     this.bullets = bullets;
//     this.fireRate = 1000;
//     this.nextFire = 0;
//     this.alive = true;

//     this.shadow = game.add.sprite(x, y, 'enemy', 'shadow');
//     this.tank = game.add.sprite(x, y, 'enemy', 'tank1');
//     this.turret = game.add.sprite(x, y, 'enemy', 'turret');

//     this.shadow.anchor.set(0.5);
//     this.tank.anchor.set(0.5);
//     this.turret.anchor.set(0.3, 0.5);

//     this.tank.name = index.toString();
//     game.physics.enable(this.tank, Phaser.Physics.ARCADE);
//     this.tank.body.immovable = false;
//     this.tank.body.collideWorldBounds = true;
//     this.tank.body.bounce.setTo(1, 1);

//     this.tank.angle = game.rnd.angle();

//     game.physics.arcade.velocityFromRotation(this.tank.rotation, 100, this.tank.body.velocity);

// };

// EnemyTank.prototype.damage = function() {

//     this.health -= 1;

//     if (this.health <= 0)
//     {
//         this.alive = false;

//         this.shadow.kill();
//         this.tank.kill();
//         this.turret.kill();

//         return true;
//     }

//     return false;

// }

// EnemyTank.prototype.update = function() {

//     this.shadow.x = this.tank.x;
//     this.shadow.y = this.tank.y;
//     this.shadow.rotation = this.tank.rotation;

//     this.turret.x = this.tank.x;
//     this.turret.y = this.tank.y;
//     this.turret.rotation = this.game.physics.arcade.angleBetween(this.tank, this.player);

//     if (this.game.physics.arcade.distanceBetween(this.tank, this.player) < 300)
//     {
//         if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
//         {
//             this.nextFire = this.game.time.now + this.fireRate;

//             var bullet = this.bullets.getFirstDead();

//             bullet.reset(this.turret.x, this.turret.y);

//             bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 500);
//         }
//     }

// };

// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

// function preload () {

//     game.load.atlas('tank', 'assets/games/tanks/tanks.png', 'assets/games/tanks/tanks.json');
//     game.load.atlas('enemy', 'assets/games/tanks/enemy-tanks.png', 'assets/games/tanks/tanks.json');
//     game.load.image('logo', 'assets/games/tanks/logo.png');
//     game.load.image('bullet', 'assets/games/tanks/bullet.png');
//     game.load.image('earth', 'assets/games/tanks/scorched_earth.png');
//     game.load.spritesheet('kaboom', 'assets/games/tanks/explosion.png', 64, 64, 23);
    
// }

// var land;

// var shadow;
// var tank;
// var turret;

// var enemies;
// var enemyBullets;
// var enemiesTotal = 0;
// var enemiesAlive = 0;
// var explosions;

// var logo;

// var currentSpeed = 0;
// var cursors;

// var bullets;
// var fireRate = 100;
// var nextFire = 0;

// function create () {

//     //  Resize our game world to be a 2000 x 2000 square
//     game.world.setBounds(-1000, -1000, 2000, 2000);

//     //  Our tiled scrolling background
//     land = game.add.tileSprite(0, 0, 800, 600, 'earth');
//     land.fixedToCamera = true;

//     //  The base of our tank
//     tank = game.add.sprite(0, 0, 'tank', 'tank1');
//     tank.anchor.setTo(0.5, 0.5);
//     tank.animations.add('move', ['tank1', 'tank2', 'tank3', 'tank4', 'tank5', 'tank6'], 20, true);

//     //  This will force it to decelerate and limit its speed
//     game.physics.enable(tank, Phaser.Physics.ARCADE);
//     tank.body.drag.set(0.2);
//     tank.body.maxVelocity.setTo(400, 400);
//     tank.body.collideWorldBounds = true;

//     //  Finally the turret that we place on-top of the tank body
//     turret = game.add.sprite(0, 0, 'tank', 'turret');
//     turret.anchor.setTo(0.3, 0.5);

//     //  The enemies bullet group
//     enemyBullets = game.add.group();
//     enemyBullets.enableBody = true;
//     enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
//     enemyBullets.createMultiple(100, 'bullet');
    
//     enemyBullets.setAll('anchor.x', 0.5);
//     enemyBullets.setAll('anchor.y', 0.5);
//     enemyBullets.setAll('outOfBoundsKill', true);
//     enemyBullets.setAll('checkWorldBounds', true);

//     //  Create some baddies to waste :)
//     enemies = [];

//     enemiesTotal = 20;
//     enemiesAlive = 20;

//     for (var i = 0; i < enemiesTotal; i++)
//     {
//         enemies.push(new EnemyTank(i, game, tank, enemyBullets));
//     }

//     //  A shadow below our tank
//     shadow = game.add.sprite(0, 0, 'tank', 'shadow');
//     shadow.anchor.setTo(0.5, 0.5);

//     //  Our bullet group
//     bullets = game.add.group();
//     bullets.enableBody = true;
//     bullets.physicsBodyType = Phaser.Physics.ARCADE;
//     bullets.createMultiple(30, 'bullet', 0, false);
//     bullets.setAll('anchor.x', 0.5);
//     bullets.setAll('anchor.y', 0.5);
//     bullets.setAll('outOfBoundsKill', true);
//     bullets.setAll('checkWorldBounds', true);

//     //  Explosion pool
//     explosions = game.add.group();

//     for (var i = 0; i < 10; i++)
//     {
//         var explosionAnimation = explosions.create(0, 0, 'kaboom', [0], false);
//         explosionAnimation.anchor.setTo(0.5, 0.5);
//         explosionAnimation.animations.add('kaboom');
//     }

//     tank.bringToTop();
//     turret.bringToTop();

//     logo = game.add.sprite(0, 200, 'logo');
//     logo.fixedToCamera = true;

//     game.input.onDown.add(removeLogo, this);

//     game.camera.follow(tank);
//     game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
//     game.camera.focusOnXY(0, 0);

//     cursors = game.input.keyboard.createCursorKeys();

// }

// function removeLogo () {

//     game.input.onDown.remove(removeLogo, this);
//     logo.kill();

// }

// function update () {

//     game.physics.arcade.overlap(enemyBullets, tank, bulletHitPlayer, null, this);

//     enemiesAlive = 0;

//     for (var i = 0; i < enemies.length; i++)
//     {
//         if (enemies[i].alive)
//         {
//             enemiesAlive++;
//             game.physics.arcade.collide(tank, enemies[i].tank);
//             game.physics.arcade.overlap(bullets, enemies[i].tank, bulletHitEnemy, null, this);
//             enemies[i].update();
//         }
//     }

//     if (cursors.left.isDown)
//     {
//         tank.angle -= 4;
//     }
//     else if (cursors.right.isDown)
//     {
//         tank.angle += 4;
//     }

//     if (cursors.up.isDown)
//     {
//         //  The speed we'll travel at
//         currentSpeed = 300;
//     }
//     else
//     {
//         if (currentSpeed > 0)
//         {
//             currentSpeed -= 4;
//         }
//     }

//     if (currentSpeed > 0)
//     {
//         game.physics.arcade.velocityFromRotation(tank.rotation, currentSpeed, tank.body.velocity);
//     }

//     land.tilePosition.x = -game.camera.x;
//     land.tilePosition.y = -game.camera.y;

//     //  Position all the parts and align rotations
//     shadow.x = tank.x;
//     shadow.y = tank.y;
//     shadow.rotation = tank.rotation;

//     turret.x = tank.x;
//     turret.y = tank.y;

//     turret.rotation = game.physics.arcade.angleToPointer(turret);

//     if (game.input.activePointer.isDown)
//     {
//         //  Boom!
//         fire();
//     }

// }

// function bulletHitPlayer (tank, bullet) {

//     bullet.kill();

// }

// function bulletHitEnemy (tank, bullet) {

//     bullet.kill();

//     var destroyed = enemies[tank.name].damage();

//     if (destroyed)
//     {
//         var explosionAnimation = explosions.getFirstExists(false);
//         explosionAnimation.reset(tank.x, tank.y);
//         explosionAnimation.play('kaboom', 30, false, true);
//     }

// }

// function fire () {

//     if (game.time.now > nextFire && bullets.countDead() > 0)
//     {
//         nextFire = game.time.now + fireRate;

//         var bullet = bullets.getFirstExists(false);

//         bullet.reset(turret.x, turret.y);

//         bullet.rotation = game.physics.arcade.moveToPointer(bullet, 1000, game.input.activePointer, 500);
//     }

// }

// function render () {

//     // game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.length, 32, 32);
//     game.debug.text('Enemies: ' + enemiesAlive + ' / ' + enemiesTotal, 32, 32);

// }
