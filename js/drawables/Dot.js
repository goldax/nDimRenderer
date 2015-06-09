"use strict";

var Style = require("../Style");

module.exports = class Dot extends require("./Drawable") {
	constructor(position, style) {
		super();
		this.position = position;
		this.style = new Style(style);
	}
	get priority() {
		return [this.style.priority, 1, this.position.values.reduce(function(res, val) {
			return res + val;
		}, 0)];
	}
	draw(context, projection) {
		if(+this.style.hidden) {
			return;
		}
		var width = this.style.stroke.width;
		if(!width)
			return;
		context.beginPath();
		context.fillStyle = this.style.stroke.color;
		var pos = projection(this.position);
		if(this.style.stroke.cap === "round") {
			context.arc(pos.get(0), pos.get(1), width / 2, 0, 2 * Math.PI);
		}
		else {
			context.rect(pos.get(0) - (width / 2), pos.get(1) - (width / 2), width, width);
		}
		context.fill();
		context.closePath();
	}
};
