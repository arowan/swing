'use strict';

var Character = function (object, manager) {
  var attributes = _.defaults(object, {
      id: null,
      speed: 1,
      x: 0,
      y: 0
  });

  _.each(attributes, function (value, key){
    this[key] = attributes[key];
  }.bind(this));
};

Character.prototype = {
  coordinates: function () {
    return [this.x, this.y];
  },
  move: function (x, y) {
    this.x = x;
    this.y = y;
  }
};
