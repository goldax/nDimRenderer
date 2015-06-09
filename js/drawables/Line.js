"use strict";

var Vector = require("../Vector"),
	Style = require("../Style");

module.exports = class Line extends require("./Drawable") {
	constructor(position1, position2, style) {
		super();
		this.position1 = position1;
		this.position2 = position2;
		this.style = new Style(style);
	}
	get priority() {
		return [this.style.priority,0, Vector.interpolate(this.position1, this.position2, 0.5).reduce(function(res, val) {
			return res + val;
		}, 0)];
	}
	draw(context, projection) {
		var width = this.style.stroke.width;
		if(!width)
			return;
		context.beginPath();
		context.strokeStyle = this.style.stroke.color;
		context.lineWidth = width;
		context.lineCap = this.style.stroke.cap;
		var pos1 = projection(this.position1),
			pos2 = projection(this.position2);
		context.moveTo(pos1.get(0), pos1.get(1));
		context.lineTo(pos2.get(0), pos2.get(1));
		context.stroke();
		context.closePath();
	}
};
