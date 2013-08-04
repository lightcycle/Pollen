// A class for representing a 2-dimensional grid of bits

// Setup namespace
var lightcycle = lightcycle || {};
lightcycle.datastructure = lightcycle.datastructure || {};
var ns = lightcycle.datastructure;

// Constructor
ns.BitGrid = function(width, height) {
  this.width = width;
  this.height = height;
  this.values = [];
  for (var i = 0; i < Math.ceil(width * height / 32); i++) {
    this.values[i] = 0;
  }
}

// Class methods
ns.BitGrid.prototype.constructor = ns.BitGrid;

ns.BitGrid.prototype.get = function(x, y) {
  var index = x * this.height + y;
  var arrindex = Math.floor(index / 32);
  return !!(this.values[arrindex] & (1 << index - arrindex * 32));
}

ns.BitGrid.prototype.set = function (x, y, value) {
  var index = x * this.height + y;
  var arrindex = Math.floor(index / 32);
// Since "undefined | 1 << index" is equivalent to "0 | 1 << index" we do not need to initialise the array explicitly here.
  if (value) {
    this.values[arrindex] |= 1 << index - arrindex * 32;
  } else {
    this.values[arrindex] &= ~(1 << index - arrindex * 32);
  }
};