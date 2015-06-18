(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./Grid":2}],2:[function(require,module,exports){
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
	
	return neighbours.reduce(function (a, b) {
		return b ? a + b : a;
	});
};


module.exports = Grid;

},{}],3:[function(require,module,exports){
var container;

var GoL = require('./GameOfLife');

function generateGrid(rows, cols) {
	var workspace = document.createElement('fieldset');
	for (var r = 0; r < rows; r++) {
		var row = document.createElement('div');
		row.className = 'row';

		for (var c = 0; c < cols; c++) {
			var checkbox = document.createElement('input');
			checkbox.type = 'checkbox';
			row.appendChild(checkbox);
		}

		workspace.appendChild(row);
	}

	return workspace;
}

function translateGrid (fieldset) {
	var lifeGrid = [];
	
	var rows = fieldset.querySelectorAll('.row');
	
	for (var row = 0; row < rows.length; row++) {
		var el = rows[row];
		var newRow = [];
		var cols = el.querySelectorAll('input');
		
		for (var col = 0; col < cols.length; col++) {
			var checkbox = cols[col];
			
			newRow.push(checkbox.checked ? 1 : 0);
		}
		lifeGrid.push(newRow);
	}
	return lifeGrid;
}

function renderGeneration (fieldset, generationArray) {
	for (var i = 0; i < generationArray.length; i++) {
		var row = fieldset.querySelector('.row:nth-child(' + (i+1) + ')');
		
		for (var j = 0; j < generationArray[i].length; j++) {
			var checkbox = row.querySelector('input:nth-child(' + (j+1) + ')');
			
			checkbox.checked = generationArray[i][j] === 1;			
		}
	}
}

document.addEventListener('DOMContentLoaded', function (e) {
	container = document.querySelector('#game_of_life');
	container.appendChild(generateGrid(10, 10));
	
	var interval;

	var nextGeneration = function (e) {
		if (e) {
			e.preventDefault();
		};
		
		var fieldset = container.querySelector('fieldset');
		
		var sourceGeneration = translateGrid(fieldset);
		var newGeneration = GoL.evolve(sourceGeneration);

		renderGeneration(fieldset, newGeneration);
	};

	document.getElementById('reset_gol').addEventListener('submit', function (e) {
		e.preventDefault();
	
		container.innerHTML = '';
	
		var rows = document.querySelector('#rows')['value'];
		var cols = document.querySelector('#columns')['value'];
	
		container.appendChild(generateGrid(rows, cols));
	});

	document.getElementById('next').addEventListener('click', nextGeneration);
	
	document.getElementById('play').addEventListener('click', function (e) {
		if (!interval) {
			interval = setInterval(nextGeneration, 200);			
			e.target.value = 'Stop';
		} else {
			interval = clearInterval(interval);
			e.target.value = 'Play >';
		}
	});
	
});
},{"./GameOfLife":1}]},{},[3]);
