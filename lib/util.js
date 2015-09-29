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
    separationNorm: function (vec1, vec2) {
      var xMag = Math.abs(vec1[0] - vec2[0]);
      var yMag = Math.abs(vec1[1] - vec2[1]);
      return Math.sqrt(Math.pow(xMag, 2) + Math.pow(yMag, 2));
    },


    randomVec: function (length) {
      var x = window.Asteroids.Util.randomDir() * length * Math.random();
      var y = window.Asteroids.Util.randomDir() * length * Math.random();
      return [x, y];
    }
  };

  // debugger;
})();
