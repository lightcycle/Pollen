// A class for representing an RGBA color

// Setup namespace
var lightcycle = lightcycle || {};
lightcycle.graphics = lightcycle.graphics || {};
var ns = lightcycle.graphics;

// Constructor
ns.Color = function(red, green, blue, alpha) {
  this.red = red;
  this.green = green;
  this.blue = blue;
  this.alpha = alpha;
}

// Class methods
ns.Color.prototype.constructor = ns.Color;

ns.Color.prototype.toString = function() {
	return "{" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + "}";
}

ns.Color.prototype.equals = function(that) {
	return (
	  that != null &&
	  that.constructor === Color &&
	  that.red === this.red &&
	  that.green === this.green &&
	  that.blue === this.blue &&
	  that.alpha === this.alpha);
}