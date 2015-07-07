/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = countNRooksSolutions(n, true)[0];

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n, returnArrays) {
  var solutions = [];

  var columns = [];
  for (var i = 0; i < n; i++) {
    columns.push(i);
  };

  var solutionMaker = function(columnIndexArr, solutionBoard, rowIndex){
    
    // base case: if columnIndexArr = []

    if(rowIndex === n){
      solutions.push(solutionBoard);
      return;
    } else {    
      if(!solutionBoard){
        solutionBoard = [];
      }

      // recursion

      var rowArr = []; // [0,0,0,0]
      for (var i = 0; i < n; i++) {
        rowArr.push(0);
      }

      for (var i = 0; i < columnIndexArr.length; i++) { // [0,1,2,3]
        var newRowArr = rowArr.slice(0);
        newRowArr[columnIndexArr[i]] = 1;
        var newSolutionBoard = solutionBoard.slice(0); // []
        
        var newRowIndex = rowIndex + 1; // 0 --> 1
        var newColumnIndexArr = columnIndexArr.slice(0); // [0,1,2,3]
        newColumnIndexArr.splice(i, 1); // [0,2,3]
        newSolutionBoard.push(newRowArr); // [[1,0,0,0]]

        solutionMaker(newColumnIndexArr, newSolutionBoard, newRowIndex);

      }
    }
  };
  
  solutionMaker(columns, [], 0);
  var solutionCount = solutions.length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  if(returnArrays){
    return solutions;
  } else {
    return solutionCount;
  }
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var solution = countNQueensSolutions(n, true)[0];
  
  [[0,0],[0,0]]

  if(n === 2){
    return [[0,0],[0,0]];
  } else if (n === 3){
    return [[0,0,0],[0,0,0],[0,0,0]];
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n, returnArray) {
  var rookSolutions = countNRooksSolutions(n, true); // get array of rook solutions
  
  var queenSolutionsArr = _.filter(rookSolutions, function(matrix){
    var board = new Board(matrix);
    return !board.hasAnyQueensConflicts();
  });
  
  var solutionCount = queenSolutionsArr.length; // get # from length prop

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);

  if(returnArray){
    return queenSolutionsArr;
  } else {
    return solutionCount;
  }

};
