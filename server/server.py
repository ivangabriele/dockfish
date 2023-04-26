import chess.engine
import sys
import os
import socketio
from aiohttp import web

API_TOKEN = os.environ.get("API_TOKEN") or None
DOMAIN = os.environ.get("DOMAIN", "*") or "*"
PORT = os.environ.get("PORT") or None

if PORT is None:
    print("Error: `PORT` environment variable is not defined.")
    sys.exit(1)

PORT = int(PORT)

engine = chess.engine.SimpleEngine.popen_uci("stockfish")

sio = socketio.AsyncServer(async_mode="aiohttp", cors_allowed_origins=DOMAIN)
app = web.Application()
sio.attach(app)

authenticated_sids = set()


@sio.event
async def connect(sid, environ):
    if not API_TOKEN:
        authenticated_sids.add(sid)


@sio.event
async def authenticate(sid, token):
    if token == API_TOKEN:
        authenticated_sids.add(sid)
        await sio.emit("authenticated", room=sid)
    else:
        await sio.emit("unauthenticated", room=sid)
        await sio.disconnect(sid)


@sio.event
async def uci_command(sid, data):
    if sid not in authenticated_sids:
        return

    board = chess.Board()
    result = engine.play(board, chess.engine.Limit(time=2.0))
    await sio.emit("uci_response", str(result.move), room=sid)


@sio.event
async def disconnect(sid):
    authenticated_sids.discard(sid)


async def index(request):
    return web.Response(text="Stockfish Chess Engine Server is up and running.")


app.router.add_get("/", index)

if __name__ == "__main__":
    web.run_app(app, host="0.0.0.0", port=PORT)
