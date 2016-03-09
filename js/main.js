

$(document).ready(function(){

var setRules = {

    "gridSize": 0,
    "firstPlayer": 0,
    "secondPlayer": 0,
    "winner": 0,
    "firstPlayerNumbers": [],
    "secondPlayerNumbers": [],
    "winningCombinations": [],

    "defineRow": function(grid){
      row = grid;
      for (var i = 0; i < row; i++){
        $(".tictactoebox").append("<div class='row'>");
      };
      return row;
    },

    "defineColumn": function(grid){
      column = grid;
      for (var i = 0; i < column; i++){
        $(".row").append("<div class='box'>");
      };
      return column;
    },

    "defineGrid": function(size){
      setRules.defineRow(size);
      setRules.defineColumn(size);
      setRules.gridSize = size;
    },

    "assignBoxVal": function(){
      var x = $(".box");
      x.attr('data-value', function (index) {
        return 1 + index;
      });
    },

    "assignRowVal": function(){
      var x = $(".row");
      x.attr('data-value', function (index) {
        return 1 + index;
      });
    },


"makeTurn": function() {
    $(".box").on("click", function() {
        if (setRules.firstPlayer === setRules.secondPlayer && $(this).css('background-color') !== "rgb(0, 128, 0)") {
            $(this).css({
                "background-color": "yellow"
            });
            setRules.firstPlayerNumbers.push($(this).data('value'));
            setRules.checkFirstPlayerWin();
            if (setRules.winner === 1) {
                alert("Player One Wins");
            }
            setRules.firstPlayer++;
        } else if (setRules.firstplayer !== setRules.secondPlayer && $(this).css('background-color') !== "rgb(255, 255, 0)") {
            $(this).css({
                "background-color": "green"
            });
            setRules.secondPlayerNumbers.push($(this).data('value'));
            setRules.checkSecondPlayerWin();
            if (setRules.winner === 2) {
                alert("Player Two Wins");
            }
            setRules.secondPlayer++;
        }
    })
},

    "getMaxValue": function(){
      $( ".box" ).each(function( index ) {
        var value = $(this).data('value');
        setRules.winner += value;
      });
    },

    "getWinningValues": function(){
      //loop through all horizontal values
      for (var i = 0; i < $(".row").length; i++){
        var horizontalArr = [];
        var verticalArr = [];
        for (var j = 0; j < $(".row").length; j++){
          // Go into a particular, get all of the children, get a particular child, then get its value
          var x = $(".row").eq(i).children().eq(j).attr('data-value');
          var y = $(".row").eq(j).children().eq(i).attr('data-value');
          horizontalArr.push(parseInt(x));
          verticalArr.push(parseInt(y));
      }
      setRules.winningCombinations.push(horizontalArr);
      setRules.winningCombinations.push(verticalArr);
    }
      var diagonalArrL = [];
      var diagonalArrR = [];

      for (var m = 0; m < $(".row").length; m++){
        var r = $(".row").eq(m).children().eq(m).attr('data-value');
        diagonalArrL.push(parseInt(r));
    }
      var o = $(".row").length - 1;
      for (var  n = 0; n < $(".row").length; n++){
        var s = $(".row").eq(n).children().eq(o).attr('data-value');
        diagonalArrR.push(parseInt(s));
        o--;

    }
      setRules.winningCombinations.push(diagonalArrL);
      setRules.winningCombinations.push(diagonalArrR);
      console.log(setRules.winningCombinations);
  },


  "checkFirstPlayerWin": function() {
    var counter = 0;
    if (setRules.firstPlayerNumbers.length >= setRules.gridSize){
      for(var i = 0; i < setRules.winningCombinations.length; i++){
        var x = $(setRules.firstPlayerNumbers).filter(setRules.winningCombinations[i]);
        if (x.length === setRules.gridSize){
          setRules.winner = 1;
        }
      }
    }
  },

  "checkSecondPlayerWin": function() {
    var counter = 0;
    if (setRules.secondPlayerNumbers.length >= setRules.gridSize){
      for(var i = 0; i < setRules.winningCombinations.length; i++){
        var x = $(setRules.secondPlayerNumbers).filter(setRules.winningCombinations[i]);
        if (x.length === setRules.gridSize){
          setRules.winner = 2;
        }
      }
    }
  }
}


  setRules.defineGrid(8);
  setRules.assignBoxVal();
  setRules.assignRowVal();
  setRules.getMaxValue();
  setRules.makeTurn();
  setRules.getWinningValues();

});
