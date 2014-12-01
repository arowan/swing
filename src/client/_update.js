'use strict';

Core.prototype.update = function () {
    if (this.network.ready) {
        this.processUpdate()
    }
}

Core.prototype.processUpdate = function () {
    console.log('update');
};