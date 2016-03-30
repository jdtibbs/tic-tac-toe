(function() {
	'use strict';

	var firebaseFactory = require('services/firebase.factory');

	function login(email, successCallback, errorCallback) {
		if (isValidLogin(email)) {
			auth(email, successCallback, errorCallback);
		} else {
			errorCallback('Please enter your Email.');
		}
	}

	function isValidLogin(email) {
		return email !== "";
	}

	function auth(email, successCallback, errorCallback) {
		var firebase = firebaseFactory.create();
		firebase.authWithPassword(email, 'tictactoe',
			function(authData) {
				successCallback(authData);
			},
			function(error) {
				errorCallback('Email could not be authenticated.');
			});
	}

	module.exports = {
		login: login
	};
})();
