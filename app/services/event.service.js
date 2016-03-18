(function() {
	'use strict';

	var service = {
		addEventListener: function(element, event, callback) {
			element.addEventListener(event, function(event) {
				event.stopPropagation();
				callback(event);
			}, true);
		}
	};
	module.exports = service;
})();
