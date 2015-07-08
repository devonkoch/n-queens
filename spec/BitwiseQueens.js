var bitwiseQueens = function(n){
  
  // populating array with items to sample e.g [1,2,4,8]
  var totalBitOptions = [];
  for (var i = 1; i <= n; i++) {
    totalBitOptions.push(Math.pow(2,i));
  }

  // initializing a counter
  var counter = 0;

  // recursive conditional counter
  var solutionCounter = function(currentBuildArr, remainingBitOptions){
    // base case: if we current reaches n, it passes, and add to counter
    if(currentBuildArr.length === n){
      return counter++;
    }

    // recursive case: loop over remaining sample
    for (var i = 0; i < remainingBitOptions.length; i++) {
      var board = currentBuildArr.slice(0);
      var remaining = remainingBitOptions.slice(0);
      
      // if board is empty, push to it e.g. [1] [2] [4]
      if(!board){
        remaining.push(remaining[i]);
      }

      // if board is not empty, push using remaining 
      if(helper(board, remaining[i]) === true) {
        board.push(remaining[i]);
        remaining.splice(i,1);
        solutionCounter(board, remaining);
      }
    }
  }

  solutionCounter([], totalBitOptions));
  return counter;
};



var helper = function(currentBuildArr, nextValuesArr){
  var validValues = [];

  // original = [1,2,4,8,16]
  // n = 4
  // current = [1,16] --> [00001, 10000]
  // next = [2,4,8] --> [00010, 00100, 01000] 

  var currentLength = currentBuildArr.length //
  var nextLength = nextValuesArr.length

  for (var i = 0; i < nextLength; i++) {
    // var shift = currentLength;
    for (var j = 0; j < currentLength; j++) {
      if(!(currentBuildArr[j] >> (currentLength - j) === nextLength[i] || currentBuildArr[j] << (currentLength - j) === nextLength[i])){
        validValues.push();
      }
    }
  }
};
