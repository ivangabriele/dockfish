const API_TOKEN = undefined
let IS_ENGINE_READY = false
const WEB_SOCKET_PATH = 'ws://localhost:4000'

const socket = new WebSocket(WEB_SOCKET_PATH)

socket.addEventListener('open', event => {
  if (API_TOKEN) {
    socket.send(JSON.stringify({ type: 'authenticate', token: API_TOKEN }))
  }
})

socket.addEventListener('message', event => {
  console.debug(event, event.data)

  const eventData = JSON.parse(event.data)

  if (eventData.type === 'auth:authenticated') {
    console.info('<< auth:authenticated')
  } else if (eventData.type === 'auth:unauthenticated') {
    console.info('<< auth:unauthenticated')
  } else if (eventData.type === 'uci:response') {
    console.info('<< uci:response', eventData.payload)

    if (eventData.payload === 'readyok') {
      IS_ENGINE_READY = true

      return
    }

    responseElement.textContent = `${eventData.payload}`
  }
})

const responseElement = document.getElementById('response')

async function processFen(fen) {
  updateChessboard(fen)

  responseElement.textContent = `New game: waiting for engine to be ready...`
  console.info('>> uci:command', 'ucinewgame')
  socket.send(JSON.stringify({ type: 'uci:command', payload: 'ucinewgame' }))
  await waitForEngineToBeReady()

  responseElement.textContent = `Looking for best move (depth=25)...`
  const uciCommands = [`position fen ${fen}`, 'go depth 25']

  uciCommands.forEach(uciCommand => {
    console.info('>> uci:command', uciCommand)

    socket.send(JSON.stringify({ type: 'uci:command', payload: uciCommand }))
  })
}

async function waitFor(inMs) {
  return new Promise(resolve => setTimeout(resolve, inMs))
}

async function waitForEngineToBeReady(inMs) {
  IS_ENGINE_READY = false
  let elapsedTime = 0
  const timeoutInMs = 30000

  socket.send(JSON.stringify({ type: 'uci:command', payload: 'isready' }))

  while (!IS_ENGINE_READY) {
    if (elapsedTime >= timeoutInMs) {
      const errorMessage = 'Something went wrong, the server is still not ready after waiting for 30s.'

      responseElement.textContent = errorMessage

      throw new Error(errorMessage)
    }

    await waitFor(1000)

    elapsedTime += 1000
  }

  return true
}
