"use strict";

//모듈
const express = require("express");
const app = express();


//라우팅
const home = require("./src/routes/home");

app.set("views", "./src/views");
app.set("view engine", "ejs");
//현재위치에서 src폴더안에public폴더를 정적경로로 반환해주겟다
app.use(express.static(`${__dirname}/src/public`));

app.use("/", home);      //use -> 미들웨어를 등록해주는 메소드

module.exports = app;

