var allMapLocations = []

const determineNeighbors = function (rows, columns, thisRow, thisColumn) {
  var allWallLocations = []

  for (var j = 0; j < rows; j++) {
    allWallLocations[j] = []
    for (var k = 0; k < columns; k++) {
      allWallLocations[j].push([j, k])
    }
  }

  // collect list of theoretical neighbors to current space
  // They are: space above, space below, space right, and space left
  var theoreticalNeighborsToCurrentWallLocation = [
    [thisRow, thisColumn + 1], // above
    [thisRow, thisColumn - 1], // below
    [thisRow + 1, thisColumn], // right
    [thisRow - 1, thisColumn] // left
  ]

  // whittle down list of theoretical neighbors to actual neighbors
  var actualNeighborsToCurrentWallLocation = []
  for (var i1 = 0; i1 < 4; i1++) {
    if (
      isWallPresent(
        theoreticalNeighborsToCurrentWallLocation[i1][0],
        theoreticalNeighborsToCurrentWallLocation[i1][1]
      )
    ) {
      actualNeighborsToCurrentWallLocation.push(theoreticalNeighborsToCurrentWallLocation[i1])
    }
  }

  return actualNeighborsToCurrentWallLocation
}

const isWallPresent = function (proposedLocationXCoordinate, proposedLocationYCoordinate) {
  return (
    allMapLocations[proposedLocationXCoordinate[0]] &&
    allMapLocations[proposedLocationXCoordinate][proposedLocationYCoordinate]
  )
}

/**
 * A Maze is a grid of spaces where the character could be.
 *
 * From this grid, we need to extrapolate where walls should be.
 * It can get kind of confusing to know when we're talking about spaces and when we're talking about walls.
 */
export default class Maze {
  numberOfWallLocations = 0
  numberOfSpaceRows
  numberOfSpaceColumns
  horizontalMazeWalls
  verticalMazeWalls

