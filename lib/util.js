(function () {

  if (typeof window.Asteroids === "undefined") {
     var Asteroids = window.Asteroids = {};
  }

  // debugger;

  window.Asteroids.Util = {
    inherits: function (ChildClass, ParentClass) {
      function Surrogate () {}
      Surrogate.prototype = ParentClass.prototype;
      ChildClass.prototype = new Surrogate();
      ChildClass.prototype.constructor = ChildClass;
    },

    randomDir: function () {
      return [1, -1][Math.floor(Math.random() * 2)];
    },

    separationVec: function (vec1, vec2) {
      return [Math.abs(vec1[0] - vec2[0]), Math.abs(vec1[1] - vec2[1])];
    },

    norm: function(vec) {
      return Math.sqrt(Math.pow(vec[0], 2) + Math.pow(vec[1], 2));
    },

    normalize: function(vec) {
      var norm = this.norm(vec);
      if (norm === 0) {
        return [0, 0];
      } else {
        return [vec[0]/norm, vec[1]/norm];
      }
    },

    separationNorm: function (vec1, vec2) {
      var xMag = Math.abs(vec1[0] - vec2[0]);
      var yMag = Math.abs(vec1[1] - vec2[1]);
      return Math.sqrt(Math.pow(xMag, 2) + Math.pow(yMag, 2));
    },

    normalizedSepVec: function (vec1, vec2) {
      var norm = this.separationNorm(vec1, vec2);
      return [(vec2[0]-vec1[0])/norm, (vec2[1]-vec1[1])/norm];
    },

    perpendicularDirs: function (normedVec) {
      var dir1 = [normedVec[1], -1*normedVec[0]];
      var dir2 = [-1*normedVec[1], normedVec[0]];
      return [dir1, dir2];
    },

    thetaFromDir: function(dir) {
      return Math.atan2(dir[1], dir[0]);
    },

    rotateByTheta: function(vec, theta) {
      return [vec[0]*Math.cos(theta) + vec[1]*Math.sin(theta),
              -1 * vec[0] * Math.sin(theta) + vec[1]*Math.cos(theta)];
    },

    randomVec: function (length) {
      var x = window.Asteroids.Util.randomDir() * length * Math.random();
      var y = window.Asteroids.Util.randomDir() * length * Math.random();
      return [x, y];
    },

    massRatio: function (littleR, bigR) {
      return Math.pow(littleR, 2)/Math.pow(bigR, 2);
    }
  };

  // debugger;
})();
