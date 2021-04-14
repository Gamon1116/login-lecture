"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }
    login() {
        const body = this.body;
        //body.id값을 UserStorage에 메소드로 전달 받아올때는 id와 password만받아옴
        const { id, password } = UserStorage.getUserInfo(body.id);

            //id가 존재하면
        if (id) {
            //스토리지에서 가져온 id 그리고 password 값과 클라이언트가 입력한 값이 같은지 확인
            if (id === body.id && password === body.password) {
                return { success: true };
            }
            return { success: false, msg: "비밀번호가 틀렸습니다." };
        }
        return { success: false, msg: "존재하지 않는 아이디입니다." };
    }
}

module.exports = User