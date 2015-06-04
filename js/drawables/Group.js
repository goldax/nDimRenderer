"use strict";

module.exports = class Group extends require("./Drawable") {
	constructor(drawables) {
		super();
		this.drawables = drawables;
	}
};
