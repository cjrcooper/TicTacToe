

$(document).ready(function(){

var setRules = {

    "comp": 0,
    "player": 0,

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

    "assignVal": function(){
      var x = $(".box");
      x.attr('div-value', function (index) {
        return 1 + index;
      });
    },

    "makeTurn": function(){
        $(".box").on("click", function(){
          if (setRules.player === setRules.comp && $(this).css('background-color') !== "rgb(0, 128, 0)"){
            $(this).css({"background-color": "yellow"});
            setRules.player++;
          } else if (setRules.player !== setRules.comp && $(this).css('background-color') !== "rgb(255, 255, 0)"){
            $(this).css({"background-color": "green"});
            setRules.comp++;
          }
      })
    },

    "determineWinner": function(){
      var winningNumber = [];

    }

}
  setRules.defineRow(3);
  setRules.defineColumn(3);
  setRules.assignVal();
  setRules.makeTurn();
});
