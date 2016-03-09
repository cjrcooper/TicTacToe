

$(document).ready(function(){

    var setRules = {

      "gridSize": [],

      "makeGrid": function(size){
        var x = size;
        var p = 'x';
        for (var i = 0; i < x; i++){
          setRules.gridSize.push(p);
        }
      }
    }

    setRules.makeGrid();
    console.log(setRules.gridSize)

});


var counter = 0;
// debugger
if (setRules.playerNumbers.length >= setRules.gridSize){
  for (var i = 0; i < setRules.winningCombinations.length; i++){
    for (var j = 0; j < setRules.playerNumbers.length; j++){
      console.log('inArray', setRules.playerNumbers[j], setRules.winningCombinations[i]);
      if ($.inArray(setRules.playerNumbers[j], setRules.winningCombinations[i]) !== -1){
        console.log('match found');
        counter++;
    }
  }
}
console.log(counter);
}
}
}

var firstArray = [1, 2, 3, 4, 5];
undefined
var secondArray = [1, 3, 7, 9];
undefined
$(firstArray).filter(secondArray);
[1, 3]
