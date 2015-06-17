/* global it */
/* global describe */
var assert = require('assert');

var gameOfLife = require('../lib/GameOfLife');

describe('GameOfLife', function () {
	describe('#evolve', function () {
		it('should return a blank grid when given a blank grid', function () {
			var result = gameOfLife.evolve([[0, 0], [0, 0]]);
			assert.deepEqual([[0, 0], [0, 0]], result);
		});
	});
});