(function() {
	'use strict';
	var lineWidth = 1;
	var markerMargin = 10;
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

	function cellMaxX(column) {
		// X for this column's line.
		return board.start.x + (cell.width * column.id);
	}

	function cellMaxY(row) {
		// Y for this row's line.
		return board.start.y + (cell.height * row.id);
	}

	function xLength() {
		return cell.height - markerMargin * 2;
	}

	function oRadius() {
		return cell.height - markerMargin * 2;
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
			ctx.lineWidth = lineWidth;
			ctx.beginPath();
			ctx.lineWidth = lineWidth;
			ctx.arc(center.x, center.y, oRadius() / 2, 0, Math.PI * 2, true);
			ctx.stroke();
		},
		drawX: function(ctx, cell) {
			var x = cellMaxX(cell.column) - (markerMargin / 2);
			var y = cellMaxY(cell.row) - (markerMargin / 2);
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x - xLength(), y - xLength());
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(x, y - xLength());
			ctx.lineTo(x - xLength(), y);
			ctx.stroke();
		}
	};
	module.exports = factory;
})();
