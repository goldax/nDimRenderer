"use strict";

var Vector = require('../Vector'),
	Style = require('Style');

module.exports = class Triangle {
	constructor(verts, style) {
		this.vertices = [];
		if(typeof verts === "object" && verts !== null && Symbol.iterator in verts) {
			for(let val of verts) {
				if(this.vertices.length >= 3 || !(val instanceof Vector)) {
					break;
				}
				this.vertices.push(val);
			}
		}
		if(this.vertices.length !== 3) {
			throw new TypeError("Triangle requires 3 Vectors.");
		}
		this.style = new Style(style);
	}
	get priority() {
		var verts = this.vertices;
		return [-1, verts[0].clone().add(verts[1]).add(verts[2]).scale(1/3).manhattenLength];
	}
	draw(context, projection) {
		context.beginPath();
		context.strokeStyle = this.style.stroke.color;
		context.lineWidth = this.style.stroke.width;
		context.lineCap = this.style.stroke.cap;
		var pos1 = projection(this.position1),
			pos2 = projection(this.position2);
		context.moveTo(pos1.get(0), pos1.get(1));
		context.lineTo(pos2.get(0), pos2.get(1));
		context.stroke();
		context.closePath();
	}
};
