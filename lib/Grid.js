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
	return this.grid[row][col] === 1;
};

Grid.prototype.getAliveNeighbours = function (row, col) {
	var neighbours = [];
	var gridSize = this.getGridSize();
	
	if (row > 0) {
		neighbours.push(this.grid[row - 1][col]);
	}
	if (col > 0) {
		neighbours.push(this.grid[row][col - 1]);		
	}
	if (row < gridSize.rows - 1) {
		neighbours.push(this.grid[row + 1][col]);
	}
	if (col < gridSize.cols - 1) {
		neighbours.push(this.grid[row][col + 1]);
	}
	
	return _.sum(neighbours);
};


module.exports = Grid;