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
      var that = this;
      window.Asteroids.movingObject.call(that, args);
  };

  Asteroid.COLOR = "#AAAAAA";
  Asteroid.RADIUS = 10;
  Asteroid.MAX_SPEED = 10;

  window.Asteroids.Util.inherits(
    window.Asteroids.Asteroid,
    window.Asteroids.movingObject
  );

  // debugger;

})();

var ast = new window.Asteroids.Asteroid([0, 0]);
