(function () {

  if (typeof window.Asteroids === "undefined") {
    var Asteroids = window.Asteroids = {};
  }

  var movingObject = window.Asteroids.movingObject = function (args) {
    // debugger;
    this.game = args.game;
    this.pos = args.pos;
    this.vel = args.vel;
    this.radius = args.radius;
    this.color = args.color;
  };

  window.Asteroids.movingObject.prototype = {

    move: function () {
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
      this.pos = this.game.wrap(this.pos);
    },

    draw: function(ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();

      ctx.arc(
        this.pos[0],
        this.pos[1],
        this.radius,
        0,
        2 * Math.PI,
        false
      );

      ctx.fill();
    },

    isCollidedWith: function (obj2) {
      var sep = window.Asteroids.Util.separationNorm(this.pos, obj2.pos);

      if (sep < (this.radius + obj2.radius)) {
        return true;
      } else {
        return false;
      }
    },

    collideWith: function (obj2) {
      // this.game.remove(this);
      // this.game.remove(obj2);
    }

  };

  // debugger;
})();
