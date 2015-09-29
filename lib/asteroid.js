(function () {
  // debugger;
  if (typeof window.Asteroids === 'undefined') {
    var Asteroids = window.Asteroids = {};
  }

  var Asteroid = window.Asteroids.Asteroid = function (game, pos) {
      var args = {
          game: game,
          pos: pos,
          vel: window.Asteroids.Util.randomVec(Asteroid.MAX_SPEED),
          radius: Asteroid.RADIUS,
          color: Asteroid.COLOR
      };

      window.Asteroids.movingObject.call(this, args);
  };

  Asteroid.COLOR = "#AAAAAA";
  Asteroid.RADIUS = 10;
  Asteroid.MAX_SPEED = 10;

  window.Asteroids.Util.inherits(
    window.Asteroids.Asteroid,
    window.Asteroids.movingObject
  );

  Asteroid.prototype.collideWith = function (obj2) {
    if (obj2 instanceof window.Asteroids.Ship) {
      obj2.relocate();
    } else {
      this.game.remove(obj2);
      this.game.remove(this);
    }
  };
  // debugger;

})();
