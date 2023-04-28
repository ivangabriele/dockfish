/**
 * This file is probably useless for you, it's just a script to render moves in a <table> board.
 */

let CURRENT_CHESSBOARD_POSITION = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
]

function getBoardPositionFromFen(fen) {
  const fenParts = fen.split(' ')
  const fenRows = fenParts[0].split('/')
  const boardPosition = []

  for (let i = 0; i < 8; i++) {
    const row = []
    for (let j = 0; j < fenRows[i].length; j++) {
      const cell = fenRows[i][j]
      if (isNaN(parseInt(cell))) {
        row.push(cell)
      } else {
        const emptySpaces = parseInt(cell)
        for (let k = 0; k < emptySpaces; k++) {
          row.push('')
        }
      }
    }
    boardPosition.push(row)
  }

  return boardPosition
}

function renderChessboard() {
  let tableContent = ''

  for (let i = 0; i < 8; i++) {
    tableContent += '<tr>'
    for (let j = 0; j < 8; j++) {
      tableContent += `<td>${CURRENT_CHESSBOARD_POSITION[i][j]}</td>`
    }
    tableContent += '</tr>'
  }

  chessboardElement.innerHTML = tableContent
}

function updateChessboard(fen) {
  CURRENT_CHESSBOARD_POSITION = getBoardPositionFromFen(fen)

  renderChessboard()
}

const chessboardElement = document.getElementById('chessboard')

renderChessboard()
