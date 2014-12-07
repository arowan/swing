/**
 * Created by Ben on 06/12/2014.
 */

// An actor is any "living" thing, including players, npcs, monsters, etc.
var Actor = function () {
    GameObject.call(this);
};

Actor.prototype = Object.create(GameObject.prototype);
Actor.prototype.constructor = Actor;

