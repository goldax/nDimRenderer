"use strict";

var canvasManager = require("./canvasManager"),
	CoordinateSystem = require("./CoordinateSystem"),
	Dot = require('./drawables/Dot'),
	Line = require('./drawables/Line'),
	Triangle = require('./drawables/Triangle'),
	Vector = require('./Vector'),
	importExport = require("./importExport");

/*var ecken = [];
var dim = 3;
for(var i = 0; i < Math.pow(2, dim); i++) {
	let key = i.toString(2);
	ecken.push(new Vector(key.split("")));
}

for(var i = 0; i < dim; i++) {

}*/
fetch("/obj/dragon.obj").then(function(response) {
	return response.text();
}).then(function(result) {
	importExport(result).forEach(function(e) {
		canvasManager.addObject(e);
	});
});

canvasManager.coord = new CoordinateSystem([
	new Vector(400, 0),
	new Vector(0, -400),
	new Vector(0, 0),
	new Vector(-2, 4)
]);
