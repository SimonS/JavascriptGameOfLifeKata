/* global it */
/* global describe */
var assert = require('assert');

var gameOfLife = require('../lib/GameOfLife');

describe('GameOfLife', function () {
	describe('#evolve', function () {
		it('should return a dead grid when given a dead grid', function () {
			var result = gameOfLife.evolve([[0]]);
			assert.deepEqual([[0]], result);
		});
		
		it('should kill a single cell', function () {
			var result = gameOfLife.evolve([[1]]);
			assert.deepEqual([[0]], result);
		});
		
		it('should handle multiple columns and rows', function () {
			var result = gameOfLife.evolve([[0, 1], [0, 0]]);
			assert.deepEqual([[0, 0], [0, 0]], result);
		});

		it('should persist two neighbour cells horizontally', function () {
			var result = gameOfLife.evolve([[0, 0, 0], [1, 1, 1], [0, 0, 0]]);
			assert.deepEqual([[0, 0, 0], [0, 1, 0], [0, 0, 0]], result);
		});
		
		it('should persist two neighbour cells vertically', function () {
			var result = gameOfLife.evolve([[0, 1, 0], [0, 1, 0], [0, 1, 0]]);
			assert.deepEqual([[0, 0, 0], [0, 1, 0], [0, 0, 0]], result);
		});
		
		it('should only persist if it is alive in the first place', function () {
			var result = gameOfLife.evolve([[0, 1, 0], [0, 0, 0], [0, 1, 0]]);
			assert.deepEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]], result);
		});
	});
});