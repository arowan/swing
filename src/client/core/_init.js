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
