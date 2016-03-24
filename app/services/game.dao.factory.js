(function() {
	'use strict';
	var firebaseFactory = require('services/firebase.factory');

	var factory = {
		create: function() {

			var firebase = firebaseFactory.create();
			var auth = firebase.getAuth();

			function startGame(email, name) {
				var game = {
					email: 'email',
					player1: 'name',
					player2: 'name',
					move: 'move',
					moves: 'moves'
				};

				var gameRef = firebase.ref()
					.child('games')
					.child(auth.uid);

				gameRef
					.once('value', function(snap) {
						if (snap.exists()) {
							var player = Object.getOwnPropertyNames(snap.val())
								.filter(function(val) {
									if (val === 'player2') {
										return true;
									}
								});
							if (player.length === 0) {
								gameRef
									.update({
										player2: name
									});
							}
						} else {
							gameRef
								.set({
									player1: name
								});
						}
					});
			}

			function initEmail() {}

			function move() {}

			function newGame() {}
			return {
				startGame: startGame,
				move: move,
				newGame: newGame
			};
		}
	};
	module.exports = factory;
})();
