(function() {
	'use strict';

	var canvasService = require('services/canvas.service');
	var documentService = require('services/document.service');
	var eventService = require('services/event.service');
	var game = require('components/game');
	var grid = require('components/grid');

	module.exports = {
		init: function() {
			eventService.addEventListener(document, 'DOMContentLoaded', onDOMLoaded);

			function onDOMLoaded() {
				console.log('DOM has loaded.');
				var context = canvasService.contextFactory('grid');
				grid.drawGrid(context());
				eventService.addEventListener(documentService.getElementById('grid'), 'click', gridClick);
				eventService.addEventListener(documentService.getElementById('newGame'), 'click', newGame);

				function gridClick(event) {
					var cell = grid.onClick(event);
					if (cell !== undefined) {
						if (game.isValidMove(cell)) {
							console.log('row: ' + cell.row.id + ' column: ' + cell.column.id);
							game.move(cell);
							grid.drawO(context(), cell);
							grid.drawX(context(), cell);
						}
					}
				}

				function newGame(event) {
					game.newGame();
					grid.newGame(context());
				}
			}
		}
	};
})();
