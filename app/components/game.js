(function() {
	'use strict';
	var moves = [];

	var game = {
		isValidMove: function(cell) {
			var move = moves.filter(function(element) {
				if (element.row.id === cell.row.id && element.column.id === cell.column.id) {
					return true;
				}
			});
			return move.length === 0; // true, move not found.
		},
		move: function(cell) {
			moves.push(cell);
		},
		newGame: function() {
			moves.length = 0;
		}
	};
	module.exports = game;
})();
