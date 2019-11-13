
class players {
    constructor(name, token){
        this.name = name;
        this.token = token
        this.gameState = new Array();
        this.checksum = new Array();
    }    
}

const gameState =(() => {
    'use strict';
    const boardSize = 9;
    const board = document.querySelector("#gameBoard");
    let _playerOneActive = true;
    let _gameOver = false;
    let _counter = 0;

    // Calls this function on startup or when to reset game
    function newGame(){
    for (let i = 0; i < boardSize; i++){
        const boardElement = document.createElement("div");
        boardElement.textContent = "";
        boardElement.addEventListener("click", function(){
            let value = i;
            console.log("i: " + value);
            gameLoop(this, value);
        })
        board.appendChild(boardElement);
        }
    }
    // main game loop where everything is checked on click
    function gameLoop(square, value){    
        let token = "";
        if (square.textContent === "" && _gameOver === false){
            if (_playerOneActive === true){
                token = player1.token;
                pushGameState(player1, value);
                _playerOneActive = false;
            } else {
                token = player2.token;
                pushGameState(player2, value)
                _playerOneActive = true;
            }    
            
            square.textContent = token;
        }    
    }

    // Function to push the game state forward
    function pushGameState(player, value){
        player.gameState.push(value);
        const stateToCheck = player.gameState.sort((firstNum, secondNum) => firstNum > secondNum ? 1 : -1);
        checkWin(player);
        // checks for draw
        _counter++;
        console.log("counter :" + _counter)
        if (_counter === 9 && _gameOver === false){
            _gameOver = true;
            console.log("Draw");
        }
    }
    // Function to check for a winner
    function checkWin(player){

        // List of all possible winning states
        const winning  = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]  
    
        // Breaks down the game state into an array that matches the layout of the winning possibilities
        let length = player.gameState.length
        for (let i = 0; i < length; i++){    
            for (let j = 0; j < length; j++){        
                for (let k = 0; k < length; k++){
                    if ((player.gameState[i] != player.gameState[j]) && (player.gameState[i] != player.gameState[k]) && (player.gameState[j] != player.gameState[k])){
                        player.checksum.push([player.gameState[i], player.gameState[j], player.gameState[k]])
                    }           
                }
            }
        }

        // function to check for the posibilities
        let checkWin = (arr, secondArr) => secondArr.every(v => arr.includes(v));

        // Loop through the created array again to see if anything matches with our checkFun function 
        for (let l = 0; l < player.checksum.length; l++){
            for (let k = 0; k < winning.length; k++){        
                if (checkWin(player.checksum[l], winning[k]) === true){
                    console.log("winner winner chicken dinner. The winner is " + player.name);
                    _gameOver = true;
                }      
                
            }
        }
        // TODO: check if i can refactor this better. Maybe check within the first loop 
    }
    return{
        newGame: newGame
    }
})()

// create plaers and set their tokens
let player1 = new players("Paul", "X");
let player2 = new players("Nicklaas", "O");

// start game
gameState.newGame();