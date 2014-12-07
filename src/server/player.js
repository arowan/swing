/**
 * Created by Ben on 06/12/2014.
 */

// A player is an in game object representing a human controlled character.
// TODO: Move this to shared or something, the name conflicts with the client player in Jasmine
var ServerPlayer = function() {
    Actor.call(this);
    var _ = require('underscore');
    this.id = _.random(0,9999999999); // TODO: Reaaaaaaally small potential for duplicates.
};

ServerPlayer.prototype = Object.create(Actor.prototype);
ServerPlayer.prototype.constructor = ServerPlayer;



