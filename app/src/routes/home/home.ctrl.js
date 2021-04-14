"use strict";

const home = (req, res) => {
    res.render("home/index");
};

const login =  (req, res) => {
    res.render("home/login");
};

//모듈내보내는 명령어
module.exports = {
    home,
    login
};
