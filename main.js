// DOM ELEMENTS

const mainWrapper = document.querySelector("#main-wrapper")
const board = document.querySelector("#board")
const form = document.querySelector("form")
const dashboard = document.querySelector(".dashboard")
const welcomeScreen = document.querySelector(".welcome-screen")
const winnerScreen = document.querySelector(".winner-screen")
const winnerPara = document.querySelector(".winner-para")

// GAME LOGIC MODULE

const gameBoard = (() => {

  let gameArray =   [["","",""],
                     ["","",""],
                     ["","",""]]

  let players = []

  // Player object constructor                     
  const player = (name, sign) => {
    return {name, sign}
  }

  const move = (player, pos) => {
    gameBoard.gameArray[pos[0]][pos[1]] = player.sign
  }

  const validMove = (pos) => {
    return gameBoard.gameArray[Math.floor(pos/3)][pos % 3] == ""
  }


  // Check if the game is over yet
  const win = () => {
    // Check rows
    arr = gameBoard.gameArray
    for(let i = 0; i < 3; i ++) {
      if(arr[i][0] != "" && (arr[i][0] == arr[i][1]) &&(arr[i][1] == arr[i][2])) {
        return arr[i][0]
        
      }
    }

    // Check columns

    for(let j = 0; j < 3; j ++) {
      if(arr[0][j] != "" && (arr[0][j] == arr[1][j]) && (arr[1][j] == arr[2][j])) {
        return arr[0][j]
      }
    }

    // Check diagonals

    // Primary diagonal
    if(arr[0][0] != "" && (arr[0][0] == arr[1][1]) && (arr[1][1] == arr[2][2])) {
      return arr[0][0]
    }

    // Secondary diagonal
    if(arr[0][2] != "" && (arr[0][2] == arr[1][1]) && (arr[1][1] == arr[2][0])) {
      return arr[0][2]
    }

    return false;
  }

  // BRINGS THE GAME BACK TO THE INITIAL STATE (with the same players, though)

  const restartGame = () => {
    gameBoard.gameArray = [["","",""],
                           ["","",""],
                           ["","",""]]
    
  }
  
  return {gameArray,
          player,
          players,
          move,
          win,
          validMove,
          restartGame }

})()

// DOM MANIPULATION MODULE

const displayController = (() => {

  // RENDERING DOM (based on gameBoard)

  const buildBoard = (() => {
    for(let i = 0; i < 9; i ++) {
      const block = document.createElement("div")
      block.classList.add("box")
      block.setAttribute("data-id", i);
      board.appendChild(block)
    }
  })



   const clearBoard = () => {
    const blocks = document.querySelectorAll(".box")
    for(let block of blocks) {
      if(block.children.length > 0) {
        block.firstElementChild.remove()
      }
    }
   }

  // RENDERS DOM Elements based on gameBoard's information

  const renderBoard = (() => {
    
    for(let i = 0; i < 9; i ++) {
      const blocks = document.querySelectorAll("[data-id]")
      const block = blocks[i]
      const boardSign = gameBoard.gameArray[Math.floor(i / 3)][i % 3]
      
      if(boardSign !== "" && block.children.length === 0) {
        
        block.appendChild(placeSign(boardSign))
      }
    }
  })

  const placeSign = (sign) => {
    const para = document.createElement("p")
    para.classList.add("sign", sign)

    return para;
  }

  // STARTS/RESETS THE GAME WHEN CLICKED
  welcomeScreen.addEventListener("click", (e) => {
    welcomeScreen.style.display = "none"
  })

  // BRINGS THE WELCOME SCREEN AGAIN WHEN CLICKED AFTER ENDING A GAME
  winnerScreen.addEventListener("click", () => {
    winnerScreen.style.display = "none"
    welcomeScreen.style.display = "flex"
    gameBoard.restartGame()
    displayController.clearBoard()
    
  })

  // GET PLAYERS INFO

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    
  
    const playerOneName = e.target.querySelectorAll("input")[0].value
    const playerTwoName = e.target.querySelectorAll("input")[1].value

    gameBoard.players.push(gameBoard.player(playerOneName, "X"))
    gameBoard.players.push(gameBoard.player(playerTwoName, "O"))

    e.target.style.display = "none"

    // We start the game once the users have been selected!
    displayController.buildBoard()
    ticTacToe()

    return false;

  })
  
  return {
    renderBoard,
    placeSign,
    buildBoard,
    clearBoard
  }

})()

// GAME LOGIC MODULE

const ticTacToe = () => {

  let player = gameBoard.players[0]

  const para = document.createElement("h3")
  para.innerHTML = `${player.name}'s Turn (${player.sign})`
  para.classList.add("turn", `player-${player.sign}`)
  
  dashboard.appendChild(para)

  const blocks = document.querySelectorAll("[data-id]")
  for(let block of blocks) {
    block.addEventListener("click", function play(e) {

      const id = block.getAttribute("data-id")
      if(gameBoard.validMove(id)) {
        gameBoard.move(player, [Math.floor(id / 3), id % 3])
        
        displayController.renderBoard()

        if(player == gameBoard.players[0]) {
          player = gameBoard.players[1]
        } else {
          player = gameBoard.players[0]
        }

        para.classList.remove("player-X", "player-O")
        para.classList.add(`player-${player.sign}`)
        para.innerHTML = `${player.name}'s Turn (${player.sign})`
      } else {
        alert(`Can only place ${player.sign} in empty boxes!`)
      }

      const winner = gameBoard.win()

      setTimeout(() => {
        if(winner) {
          winnerScreen.style.display = "flex"
          winnerPara.innerHTML = (`${winner} is the winner!`)
        }
      }, 150)
    })
  }
  
}

  
