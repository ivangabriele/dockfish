import { spawn } from "child_process";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";

const API_TOKEN = process.env.API_TOKEN
  ? process.env.API_TOKEN.length
    ? process.env.API_TOKEN
    : undefined
  : undefined;
const PORT = Number(process.env.PORT);

if (!PORT) {
  throw new Error("Error: `PORT` environment variable is not defined.");
}

const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  const stockfish = spawn("stockfish");
  let isAuthenticated = !API_TOKEN;

  stockfish.stdout.on("data", (data) => {
    const lines = data
      .toString()
      .trim()
      .split("\n")
      .map((line) => line.trim());

    lines.forEach((line) => {
      console.debug("[stockfish]", line);

      if (isAuthenticated) {
        ws.send(JSON.stringify({ type: "uci:response", payload: line }));
      }
    });
  });

  ws.on("message", (message) => {
    try {
      const messageData = JSON.parse(message);
      switch (messageData.type) {
        case "auth:authenticate":
          console.debug("[authenticate]", messageData.payload);

          if (!API_TOKEN || messageData.payload === API_TOKEN) {
            isAuthenticated = true;
            ws.send(JSON.stringify({ type: "auth:authenticated" }));
          } else {
            ws.send(JSON.stringify({ type: "auth:unauthenticated" }));
          }
          break;
        case "uci:command":
          console.debug("[uci:command]", messageData.payload);

          if (isAuthenticated) {
            stockfish.stdin.write(`${messageData.payload}\n`);
          }
          break;
      }
    } catch (error) {
      console.error("Error parsing message: ", error);
    }
  });

  ws.on("close", () => {
    stockfish.kill();
  });
});

server.on("request", (req, res) => {
  if (req.url === "/check") {
    res.writeHead(200);
    res.end("DockFish is up and running.");
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

server.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}.`);
});
