"use strict";

var canvasManager = require("./canvasManager"),
	CoordinateSystem = require("./CoordinateSystem"),
	Dot = require('./drawables/Dot'),
	Line = require('./drawables/Line'),
	Triangle = require('./drawables/Triangle'),
	Vector = require('./Vector');

var ecken = [];
var dim = 3;
for(var i = 0; i < Math.pow(2, dim); i++) {
	let key = i.toString(2);
	ecken.push(new Vector(key.split("")));
}

for(var i = 0; i < dim; i++) {

}

canvasManager.coord = new CoordinateSystem([
	new Vector(5, 0),
	new Vector(0, 5),
	new Vector(2, 2),
	new Vector(-2, 4)
]);
