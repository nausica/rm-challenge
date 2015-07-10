"use strict";

var input = "";
var input_array = "";
var input_currentline = 0;
var board = [];

// Process input data
process.stdin.resume();
process.stdin.setEncoding("ascii");

process.stdin.on("data", function (chunk) {
    input += chunk;
});

process.stdin.on("end", function () {
    input_array = input.split("\n");
    main();
});

function readLine() {
    return input_array[input_currentline++];
}

/* Main Function */
function main() {
	// Read matrix dimensions
	var dimensions = readLine().split(' ');
	var M = dimensions[0]; // M rows
	var N = dimensions[1]; // N columns

	var max_length = 0;
	var max_drop = 0;
	var candidate_path;

	var state = {
		i: 0,
		j: 0,
		value: -1,
		possibleMoves : function() {
			var moves = [];
			// Up
			if (this.i > 0 && this.value > board[this.i-1][this.j]) {
				moves.push({
					j: this.j,
					i: this.i-1,
					move: 'up',
					value: board[this.i-1][this.j],
					possibleMoves: this.possibleMoves
				})
			}
			// Down
			if (this.i < M-1 && this.value > board[this.i+1][this.j]) {
				moves.push({
					j: this.j,
					i: this.i+1,
					move: 'down',
					value: board[this.i+1][this.j],
					possibleMoves: this.possibleMoves
				})
			}
			// Right
			if (this.j < N-1 && this.value > board[this.i][this.j+1]) {
				moves.push({
					j: this.j+1,
					i: this.i,
					move: 'right',
					value: board[this.i][this.j+1],
					possibleMoves: this.possibleMoves
				})
			}
			// left
			if (this.j > 0 && this.value > board[this.i][this.j-1]) {
				moves.push({
					j: this.j-1,
					i: this.i,
					move: 'left',
					value: board[this.i][this.j-1],
					possibleMoves: this.possibleMoves
				})
			}
			return moves;
		}
	}

	function traverse(state, path) {
	    var possible_moves = state.possibleMoves();
	    if (possible_moves.length) {
	    	possible_moves.forEach(function(possibleMove) { 
	            traverse(possibleMove, path.concat([possibleMove.value]));
	        });
	    } else {
	    	if (path.length > max_length) {
	    		max_length = path.length;
	    		max_drop = path[0]-path[path.length-1];
	    		candidate_path = path;

	    	} else if (path.length === max_length) {
	    		var drop = path[0]-path[path.length-1];
	    		if (drop > max_drop) {
	    			max_drop = path[0]-path[path.length-1];
	    			candidate_path = path;
	    		}
	    	}
	    }
	}

	// Board creation
	for (var i=0; i<M; i++) {
		var line = readLine();
		board.push(line.split(' ').map(function(item){return parseInt(item)}));
	}

	// Visit all states
	for (var i=0;i<M;i++) { // rows
		for (var j=0; j<N;j++) { // columns
			state.value = board[i][j];
			state.i = i;
			state.j = j;
			traverse(state, [state.value], [state]);
		}
	}
	
	console.log("Length = " + max_length);
	console.log("Drop = " + max_drop);
	console.log("Path = " + candidate_path);
}


