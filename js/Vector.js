"use strict";

class Vector {
	constructor(input) {
		if(Array.isArray(input)) {
			this.values = input;
		}
		else if(input instanceof Vector) {
			this.values = input.values.map(function(v) {
				return v;
			});
		}
		else {
			this.values = Array.prototype.slice.call(arguments, 0);
		}
	}
	get length() {
		return Math.sqrt(this.lengthSquare);
	}
	get lengthSquare() {
		return this.values.reduce(function(sum, val) {
			return sum + val * val;
		}, 0);
	}
	get manhattenLength() {
		return this.values.reduce(function(res, val) {
			return res + val;
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
			throw new TypeError("Das läuft hier alles nicht iwi.");
		}
	}
	clone() {
		return new Vector(this);
	}
	add(vec) {
		dimensionTest(this, vec);
		this.values.forEach(function(val, i) {
			this[i] += vec.values[i];
		}, this.values);
		return this;
	}
	dot(vec) {
		dimensionTest(this, vec);
		return this.values.reduce(function(sum, val, i) {
			return sum + val * vec.values[i];
		}, 0);
	}
	scale(fac) {
		if(isNaN(+fac)) {
			throw new TypeError("Factor is not a number.");
		}
		this.values.forEach(function(val, i) {
			this[i] *= fac;
		}, this.values);
		return this;
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
