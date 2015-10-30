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

<<<<<<< HEAD


    bindKeyHandlers: function () {
      var up = function () {
        this.game.ship.powerDir = 1;
        return false;
      };
      var down = function () {
        this.game.ship.powerDir = -1;
        return false;
      };
      var left = function () {
        this.game.ship.rotateDir = 1;
        return false;
      };
      var right = function () {
        this.game.ship.rotateDir = -1;
=======
    bindKeyHandlers: function () {
      var up = function () {
        this.game.ship.power(1);
        return false;
      };
      var down = function () {
        this.game.ship.power(-1);
        return false;
      };
      var left = function () {
        this.game.ship.rotate(1);
        return false;
      };
      var right = function () {
        this.game.ship.rotate(-1);
>>>>>>> 2b363fa07aee22963563a423006ba06defca595b
        return false;
      };

      var space = function () {
        this.game.ship.fireBullet();
        return false;
      };

      window.key('up', up.bind(this));
      window.key('down', down.bind(this));
      window.key('left', left.bind(this));
      window.key('right', right.bind(this));
      window.key('space', space.bind(this));
    }
  };

})();
