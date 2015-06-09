"use strict";

var Vector = require("../Vector"),
	Style = require("../Style");

module.exports = class Triangle extends require("./Drawable") {
	constructor(verts, style) {
		super();
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
		return [this.style.priority, -1, verts[0].clone().add(verts[1]).add(verts[2]).scale(1 / 3).manhattenLength];
	}
	draw(context, projection) {
		context.beginPath();
		var pos1 = projection(this.vertices[0]),
			pos2 = projection(this.vertices[1]),
			pos3 = projection(this.vertices[2]);
		context.moveTo(pos1.get(0), pos1.get(1));
		context.lineTo(pos2.get(0), pos2.get(1));
		context.lineTo(pos3.get(0), pos3.get(1));
		context.lineTo(pos1.get(0), pos1.get(1));
		var width = this.style.stroke.width,
			fill = this.style.fill;
		if(width) {
			context.strokeStyle = this.style.stroke.color;
			context.lineWidth = width;
			context.lineCap = this.style.stroke.cap;
			context.stroke();
		}
		if(fill !== "transparent") {
			context.fillStyle = this.style.fill;
			context.fill();
		}
		context.closePath();
	}
};
