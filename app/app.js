(function() {
	'use strict';

	var canvasService = require('services/canvas.service');
	var documentService = require('services/document.service');
	var eventService = require('services/event.service');
	var grid = require('components/grid');

	module.exports = {
		init: function() {
			console.log('The app has loaded.');
			eventService.addEventListener(document, 'DOMContentLoaded', onDOMLoaded);

			function onDOMLoaded() {
				console.log('DOM has loaded.');
				var context = canvasService.contextFactory('grid');
				grid.draw(context());
				eventService.addEventListener(documentService.getElementById('grid'), 'click', grid.onClick);

			}
		}
	};
})();
