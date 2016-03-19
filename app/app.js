(function() {
	'use strict';

	var canvasService = require('services/canvas.service');
	var documentService = require('services/document.service');
	var eventService = require('services/event.service');
	var gameFactory = require('services/game.factory');

	module.exports = {
		init: function() {
			eventService.addEventListener(document, 'DOMContentLoaded', onDOMLoaded);

			function onDOMLoaded() {
				console.log('DOM has loaded.');
				var context = canvasService.contextFactory('grid');
				var game = gameFactory.game(context);
				game.newGame();

				eventService.addEventListener(documentService.getElementById('grid'), 'click', gridClick);
				eventService.addEventListener(documentService.getElementById('newGame'), 'click', newGame);

				function gridClick(event) {
					game.move(event);
				}

				function newGame(event) {
					game.newGame();
				}
			}
		}
	};
})();
