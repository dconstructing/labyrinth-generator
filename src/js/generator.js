const determineNeighbors = function(rows, columns, hereRow, hereColumn) {
	var all = [];

	for (var j = 0; j < rows; j++) {
		all[j] = [];
		for (var k = 0; k < columns; k++) {
			all[j].push([j, k]);
		}
	}

	// collect list of theoretical neighbors to current space
	var potential = [
		[hereRow+1, hereColumn], // right
		[hereRow, hereColumn+1], // above
		[hereRow-1, hereColumn], // left
		[hereRow, hereColumn-1]  // below
	];
	var neighbors = [];
	// whittle down list of theoretical neighbors to actual neighbors
	for (var j = 0; j < 4; j++) {
		if (all[potential[j][0]] && all[potential[j][0]][potential[j][1]]) {
			neighbors.push(potential[j]);
		}
	}

	return neighbors;
};

export function maze(rows, columns, numberOfDesiredWalls) {
	// total number of spaces on the grid
	var spaces = rows * columns;
	var wallCount = ((rows - 1) * columns) + (rows * (columns - 1));

	if (spaces < 1) {
		alert("illegal maze dimensions");
		return;
	}

	var horiz = [],
		verti = [],
		here = [Math.floor(Math.random() * rows), Math.floor(Math.random() * columns)], // random starting location
	    path = [here],
	    unvisited = [];

	// Prepare the grid for traversal
	for (var j = 0; j < rows; j++) horiz[j] = [];
	for (var j = 0; j < columns-1; j++) verti[j] = [];
	for (var j = 0; j < rows + 2; j++) {
		unvisited[j] = [];
		for (var k = 0; k < columns + 1; k++) {
			// seems like it's intended to create a grid of 'true' surrounded by 'false's?
			unvisited[j].push(j > 0 && // first row will all be false
								j < rows + 1 && // last row will all be false
								k > 0 && // first cell of each row will be false
								(j != here[0] + 1 ||
									k != here[1] + 1));
		}
	}

	while (1 < spaces) {
		// collect list of possible neighbors to current space
		var potential = [
			[here[0]+1, here[1]], // right
			[here[0], here[1]+1], // above
			[here[0]-1, here[1]], // left
			[here[0], here[1]-1]  // below
		];
		var neighbors = [];
		// whittle down list of possible neighbors to actual unvisited neighbors
		for (var j = 0; j < 4; j++) {
			if (unvisited[potential[j][0] + 1][potential[j][1] + 1]) {
				neighbors.push(potential[j]);
			}
		}

		if (neighbors.length > 0) {
			// pick a neighboring space to visit next
			var next = neighbors[Math.floor(Math.random() * neighbors.length)];
			// take the neighboring space off the unvisited list
			unvisited[next[0] + 1][next[1] + 1] = false;
			// reduce number of spaces left to visit
			spaces = spaces - 1;

			if (next[0] == here[0]) {
				// same column, different row ?
				// horizontal movement is possible
				horiz[next[0]][(next[1] + here[1] - 1) / 2] = true;
				wallCount--;
			} else {
				// same row, different column ?
				// vertical movement is possible
				verti[(next[0] + here[0] - 1) / 2][next[1]] = true;
				wallCount--;
			}
			path.push(here = next);
		} else {
			// back up to previous space
			here = path.pop();
		}
	}

	console.log('wall count', wallCount, numberOfDesiredWalls);
	// remove random wall to get down to the number of desired walls
	while (wallCount > numberOfDesiredWalls) {
		console.log('removing random wall');
		here = [Math.floor(Math.random() * rows), Math.floor(Math.random() * columns)]; // random space

		const removalNeighbors = determineNeighbors(rows, columns, here[0], here[1]);
		const removalNext = removalNeighbors[Math.floor(Math.random() * removalNeighbors.length)];

		if (removalNext[0] == here[0]) {
			// same row, different column
			console.log('same row');
			if (!horiz[removalNext[0]][(removalNext[1] + here[1] - 1) / 2]) {
				horiz[removalNext[0]][(removalNext[1] + here[1] - 1) / 2] = true;
				wallCount--;
				console.log('wall removed');
			} else {
				console.log('nothing to remove');
			}
		} else {
			// same column, different row
			console.log('same column');
			if (!verti[(removalNext[0] + here[0] - 1) / 2][removalNext[1]]) {
				verti[(removalNext[0] + here[0] - 1) / 2][removalNext[1]] = true;
				wallCount--;
				console.log('wall removed');
			} else {
				console.log('nothing to remove');
			}
		}
	}
	console.log('final wall count', wallCount, numberOfDesiredWalls);

	return {x: rows, y: columns, horiz: horiz, verti: verti};
}
