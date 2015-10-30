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
<<<<<<< HEAD
    this.powerDir = 0;
    this.rotateDir = 0;
    this.isAlive = true;
    this.tickCount = 0;
    this.spriteFrame = 0;

=======
>>>>>>> 2b363fa07aee22963563a423006ba06defca595b

    window.Asteroids.movingObject.call(this, args);
    this.dir = [0, -1];
  };

  Ship.COLOR = "#FFFF00";
<<<<<<< HEAD
  Ship.ACCEL_CONSTANT = 0.1;
  Ship.RECOIL_CONSTANT = 1.5;
  Ship.POINTER_COLOR = "#FF5500";
  Ship.RADIUS = 25;
  Ship.D_THETA = Math.PI / 32;
  Ship.SPRITE_SIZE = 85;
  Ship.EXPLOSION_SPRITE_SIZE = 128;
  Ship.EXPLOSION_SPRITE_GRID_SIZE = 4;
  Ship.NUM_EXPLOSION_SPRITES = 16;
  Ship.TICKS_PER_FRAME = 3;
  Ship.DENSITY = 0.5;
=======
  Ship.POINTER_COLOR = "#FF6600";
  Ship.RADIUS = 15;
  Ship.D_THETA = Math.PI / 8;
>>>>>>> 2b363fa07aee22963563a423006ba06defca595b

  window.Asteroids.Util.inherits(
    window.Asteroids.Ship,
    window.Asteroids.movingObject
  );

  Ship.prototype.relocate = function () {
<<<<<<< HEAD
    this.isAlive = true;
=======
>>>>>>> 2b363fa07aee22963563a423006ba06defca595b
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.power = function (direction) {
    var impulse = [this.dir[0] * direction, this.dir[1] * direction];
<<<<<<< HEAD
    this.vel[0] += Ship.ACCEL_CONSTANT * impulse[0];
    this.vel[1] += Ship.ACCEL_CONSTANT * impulse[1];
  };

  Ship.prototype.stopPower = function () {
    this.powerDir = 0;
=======
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
>>>>>>> 2b363fa07aee22963563a423006ba06defca595b
  };

  Ship.prototype.rotate = function (direction) {
    var theta = direction * Ship.D_THETA;
<<<<<<< HEAD
    var newDir = window.Asteroids.Util.rotateByTheta(this.dir, theta);
    var newVel = window.Asteroids.Util.rotateByTheta(this.vel, theta);
    // var newX = (this.dir[0]*Math.cos(theta) + this.dir[1]*Math.sin(theta));
    // var newY = (-this.dir[0]*Math.sin(theta) + this.dir[1]*Math.cos(theta));

    // maybe a bug with finer d_theta: normalizing dir.
    this.dir = newDir;
    this.vel = newVel;
  };

  Ship.prototype.explode = function () {
    this.game.score -= 5;
    this.isAlive = false;
    this.vel = [0, 0];
    this.tickCount = 0;
  };

  Ship.prototype.stopRotate = function () {
    this.rotateDir = 0;
=======
    var newX = (this.dir[0]*Math.cos(theta) + this.dir[1]*Math.sin(theta));
    var newY = (-this.dir[0]*Math.sin(theta) + this.dir[1]*Math.cos(theta));

    // maybe a bug with finer d_theta: normalizing dir.
    this.dir = [newX, newY];
>>>>>>> 2b363fa07aee22963563a423006ba06defca595b
  };

  Ship.prototype.fireBullet = function () {
    this.game.addBullet(new window.Asteroids.Bullet(this.game, this));
    this.recoil();
  };

  Ship.prototype.recoil = function () {
<<<<<<< HEAD

    var vB = -1 * window.Asteroids.Bullet.SPEED;
    var massRatio = window.Asteroids.Util
                    .massRatio(window.Asteroids.Bullet.RADIUS, Ship.RADIUS);

    this.vel[0] += this.dir[0] * massRatio * vB * Ship.RECOIL_CONSTANT;
    this.vel[1] += this.dir[1] * massRatio * vB * Ship.RECOIL_CONSTANT;
=======
    var vB = -1 * window.Asteroids.Bullet.SPEED;
    var massRatio = Math.pow(window.Asteroids.Bullet.RADIUS, 3)/
                      Math.pow(Ship.RADIUS, 3);
    this.vel[0] += this.dir[0] * massRatio * vB;
    this.vel[1] += this.dir[1] * massRatio * vB;
>>>>>>> 2b363fa07aee22963563a423006ba06defca595b
  };

  Ship.prototype.collideWith = function (object) {
    this.relocate();
    this.game.remove(object);
  };


  Ship.prototype.draw = function (ctx) {
<<<<<<< HEAD
    var img = new Image();
    if (this.isAlive) {

      img.src = 'assets/spaceship.png';
      this.rotate(this.rotateDir);
      this.power(this.powerDir);
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
   } else {
     img = new Image();
     img.src = 'assets/explosion.png';
     ctx.drawImage(
       img,         // source image object
       Ship.EXPLOSION_SPRITE_SIZE * (this.spriteFrame % Ship.EXPLOSION_SPRITE_GRID_SIZE),          // source x
       Ship.EXPLOSION_SPRITE_SIZE * Math.floor(this.spriteFrame / Ship.EXPLOSION_SPRITE_GRID_SIZE),           // source y
       Ship.EXPLOSION_SPRITE_SIZE,         // source width
       Ship.EXPLOSION_SPRITE_SIZE,         // source height
       this.pos[0] - this.radius, // destination x
       this.pos[1] - this.radius, // destination y
       (2 * this.radius) * 1.5,         // desitnation width
       (2 * this.radius) * 1.5          // destination height
     );
     this.tickCount += 1;
     if (this.tickCount > Ship.TICKS_PER_FRAME) {
       this.tickCount = 0;
       this.spriteFrame += 1;
     }
     if (this.spriteFrame === Ship.NUM_EXPLOSION_SPRITES) {
       this.relocate();
       this.spriteFrame = 0;
     }

   }

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
=======
    var dirTheta = window.Asteroids.Util.thetaFromDir(this.dir);
    var beginArc = dirTheta + Math.PI/18;
    var endArc = dirTheta - Math.PI/18;
    var pointerExtent =  [1.1 * this.dir[0] * this.radius,
                            1.1 * this.dir[1] * this.radius];
    var pointerEnd = [this.pos[0] + pointerExtent[0],
                        this.pos[1] + pointerExtent[1]];
    // debugger;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.pos[0], this.pos[1]);
    ctx.lineWidth = 5;
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2*Math.PI
    );
    // ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = Ship.POINTER_COLOR;
    ctx.beginPath();
    ctx.moveTo(this.pos[0], this.pos[1]);
    ctx.lineWidth = 5;
    ctx.lineTo(
      pointerEnd[0],
      pointerEnd[1]
    );
    ctx.stroke();
    ctx.closePath();
>>>>>>> 2b363fa07aee22963563a423006ba06defca595b
  };

})();
