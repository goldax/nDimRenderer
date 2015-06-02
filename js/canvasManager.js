"use strict";

var CoordinateSystem = require('./CoordinateSystem'),
	Queue = require("queue");

var canvas = document.getElementById('canvas'),
	context = canvas.getContext("2d");

var objects = new Set();
var drawSymbol = "draw";

var output = module.exports = {
	drawSymbol: drawSymbol,
	addObject(object) {
		if(typeof object[drawSymbol] !== "function") {
			throw new TypeError("Has no draw method.");
		}
		objects.add(object);
	},
	removeObject(object) {
		objects.remove(object);
	}
};

function render() {
	if(output.coord instanceof CoordinateSystem) {
		var renderQueue = new Queue({
			comparator(a, b) {
				var bp = b.priority,
					ap = a.priority;
				if(bp.length != ap.length) {
					return 0;
				}
				for(let index in a.priority) {
					if(ap[index] !== bp[index]) {
						return ap[index] - bp[index];
					}
				}
				return 0;
			}
		});

		context.clearRect(0, 0, 800, 600);
		for(let obj of objects) {
			renderQueue.queue(obj);
		}

		while(renderQueue.length) {
			renderQueue.dequeue()[drawSymbol](context, output.coord.project.bind(output.coord));
		}
	}
	window.requestAnimationFrame(render);
}
render();
