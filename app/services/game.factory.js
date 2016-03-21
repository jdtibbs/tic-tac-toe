(function() {
	'use strict';
	var grid = require('components/grid');

	var game = {
		game: function(context) {
			var moves = [];

			function isValidMove(cell) {
				var move = moves.filter(function(element) {
					if (element.row.id === cell.row.id && element.column.id === cell.column.id) {
						return true;
					}
				});
				return move.length === 0; // true, move not found.
			}

			function moved(cell) {
				moves.push(cell);
			}

			return {
				move: function(event) {
					var cell = grid.onClick(event);
					if (cell !== undefined) {
						if (isValidMove(cell)) {
							console.log('row: ' + cell.row.id + ' column: ' + cell.column.id);
							moved(cell);
							grid.drawO(context(), cell);
							grid.drawX(context(), cell);
						}
					}
				},
				newGame: function() {
					moves.length = 0;
					grid.newGame(context());
				}
			};
		}
	};
	module.exports = game;
})();
