
//modular GameBoard Object
const GameBoard = ( () => {
    //const cellElements = document.querySelectorAll(".cell")
    const BoardArray = ['','','','','','','','',''];
    //cellElements.forEach(cell => BoardArray.push(cell))

    return {
        BoardArray
    }
})(); 

//player factory constructor
const PlayerFactory = (name, symbol, turn, wins) => {
    return {name, symbol, turn, wins}
}


(function PlayGame(){

    Array.from(document.querySelectorAll(".cell")).forEach(cell => cell.addEventListener("click", MakeMove))
    document.querySelector("#Restart").addEventListener("click",RestartGame)
    document.querySelector("#Reset").addEventListener("click",ResetBoard)
    const player1 = PlayerFactory("player 1", "X", true, 0)
    const player2 = PlayerFactory("player 2", "O", false, 0)
    const WinConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
    //makes X or O depending on player, populates boardarray, and switches turns
    function MakeMove(e){
        if(e.target.innerText){
            return;
        }
        if(player1.turn){
            this.classList.add("X")
            this.innerText = "X"
        }
        else{
            this.classList.add("O")
            this.innerText = "O"
        }
        GameBoard.BoardArray[this.id] = this.innerText
        player1.turn = player1.turn ? false: true
        player2.turn = player2.turn ? false: true
        CheckGame()
    }

    //check for win condition
    function CheckGame(){
        let Xarray = [];
        let Oarray = [];
        for(let i=0; i < GameBoard.BoardArray.length; i++){
            if(GameBoard.BoardArray[i] == "X"){
                Xarray.push(i)
            }
            else if(GameBoard.BoardArray[i] == "O"){
                Oarray.push(i)
            }
        }
        if(isWinner(Xarray,WinConditions)){
            player1.wins++
            alert(`${player1.name} wins`)
            ResetBoard()
        }
        if(isWinner(Oarray,WinConditions)){
            player2.wins++
            alert(`${player2.name} wins`)
            ResetBoard()
        }
        if(isTie(GameBoard.BoardArray)){
            alert("tie game")
        }

        UpdateScore()

    }
    
    //updates Score on ScoreBoard
    function UpdateScore(){
        document.getElementById("Xscore").value = player1.wins
        document.getElementById("Oscore").value = player2.wins
    }

    //resets board AND score
    function RestartGame(){
        ResetBoard()
        player1.wins = 0;
        player2.wins = 0;
        UpdateScore()
    }   
})()

//checks for tie
function isTie(arr){
    for(let i=0; i < arr.length; i++){
        if (''== arr[i]){
          return false;
        }
    }
    return true;
}

//checks for win conditions
function isWinner(playerarray, winningcombo){
    var result = winningcombo.some(function(ar) {
        return ar.every(function(e){
            return playerarray.indexOf(e) != -1
        })
    })
    return result
}

//renders the board on the page
const render = (() => {
    for(let i=0; i < GameBoard.BoardArray.length; i++){
        let squareID = document.getElementById(`${i}`)
        squareID.innerText = GameBoard.BoardArray[i]
    }
})();

//resets board after a win/tie
function ResetBoard() {
    for(let i=0; i < GameBoard.BoardArray.length; i++){
        let squareID = document.getElementById(`${i}`)
        squareID.innerText = ''
    }
}

