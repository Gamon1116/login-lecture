"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl")

//routers/home/home.ctrl.js안에 output 변수안의 home함수
router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);


//외부로 내보내는 명령어
module.exports = router;