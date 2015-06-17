var _ = require('lodash');

function Grid(grid) {
	this.grid = grid;
}

Grid.prototype.getGridSize = function () {
	var rows = this.grid.length,
		cols = this.grid[0].length;
		
	return {rows: rows, cols: cols};
};

Grid.prototype.isAlive = function (row, col) {
	return this.getCell(row, col) === 1;
};

Grid.prototype.getCell = function (row, col) {
	try {
		return this.grid[row][col];
	} catch (e) {
		return 0;
	}
};

Grid.prototype.getAliveNeighbours = function (row, col) {
	var neighbours = [];
	
	neighbours.push(this.getCell(row - 1, col));
	neighbours.push(this.getCell(row, col - 1));
	neighbours.push(this.getCell(row + 1, col));
	neighbours.push(this.getCell(row, col + 1));
	neighbours.push(this.getCell(row + 1, col + 1));
	neighbours.push(this.getCell(row - 1, col - 1));
	neighbours.push(this.getCell(row + 1, col - 1));
	neighbours.push(this.getCell(row - 1, col + 1));
	
	return _.sum(neighbours);
};


module.exports = Grid;