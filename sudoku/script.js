var arr = [[], [], [], [], [], [], [], [], []]
var temp = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);

    }
}

function initializeTemp(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            temp[i][j] = false;

        }
    }
}


function setTemp(board, temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                temp[i][j] = true;
            }

        }
    }
}


function setColor(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (temp[i][j] == true) {
                arr[i][j].style.color = "#DC3545";
            }

        }
    }
}

function resetColor() {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {

            arr[i][j].style.color = "green";


        }
    }
}

var board = [[], [], [], [], [], [], [], [], []]


let button = document.getElementById('generate-sudoku')
let solve = document.getElementById('solve')

console.log(arr)
function changeBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {

                arr[i][j].value = board[i][j]
            }

            else
                arr[i][j].value = ""
        }
    }
}


button.onclick = function () {
        var level=document.getElementById("level");
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response)
        console.log((response))
        initializeTemp(temp)
        resetColor()

        board = response.board
        setTemp(board, temp)
        setColor(temp)
        changeBoard(board)
    }


    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty='+level.value);
    //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
    xhrRequest.send()
}

//to be completed by student
function isPossible(board, sr, sc, val) {
    for (var row = 0; row < 9; row++) {
        if (board[row][sc] == val) {
            return false;
        }
    }

    for (var col = 0; col < 9; col++) {
        if (board[sr][col] == val) {
            return false;
        }
    }

    var r = sr - sr % 3;
    var c = sc - sc % 3;

    for (var cr = r; cr < r + 3; cr++) {
        for (var cc = c; cc < c + 3; cc++) {
            if (board[cr][cc] == val) {
                return false;
            }
        }
    }
    return true;

}

//to be completed by student
function solveSudokuHelper(board, sr, sc) {
    if (sr == 9) {

 //check(board,arr);
        changeBoard(board);
        return;
    }
    if (sc == 9) {
        solveSudokuHelper(board, sr + 1, 0)
        return;
    }

    if (board[sr][sc] != 0) {
        solveSudokuHelper(board, sr, sc + 1);
        return;
    }

    for (var i = 1; i <= 9; i++) {
        if (isPossible(board, sr, sc, i)) {
            board[sr][sc] = i;
            solveSudokuHelper(board, sr, sc + 1);
            board[sr][sc] = 0;
        }
    }
}

//ans by user
ans = [[], [], [], [], [], [], [], [], []]
function check(board,arr) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {

            if(arr[i][j].value=='')
                ans[i][j]=0;
            else

           ans[i][j]=Number(arr[i][j].value);

        }
    }
    var i=0;
   
  for (; i < 9; i++) {

        for (var j=0; j < 9; j++) {
           if(ans[i][j]!=Number(board[i][j]))
            break;
       

        }
    }
    if(i==9)
        console.log("right");

else
    console.log("left");

}

function solveSudoku(board) {
    solveSudokuHelper(board, 0, 0)
     
}

solve.onclick = function () {
    if(board[0].length!=0)
    solveSudoku(board)
else
    alert(" PLZ PRESS GET PUZZLE BEFORE SOLVE!!")

}