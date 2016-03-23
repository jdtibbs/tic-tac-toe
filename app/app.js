(function() {
	'use strict';

	var canvasService = require('services/canvas.service');
	var documentService = require('services/document.service');
	var eventService = require('services/event.service');
	var gameFactory = require('services/game.factory');
	var firebaseFactory = require('services/firebase.factory');

	module.exports = {
		init: function() {
			eventService.addEventListener(document, 'DOMContentLoaded', onDOMLoaded);

			function onDOMLoaded() {
				console.log('DOM has loaded.');
				var context = canvasService.contextFactory('grid');
				var firebase = firebaseFactory.create();
				var game = gameFactory.game(context);
				game.newGame();

				eventService.addEventListener(documentService.getElementById('login-btn'), 'click', login);

				function login(event) {
					var email = documentService.getElementById('email');
					firebase.authWithPassword(email.value, 'tictactoe', loginSuccess, loginError);
				}

				function loginSuccess() {
					documentService.getElementById('login-error').textContent = "";
					var name = documentService.getElementById('name');
					documentService.getElementById('login-success').textContent = name.value + ", Welcome to Tic-Tac-Toe!";
					window.setTimeout(function() {
						documentService.getElementById('login-success').textContent = "";
					}, 3000);
					eventService.addEventListener(documentService.getElementById('grid'), 'click', gridClick);
					eventService.addEventListener(documentService.getElementById('newGame'), 'click', newGame);
				}

				function loginError(error) {
					documentService.getElementById('login-error').textContent = error;
					documentService.getElementById('login-success').textContent = "";
				}

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
