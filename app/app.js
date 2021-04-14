"use strict";

//모듈
const express = require("express");
const app = express();
// const bodyParser = require('body-parser');


//라우팅
const home = require("./src/routes/home");

app.set("views", "./src/views");
app.set("view engine", "ejs");
//현재위치에서 src폴더안에public폴더를 정적경로로 반환해주겟다
app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());//bodypaser 가 json데이터를 파싱해올수있음
//url을 통해 전달되는 데이터 한글, 공백 등과 같은 문자가 포함된 경우 제대로 인식되지 않는 문제해결
app.use(express.urlencoded({ extended: false }));


app.use("/", home);      //use -> 미들웨어를 등록해주는 메소드

module.exports = app;

