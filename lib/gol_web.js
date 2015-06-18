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