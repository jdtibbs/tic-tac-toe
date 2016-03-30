(function() {
	'use strict';

	var canvasService = require('services/canvas.service');
	var documentService = require('services/document.service');
	var eventService = require('services/event.service');
	var gameFactory = require('services/game.factory');
	var loginService = require('services/login.service');
	var userDaoFactory = require('services/user.dao.factory');

	module.exports = {
		init: function() {
			eventService.addEventListener(document, 'DOMContentLoaded', onDOMLoaded);

			function onDOMLoaded() {
				console.log('DOM has loaded.');

				eventService.addEventListener(documentService.getElementById('login-btn'), 'click', login);

				function login(event) {
					loginService.login(getEmail(), loginSuccess, loginError);
				}

				function getEmail() {
					return documentService.getElementById('email').value;
				}

				function loginSuccess(authData) {
					var userDao = userDaoFactory.create();
					userDao.getUser(authData.uid, function(user) {
						if (user) {
							welcome(user);
							startGame(user);
						}
					});
				}

				function loginError(error) {
					documentService.getElementById('login-error').textContent = error;
					documentService.getElementById('login-success').textContent = "";
				}

				function welcome(user) {
					documentService.getElementById('login-error').textContent = "";
					documentService.getElementById('login-success').textContent = user.name + ", Welcome to Tic-Tac-Toe!";
					window.setTimeout(function() {
						documentService.getElementById('login-success').textContent = "";
					}, 5000);
				}

				function startGame(user) {
					var context = canvasService.contextFactory('grid');
					var game = gameFactory.create(context, user);
					gridEventListener(game);
					newGameListener(game);
					game.startGame();
					game.newGame();
				}

				function gridEventListener(game) {
					eventService.addEventListener(documentService.getElementById('grid'), 'click', function(event) {
						game.move(event);
					});
				}

				function newGameListener(game) {
					eventService.addEventListener(documentService.getElementById('newGame'), 'click', function(event) {
						game.newGame();
					});
				}
			}
		}
	};
})();
