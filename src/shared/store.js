/**
 * Created by Al on 10/12/2014.
 */

// Basic store object for adding, removing and finding. to be used as part of "client manager"

function Store (inventory) {
    this.inventory = inventory || [];

    this.searchHash = function (key, value) {
        var hash = {};
        hash[key] = value;
        return hash;
    };

    this.splice = function (index) {
        this.inventory.splice(index, 1);
    };
}

Store.prototype = {
    addObject: function (object) {
        this.inventory.push(object);
        return this.inventory.indexOf(object);
    },
    removeObject: function (object) {
        var index;
        index = this.inventory.indexOf(object);
        this.splice(index);
    },
    removeIndex: function (index) {
        this.splice(index);
    },
    getObject: function (index) {
        return this.inventory[index];
    },
    findObject: function (key, value) {
        return _.findWhere(this.inventory, this.searchHash(key, value));
    },
    findMatching: function (key, value) {
        return _.where(this.inventory, this.searchHash(key, value));
    },
    findIndex: function (key, value) {
        var object = this.findObject(key, value);
        return this.inventory.indexOf(object);
    }
};

// if module, so it'll work both server and client side.
if (typeof module != "undefined") module.exports = Store;
