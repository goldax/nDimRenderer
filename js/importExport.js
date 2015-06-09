"use strict";

var Triangle = require("./drawables/Triangle"),
	Vector = require("./Vector"),
	Style = require("./Style");

module.exports = function importOBJ(data) {
	var lines = data.split("\n"),
		faceLines = [],
		verts = [],
		faces = [];

	var style = new Style();

	for(let line of lines) {
		line = line.split(/\s+/);
		if(line[0] === "v") {
			let array = line.slice(1);
			verts.push(new Vector(array));
		}
		else if(line[0] === "f") {
			let invalidVerts = false,
				vectors = line.slice(1).map(function(val) {
					var key = val.split("/")[0] - 1;
					return(invalidVerts = key >= verts.length) ? key : verts[key];
				});
			if(invalidVerts) {
				faceLines.push(vectors);
			}
			else
				faces.push(new Triangle(vectors, style));
		}
	}
	for(let line of faceLines) {
		faces.push(new Triangle(line.map(function(val) {
			return val instanceof Vector ? val : verts[val];
		})));
	}
	return faces;
};
