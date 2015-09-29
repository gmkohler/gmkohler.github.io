(function() {
  if (typeof window.Asteroids === "undefined") {
    var Asteroids = window.Asteroids = {};
  }

  var Ship = window.Asteroids.Ship = function (game, pos) {
    var args = {
      game: game,
      pos: pos,
      vel: [0, 0],
      radius: Ship.RADIUS,
      color: Ship.COLOR
    };

    window.Asteroids.movingObject.call(this, args);
    this.dir = [0, -1];
  };

  Ship.COLOR = "#0000FF";
  Ship.POINTER_COLOR = "#FF0000";
  Ship.RADIUS = 15;
  Ship.D_THETA = Math.PI / 8;

  window.Asteroids.Util.inherits(
    window.Asteroids.Ship,
    window.Asteroids.movingObject
  );

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.power = function (direction) {
    var impulse = [this.dir[0] * direction, this.dir[1] * direction];
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.rotate = function (direction) {
    var theta = direction * Ship.D_THETA;
    var newX = (this.dir[0]*Math.cos(theta) + this.dir[1]*Math.sin(theta));
    var newY = (-this.dir[0]*Math.sin(theta) + this.dir[1]*Math.cos(theta));

    // if (newY > 1) {newY = 1;}
    // if (newX > 1) {newX = 1;}
    // if (newY < -1) {newY = -1;}
    // if (newX < -1) {newX = -1;}

    this.dir = [newX, newY];
  };

  Ship.prototype.fireBullet = function () {
    // that = this;
    this.game.addBullet(new window.Asteroids.Bullet(this.game, this));
  };

  Ship.prototype.collideWith = function (object) {
    this.relocate();
    this.game.remove(object);
  };


  Ship.prototype.draw = function (ctx) {
    var dirTheta = window.Asteroids.Util.thetaFromDir(this.dir);
    var beginArc = dirTheta + Math.PI/18;
    var endArc = dirTheta - Math.PI/18;
    // debugger;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.pos[0], this.pos[1]);
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      beginArc,
      endArc,
      false
    );
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = Ship.POINTER_COLOR;
    ctx.beginPath();
    ctx.moveTo(this.pos[0], this.pos[1]);
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      beginArc,
      endArc,
      true
    );
    ctx.fill();
    ctx.closePath();
  };

})();
