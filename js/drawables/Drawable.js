"use strict";

var Style = require("../Style");

var styleSymbol = Symbol("style");

class Drawable {
	get style() {
		return this[styleSymbol];
	}
	set style(val) {
		this[styleSymbol] = new Style(val);
	}
	draw() {}
}

Drawable.prototype.priority = [0, 0];

module.exports = Drawable;
