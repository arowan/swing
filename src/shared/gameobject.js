/**
 * Created by Ben on 06/12/2014.
 */
// A GameObject is any object that can exist in the game, including Actors, Trees, etc. 

var GameObject = function () {
    this.x = 0;
    this.y = 0;
};

GameObject.prototype = {
    setCoordinates: function (x, y) {
        // Set GameObject coordinates in one go
        this.x = x;
        this.y = y;
    },
    coordinates: function () {
        // return coordinates of GameObject in array, object may be more useful later? {x: x ,y: y}
        return [this.x, this.y];
    }
}

module.exports = GameObject;
