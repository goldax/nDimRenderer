"use strict";

var Vector = require('./Vector');

module.exports = class CordinateSystem {
	constructor(axes) {
		this.axes = [];
		for(let axis of axes) {
			if(axis.dim < 2) {
				throw new TypeError("Axes need at least 2 dimensions.");
			}
			this.axes.push(axis);
		}
	}

	project(vec) {
		var that = this;
		return vec.values.reduce(function(res, val, i) {
			if(i >= that.axes.length) {
				return res;
			}
			return res.add(that.axes[i].clone().scale(val));
		}, new Vector(0, 0));
	}
};
