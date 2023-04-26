const API_TOKEN = undefined
const SERVER_URL = 'http://localhost:4000'

const socket = io(SERVER_URL)

if (API_TOKEN) {
  socket.emit('authenticate', API_TOKEN)
  socket.on('authenticated', () => {
    console.log('Authenticated')
  })
  socket.on('unauthenticated', () => {
    console.log('Unauthenticated')
  })
}

const chessboardElement = document.getElementById('chessboard')
const responseElement = document.getElementById('response')
const uciForm = document.getElementById('uci-form')

const initialBoard = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
]

function drawChessboard(board) {
  let tableContent = ''

  for (let i = 0; i < 8; i++) {
    tableContent += '<tr>'
    for (let j = 0; j < 8; j++) {
      tableContent += `<td>${board[i][j]}</td>`
    }
    tableContent += '</tr>'
  }

  chessboardElement.innerHTML = tableContent
}

uciForm.addEventListener('submit', async event => {
  event.preventDefault()

  const uciCommand = event.target.elements.command.value

  socket.emit('uci_command', uciCommand)
})

socket.on('uci_response', response => {
  responseElement.textContent = `${response}`

  const from = response.slice(0, 2)
  const to = response.slice(2)

  const fromRow = 8 - parseInt(from[1])
  const fromCol = from.charCodeAt(0) - 'a'.charCodeAt(0)
  const toRow = 8 - parseInt(to[1])
  const toCol = to.charCodeAt(0) - 'a'.charCodeAt(0)

  const movedPiece = initialBoard[fromRow][fromCol]
  initialBoard[fromRow][fromCol] = ''
  initialBoard[toRow][toCol] = movedPiece

  drawChessboard(initialBoard)
})

drawChessboard(initialBoard)
