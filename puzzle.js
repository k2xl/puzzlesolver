/**
*	Puzzle Solver
*	This JavaScript program attempts to find solutions for puzzles that involve 2D blocks on a board
*		where the rows and columns of the board can not contain the same shape twice.
*	The technique is a simple recursive function to find solutions (breadth first search).
*	The algorithm could possibly be improved to prevent mirrored attempts from being attempted again
*	Written by Danny Miller k2xl.com@gmail.com
*/
var STAR = 1,
	BULLS = 2,
	TRIANGLE = 3,
	YELLOW = 4,
	SQIG = 5,
	NONE = 0;
var enumMap = {
	0 : "----",
	1 : "Star",
	2 : "Bull",
	3 : "Tria",
	4 : "Yell",
	5 : "Squig",
	
}

var all_items = [
	[[STAR, BULLS,TRIANGLE]],
	[[TRIANGLE, BULLS]],
	[[BULLS, YELLOW, SQIG]],
	[[SQIG, STAR, YELLOW]],
	[[STAR, YELLOW, SQIG]],
	[[BULLS, YELLOW,TRIANGLE]],
	[[YELLOW, TRIANGLE, SQIG]],
	[[BULLS, SQIG, STAR]],
	[[STAR, TRIANGLE]]
];

var SQUARESIZE = 5;
var MATRIX = [ 
	[NONE,NONE,NONE,NONE,NONE],
	[NONE,NONE,NONE,NONE,NONE],
	[NONE,NONE,NONE,NONE,NONE],
	[NONE,NONE,NONE,NONE,NONE],
	[NONE,NONE,NONE,NONE,NONE],
];

function isRowValid(matrix,rowIndex,dontIgnoreNones) {
	var seenMap = {};
	for (var k = 0; k < SQUARESIZE; k++)
	{
		var val = matrix[rowIndex][k];
		if (val === NONE) { 
			if (!dontIgnoreNones) {
				continue
			} 
			return false; 
		}
		if (seenMap[val]) {
			return false;
		}
		seenMap[val] = 1;
	}
	return true;
}
function isColValid(matrix,colIndex,dontIgnoreNones) {
	var seenMap = {};
	for (var k = 0; k < SQUARESIZE; k++)
	{
		var val = matrix[k][colIndex]
		if (val === NONE) { 
			if (!dontIgnoreNones) {
				continue
			} 
			return false; 
		}
		if (seenMap[val]){
			return false;
		}
		seenMap[val] = 1;
	}
	return true;
}
function isMatrixValid(matrix, dontIgnoreNones) {
	for (var j = 0; j < SQUARESIZE; j++) {
		if (!isRowValid(matrix,j, dontIgnoreNones)) { 
			//console.log("Row "+j+" is invalid")
			return false;
		}
		if (!isColValid(matrix,j,dontIgnoreNones)) { 
			//console.log("Col "+j+" is invalid")
			return false;
		}
	}
	return true;
}
function applyToMatrix(x, y, item, matrixRef) {
	//console.log(item[0].length+x, y, item)
	//console.log("Matrix 5x5 trying to add "+item[0]+" in ",x,y)
	var matrix = matrixRef.concat()
	if (item[0].length+x > SQUARESIZE) {
		return false;
	}
	for (var n=0; n < item.length; n++) {
		//console.log(item.length+y, "vs",matrix[n].length)
		if (item.length+y > matrix[n].length) {
			return false;
		}
		for (var p =0; p < item[n].length; p++) {
			matrix[y+n][x+p] = item[n][p]
		}
	}
	if (isMatrixValid(matrix) === false) {
		return false;
	}
	return matrix;
}
function transpose(arr) {
    var a = arr,
        w = a.length,
        h = a[0].length;
    var i, j, t = [];
    for (i = 0; i < h; i++) {
        t[i] = new Array(w);
        for (j = 0; j < w; j++) {
            t[i][j] = a[j][i];
        }
    }
    return t;
}
var totalStackLimit = 3;

function clone(arr) {
	var len = arr.length,
    	copy = new Array(len); // boost in Safari
	for (var i=0; i<len; ++i)
    	copy[i] = arr[i].slice(0)
	return copy;
}

