"use strict";

const defaultStyle = {
	fill: "transparent",
	stroke: {
		color: "#000",
		width: 1,
		cap: "round"
	}
};

module.exports = class Style {
	constructor(style) {
		if(style instanceof Style) {
			return style;
		}
		mergeObject(style, defaultStyle, this);
	}
};

function mergeObject(obj, preset, target) {
	var res = target || {};
	if(obj === null || typeof obj !== "object") {
		obj = {};
	}
	for(let key in preset) {
		if(typeof preset[key] === "object") {
			res[key] = mergeObject(obj[key], preset[key]);
		}
		else {
			res[key] = key in obj ? obj[key] : preset[key];
		}
	}
	return res;
}
