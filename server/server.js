const dotenv = require("dotenv")
const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors')
const SocketServer = require('./socketServer')
const {PeerServer} = require('peer')

const app = express();
dotenv.config({path: './config.env'})

const DB = process.env.DATABASE;




// Socket
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    SocketServer(socket)
})


// Create peer server
PeerServer({port: 3001, path: '/'})




// require('./db/conn')
app.use(express.json())
app.use(cors());

app.use('/api' , require('./routes/authRouter'))
app.use('/api' , require('./routes/userRouter'))
app.use('/api', require('./routes/postRouter'))
app.use('/api', require('./routes/commentRouter'))
app.use('/api', require('./routes/notifyRouter'))
app.use('/api', require('./routes/messageRouter'))



const PORT = process.env.PORT;

app.get("/", async (req, res) => {
  res.send(`Hello world!!!`);
});

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
  })
  .then(() => console.log("DATABASE connected"))
  .catch((err) => console.log("error" + err.message));

// app.listen(PORT, () => {
//   console.log(`port is run at port no, ${PORT}`);
// });



//for socket.io
http.listen(PORT, () => {
  console.log(`port is run at port no, ${PORT}`);
});
