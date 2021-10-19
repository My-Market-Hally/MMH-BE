const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

const connect = require("./schemas");
connect();

// cors 연결, cors를 프론트와 연결하기 위해 오픈한 것
const cors = require('cors')
app.use(cors());

const usersRouter = require('./routes/user')
const postsRouter = require('./routes/post')
// const cartsRouter = require('./routes/carts')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

app.use("/api", usersRouter);
app.use("/api", postsRouter);
// app.use("/api", cartsRouter);

const handleListen = () => {
  console.log(`서버가 요청을 받을 준비가 됐어요😀 http://localhost:3000`);
};

app.listen(PORT, handleListen);