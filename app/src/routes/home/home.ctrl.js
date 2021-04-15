"use strict";

const User = require("../../models/User");

const output = {
    home: (req, res) => {
        res.render("home/index");
    },

    login: (req, res) => {
        res.render("home/login");
    },
    register: (req, res) => {
        res.render("home/register");
    }
};

const process = {
    login: async (req, res) => {
        //1. User클래스를 인스턴스화 할때 클라이언트가 전달한 req를 넣어서 인스턴스화함
        
        const user = new User(req.body);
        const response = await user.login();
        return res.json(response);
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    },
};

//모듈내보내는 명령어
module.exports = {
    output,
    process,
};
