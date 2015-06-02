"use strict";

var Style = require('../Style');

module.exports = class Dot {
	constructor(position, style) {
		this.position = position;
		this.style = new Style(style);
	}
	get priority() {
		return [1,this.position.values.reduce(function(res, val) {
			return res + val;
		}, 0)];
	}
	draw(context, projection) {
		context.beginPath();
		context.fillStyle = this.style.stroke.color;
		var pos = projection(this.position);
		if(this.style.stroke.cap === "round"){
			context.arc(pos.get(0), pos.get(1), this.style.stroke.width/2, 0, 2 * Math.PI);
		}
		context.fill();
		context.closePath();
	}
};
