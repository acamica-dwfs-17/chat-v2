const WebSocketServer = require("ws").Server,
  wss = new WebSocketServer({ port: 40510 });
const uuid = require("uuid/v4");

const Message = require("./models/message");

const connections = [];

wss.on("connection", function(ws) {
  const id = uuid();
  connections.push({ id, connection: ws });

  ws.on("message", function(message) {
    const data = JSON.parse(message);
    console.log(data);
    const handlers = {
      send: sendHandler
    };

    if (data.action && handlers[data.action]) {
      handlers[data.action](data);
    }

    function sendHandler({ user, message }) {
      if (user && message) {
        const msg = new Message({ message, user });
        msg.save();
        connections.forEach(con => con.connection.send(JSON.stringify(msg)));
      }
    }
  });

  ws.on("close", function close() {
    connections = connections.filter(
      ({ id: connectionId }) => connectionId !== id
    );
  });
  //setInterval(() => ws.send(`guille gato`), 1000);
});
