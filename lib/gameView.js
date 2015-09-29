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
      var that = this;

      setInterval(function () {
        that.game.step();
        that.game.draw(that.ctx);
      }, 20);
    },
  };

})();
