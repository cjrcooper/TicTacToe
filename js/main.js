
$(document).ready(function() {



    var setRules = {

        "gridSize": 0,
        "gameLength": 0,
        "totalGamesPlayed": 0,
        "firstPlayer": 0,
        "secondPlayer": 0,
        "computerPlayer": 0,
        "winner": 0,
        "firstPlayerNumbers": [],
        "secondPlayerNumbers": [],
        "winningCombinations": [],
        "firstPlayerGameWins": 0,
        "secondPlayerGameWins": 0,
        "maxValue": 0,

        "defineRow": function(grid) {
            row = grid;
            for (var i = 0; i < row; i++) {
                $(".tictactoebox").append("<div class='row'>");
            };
            return row;
        },

        "defineColumn": function(grid) {
            column = grid;
            for (var i = 0; i < column; i++) {
                $(".row").append("<div class='box'>");
            };
            return column;
        },

        "defineGrid": function(size) {
            setRules.defineRow(size);
            setRules.defineColumn(size);
            setRules.gridSize = size;
            setRules.maxValue = size * size;
            $('body').css({
                width: 100 + "%"
            });


            for (var i = 0; i < setRules.gridSize; i++) {
                for (var j = 0; j < setRules.gridSize; j++) {
                    $(".row").eq(i).children(j).css({
                        "border-bottom": "3px solid #fff",
                        "border-right": "3px solid #fff"
                    });
                }
            }

            for (var j = 0; j < setRules.gridSize; j++) {
                $(".row").eq(j).children().eq(setRules.gridSize - 1).css({
                    "border-right": "0px"
                });
            }

            for (var k = 0; k < setRules.gridSize; k++) {
                $(".row").eq(setRules.gridSize - 1).children().eq(k).css({
                    "border-bottom": "0px"
                });
            }
        },

        "assignBoxVal": function() {
            var x = $(".box");
            x.attr('data-value', function(index) {
                return 1 + index;
            });
        },

        "assignRowVal": function() {
            var x = $(".row");
            x.attr('data-value', function(index) {
                return 1 + index;
            });
        },

        "getRandomCompMove": function() {
            var x = Math.round(Math.random() * (setRules.maxValue - 1));
            return x;
        },


        "computerTurn": function() {
            var totalMovesMade = setRules.firstPlayer + setRules.secondPlayer;
            if (setRules.computerPlayer === 1 && totalMovesMade !== setRules.maxValue) {
                var moveComplete = 0;
                while (moveComplete === 0) {
                    y = setRules.getRandomCompMove();
                    if ($(".box").eq(y).children().hasClass("circle") === true || $(".box").eq(y).children().hasClass("cross") === true) {
                        setRules.getRandomCompMove();
                    } else {
                        $('.box').eq(y).append("<div class='circle'>");
                        setRules.secondPlayerNumbers.push($('.box').eq(y).data('value'));
                        setRules.checkSecondPlayerWin();
                        setRules.gameAlerts();
                        setRules.secondPlayer++;
                        moveComplete++;
                    }
                }
            } else {
                swal('Draw?', 'I guess you should try that again');
                return
            }
        },


        "gameAlerts": function() {
          var x = setRules.firstPlayerGameWins;
          var y = setRules.secondPlayerGameWins;
          setRules.totalGamesPlayed = x + y;

            if (setRules.winner === 1 && setRules.computerPlayer === 1) {
              if (setRules.totalGamesPlayed === setRules.gameLength){
                swal('You Win!', 'Congratulations!', 'success')
                return;
              } else {
                setTimeout($('.row').find('.box').remove());
                setTimeout($('#tictactoebox').find('.row').remove());
                setTimeout(setRules.defineGrid, 1000);
                setTimeout(setRules.startGame, 1000);
              };

            } else if (setRules.winner === 2 && setRules.computerPlayer === 1) {
                swal('Game Over!', 'The Computer Wins!', 'error')
                return;
            } else if (setRules.winner === 1) {
                swal('Player 1 Wins!', 'Congratulations', 'success');
                return;
            } else if (setRules.winner === 2) {
                swal('Player 2 Wins!', 'Congratulations', 'success');
                return;
            }
        },


        "makeTurn": function() {

            if (setRules.computerPlayer === 1) {
                $(".box").on("click", function() {
                    if ($(this).children().hasClass("circle") === false || $(this).children().hasClass("cross") === false) {
                        $(this).append("<div class='cross'>");
                        setRules.firstPlayerNumbers.push($(this).data('value'));
                        setRules.checkFirstPlayerWin();
                        setRules.gameAlerts();
                        setRules.firstPlayer++;
                        setTimeout(setRules.computerTurn, 1000);
                    }
                })

            } else {
                $(".box").on("click", function() {
                    if (setRules.firstPlayer === setRules.secondPlayer) {
                        $(this).append("<div class='cross'>");
                        setRules.firstPlayerNumbers.push($(this).data('value'));
                        setRules.checkFirstPlayerWin();
                        setRules.gameAlerts();
                        setRules.firstPlayer++;
                    } else if (setRules.firstplayer !== setRules.secondPlayer) {
                        $(this).append("<div class='circle'>");
                        setRules.secondPlayerNumbers.push($(this).data('value'));
                        setRules.checkSecondPlayerWin();
                        setRules.gameAlerts();
                        setRules.secondPlayer++;
                    }
                })
            }
        },

        "getWinningValues": function() {
            //loop through all horizontal values
            for (var i = 0; i < $(".row").length; i++) {
                var horizontalArr = [];
                var verticalArr = [];
                for (var j = 0; j < $(".row").length; j++) {
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

            for (var m = 0; m < $(".row").length; m++) {
                var r = $(".row").eq(m).children().eq(m).attr('data-value');
                diagonalArrL.push(parseInt(r));
            }
            var o = $(".row").length - 1;
            for (var n = 0; n < $(".row").length; n++) {
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
            if (setRules.firstPlayerNumbers.length >= setRules.gridSize) {
                for (var i = 0; i < setRules.winningCombinations.length; i++) {
                    var x = $(setRules.firstPlayerNumbers).filter(setRules.winningCombinations[i]);
                    if (x.length === setRules.gridSize) {
                        setRules.winner = 1;
                        setRules.firstPlayerGameWins += 1;
                        $('.score1').html(setRules.firstPlayerGameWins);

                    }
                }
            }
        },

        "checkSecondPlayerWin": function() {
            var counter = 0;
            if (setRules.secondPlayerNumbers.length >= setRules.gridSize) {
                for (var i = 0; i < setRules.winningCombinations.length; i++) {
                    var x = $(setRules.secondPlayerNumbers).filter(setRules.winningCombinations[i]);
                    if (x.length === setRules.gridSize) {
                        setRules.winner = 2;
                        setRules.secondPlayerGameWins += 1;
                        $('.score2').html(setRules.secondPlayerGameWins);

                    }
                }
            }
        },

        "playAgain": function(){
              for (var i = 0; i < $(".box").length; i++){
                $('.box').eq(i).children().removeClass('circle');
                $('.box').eq(i).children().removeClass('cross');
                console.log($('.box'));
              };

              for (var j = 0; j < setRules.firstPlayerNumbers.length; j++){
                  setRules.firstPlayerNumbers.pop();
                  console.log(setRules.firstPlayerNumbers);
              };
              for (var j = 0; j < setRules.secondPlayerNumbers.length; j++){
                  setRules.secondPlayerNumbers.pop();
                  console.log(setRules.secondPlayerNumbers);
              };
          },


        "startGame": function() {
            var size = parseInt($('.gridSize:checked').val());
            var gameType = parseInt($('.gameMode:checked').val());
            setRules.computerPlayer = gameType;
            setRules.defineGrid(size);
            setRules.assignBoxVal();
            setRules.assignRowVal();
            setRules.makeTurn();
            setRules.getWinningValues();
        }
    }

    $('input.gameMode').on('change', function() {
        $('input.gameMode').not(this).prop('checked', false);
    });
    $('input.gridSize').on('change', function() {
        $('input.gridSize').not(this).prop('checked', false);
    });
    $('.startButton').on("click", function(){
      var gameLength = $('.gameLength').val();
      setRules.gameLength = gameLength;
    });
    $('.startButton').on("click", setRules.startGame);
    $('.startButton').on("click", function() {
        $('.overlay').fadeOut();
        $('#scoreScreen').fadeIn(4000);
        $('#container').fadeIn(2000);
    })


});
