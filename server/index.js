const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: 8081 })
 
function heartbeat () {
  this.isAlive = true
}
 
wss.on('connection', function connection (ws) {
  ws.on('message', function incoming (data) {
    wss.clients.forEach(function each (client) {
      // if (client !== ws && client.readyState === WebSocket.OPEN) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })
  })
})

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  })
}
 
var interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate()
 
    ws.isAlive = false
    ws.ping('', false, true)
  })
}, 30000)