"use strict";

const gameBoard = (() => {
let gameActive = true;
let restart = document.querySelector('.reset');
let turnAnnouncement = document.querySelector('.turn-announcement');

const playerCreation = (marker, turn) => {
    return {marker, turn};
}

const playerX = playerCreation('X', true);
const playerO = playerCreation('O', false);
let currentPlayer = playerX;
const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], 
                       [0, 3, 6], [1, 4, 7], [2, 5, 8], 
                       [0, 4, 8], [2, 4, 6]]

const generateBoard = (() => {
let board = [];
for (let i = 0; i < 9; i++){
    board.push('');
};

let container = document.querySelector('.container');
board.forEach((item, index) => {
    let square = document.createElement('div');
    square.classList.add('square');
    container.appendChild(square);
});

const validMove = (square) => {
    if (square.innerText === 'X' || square.innerText === 'O'){
        return false;
    } else {
      return true;
    }
};

const turnCall = () => {
    turnAnnouncement.textContent = `It's Player ${currentPlayer.marker}'s turn`   
};
turnCall();

const changePlayer = () => {
    if (currentPlayer === playerX){
        currentPlayer = playerO;
        turnCall();
    }  else {currentPlayer = playerX;
    turnCall();
}
};

const boardUpdate = (index) =>{
    board[index] = currentPlayer;
};

const gameResult = () => {
    // search for a win condition in each round
    let winningRound = false;
    for (let i = 0; i <=7; i++){
        let winCondition1 = board[winConditions[i][0]];
        let winCondition2 = board[winConditions[i][1]];
        let winCondition3 = board[winConditions[i][2]];
        
        if(!winCondition1 || !winCondition2 || !winCondition3 ){
            continue;
        }
        if (winCondition1 === winCondition2 && winCondition2 === winCondition3) {
            winningRound = true;
            
            break;
        }
    }
    if (winningRound) {
        turnAnnouncement.textContent = `Round won by Player${currentPlayer.marker}!`;
        gameActive = false; 
        return;
    }
    changePlayer();
};


const playerTest = (square, index) => {
    if (validMove(square) && gameActive){
    square.classList.add(`player${currentPlayer.marker}`);
    square.innerText = currentPlayer.marker;
    boardUpdate(index);
    gameResult();
    }
};

const squares = document.querySelectorAll('.square');

const playerTurn = (() => {
    squares.forEach((square, index) => {
        square.addEventListener('click', () => {
                playerTest(square, index);
            }
        );   
        });
    })();

    
const restartButton = () => {
    gameActive = true;
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = playerX;
    document.querySelectorAll('.square').forEach(square => {
        square.innerText = '';
    square.classList.remove('playerX', 'playerO');
});
    turnCall();
 };

restart.addEventListener('click', restartButton);
    
})();
})();




