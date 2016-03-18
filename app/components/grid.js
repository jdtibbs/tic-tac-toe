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

	function cellClicked(point) {
		var row = grid.rows.filter(function(row, index) {
			return isInRow(row, point);
		});
		var column = grid.columns.filter(function(column, index) {
			return isInColumn(column, point);
		});
		return {
			row: row[0],
			column: column[0]
		};
	}

	function isInRow(row, point) {
		var y = board.start.y + (cell.height * row.id);
		return point.y < y;
	}

	function isInColumn(column, point) {
		var x = board.start.x + (cell.width * column.id);
		return point.x < x;
	}
	var factory = {
		onClick: function(event) {
			var target = event.target || event.srcElement;
			var rect = target.getBoundingClientRect();
			var point = {
				x: event.clientX - rect.left,
				y: event.clientY - rect.top
			};
			console.log(cellClicked(point));
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
