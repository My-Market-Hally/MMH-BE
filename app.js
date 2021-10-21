const express = require("express");
const path = require("path");
const morgan = require("morgan");
const { sequelize } = require("./models");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

const connect = require("./schemas");
connect();

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
// cors 연결, cors를 프론트와 연결하기 위해 오픈한 것
const cors = require("cors");
app.use(cors());

//스웨거 선언
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");

const usersRouter = require("./routes/user");
const postsRouter = require("./routes/post");
const cartsRouter = require("./routes/cart");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// app.use((req,res, next) => {
//   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
//   error.status = 404;
//   next(error);
// });

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});
app.use("/api", usersRouter);
app.use("/api", postsRouter);
app.use("/api", cartsRouter);

//스웨거 사용
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const handleListen = () => {
  console.log(`서버가 요청을 받을 준비가 됐어요😀 http://localhost:3000`);
};

app.listen(PORT, handleListen);
