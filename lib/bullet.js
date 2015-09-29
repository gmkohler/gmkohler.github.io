(function() {

  if (typeof window.Asteroids === "undefined") {
    Asteroids = window.Asteroids = {};
  }

  var Bullet = window.Asteroids.Bullet = function (game, ship) {
    var velNorm = window.Asteroids.Util.norm(ship.vel);
    args = {
      game: game,
      pos: ship.pos,
      vel: this._newVel(ship),
      radius: Bullet.RADIUS,
      color: Bullet.COLOR
    };

    // debugger;
    window.Asteroids.movingObject.call(this, args);
  };

  Bullet.COLOR = "#FF6600";
  Bullet.RADIUS = 5;
  Bullet.SPEED = 8;

  window.Asteroids.Util.inherits(
    Bullet,
    window.Asteroids.movingObject
  );

  Bullet.prototype._newVel = function (ship) {
    var exitVel = [ship.dir[0] * Bullet.SPEED, ship.dir[1] * Bullet.SPEED];
    var relativeVel = [ship.vel[0] + exitVel[0], ship.vel[1] + exitVel[1]];
    return relativeVel;
  };

})();
