var Grid = require('./Grid')

function nextGeneration (currentState, numberOfNeighbours) {
	if (currentState) {
		return numberOfNeighbours === 2 || numberOfNeighbours === 3;
	}
	
	return numberOfNeighbours === 3;
}

module.exports = {
	evolve: function (input) {
		var grid = new Grid(input);

		var gridSize = grid.getGridSize(input);
		var output = [];
		
		for (var row = 0; row < gridSize.rows; row++) {
			var newRow = [];
			for (var col = 0; col < gridSize.cols; col++) {
				var neighbours = grid.getAliveNeighbours(row, col);

				var newCol = nextGeneration(grid.isAlive(row, col), neighbours) ? 1 : 0;
				newRow.push(newCol);				
			}
			output.push(newRow);
		}
		
		return output;
	}
};
