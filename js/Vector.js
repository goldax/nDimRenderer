"use strict";

class Vector {
	constructor(input) {
		if(Array.isArray(input) || input instanceof Float64Array) {
			this.values = input;
		}
		else if(input instanceof Vector) {
			this.values = input.values instanceof Float64Array ? new Float64Array(input.values.buffer.slice()) : input.values.slice();
		}
		else {
			this.values = Array.prototype.slice.call(arguments);
		}
	}
	get length() {
		return Math.sqrt(this.lengthSquare);
	}
	get lengthSquare() {
		return this.reduce(function(sum, val) {
			return sum + val * val;
		}, 0);
	}
	get manhattenLength() {
		return this.reduce(function(sum, val) {
			return sum + val;
		}, 0);
	}
	get absManhattenLength() {
		return this.reduce(function(sum, val) {
			return sum + Math.abs(val);
		}, 0);
	}
	get dim() {
		return this.values.length;
	}
	get(index) {
		return this.values[index];
	}
	set(index, val) {
		if(typeof index === "number") {
			this.values[index] = val;
		}
		else if(typeof index === "object" && index !== null && Symbol.iterator in index) {
			this.values.length = 0;
			for(let a of index) {
				this.values.push(a);
			}
		}
		else {
			throw new TypeError("set requires either an index-value-pair or a new values array.");
		}
		return this;
	}
	clone() {
		return new Vector(this);
	}
	add(vec) {
		dimensionTest(this, vec);
		for(var i = 0; i < this.values.length; i++) {
			this.values[i] += vec.values[i];
		}
		return this;
	}
	dot(vec) {
		dimensionTest(this, vec);
		return this.reduce(function(sum, val, i) {
			return sum + val * vec.values[i];
		}, 0);
	}
	scale(fac) {
		if(isNaN(+fac)) {
			throw new TypeError("Factor is not a number.");
		}
		for(var i = 0; i < this.values.length; i++) {
			this.values[i] *= fac;
		}
		return this;
	}

	reduce(fun, init) {
		for (var i = 0; i < this.values.length; i++) {
			init = fun(init, this.values[i], i);
		}
		return init;
	}

	get normalized() {
		return this.clone().normalize();
	}
	normalize() {
		return this.scale(1 / this.length);
	}
	toString() {
		return `[${this.dim}(${this.values.join(", ")})]`;
	}
	static interpolate(from, to, fac) {
		return from.clone().scale(1 - fac).add(to.clone().scale(fac));
	}
}

function dimensionTest(vec1, vec2) {
	if(vec1.dim !== vec2.dim) {
		throw new TypeError("Dimensions are not equal in size.");
	}
	return true;
}
module.exports = Vector;
