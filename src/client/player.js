var Player = function (object) {
    this.attributes = _.defaults(object, {
        id: null,
        x: 0,
        y: 0
    });
}