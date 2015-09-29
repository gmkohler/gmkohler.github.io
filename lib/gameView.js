(function() {

  if (typeof window.Asteroids === "undefined") {
    var Asteroids = window.Asteroids = {};
  }

  var gameView = window.Asteroids.gameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  gameView.prototype = {
    start: function () {


      setInterval(function () {
        this.game.step();
        this.game.draw(this.ctx);
      }, 20);
    },

    bindKeyHandlers: function () {

    }
  };

})();
