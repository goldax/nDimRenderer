"use strict";

var Dot = require('./drawables/Dot'),
	Line = require('./drawables/Line'),
	Triangle = require('./drawables/Triangle'),
	Vector = require('./Vector');

module.exports = function importOBJ(data) {
	var lines = data.split("\n");
	var verts = [];
	var faces = [];
	for(let line of lines) {
		line = line.split(/\s+/);
		if(line[0] === 'v') {
			let nums = line.slice(1).map(function(val) {
				return +val;
			});
			verts.push(new Vector(nums));
		}
	}
	for(let line of lines) {
		if(line.charAt(0) === 'f') {
			let nums = line.split(" ").slice(1).map(function(val) {
				return verts[val.split("/")[0]-1];
			});
			faces.push(new Triangle(nums));
		}
	}
	return faces;
};
