const gameState =(() => {
    'use strict';
    const boardSize = 9;
    const board = document.querySelector("#gameBoard");
    const _result = document.querySelector("#showResult") 
    let _playerOneActive = true;
    let _gameOver = false;
    let _counter = 0;    

    class players {
        constructor(name, token){
            this.name = name;
            this.token = token;
            this.gameState = new Array();
            this.checksum = new Array();
        }    
    }
    

    // Calls this function on startup or when to reset game
    function newGame(){
    
    let playersInfo = createPlayers();
    let player1 = new players(playersInfo.player1Name, playersInfo.player1Marker);
    let player2 = new players(playersInfo.player2Name, playersInfo.player2Marker);
    resetState();
    for (let i = 0; i < boardSize; i++){
        const boardElement = document.createElement("div");
        boardElement.textContent = "";
        boardElement.addEventListener("click", function(){
            let value = i;
            gameLoop(this, value, player1, player2);
        })
        board.appendChild(boardElement);
        }
    }
    // main game loop where everything is checked on click
    function gameLoop(square, value, player1, player2){    
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
            _result.textContent = "Draw"
        }
    }

    // Function to check for a winner
    // TODO: check if i can refactor this better. Maybe check within the first loop 
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
                    _result.textContent = (player.name + " is the winner.");
                    console.log("winner winner chicken dinner. The winner is " + player.name);
                    _gameOver = true;
                }      
                
            }
        }        
    }

    // Resets game variables
    function resetState(){
        _playerOneActive = true;
        _gameOver = false;
        _counter = 0;
        const boardElement= document.querySelector("#gameBoard")
        while (boardElement.firstChild){
            boardElement.removeChild(boardElement.firstChild);
        }
        document.querySelector("#showResult").textContent = "";
    }    
     // create players and their markers

    function createPlayers(){
        let player1Name = document.querySelector("#player1Name").value;
        if (player1Name === undefined || player1Name ===""){
            player1Name = "Player 1"
        }
    
        let player1Marker = document.querySelector("#player1Marker").value;
        if (player1Marker === undefined || player1Marker ===""){
            player1Marker ="X"
        }

        let player2Name = document.querySelector("#player2Name").value;
        if (player2Name === undefined || player2Name ===""){
            player2Name = "Player 2"
        }

        let player2Marker = document.querySelector("#player2Marker").value;
        if (player2Marker === undefined || player1Marker ===""){
            player2Marker ="O"
        }

        return {
            player1Name: player1Name,
            player1Marker: player1Marker,
            player2Name: player2Name,
            player2Marker: player2Marker
        }
    }
    return{
        newGame: newGame
    }
})()


// start game
gameState.newGame();
const startGameBtn = document.querySelector("#newGame")
startGameBtn.onclick = gameState.newGame; 

// TODO: Prevent user from entering more than 1 character into the token box
