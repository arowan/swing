__hasProp = {}.hasOwnProperty,
__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

var Base = (function() {
  function Base() {
    this.setting = false;
    this.another_setting = true;
  }

  Base.prototype.moo = function() {};

  return Base;

})();

var Foo = (function(_super) {
  __extends(Foo, _super);

  function Foo() {
    return Foo.__super__.constructor.apply(this, arguments);
  }

  Foo.prototype.moo = function() {
    Foo.__super__.moo.apply(this, arguments);
    return console.log('');
  };

  return Foo;

})(Base);
