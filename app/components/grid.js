(function() {
	'use strict';
	var board = {
		start: {
			x: 5,
			y: 10
		}
	};
	var cell = {
		count: 3,
		height: 90,
		width: 90
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
		onClick: function(e) {
			var point = {
				x: e.clientX,
				y: e.clientY
			};
			console.log(point)
		},
		draw: function(ctx) {
			grid.rows.forEach(function(row) {
				if (row.line) {
					ctx.beginPath();
					ctx.moveTo(board.start.x, board.start.y + (cell.height * row.id));
					ctx.lineTo(board.start.x + (cell.width * cell.count), board.start.y + (cell.height * row.id));
					ctx.stroke();
				}
			});
			grid.columns.forEach(function(column) {
				if (column.line) {
					ctx.beginPath();
					ctx.moveTo(board.start.x + (cell.width * column.id), board.start.y);
					ctx.lineTo(board.start.x + (cell.width * column.id), board.start.y + (cell.height * cell.count));
					ctx.stroke();
				}
			});
		}
	};
	module.exports = factory;
})();
