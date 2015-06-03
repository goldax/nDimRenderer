"use strict";

var canvasManager = require("./canvasManager"),
	CoordinateSystem = require("./CoordinateSystem"),
	Dot = require('./drawables/Dot'),
	Line = require('./drawables/Line'),
	Triangle = require('./drawables/Triangle'),
	Vector = require('./Vector');

canvasManager.addObject(new Triangle([
	new Vector(10, 10, 10),
	new Vector(10, 0, 10),
	new Vector(0, 0, 10)
],{fill:"red"}));

canvasManager.coord = new CoordinateSystem([
	new Vector(5, 0),
	new Vector(0, 5),
	new Vector(2, 2),
	new Vector(-2, 4)
]);
