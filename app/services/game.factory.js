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

			function drawMove(cell) {
				if (moves.length % 2 === 0) {
					grid.drawX(context(), cell);
				} else {
					grid.drawO(context(), cell);
				}
			}

			function makeMove(cell) {
				if (isValidMove(cell)) {
					drawMove(cell);
					moves.push(cell);
				}
			}

			return {
				move: function(event) {
					var cell = grid.onClick(event);
					if (cell !== undefined) {
						makeMove(cell);
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
