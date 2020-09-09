// DOM ELEMENTS

const mainWrapper = document.querySelector("#main-wrapper")
const board = document.querySelector("#board")
const form = document.querySelector("form")

// GAME LOGIC MODULE

const gameBoard = (() => {

  const gameArray = [["","",""],
                     ["","",""],
                     ["","",""]]

  let players = []

  // Player object constructor                     
  const player = (name, sign) => {
    return {name, sign}
  }

  const move = (player, gameArray, pos) => {
    gameArray[pos[0]][pos[1]] = player.sign
  }

  const win = () => {
    // Check rows
    const board = gameBoard.gameArray
    for(let i = 0; i < 3; i ++) {
      if(board[i][0] != "" && (board[i][0] == board[i][1] == board[i][2])) {
        return board[i][0]
      }
    }

    // Check columns

    for(let j = 0; j < 3; j ++) {
      if(board[0][j] != "" && (board[0][j] == board[1][j] == board[2][j])) {
        return board[0][j]
      }
    }

    // Check diagonals

    // Primary diagonal
    if(board[0][0] != "" && (board[0][0] == board[1][1] == board[2][2])) {
      return board[0][0]
    }

    // Secondary diagonal
    if(board[0][2] != "" && (board[0][2] == board[1][1] == board[2][0])) {
      return board[0][2]
    }

    return false;
  }
  
  return {gameArray,
          player,
          players,
          move,
          win}

})()

// DOM MANIPULATION MODULE

const displayController = (() => {

  // RENDERING DOM (based on gameBoard)

  const buildBoard = (() => {
    for(let i = 0; i < 9; i ++) {
      const block = document.createElement("div")
      block.classList.add("boardBlock")
      block.setAttribute("data-id", i);
      board.appendChild(block)
    }
  })()

  // RENDERS DOM Elements based on gameBoard's information

  const renderBoard = (() => {
    const blocks = document.querySelectorAll("[data-id]")
    console.log(blocks)
    for(let i = 0; i < 9; i ++) {
      const block = blocks[i]
      const boardSign = gameBoard.gameArray[Math.floor(i / 3)][i % 3]
      console.log(boardSign)
      if(boardSign !== "") {
        let para = placeSign(boardSign)
        block.appendChild(para)
      }
    }
  })

  const placeSign = (sign) => {
    const para = document.createElement("p")
    para.classList.add("sign", sign)

    return para;
  }

  // GET PLAYERS INFO

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    
  
    const playerOneName = e.target.querySelectorAll("input")[0].value
    const playerTwoName = e.target.querySelectorAll("input")[1].value

    gameBoard.players.push(gameBoard.player(playerOneName, "X"))
    gameBoard.players.push(gameBoard.player(playerTwoName, "O"))

    e.target.style.display = "none"

    // We start the game once the users have been selected!
    ticTacToe()

    return false;

  })
  
  return {
    renderBoard,
    placeSign,
  }

})()

// GAME LOGIC MODULE

const ticTacToe = () => {

  // toggler to decide whose turn it is
  let player = gameBoard.players[0];
  
}

  
