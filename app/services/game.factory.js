(function() {
	'use strict';
	var grid = require('components/grid');

	var game = {
		game: function(context) {
			var moves = [];

			return {
				isValidMove: function(cell) {
					var move = moves.filter(function(element) {
						if (element.row.id === cell.row.id && element.column.id === cell.column.id) {
							return true;
						}
					});
					return move.length === 0; // true, move not found.
				move: function(event) {
					var cell = grid.onClick(event);
					if (cell !== undefined) {
						if (this.isValidMove(cell)) {
							console.log('row: ' + cell.row.id + ' column: ' + cell.column.id);
							this.moved(cell);
							grid.drawO(context(), cell);
							grid.drawX(context(), cell);
						}
					}
				},
				moved: function(cell) {
					moves.push(cell);
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
