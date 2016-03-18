(function() {
	'use strict';
	var lineWidth = 1;
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

	function cellCenter(pCell) {
		var maxX = cellMaxX(pCell.column);
		var maxY = cellMaxY(pCell.row);
		var midX = maxX - cell.width / 2;
		var midY = maxY - cell.height / 2;
		return {
			x: midX,
			y: midY
		};
	}

	function cellClicked(point) {
		var row = grid.rows.filter(function(row, index) {
			return isInRow(row, point);
		});
		var column = grid.columns.filter(function(column, index) {
			return isInColumn(column, point);
		});
		var cell = {
			row: row[0],
			column: column[0]
		};
		return row[0] !== undefined && column[0] !== undefined ? cell : undefined;
	}

	function isInRow(row, point) {
		return point.y < cellMaxY(row);
	}

	function isInColumn(column, point) {
		return point.x < cellMaxX(column);
	}

	function cellMaxY(row) {
		// max Y for this row.
		return board.start.y + (cell.height * row.id);
	}

	function cellMaxX(column) {
		// max X for this column.
		return board.start.x + (cell.width * column.id);
	}
	var factory = {
		onClick: function(event) {
			var target = event.target || event.srcElement;
			var rect = target.getBoundingClientRect();
			var point = {
				x: event.clientX - rect.left,
				y: event.clientY - rect.top
			};
			return cellClicked(point);
		},
		drawGrid: function(ctx) {
			grid.rows.forEach(function(row) {
				if (row.line) {
					ctx.beginPath();
					ctx.moveTo(board.start.x, cellMaxY(row));
					ctx.lineTo(board.start.x + (cell.width * cell.count), cellMaxY(row));
					ctx.stroke();
				}
			});
			grid.columns.forEach(function(column) {
				if (column.line) {
					ctx.beginPath();
					ctx.moveTo(cellMaxX(column), board.start.y);
					ctx.lineTo(cellMaxX(column), board.start.y + (cell.height * cell.count));
					ctx.stroke();
				}
			});
		},
		drawO: function(ctx, cell) {
			var center = cellCenter(cell);
			ctx.beginPath();
			ctx.lineWidth = lineWidth;
			// ctx.arc(175, 75, 30, 0, Math.PI * 2, true);
			ctx.arc(center.x, center.y, 30, 0, Math.PI * 2, true);
			ctx.stroke();
		},
		drawX: function(ctx, cell) {
			ctx.lineWidth = lineWidth;
			ctx.lineCap = 'round';
			ctx.beginPath();
			ctx.moveTo(50, 50);
			ctx.lineTo(100, 100);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(100, 50);
			ctx.lineTo(50, 100);
			ctx.stroke();
		}
	};
	module.exports = factory;
})();
