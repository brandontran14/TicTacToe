
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
    const player1 = PlayerFactory("firstplayer", "X", true,0)
    const player2 = PlayerFactory("secondplayer", "O", false,0)
    //makes X or O depending on player, populates boardarray, and switches turns
    function MakeMove(e){
        if(e.target.innerText){
            return;
        }
        if(player1.turn){
            this.innerText = "X"
        }
        else{
            this.innerText = "O"
        }
        GameBoard.BoardArray[this.id] = this.innerText
        player1.turn = player1.turn ? false: true
        player2.turn = player2.turn ? false: true
        CheckGame()
        console.log(player1,player2)
    }

})()

function CheckGame(){
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
        if(isWinner(Xarray,WinConditions)) console.log("player1 wins!")
        if(isWinner(Oarray,WinConditions)) player2.wins++
}


function isWinner(playerarray, winningcombo){
    var comblength = 0;
    for (var i in winningcombo){
        comblength = winningcombo.length;
        for (var j in winningcombo[i]){
            if(-1 == playerarray.indexOf(winningcombo[i][j])){
                break;
            }
        }
        if (comblength - 1 == j){
            return true;
        }
    }
    return false;
}

//renders the board on the page
const render = (() => {
    for(let i=0; i < GameBoard.BoardArray.length; i++){
        let squareID = document.getElementById(`${i}`)
        squareID.innerText = GameBoard.BoardArray[i]
    }
})();

var test = [0, 1, 2];
var WinningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  if(isWinner(test,WinningConditions)){
      alert("win!");
  } else{
      alert("No win.");
  }
