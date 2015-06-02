"use strict";

var canvasManager = require("./canvasManager"),
	CoordinateSystem = require("./CoordinateSystem"),
	Dot = require('./drawables/Dot'),
	Line = require('./drawables/Line'),
	Vector = require('./Vector');

canvasManager.addObject(new Dot(new Vector(20, 40, 0, 0)));
canvasManager.addObject(new Dot(new Vector(40, 40, 0, 0)));
canvasManager.addObject(new Dot(new Vector(40, 20, 0, 0)));
canvasManager.addObject(new Dot(new Vector(20, 20, 0, 0)));
canvasManager.addObject(new Dot(new Vector(20, 40, 20, 0)));
canvasManager.addObject(new Dot(new Vector(40, 40, 20, 0)));
canvasManager.addObject(new Dot(new Vector(40, 20, 20, 0)));
canvasManager.addObject(new Dot(new Vector(20, 20, 20, 0)));

for(var i = 0; i < 200; i++) {
	canvasManager.addObject(new Dot(new Vector(Math.random() * 100-50, Math.random() * 100-50, Math.random() * 100-50, Math.random() * 100-50)));
}

//y dir
canvasManager.addObject(new Line(new Vector(40, 40, 0, 0), new Vector(40, 20, 0, 0)));
canvasManager.addObject(new Line(new Vector(20, 40, 0, 0), new Vector(20, 20, 0, 0)));
canvasManager.addObject(new Line(new Vector(40, 40, 20, 0), new Vector(40, 20, 20, 0)));
canvasManager.addObject(new Line(new Vector(20, 40, 20, 0), new Vector(20, 20, 20, 0)));
//x dir
canvasManager.addObject(new Line(new Vector(40, 40, 0, 0), new Vector(20, 40, 0, 0)));
canvasManager.addObject(new Line(new Vector(40, 40, 20, 0), new Vector(20, 40, 20, 0)));
canvasManager.addObject(new Line(new Vector(40, 20, 0, 0), new Vector(20, 20, 0, 0)));
canvasManager.addObject(new Line(new Vector(40, 20, 20, 0), new Vector(20, 20, 20, 0)));
//z dir
canvasManager.addObject(new Line(new Vector(40, 20, 0, 0), new Vector(40, 20, 20, 0)));
canvasManager.addObject(new Line(new Vector(40, 40, 0, 0), new Vector(40, 40, 20, 0)));
canvasManager.addObject(new Line(new Vector(20, 20, 0, 0), new Vector(20, 20, 20, 0)));
canvasManager.addObject(new Line(new Vector(20, 40, 0, 0), new Vector(20, 40, 20, 0)));

canvasManager.coord = new CoordinateSystem([
	new Vector(5, 0),
	new Vector(0, 5),
	new Vector(2, 2),
	new Vector(-2, 4)
]);
