// GAME LOGIC

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
    console.log(player, gameArray, pos)
    gameArray[pos[0]][pos[1]] = player.sign
  }

  return {gameArray,
          player,
          players,
          move}

})()



// DOM MANIPULATION

const mainWrapper = document.querySelector("#main-wrapper")
const board = document.querySelector("#board")
const form = document.querySelector("form")


const displayController = (() => {

  const buildBoard = ((gameArray) => {
    for(let i = 0; i < 9; i ++) {
      const block = document.createElement("div")
      block.classList.add("boardBlock")
      block.setAttribute("data-id", i);
      board.appendChild(block)
    }
  })()

  const renderBoard = (() => {
    for(let i = 0; i < 9; i ++) {
    }
  })

  // GET PLAYERS INFO

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const playerOneName = e.target.querySelectorAll("input")[0].value
    const playerTwoName = e.target.querySelectorAll("input")[1].value

    gameBoard.players.push(gameBoard.player(playerOneName, "X"))
    gameBoard.players.push(gameBoard.player(playerTwoName, "O"))

    e.target.style.display = "none"

    return false;

  })

})()



/*
block.addEventListener("click", () => {
        const id = block.getAttribute("data-id")
        const row = Math.floor(id / 3)
        const col = id % 3
        gameBoard.gameArray[row][col] = sign;

        const para = document.createElement("p")
        para.classList.add("sign", sign)
        para.textContent = "X"
        block.appendChild(para)
        
      })
      */