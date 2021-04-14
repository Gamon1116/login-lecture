"use strict";

class UserStorage {
    static #users = {
        id: ["woorimIT", "나개발", "김팀장"],
        password: ["1234", "2345", "3456"],
        name: ["우리밋", "개발", "팀장"],
    };

    static getUsers(...fields) {
        const users = this.#users;
        //fields 에 대한 원소가 하나씩 출력이된다 fields.reduce의 첫번째 파라미터에 id가 두번째에 password가
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        
        return newUsers;
    }
};

module.exports = UserStorage;