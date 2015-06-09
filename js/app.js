"use strict";

var canvasManager = require("./canvasManager"),
	CoordinateSystem = require("./CoordinateSystem"),
	Dot = require("./drawables/Dot"),
	Line = require("./drawables/Line"),
	Triangle = require("./drawables/Triangle"),
	Vector = require("./Vector"),
	Style = require("./Style"),
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
	result[0].style.fill = "rgba(0, 0, 0, 1)";
	result[0].style.stroke.width = 0;
	var shadowStyle = new Style({
		fill: "#888",
		stroke: {
			width: 0
		},
		priority: -1
	});
	result.forEach(function(e) {
		let verts = e.vertices;
		e.vertices = verts.map(function(val) {
			return new Vector(val.values.concat(0, 0, 0));
		});
		canvasManager.addObject(e);
		let eClone = Object.create(e);
		eClone.vertices = verts.map(function(val) {
			return new Vector([0, 0, 0].concat(val.values));
		});
		eClone.style = shadowStyle;
		canvasManager.addObject(eClone);
	});
});

var dimensions = [
		new Vector(0.25, 0.25),
		new Vector(0, -1),
		new Vector(1, 0),
	],
	factor = 100,
	zero = new Vector(0, 0, 0, 0, 0, 0),
	colors = ["#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f"];

for(let i in dimensions) {
	let a = new Array(dimensions.length * 2).fill(0);
	a[i] = factor;
	canvasManager.addObject(new Line(zero, new Vector(a), {
		stroke: {
			color: colors[i]
		}
	}));
}
dimensions.push(dimensions[0], dimensions[0], dimensions[2]);
var selected = null;

document.getElementById("canvas").addEventListener("mousedown", function(e) {
	selected = null;
	for(let dim of dimensions) {
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
	selected.set([e.clientX, e.clientY]).add(canvasManager.center.clone().scale(-1)).scale(1 / factor);
}, false);

document.getElementById("canvas").addEventListener("mouseup", function(e) {
	selected = null;
}, false);

canvasManager.coord = new CoordinateSystem(dimensions);
