(function() {
	'use strict';

	var canvasService = require('services/canvas.service');
	var documentService = require('services/document.service');
	var eventService = require('services/event.service');
	var grid = require('components/grid');

	module.exports = {
		init: function() {
			eventService.addEventListener(document, 'DOMContentLoaded', onDOMLoaded);

			function onDOMLoaded() {
				console.log('DOM has loaded.');
				var context = canvasService.contextFactory('grid');
				grid.drawGrid(context());
				eventService.addEventListener(documentService.getElementById('grid'), 'click', gridClick);

				function gridClick(event) {
					var cell = grid.onClick(event);
					if (cell !== undefined) {
						console.log('row: ' + cell.row.id + ' column: ' + cell.column.id);
						grid.drawO(context(), cell);
						grid.drawX(context(), cell);
					}
				}
			}
		}
	};
})();
