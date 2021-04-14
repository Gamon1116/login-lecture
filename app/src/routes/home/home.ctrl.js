"use strict";

const users = {
    id: ["woorimIT", "나개발", "김팀장"],
    password: ["1234", "2345", "3456"],   
};

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
        //id password 검증 user id를 indexOf로 확인하여 
        if (users.id.includes(id)) {
            const idx = users.id.indexOf(id);
            //password와 idx 가 같은지 검증하여 같으면 success: true를 json로 만들어서 응답해줌
            if(users.password[idx] === password){
                return res.json({
                    success: true,
                });
            }
        }

        return res.json({
            success: false,
            msg: "로그인에 실패하셨습니다."
        });
    },
};

//모듈내보내는 명령어
module.exports = {
    output,
    process,
};
