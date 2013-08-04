// A class for basic pixel graphics

// Setup namespace
var lightcycle = lightcycle || {};
lightcycle.graphics = lightcycle.graphics || {};
var ns = lightcycle.graphics;

// Constructor
ns.Bitmap = function(canvas) {
	this.context = canvas.getContext("2d");
  this.imageData = this.context.getImageData(0, 0, canvas.width, canvas.height);
}

// Class methods
ns.Bitmap.prototype.constructor = ns.Bitmap;

ns.Bitmap.prototype.setpixel = function(x, y, color) {
  index = (x + y * this.imageData.width) * 4;
  this.imageData.data[index+0] = color.red;
  this.imageData.data[index+1] = color.green;
  this.imageData.data[index+2] = color.blue;
  this.imageData.data[index+3] = color.alpha;
}

ns.Bitmap.prototype.getpixel = function(x, y) {
  i = (x + y * this.imageData.width) * 4;
  return new Color(
  	this.imageData.data[i+0],
  	this.imageData.data[i+1],
  	this.imageData.data[i+2],
  	this.imageData.data[i+3]);
}

ns.Bitmap.prototype.clear = function(color) {
	for (var i = 0; i < this.imageData.data.length; i += 4) {
    this.imageData.data[i+0] = color.red;
    this.imageData.data[i+1] = color.green;
    this.imageData.data[i+2] = color.blue;
    this.imageData.data[i+3] = color.alpha;
  }
}

ns.Bitmap.prototype.draw = function() {
	this.context.putImageData(this.imageData, 0, 0);
}