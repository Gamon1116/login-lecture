"use strict";

const UserStorage = require("../../models/UserStorage");

const output = {
    home: (req, res) => {
        res.render("home/index");
    },

    login: (req, res) => {
        res.render("home/login");
    },
};

const process = {
    login: (req, res) => {
        const id = req.body.id,
            password = req.body.password;
       
            //UserStorage모델의 get함수에서 reduce를 이용하여 id 와 password만 가져옴
       const users = UserStorage.getUsers("id", "password");

        const response = {};

        //id password 검증 user id를 indexOf로 확인하여 
        if (users.id.includes(id)) {
            const idx = users.id.indexOf(id);
            //password와 idx 가 같은지 검증하여 같으면 success: true를 json로 만들어서 응답해줌
            if(users.password[idx] === password){
                response.success = true;
                return res.json(response);
            }
        }

        response.success = false;
        response.msg = "로그인에 실패하셨습니다."
        return res.json(response);
    },
};

//모듈내보내는 명령어
module.exports = {
    output,
    process,
};
