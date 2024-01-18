const ws = require("ws");
const { v4: uuidv4 } = require("uuid");
const db = require("./database/db.js");

const _ = require("lodash");
const wss = new ws.Server({ port: 5000 }, () =>
  console.log(`Server started on 5000`)
);

let wsClients = {};

wss.on("connection", (client) => {
  client.on("message", (data) => {
    try {
      const action = JSON.parse(data);
      const userId = action.id; // Уникальный ID пользователя
      const targetId = action.targetId; // ID получателя сообщения

      if (action.event === "message") {
        wsClients[userId] = client; // Сохраняем ссылку на WebSocket клиента с его ID

        if (wsClients[targetId]) {
          // Если у нас есть сокет для целевого пользователя, отправляем сообщение
          const messageWithId = { ...action, id: uuidv4(), };
          client.send(JSON.stringify(messageWithId));
          wsClients[targetId].send(JSON.stringify(messageWithId));
        }
      }
    } catch (error) {
      client.send(JSON.stringify({ error: error.toString() }));
    }
  });

  client.on("close", () => {
    Object.keys(wsClients).forEach((key) => {
      if (wsClients[key] === client) {
        delete wsClients[key];
        console.log(`Client disconnected: ${key}`);
      }
    });
  });
});
