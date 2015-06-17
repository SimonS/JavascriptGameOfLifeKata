var _ = require('lodash');

var getGridSize = function getGridSize(grid) {
	var rows = grid.length;
	var cols = grid[0].length;
	return {rows: rows, cols: cols};
};

var getNeighbours = function getNeighbours(grid, row, col) {
	var neighbours = [];
	var gridSize = getGridSize(grid);
	
	if (row > 0) {
		neighbours.push(grid[row - 1][col]);
	}
	if (col > 0) {
		neighbours.push(grid[row][col - 1]);		
	}
	if (row < gridSize.rows - 1) {
		neighbours.push(grid[row + 1][col]);
	}
	if (col < gridSize.cols - 1) {
		neighbours.push(grid[row][col + 1]);
	}
	
	return neighbours;
};

module.exports = {
	evolve: function (input) {
		var gridSize = getGridSize(input);
		var output = [];
		
		for (var row = 0; row < gridSize.rows; row++) {
			var newRow = [];
			for (var col = 0; col < gridSize.cols; col++) {
				var neighbours = getNeighbours(input, row, col);

				newCol = _.sum(neighbours) === 2 ? 1 : 0;
				newRow.push(newCol);				
			}
			output.push(newRow);
		}
		
		return output;
	}
};