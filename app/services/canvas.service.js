(function() {
	'use strict';
	var service = {
		contextFactory: function(id) {
			var ctx;
			var canvas = document.getElementById(id);
			if (canvas.getContext) {
				ctx = canvas.getContext('2d');
			} else {
				document.getElementById('error').textContent = 'HTML Canvas does not exist.';
			}
			return function() {
				return ctx;
			};
		}
	};
	module.exports = service;
})();
