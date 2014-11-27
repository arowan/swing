var Core = function () {
    this.ready = false;
    this.users = [];
};

$(document).ready(function(){
    window.App = new Core();
    App.game = new Phaser.Game(
        1024,
        768,
        Phaser.WEBGL,
        'parentElement',
        {
            preload: App.beforePreload,
            update: App.beforeUpdate,
            render: App.beforeRender
        }
    );
    console.log(App)
})
