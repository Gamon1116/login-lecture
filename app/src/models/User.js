"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }
    async login() {
        const client = this.body;
        try{
            //body.id값을 UserStorage에 메소드로 전달 받아올때는 id와 password만받아옴
            const user = await UserStorage.getUserInfo(client.id);

                //id가 존재하면
            if (user) {
                //스토리지에서 가져온 id 그리고 password 값과 클라이언트가 입력한 값이 같은지 확인
                if (user.id === client.id && user.password === client.password) {
                    return { success: true };
                }
                return { success: false, msg: "비밀번호가 틀렸습니다." };
            }
            return { success: false, msg: "존재하지 않는 아이디입니다." };
        } catch (err){
            return { success: false, err };
        };
    };
    async register() {
        const client = this.body;
        try{
            const response = await UserStorage.save(client);
            return response;
        } catch (err) {
            return { success: false, err };
            
        }
            
    };
};

module.exports = User