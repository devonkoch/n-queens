// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.rows()[rowIndex];
      var counter = 0;
      
      for (var i = 0; i < row.length; i++) {
        if(row[i] === 1){
          counter++;
        }
      };

      if(counter > 1) {
        return true;
      } else {
        return false;
      }


    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rows = this.rows();
      var conflicted = false;
      for (var i = 0; i < rows.length; i++) {
        if(this.hasRowConflictAt(i)){
          conflicted = true;
        }
      }
      return conflicted;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var rows = this.rows();
      var counter = 0;
      for (var i = 0; i < rows.length; i++) {
        if(rows[i][colIndex] === 1){
          counter++;
        }
      }
      
      if(counter > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var conflicted = false;
      var n = this.rows().length

      for (var i = 0; i < n; i++) {
        if(this.hasColConflictAt(i)){
          conflicted = true;
        }
      };

      return conflicted;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var index = majorDiagonalColumnIndexAtFirstRow;
      var start = 0;
      var end = this.rows().length - 1;
      
      if(index < 0){
        start = -index;
        end += index;
      } else {
        end -= index;
      }
      
      var counter = 0;
      var rows = this.rows();
      
      for (var i = start; i <= end; i++) {
        if(rows[i][index + i] === 1){
          counter++;
        }
      };
      
      if(counter > 1){
        return true;
      } else {
        return false;
      }

    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var end = this.rows().length-2;
      var start = -end;
      var conflicted = false;
      
      for (var i = start; i <= end; i++) {
        if(this.hasMajorDiagonalConflictAt(i)){
          conflicted = true;
        }
      }

      return conflicted;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var columnIndex = minorDiagonalColumnIndexAtFirstRow;
      var n = this.rows().length - 1;
      var counter = 0;
      var rows = this.rows();

      if(columnIndex <= n){
        for (var i = 0; i <= columnIndex; i++) {
          if(rows[i][columnIndex-i] === 1){
            counter++;
          }
        }
      } else {
        var j = 0;
        for (var i = columnIndex-n; i <= n; i++) {
          if(rows[i][n - j] === 1){
            counter++;
          }
          j++;
        }
      }

      if(counter > 1){
        return true;
      } else {
        return false;
      }
      // n = last index = length - 1 = max traversal
      // from 0 - n, start iterating on row 0, column columnIndex;
        // stop iterating on row columnIndex
      // if columnIndex > n ; starting iterating on row columnIndex - n, column n
        // stop iterating on row n


    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var start = (2*(this.rows().length-1)) - 1;
      var end = 1;
      var conflicted = false;

      for (var i = start; i >= end; i--) {
        if(this.hasMinorDiagonalConflictAt(i)){
          conflicted = true;
        }
      }
      return conflicted;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
