/**
 * Created by Ben on 06/12/2014.
 */

// A User is a client connected to the game, used to store information not related
// to the game world, such as their IP address, connection time, etc. Their player
// information is kept in their assigned Player object.
var User = function(ip_address) {
    var _ = require('underscore');

    this.id = _.random(0,9999999999); // TODO: Reaaaaaaally small potential for duplicates.
    this.ip_address = ip_address;
    this.connection_time = Date.now();
    this.player = new ServerPlayer();
}

User.prototype = {

};