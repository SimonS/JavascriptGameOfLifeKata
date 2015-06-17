var _ = require('lodash');
var Grid = require('./grid')

module.exports = {
	evolve: function (input) {
		var grid = new Grid(input);
		
		var gridSize = grid.getGridSize(input);
		var output = [];
		
		for (var row = 0; row < gridSize.rows; row++) {
			var newRow = [];
			for (var col = 0; col < gridSize.cols; col++) {
				var neighbours = grid.getAliveNeighbours(row, col);

				var newCol = neighbours === 2 ? 1 : 0;
				newRow.push(newCol);				
			}
			output.push(newRow);
		}
		
		return output;
	}
};