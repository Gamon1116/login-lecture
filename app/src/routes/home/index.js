"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl")

router.get("/", ctrl.home);
router.get("/login", ctrl.login);

//외부로 내보내는 명령어
module.exports = router;