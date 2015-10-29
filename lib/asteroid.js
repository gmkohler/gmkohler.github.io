(function () {
  // debugger;
  if (typeof window.Asteroids === 'undefined') {
    var Asteroids = window.Asteroids = {};
  }

  var Asteroid = window.Asteroids.Asteroid = function (game, pos, rank, vel) {
    vel = vel || window.Asteroids.Util.randomVec(Asteroid.INIT_SPEED);
      var args = {
          game: game,
          pos: pos,
          vel: vel,
          radius: Asteroid.RADII[rank],
          color: Asteroid.COLORS[rank]
      };
      this.rank = rank;
      this.spriteFrame = 0;
      this.tickCount = 0;


      window.Asteroids.movingObject.call(this, args);
  };


  Asteroid.COLORS = ["#555599", "#7777AA","#AAAAEE"];
  Asteroid.RADII = [80, 40, 20];
  Asteroid.INIT_SPEED = 3;
  Asteroid.MAX_RANK = 2;
  Asteroid.SPRITE_SIZE = 128;
  Asteroid.SPRITE_GRID_SIZE = 8;
  Asteroid.TICKS_PER_FRAME = [6, 3, 1];

  window.Asteroids.Util.inherits(
    window.Asteroids.Asteroid,
    window.Asteroids.movingObject
  );


  Asteroid.prototype.collideWith = function (obj2) {
    if (obj2 instanceof window.Asteroids.Ship) {
      obj2.relocate();
    } else if (obj2 instanceof window.Asteroids.Bullet) {
      this.game.remove(obj2);
      this.breakUp(obj2);
    }
  };

  Asteroid.prototype.breakUp = function (bullet) {
    var util = window.Asteroids.Util;
    // Steps:
    // check for size of own asteroid: if not the smallest, make two more:
    if (this.rank < Asteroid.MAX_RANK) {
    // Determine initial impact
      var massRatio = util.massRatio(bullet.radius, this.radius),
          bulletSpeed = util.norm(bullet.vel),
          bulletVelDir = util.normalize(bullet.vel),
          impartedSpeed =  massRatio * bulletSpeed,
          collisionVec = util.normalizedSepVec(bullet.pos, this.pos);

     var impartDir = [collisionVec[0] * bulletVelDir[0],
                         collisionVec[1] * bulletVelDir[1]];

      var bigAsteroidVel = [this.vel[0] + impartedSpeed*impartDir[0],
                             this.vel[1] + impartedSpeed*impartDir[1]],
          newDirs = util.perpendicularDirs(collisionVec);


      newVel1 = [bigAsteroidVel[0] + newDirs[0][0] * 80 * impartedSpeed,
                 bigAsteroidVel[1] + newDirs[0][1] * 80 * impartedSpeed];

      newVel2 = [bigAsteroidVel[0] + newDirs[1][0] * 80 * impartedSpeed,
                 bigAsteroidVel[1] + newDirs[1][1] * 80  * impartedSpeed];

      // // make new positions be center + radius*newVel
      // var newPos1 = [this.pos[0],
      //               this.pos[1]];
      // var newPos2 = [this.pos[0],
      //                this.pos[1]];


      var ast1 = new Asteroid(this.game, this.pos, this.rank + 1, newVel1);
      var ast2 = new Asteroid(this.game, this.pos, this.rank + 1, newVel2);
      // var ast2 = new Asteroid(this.game, this.pos, this.rank + 1, newVel2);

      this.game.addAsteroids([ast1, ast2]);
    }


    // remove the original asteroid whether or not new ones were created.
    this.game.remove(this);
  };

  Asteroid.prototype.draw = function (ctx) {
    var img = new Image();
    img.src = 'assets/asteroids-square.png';

    ctx.drawImage(
      img,         // source image object
      Asteroid.SPRITE_SIZE * this.spriteFrame,           // source x
      Asteroid.SPRITE_SIZE * (this.spriteFrame % Asteroid.SPRITE_GRID_SIZE),           // source y
      Asteroid.SPRITE_SIZE,         // source width
      Asteroid.SPRITE_SIZE,         // source height
      this.pos[0] - this.radius, // destination x
      this.pos[1] - this.radius, // destination y
      2 * this.radius,         // desitnation width
      2 * this.radius          // destination height
    );
    this.tickCount += 1;
    if (this.tickCount > Asteroid.TICKS_PER_FRAME[this.rank]) {
      this.tickCount = 0;
      this.spriteFrame =
        (this.spriteFrame + 1) % (Asteroid.SPRITE_GRID_SIZE - 1);
    }
  };
  // debugger;

})();
