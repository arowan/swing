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

}
