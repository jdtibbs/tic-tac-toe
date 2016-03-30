(function() {
	'use strict';
	var firebaseFactory = require('services/firebase.factory');

	// var user = {
	// 	id: {
	// 		name: 'name',
	// 		oponents: {
	// 			userId: {
	// 				game: gameId
	// 			},
	// 		}
	// 	}
	// };

	var factory = {
		create: function() {

			var firebase = firebaseFactory.create();

			function getUser(id, callback) {

				var userRef = firebase.ref()
					.child('users')
					.child(id);

				userRef
					.once('value', function(snap) {
						if (snap.exists()) {
							callback(snap.val());
						} else {
							callback(undefined);
						}
					}, function(error) {
						console.log(error);
					});
			}

			return {
				getUser: getUser
			};
		}
	};
	module.exports = factory;
})();
