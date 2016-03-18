(function() {
	'use strict';

	var canvasService = require('services/canvas.service');
	var eventService = require('services/event.service');
	var grid = require('components/grid');

	module.exports = {
		init: function() {
			console.log('The app has loaded.');
			eventService.addEventListener(document, 'DOMContentLoaded', onDOMLoaded);

			function onDOMLoaded() {
				console.log('DOM has loaded.');
				var ctx = canvasService.getContext('grid');
				grid.draw(ctx);
			}
		}
	};
})();
