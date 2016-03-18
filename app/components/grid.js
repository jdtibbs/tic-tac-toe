(function() {
	'use strict';
	var board = {
		x: 5,
		y: 10
	};
	var cell = {
		count: 3,
		height: 100,
		width: 100
	};
	var grid = {
		rows: [{
			id: 1,
			line: true
		}, {
			id: 2,
			line: true
		}, {
			id: 3,
			line: false
		}],
		columns: [{
			id: 1,
			line: true
		}, {
			id: 2,
			line: true
		}, {
			id: 3,
			line: false
		}]
	};
	var factory = {
		draw: function(ctx) {
			grid.rows.forEach(function(row) {
				if (row.line) {
					ctx.beginPath();
					ctx.moveTo(board.x, board.y + (cell.height * row.id));
					ctx.lineTo(board.x + (cell.width * cell.count), board.y + (cell.height * row.id));
					ctx.stroke();
				}
			});
			grid.columns.forEach(function(column) {
				if (column.line) {
					ctx.beginPath();
					ctx.moveTo(board.x + (cell.width * column.id), board.y);
					ctx.lineTo(board.x + (cell.width * column.id), board.y + (cell.height * cell.count));
					ctx.stroke();
				}
			});
		}
	};
	module.exports = factory;
})();
