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

    static getUserInfo( id ) {
        const users = this.#users; //users를 받아옴
        const idx = users.id.indexOf(id);
        //user의 key값들만 list로 만듦  =>[id, password, name] 이런 배열이 만들어짐
        const usersKeys = Object.keys(users);
        //userskeys를 reduce로돌려 초기값으로 아래  {}오브젝트를 넣어주면 newUser에 키값[info]이 순차적으로 들어감
        //처음 id 가 들어가고 
        const userInfo = usersKeys.reduce((newUser, info) => { 
            //users 의 [key]값 [인덱스값] login()의 UserStorage.getUserInfo("여기값")
            //을 구해서 newUser[info]에 넣음
            newUser[info] = users[info][idx];
            return newUser;
        }, {});
        return userInfo;
    }
    static save(userInfo) {
        const users = this.#users;
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.password.push(userInfo.password);
       // return { succes: true };
       console.log(users)
    }
}

module.exports = UserStorage;