const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Run when client connects
io.on("connection", socket => {
  console.log("new connection");

  /**
   * this will emit to single client that connecting
   */
  socket.emit("message", "Welcome to ChatCord!");

  /**
   * this will broadcast to all client execpt the clint that connecting
   */
  socket.broadcast.emit("message", "A user has joined the chat");

  // when client disconnect
  socket.on("disconnect", () => {
    /**
     * this for all the client in general
     */
    io.emit("message", "A user has left the chat");
  });

  // listen for chatMessage
  socket.on("chatMessage", msg => {
    io.emit("message", msg);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
