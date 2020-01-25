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

export function maze(x , y, numberOfDesiredWalls) {
	// total number of spaces on the grid
	var spaces = x * y - 1;
	var wallCount = ((x - 1) * y) + (x * (y - 1));

	if (spaces < 0) {
		alert("illegal maze dimensions");
		return;
	}

	var horiz = [],
		verti = [],
		here = [Math.floor(Math.random() * x), Math.floor(Math.random() * y)], // random starting location
	    path = [here],
	    unvisited = [];

	// Prepare the grid for traversal
	for (var j = 0; j < x; j++) horiz[j] = [];
	for (var j = 0; j < y-1; j++) verti[j] = [];
	for (var j = 0; j < x + 2; j++) {
		unvisited[j] = [];
		for (var k = 0; k < y + 1; k++) {
			// seems like it's intended to create a grid of 'true' surrounded by 'false's?
			unvisited[j].push(j > 0 && // first row will all be false
								j < x + 1 && // last row will all be false
								k > 0 && // first cell of each row will be false
								(j != here[0] + 1 ||
									k != here[1] + 1));
		}
	}

	while (0 < spaces) {
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
		here = [Math.floor(Math.random() * x), Math.floor(Math.random() * y)]; // random space

		const removalNeighbors = determineNeighbors(x, y, here[0], here[1]);
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

	return {x: x, y: y, horiz: horiz, verti: verti};
}
 
function display(m) {
	var text = [];
	for (var j = 0; j < m.x * 2 + 1; j++) {
		var line = [];
		if (0 == j % 2) {
			// lines 0, 2, 4, 6, etc
			// comprising any horizontal walls, including top and bottom walls
			for (var k = 0; k < m.y * 4 + 1; k++) {
				if (0 == k % 4) {
					// wall intersection
					line[k]= '+';
				} else {
					if (j > 0 && m.verti[j / 2 - 1] && m.verti[j / 2 - 1][Math.floor(k / 4)]) {
						// opening between 2 vertically adjacent spaces
						line[k] = ' ';
					} else {
						// wall between 2 vertically adjacent spaces
						// or exterior wall
						line[k] = '-';
					}
				}
			}
		} else {
			// lines 1, 3, 5, 7, etc
			// comprising the "spaces" on the grid and any vertical walls, including left and right walls
			for (var k = 0; k < m.y * 4 + 1; k++) {
				if (0 == k % 4) {
					if (k > 0 && m.horiz[(j - 1) / 2][k / 4 - 1]) {
						// opening between 2 horizontally adjacent spaces
						line[k] = ' ';
					} else {
						// wall between two horizontally adjacent spaces
						line[k] = '|';
					}
				} else {
					// just a space
					line[k] = ' ';
				}
			}
		}
		// create the top left opening
		if (0 == j) line[1]= line[2]= line[3]= ' ';
		// create bottom right opening
		if (m.x*2-1 == j) line[4*m.y]= ' ';

		// add line to set, with line ending
		text.push(line.join('')+j+'\r\n');
	}
	return text.join('');
}
