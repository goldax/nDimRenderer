"use strict";

const defaultStyle = {
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
		style = mergeObject(style, defaultStyle);
		this.fill = style.fill || "transparent";
		this.stroke = mergeObject(style.stroke, defaultStyle.stroke);
	}
};

function mergeObject(obj, preset) {
	var res = {};
	if(obj === null || typeof obj !== "object") {
		return preset;
	}
	for(let key in preset) {
		res[key] = key in obj ? obj[key] : preset[key];
	}
	return res;
}
