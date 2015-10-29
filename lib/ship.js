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

  Ship.COLOR = "#FFFF00";
  Ship.POINTER_COLOR = "#FF5500";
  Ship.RADIUS = 25;
  Ship.D_THETA = Math.PI / 16;
  Ship.SPRITE_SIZE = 85;

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
    var newDir = window.Asteroids.Util.rotateByTheta(this.dir, theta);
    var newVel = window.Asteroids.Util.rotateByTheta(this.vel, theta);
    // var newX = (this.dir[0]*Math.cos(theta) + this.dir[1]*Math.sin(theta));
    // var newY = (-this.dir[0]*Math.sin(theta) + this.dir[1]*Math.cos(theta));

    // maybe a bug with finer d_theta: normalizing dir.
    this.dir = newDir;
    this.vel = newVel;
  };

  Ship.prototype.fireBullet = function () {
    this.game.addBullet(new window.Asteroids.Bullet(this.game, this));
    this.recoil();
  };

  Ship.prototype.recoil = function () {

    var vB = -1 * window.Asteroids.Bullet.SPEED;
    var massRatio = window.Asteroids.Util
                    .massRatio(window.Asteroids.Bullet.RADIUS, Ship.RADIUS);

    this.vel[0] += this.dir[0] * massRatio * vB;
    this.vel[1] += this.dir[1] * massRatio * vB;
  };

  Ship.prototype.collideWith = function (object) {
    this.relocate();
    this.game.remove(object);
  };


  Ship.prototype.draw = function (ctx) {
    var img = new Image();
    img.src = 'assets/spaceship.png';
    var dirTheta = window.Asteroids.Util.thetaFromDir(this.dir);
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(dirTheta + (Math.PI/2));
    ctx.drawImage(
      img,
      0,
      0,
      Ship.SPRITE_SIZE,
      Ship.SPRITE_SIZE,
      -1* this.radius,
      -1* this.radius,
      2 * this.radius,
      2 * this.radius
    );
    ctx.restore();


    // var beginArc = dirTheta + Math.PI/18;
    // var endArc = dirTheta - Math.PI/18;
    // var pointerExtent =  [1.1 * this.dir[0] * this.radius,
    //                         1.1 * this.dir[1] * this.radius];
    // var pointerEnd = [this.pos[0] + pointerExtent[0],
    //                     this.pos[1] + pointerExtent[1]];
    // // debugger;
    // ctx.strokeStyle = this.color;
    // ctx.moveTo(this.pos[0], this.pos[1]);
    // ctx.beginPath();
    // ctx.lineWidth = 5;
    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1],
    //   this.radius,
    //   0,
    //   2*Math.PI
    // );
    //
    // ctx.stroke();
    // ctx.closePath();
    //
    // ctx.strokeStyle = Ship.POINTER_COLOR;
    // ctx.beginPath();
    // ctx.moveTo(this.pos[0], this.pos[1]);
    // ctx.lineWidth = 5;
    // ctx.lineTo(
    //   pointerEnd[0],
    //   pointerEnd[1]
    // );
    // ctx.stroke();
    // ctx.closePath();
  };

})();
