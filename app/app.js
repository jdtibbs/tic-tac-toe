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

				eventService.addEventListener(documentService.getElementById('login-btn'), 'click', login);

				function login(event) {
					if (isValidLogin()) {
						var baas = firebaseFactory.create();
						baas.authWithPassword(getEmail(), 'tictactoe', loginSuccess, loginError);
					} else {
						loginError('Please enter e-mail and name.');
					}
				}

				function isValidLogin() {
					return getEmail() !== "" && getName() !== "";
				}

				function getEmail() {
					return documentService.getElementById('email').value;
				}

				function getName() {
					return documentService.getElementById('name').value;
				}

				function loginSuccess(authData) {
					welcome(getName());
					var context = canvasService.contextFactory('grid');
					var game = gameFactory.create(context, getEmail(), getName());
					startGame(game);
					initializeMove(game);
				}

				function loginError(error) {
					documentService.getElementById('login-error').textContent = error;
					documentService.getElementById('login-success').textContent = "";
				}

				function welcome(name) {
					documentService.getElementById('login-error').textContent = "";
					documentService.getElementById('login-success').textContent = name + ", Welcome to Tic-Tac-Toe!";
					window.setTimeout(function() {
						documentService.getElementById('login-success').textContent = "";
					}, 3000);
				}

				function startGame(game) {
					game.startGame(getEmail(), getName());
					game.newGame();
					eventService.addEventListener(documentService.getElementById('newGame'), 'click', function(event) {
						game.newGame();
					});
				}

				function initializeMove(game) {
					eventService.addEventListener(documentService.getElementById('grid'), 'click', function(event) {
						game.move(event);
					});
				}
			}
		}
	};
})();
