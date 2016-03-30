(function() {
	'use strict';
	var grid = require('components/grid');
	var gameDaoFactory = require('services/game.dao.factory');

	var factory = {
		create: function(context, user) {
			var moves = [];
			var gameDao = gameDaoFactory.create();

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
					gameDao.move(cell.row.id, cell.column.id, user);
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
					gameDao.newGame();
				},
				startGame: function() {
					gameDao.startGame();
				}
			};
		}
	};
	module.exports = factory;
})();
