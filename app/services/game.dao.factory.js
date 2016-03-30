(function() {
	'use strict';
	var firebaseFactory = require('services/firebase.factory');

	var factory = {
		create: function() {

			var firebase = firebaseFactory.create();
			var gameRef = firebase.ref()
				.child('games');
			var moveRef = firebase.ref()
				.child('games')
				.child('move');
			var movesRef = firebase.ref()
				.child('games')
				.child('moves');
			var game = {
				id: {
					move: {
						row: 1,
						column: 2,
						player: 'jack'
					},
					moves: [{
						id: 1,
						move: move
					}, {
						id: 2,
						move: move
					}]
				}
			};

			function startGame() {
				newGame();
			}

			function move(row, column, name) {
				moveRef.set({
					row: row,
					column: column,
					player: name
				});
				movesRef.push({
					row: row,
					column: column,
					player: name
				});
			}

			function newGame() {
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
