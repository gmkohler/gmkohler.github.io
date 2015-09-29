(function() {
  if (typeof window.Asteroids === "undefined") {
    var Asteroids = window.Asteroids = {};
  }

  var Ship = window.Asteroids.Ship = function (game, pos) {
    var args = {
      game: game,
      pos: pos,
      vel: [0, 0],
      radius: Ship.RADIUS,
      color: Ship.COLOR
    };

    window.Asteroids.movingObject.call(this, args);
    this.dir = [0, 1];
  };

  Ship.COLOR = "#0000FF";
  Ship.RADIUS = 15;
  Ship.D_THETA = Math.PI / 20;

  window.Asteroids.Util.inherits(
    window.Asteroids.Ship,
    window.Asteroids.movingObject
  );

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.power = function (direction) {
    var impulse = [this.dir[0] * direction, this.dir[1] * direction];
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.rotate = function (direction) {
    var theta = direction * Ship.D_THETA;
    var newX = (this.dir[0]*Math.cos(theta) - this.dir[1]*Math.sin(theta));
    var newY = (this.dir[0]*Math.sin(theta) + this.dir[1]*Math.cos(theta));

    this.dir = [newX, newY];
  };

})();
