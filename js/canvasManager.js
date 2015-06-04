"use strict";

var Vector = require("./Vector"),
	CoordinateSystem = require("./CoordinateSystem"),
	Drawable = require("./drawables/Drawable"),
	Queue = require("queue");

var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d");

var objects = new Set();

var center,
	coord,
	project = function project(vec) {
		return coord.project(center, vec);
	},
	output = module.exports = {
		addObject(object) {
			if(!(object instanceof Drawable)) {
				throw new TypeError("Has no draw method.");
			}
			objects.add(object);
		},
		removeObject(object) {
			objects.remove(object);
		},
		get coord() {
			return coord;
		},
		set coord(val) {
			coord = val;
		},
		get center() {
			return center;
		}
	};

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
center = new Vector(window.innerWidth / 2, window.innerHeight / 2);
console.log(window.innerWidth / 2, window.innerHeight / 2);

window.addEventListener("resize", function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	center = new Vector(window.innerWidth / 2, window.innerHeight / 2);
}, true);

function render() {
	if(output.coord instanceof CoordinateSystem) {
		var renderQueue = new Queue({
			comparator(a, b) {
				var bp = b.priority,
					ap = a.priority;
				if(bp.length !== ap.length) {
					return 0;
				}
				for(let index in a.priority) {
					if(ap[index] !== bp[index]) {
						return ap[index] - (bp[index] || 0);
					}
				}
				return 0;
			}
		});

		context.clearRect(0, 0, canvas.width, canvas.height);
		for(let obj of objects) {
			renderQueue.queue(obj);
		}

		while(renderQueue.length) {
			renderQueue.dequeue().draw(context, project);
		}
	}
		window.requestAnimationFrame(render);
}
render();
