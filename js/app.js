"use strict";

var canvasManager = require("./canvasManager"),
	CoordinateSystem = require("./CoordinateSystem"),
	Dot = require("./drawables/Dot"),
	Line = require("./drawables/Line"),
	Triangle = require("./drawables/Triangle"),
	Vector = require("./Vector"),
	importExport = require("./importExport");

/*var ecken = [];
var dim = 3;
for(var i = 0; i < Math.pow(2, dim); i++) {
	let key = i.toString(2);
	ecken.push(new Vector(key.split("")));
}

for(var i = 0; i < dim; i++) {

}*/
fetch("/obj/deer.obj").then(function(response) {
	return response.text();
}).then(function(result) {
	console.log("Model loaded.");
	result = importExport(result);
	result[0].style.fill = "rgba(50, 50, 50, 0.5)";
	result[0].style.stroke.width = 0;
	result.forEach(function(e) {
		canvasManager.addObject(e);
	});
});

var dimensions = [
		new Vector(0.25, 0.25),
		new Vector(0, -1),
		new Vector(1, 0)
	],
	factor = 100,
	zero = new Vector(0, 0, 0);

canvasManager.addObject(new Line(zero, new Vector(factor, 0, 0), {
	stroke: {
		color: "#f00"
	}
}));
canvasManager.addObject(new Line(zero, new Vector(0, factor, 0), {
	stroke: {
		color: "#0f0"
	}
}));
canvasManager.addObject(new Line(zero, new Vector(0, 0, factor), {
	stroke: {
		color: "#00f"
	}
}));


var selected = null;

document.getElementById("canvas").addEventListener("mousedown", function(e) {
	selected = null;
	for (let dim of dimensions) {
		let dist = new Vector(e.clientX, e.clientY).add(canvasManager.center.clone().scale(-1)).add(dim.clone().scale(-factor));
		if(dist.lengthSquare < 100) {
			selected = dim;
			break;
		}
	}
}, false);

document.getElementById("canvas").addEventListener("mousemove", function(e) {
	if(!selected) {
		return;
	}
	selected.set([e.clientX, e.clientY]).add(canvasManager.center.clone().scale(-1)).scale(1/factor);
}, false);

document.getElementById("canvas").addEventListener("mouseup", function(e) {
	selected = null;
}, false);

canvasManager.coord = new CoordinateSystem(dimensions);
