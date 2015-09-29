(function() {

  if (typeof window.Asteroids === "undefined") {
    var Asteroids = window.Asteroids = {};
  }

  var Game = window.Asteroids.Game = function (NUM_ASTEROIDS) {
    this.DIM_X = window.innerWidth;
    this.DIM_Y = window.innerHeight;
    this.NUM_ASTEROIDS = NUM_ASTEROIDS;
    this.asteroids = [];
    this.addAsteroids();
  };

  window.Asteroids.Game.prototype = {
    randomPosition: function () {
      return [this.DIM_X * Math.random(), this.DIM_Y * Math.random()];
    },

    addAsteroids: function () {
      while (this.asteroids.length < this.NUM_ASTEROIDS) {
        var that = this;
        that.asteroids.push(
          new window.Asteroids.Asteroid(
            that,
            that.randomPosition())
        );
      }
    },

    draw: function (ctx) {
      ctx.clearRect(
        0,
        0,
        (this.DIM_X + window.Asteroids.Asteroid.RADIUS),
        (this.DIM_X + window.Asteroids.Asteroid.RADIUS)
      );

      this.asteroids.forEach ( function (asteroid) {
        asteroid.draw(ctx);
      });

    },

    moveObjects: function () {
      this.asteroids.forEach( function (asteroid){
        asteroid.move();
      });
    },

    wrap: function (pos) {
      return [(pos[0] + this.DIM_X) % this.DIM_X,
        (pos[1] + this.DIM_Y) % this.DIM_Y];
    },

    checkCollisions: function () {
      for (var j = 0; j < this.asteroids.length; j++) {
        for (var k = j + 1; k < this.asteroids.length; k++) {
          if (this.asteroids[j].isCollidedWith(this.asteroids[k])) {
            this.asteroids[j].collideWith(this.asteroids[k]);
          }
        }
      }
    },

    remove: function (asteroid) {
      var idx = this.asteroids.indexOf(asteroid);
      this.asteroids.splice(idx, 1);
    },

    step: function () {
      this.moveObjects();
      this.checkCollisions();
    }

  };


})();
