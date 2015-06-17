module.exports = {
	evolve: function (input) {
		var output = [];
		input.forEach(function (row) {
			var newRow = [];
			row.forEach(function (column) {
				newRow.push(0);
			});
			output.push(newRow);
		});
		
		return output;
	}
};