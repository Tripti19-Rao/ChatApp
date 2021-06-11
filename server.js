const express = require("express");
const app = express();
const http = require("http").createServer(app);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  //  res.send('hiiiiii')
  res.sendFile(__dirname + "/index.html");
});

//  socket here smthng happns.. i get in my terminal..bt in browser when i open two windows..i dont get the incoming msgs
const io = require("socket.io")(http)
io.on("connection", (socket) => {
  console.log("connected");
  socket.on("message", (msg) => {
    socket.broadcast.emit('message', msg)
    console.log(msg)
  });
})
