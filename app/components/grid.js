(function() {
	'use strict';
	var lineWidth = 2;
	var margin = 10;
	var grid = {
		cell: {
			count: 3,
			height: 90,
			width: 90
		},
		columns: [{
			id: 1,
			line: true
		}, {
			id: 2,
			line: true
		}, {
			id: 3,
			line: false
		}],
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
		size: 300,
		start: {
			x: 5,
			y: 10
		}
	};

	function cellCenter(pCell) {
		var maxX = cellMaxX(pCell.column);
		var maxY = cellMaxY(pCell.row);
		var midX = maxX - grid.cell.width / 2;
		var midY = maxY - grid.cell.height / 2;
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
		return grid.start.x + (grid.cell.width * column.id);
	}

	function cellMaxY(row) {
		// Y for this row's line.
		return grid.start.y + (grid.cell.height * row.id);
	}

	function xLength() {
		return grid.cell.height - margin * 2;
	}

	function oRadius() {
		return grid.cell.height - margin * 2;
	}

	function newGrid(ctx) {
		ctx.clearRect(grid.start.x, grid.start.y, grid.size, grid.size);
		factory.drawGrid(ctx);
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
					ctx.moveTo(grid.start.x, cellMaxY(row));
					ctx.lineTo(grid.start.x + (grid.cell.width * grid.cell.count), cellMaxY(row));
					ctx.stroke();
				}
			});
			grid.columns.forEach(function(column) {
				if (column.line) {
					ctx.beginPath();
					ctx.moveTo(cellMaxX(column), grid.start.y);
					ctx.lineTo(cellMaxX(column), grid.start.y + (grid.cell.height * grid.cell.count));
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
			var x = cellMaxX(cell.column) - (margin);
			var y = cellMaxY(cell.row) - (margin);
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x - xLength(), y - xLength());
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(x, y - xLength());
			ctx.lineTo(x - xLength(), y);
			ctx.stroke();
		},
		newGame: function(ctx) {
			newGrid(ctx);
		}
	};
	module.exports = factory;
})();
