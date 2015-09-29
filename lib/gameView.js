(function() {

  if (typeof window.Asteroids === "undefined") {
    var Asteroids = window.Asteroids = {};
  }

  var gameView = window.Asteroids.gameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  window.Asteroids.gameView.prototype = {
    start: function () {

      this.bindKeyHandlers();
      setInterval(function () {
        this.game.step();
        this.game.draw(this.ctx);
      }, 20);
    },

    bindKeyHandlers: function () {
      var up = function () {
        this.game.ship.power(1);
      };
      var down = function () {
        this.game.ship.power(-1);
      };
      var left = function () {
        this.game.ship.rotate(1);
      };
      var right = function () {
        this.game.ship.rotate(-1);
      };

      var space = function () {
        this.game.ship.fireBullet();
      };

      window.key('up', up.bind(this));
      window.key('down', down.bind(this));
      window.key('left', left.bind(this));
      window.key('right', right.bind(this));
      window.key('space', space.bind(this));
    }
  };

})();