  constructor(rows, columns) {
    let numberOfSpaces = rows * columns
    if (numberOfSpaces < 1) {
      alert('illegal maze dimensions')
      return
    }

    // total number of spaces on the grid
    this.numberOfSpaceColumns = columns
    this.numberOfSpaceRows = rows

    // there will be 1 fewer row of walls than row of spaces.
    // there will be 1 fewer column of rows than column of spaces.
    // Added together, that's how many wall positions we'll have.
    this.numberOfWallLocations =
      (this.numberOfSpaceRows - 1) * this.numberOfSpaceColumns +
      this.numberOfSpaceRows * (this.numberOfSpaceColumns - 1)

    var horizontalWalls = [],
      verticalWalls = [],
      // random starting location for making a path through the maze spaces.
      currentLocation = [
        Math.floor(Math.random() * this.numberOfSpaceRows),
        Math.floor(Math.random() * this.numberOfSpaceColumns)
      ],
      mazePath = [currentLocation],
      unvisitedSpaces = []

    // Prepare the grid of wall locations
    // build array of horizontal locations (walls that are horizontal to the player's view)
    for (var i = 0; i < this.numberOfSpaceRows; i++) horizontalWalls[i] = []
    // build array of vertical locations (walls that are vertical to the player's view)
    for (var j = 0; j < this.numberOfSpaceColumns - 1; j++) verticalWalls[j] = []

    // Prepare the grid of spaces for traversal to create a valid path
    // There will be 2 more movement rows than space rows
    // because the first and last rows of the movement grid are the edge of the board
    for (var i1 = 0; i1 < this.numberOfSpaceRows + 2; i1++) {
      unvisitedSpaces[i1] = []
      // There will be 2 more movement columns than space columns
      // because the first and last columns of the movement grid are the edge of the board
      // On extra column is accounted for here.
      // The other extra column won't get recorded and will therefore be falsey.
      for (var i2 = 0; i2 < this.numberOfSpaceColumns + 1; i2++) {
        // It's creating a grid to help know where movement is possible
        // `true` indicates that movement is possible in that direction - no wall
        // `false` indicates that movement is not possible in that direction - wall
        // The grid should be mostly `true`s (internal of maze) surrounded by `false`s (edge of maze)
        unvisitedSpaces[i1].push(
          i1 > 0 && // first row will all be false
            i1 < this.numberOfSpaceRows + 1 && // last row will all be false
            i2 > 0 && // first cell of each row will be false
            (i1 != currentLocation[0] + 1 || i2 != currentLocation[1] + 1) // ensures the spaces are not the same space
        )
      }
    }

    while (1 < numberOfSpaces) {
      // collect list of possible neighbors to current space
      var movementOptions = [
        [currentLocation[0] + 1, currentLocation[1]], // right
        [currentLocation[0], currentLocation[1] + 1], // above
        [currentLocation[0] - 1, currentLocation[1]], // left
        [currentLocation[0], currentLocation[1] - 1] // below
      ]
      var unvisitedNeighbors = []

      // whittle down list of possible neighbors to neighbors that are visitable.
      for (var i3 = 0; i3 < 4; i3++) {
        if (unvisitedSpaces[movementOptions[i3][0] + 1][movementOptions[i3][1] + 1]) {
          unvisitedNeighbors.push(movementOptions[i3])
        }
      }

      if (unvisitedNeighbors.length > 0) {
        // pick a neighboring space to visit next
        var potentialSpaceForPath =
          unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)]
        // take the neighboring space off the unvisited list
        unvisitedSpaces[potentialSpaceForPath[0] + 1][potentialSpaceForPath[1] + 1] = false
        // reduce number of spaces left to visit
        numberOfSpaces = numberOfSpaces - 1

        if (potentialSpaceForPath[0] == currentLocation[0]) {
          // same column, different row ?
          // horizontal movement is possible, so set wall grid to `true`.
          horizontalWalls[potentialSpaceForPath[0]][
            (potentialSpaceForPath[1] + currentLocation[1] - 1) / 2
          ] = true
          this.numberOfWallLocations--
        } else {
          // same row, different column ?
          // vertical movement is possible, so set wall grid to `true`
          verticalWalls[(potentialSpaceForPath[0] + currentLocation[0] - 1) / 2][
            potentialSpaceForPath[1]
          ] = true
          this.numberOfWallLocations--
        }
        // update current location and add it to the path
        mazePath.push((currentLocation = potentialSpaceForPath))
      } else {
        // back up to previous space
        currentLocation = mazePath.pop()
      }
    }
    this.horizontalMazeWalls = horizontalWalls
    this.verticalMazeWalls = verticalWalls
  }

  extractWallCoordinates(numberOfDesiredWalls) {
    while (this.numberOfWallLocations > numberOfDesiredWalls) {
      console.log('removing random wall')

      // pick a random space on the map
      let randomLocation = [
        Math.floor(Math.random() * this.numberOfSpaceRows),
        Math.floor(Math.random() * this.numberOfSpaceColumns)
      ]

      // find the neighboring spaces of the initial random space
      const removalNeighbors = determineNeighbors(
        this.numberOfSpaceRows,
        this.numberOfSpaceColumns,
        randomLocation[0],
        randomLocation[1]
      )
      const candidateForRemoval =
        removalNeighbors[Math.floor(Math.random() * removalNeighbors.length)]

      if (candidateForRemoval[0] == randomLocation[0]) {
        // same row, different column?
        console.log('same row')

        // if the candidate for Removal exists
        if (
          !this.horizontalMazeWalls[candidateForRemoval[0]][
            (candidateForRemoval[1] + randomLocation[1] - 1) / 2
          ]
        ) {
          // deactive the wall (switch to true) and reduce the count by 1
          this.horizontalMazeWalls[candidateForRemoval[0]][
            (candidateForRemoval[1] + randomLocation[1] - 1) / 2
          ] = true
          this.numberOfWallLocations--
          console.log('wall removed')
        } else {
          console.log('nothing to remove')
        }
      } else {
        // same column, different row?
        console.log('same column')
        if (
          !this.verticalMazeWalls[(candidateForRemoval[0] + randomLocation[0] - 1) / 2][
            candidateForRemoval[1]
          ]
        ) {
          this.verticalMazeWalls[(candidateForRemoval[0] + randomLocation[0] - 1) / 2][
            candidateForRemoval[1]
          ] = true
          this.numberOfWallLocations--
          console.log('wall removed')
        } else {
          console.log('nothing to remove')
        }
      }
    }

    return {
      x: this.numberOfSpaceRows,
      y: this.numberOfSpaceColumns,
      horiz: this.horizontalMazeWalls,
      verti: this.verticalMazeWalls
    }
  }
}
