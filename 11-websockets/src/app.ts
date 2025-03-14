import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    const payload = JSON.stringify({
      type: 'custom-message',
      payload: data.toString().toUpperCase(),
    });

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(payload, { binary: false });
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`Server running on port http://localhost:8080`);
