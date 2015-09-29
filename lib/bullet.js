(function() {

  if (typeof window.Asteroids === "undefined") {
    Asteroids = window.Asteroids = {};
  }

  var Bullet = window.Asteroids.Bullet = function (game, ship) {
    var velNorm = window.Asteroids.Util.norm(ship.vel);
    args = {
      game: game,
      pos: this._newPos(ship),
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

  Bullet.prototype._newPos = function (ship) {
    var centerPos = ship.pos;
    var pastCenter = [
      centerPos[0] + ship.dir[0] * window.Asteroids.Ship.RADIUS + (2*Bullet.RADIUS),
      centerPos[1] + ship.dir[1] * window.Asteroids.Ship.RADIUS  + (2*Bullet.RADIUS)
    ];

    debugger;
    return pastCenter;
  };

  Bullet.prototype._newVel = function (ship) {
    var exitVel = [ship.dir[0] * Bullet.SPEED, ship.dir[1] * Bullet.SPEED];
    var relativeVel = [ship.vel[0] + exitVel[0], ship.vel[1] + exitVel[1]];
    return relativeVel;
  };

  Bullet.prototype.collideWith = function (object) {
      if (object instanceof window.Asteroids.Ship) {
        object.relocate();
        this.game.remove(this);
      } else if (obj2 instanceof window.Asteroids.Asteroid) {
        this.game.remove(object);
        this.game.remove(this);
      }
  };

})();
