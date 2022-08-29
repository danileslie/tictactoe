"use strict";

const gameBoard = (() => {
const playerCreation = (marker, turn) => {
    return {marker, turn};
}

const playerX = playerCreation('X', true);
const playerO = playerCreation('O', false);
let currentPlayer = playerX;


const generateBoard = (() => {
const board = [];
for (let i = 0; i < 9; i++){
    board.push('');
}

let container = document.querySelector('.container');
board.forEach((item, index) => {
    let square = document.createElement('div');
    square.classList.add('square');
    container.appendChild(square);
})

const validMove = (square) => {
    if (square.innerText === 'X' || square.innerText === 'O'){
        return false;
    } else {
      return true;
    }
}

const changePlayer = () => {
    if (currentPlayer === playerX){
        currentPlayer = playerO;
    }  else {currentPlayer = playerX}
}

const boardUpdate = (index) =>{
    board[index] = currentPlayer;
    console.log(board);
}

const playerTest = (square, index) => {
    if (validMove(square)){
    square.innerText = currentPlayer.marker;
    boardUpdate(index);
    changePlayer();
}
}

const squares = document.querySelectorAll('.square');

const playerTurn = (() => {
    squares.forEach((square, index) => {
        square.addEventListener('click', () => {
                playerTest(square, index);
            }
        );   
        });
    })();
})();
})();




