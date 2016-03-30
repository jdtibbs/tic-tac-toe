(function() {
	'use strict';
	var firebaseFactory = require('services/firebase.factory');

	var factory = {
		create: function() {

			var firebase = firebaseFactory.create();

			function startGame() {
				newGame();
			}


			function move() {}

			function newGame() {
				var game = {
					id: {
						move: 'move',
						moves: 'moves'
					}
				};

				var gameRef = firebase.ref()
					.child('games');

				gameRef
					.once('value', function(snap) {
						if (snap.exists()) {
							gameRef
								.set({
									move: {},
									moves: {}
								});
						}
					});
			}

			return {
				startGame: startGame,
				move: move,
				newGame: newGame
			};
		}
	};
	module.exports = factory;
})();