function start(arr) {
	console.log("Starting")
	var items = clone(all_items)
	var matrix = clone(MATRIX)
	var t = new Date().getTime()
	spawnKids({val:[], children: new Array(4)}, items, matrix, 0, "") // tree starts here
	var tt = (new Date().getTime())-t;
	var dupMap = {};
	var dups = 0;
	var solutionCount = 0;
	for (var i in solutions) {
		// Check for duplicates in rotated matrix
		var cur = solutions[i].matrix;
		var cur2 = rotate(clone(cur))
		var cur3 = rotate(clone(cur2))
		var tran = flip(clone(cur))
		var curStr = JSON.stringify(cur)
		var cur2Str = JSON.stringify(cur2)
		var cur3Str = JSON.stringify(cur3)
		var tranStr = JSON.stringify(tran)
		if (dupMap[curStr] || dupMap[cur2Str] || dupMap[cur3Str] || dupMap[tranStr]) {
			dups++;
			dupMap[curStr] = true;
			dupMap[cur2Str] = true;
			dupMap[cur3Str] = true;
			dupMap[tranStr] = true;
			continue;
		}
		dupMap[curStr] = true;
		dupMap[cur2Str] = true;
		dupMap[cur3Str] = true;
		dupMap[tranStr] = true;
		console.log("Solution # "+(++solutionCount)+" = \n"+solutions[i].log+"\n",Pretty(cur),"\n")
	}
	console.log("\n------\nFound "+solutionCount+" solutions in "+(tt/1000.0)+" seconds ("+c+" iterations)... ")	
}
function Pretty(cur) {
	for (var k = 0; k < cur.length; k++) {
		for (var j = 0; j < cur[0].length; j++) {
			cur[k][j] = enumMap[cur[k][j]];
		}
	}
	return cur;
}
var c = 0;
function flip(item) {
	var newItem = new Array(new Array(len))
	var len = item[0].length-1;
	var n = 0;
	for (var j = len; j >= 0; j--) {
		newItem[0][n++] = item[0][j]
	}
	return newItem;
}
var solutions = []
function spawnKids(leaf, itemsLeft, matrix, depth, log) {
	c++;
	var spot = findEmptySpot(matrix)
	if (leaf.val.length > 0) {
		var ok = applyToMatrix(spot[1], spot[0], leaf.val, clone(matrix))
		if (!ok) {
			return leaf;
		}
		log+="Place "+JSON.stringify(Pretty(clone(leaf.val)))+" at position "+spot[1]+","+spot[0]+"\n"
		matrix = ok;
	} 
	var numLeft=itemsLeft.length;
	for (var j = 0; j < numLeft; j++) {
		var itemsLeftTemp=clone(itemsLeft);
		var item = itemsLeftTemp.splice(j,1)[0]
		leaf.children[0] = (spawnKids({val:item, children: new Array(4)}, itemsLeftTemp,matrix, depth+1,log))
		var transposed = transpose(item);
		leaf.children[1] = (spawnKids({val:transposed, children: new Array(4)}, itemsLeftTemp,matrix, depth+1,log))
		var swapped = flip(item);
		leaf.children[2] = (spawnKids({val:swapped, children: new Array(4)}, itemsLeftTemp,matrix, depth+1,log))
		leaf.children[3] = (spawnKids({val:transpose(swapped), children: new Array(4)}, itemsLeftTemp,matrix, depth+1,log))
	}
	if (itemsLeft.length === 0) {
		if (isMatrixValid(matrix,true)) {
			solutions.push({
				matrix:matrix, 
				log: log
			})
		}
	}
	return leaf;
}
function findEmptySpot(matrix) {
	var found = false;
	for (var k = 0; k < SQUARESIZE; k++) {
		for (var j = 0; j < SQUARESIZE; j++) {
			if (matrix[k][j] === NONE) {
				found = true;
				return [k,j]
			}
		}
	}
	return false;
}
function rotate(a) {
	var n=a.length;
    for (var i=0; i<n/2; i++) {
        for (var j=i; j<n-i-1; j++) {
            var tmp=a[i][j];
            a[i][j]=a[n-j-1][i];
            a[n-j-1][i]=a[n-i-1][n-j-1];
            a[n-i-1][n-j-1]=a[j][n-i-1];
            a[j][n-i-1]=tmp;
        }
    }
	return a;
}

start();

