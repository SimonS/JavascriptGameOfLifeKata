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
		})
	});
});