/**
 * Created by Ben on 06/12/2014.
 */

var GameState = function() {
    this.users = [];
};

GameState.prototype = {
    addUser: function (ip_address) {
        var user = new User(ip_address);
        this.users.push(user);
        return user;
    },
    removeUser: function (user) {
        var userIndex = this.users.indexOf(user);
        this.users.splice(userIndex, 1);
    },
    allPlayers: function() {
        // refactored to use _.map
        var _ = require('underscore');
        return _.map(this.users, function (user) {
            return user.player;
        })
    }
};