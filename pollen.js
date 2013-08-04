// Import required classes
var Bitmap = lightcycle.graphics.Bitmap;
var Color = lightcycle.graphics.Color;
var BitGrid = lightcycle.datastructure.BitGrid;

// Default settings
var ON_COLOR = new Color(172, 221, 172, 255);
var OFF_COLOR = new Color(64, 64, 64, 255);
var DENSITY = 0.1;

function addRandomCells(points, state, n) {
  for (var i = 0; i < n;) {
    var x = rand(0, state.width - 1);
    var y = rand(0, state.height - 1);
    if (!state.get(x, y)) {
      state.set(x, y, true);
      points.push([x, y]);
      i++;
    }
  }
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function move(bitmap, state, point, dx, dy) {
  var x = point[0];
  var y = point[1];
  var newx = x + dx;
  while (newx < 0) newx += bitmap.imageData.width;
  while (newx >= bitmap.imageData.width) newx -= bitmap.imageData.width;
  var newy = y + dy;
  while (newy < 0) newy += bitmap.imageData.height;
  while (newy >= bitmap.imageData.height) newy -= bitmap.imageData.height;
  if (!state.get(newx, newy)) {
    state.set(x, y, false);
    state.set(newx, newy, true);
    point[0] = newx;
    point[1] = newy;
  }
}

function step(bitmap, points, state, n) {
  for (var i = 0; i < n; i++) {
    var point = points[rand(0, points.length - 1)];
    var x1 = point[0] + 1;
    if (x1 == bitmap.imageData.width) x1 = 0;
    var y1 = point[1] + 1;
    if (y1 == bitmap.imageData.height) y1 = 0;
    if (!state.get(x1, point[1])) {
      if (state.get(point[0], y1)) {
        move(bitmap, state, point, 0, 1);
      } else {
        move(bitmap, state, point, rand(-1, 1), 1);
      }
    }
  }
}

function paintbitmap(state, bitmap) {
  for (var x = 0; x < bitmap.imageData.width; x++) {
    for (var y = 0; y < bitmap.imageData.height; y++) {
      bitmap.setpixel(x, y, state.get(x, y)?ON_COLOR:OFF_COLOR);
    }
  }
}

function init() {
  // Get canvas element
  var canvas = document.getElementById("canvas");

  // Create bitmap
  var bitmap = new Bitmap(canvas);

  // Create bit array
  var state = new BitGrid(canvas.width, canvas.height);

  // Create cells
  var points = [];
  addRandomCells(points, state, canvas.width * canvas.height * DENSITY);

  // Start process
  var start = new Date().getTime();
  function draw() {
    requestAnimationFrame(draw);
    paintbitmap(state, bitmap);
    bitmap.draw();
    step(bitmap, points, state, 100000);
  };
  draw();
}