"use strict";

const fs = require("fs").promises;

class UserStorage {

    static #getUserInfo(data, id) {
        const users = JSON.parse(data);
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

    static #getUsers(data, isAll, fields) {
        const users = JSON.parse(data);
        if (isAll) return users;
        //fields 에 대한 원소가 하나씩 출력이된다 fields.reduce의 첫번째 파라미터에 id가 두번째에 password가
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});

        return newUsers;
    }

    static getUsers(isAll, ...fields) {
        return fs
            .readFile("./src/databases/users.json")
            .then((data) => {       //위로직이 성공했을때 실행
                return this.#getUsers(data, isAll, fields);
            })
            .catch(console.error);   //위로직이 실패했을때 실행


    }

    static getUserInfo(id) {
        return fs
            .readFile("./src/databases/users.json")
            .then((data) => {       //위로직이 성공했을때 실행
                return this.#getUserInfo(data, id);
            })
            .catch(console.error);   //위로직이 실패했을때 실행
    }


    static async save(userInfo) {
        const users = await this.getUsers(true);  //데이터를 오브젝트형태로 반환해서 users에 넣음
        //userInfo.id(클라이언트가 입력한 유저 id)가 users.id에 includes(포함)되어있으면 Error로 return
        if (users.id.includes(userInfo.id)) {
            throw "이미 존재하는 아이디입니다.";
        }
        //userInfo로 각항목을 입력받아 users의 각항목에 push
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.password.push(userInfo.password);
        //파일에 데이터를 쓰기 위해서는 fs(파일 시스템)의 writeFile함수사용 첫번째 파라미터로는 경로, 두번째로는 저장할 data
        //위에 푸쉬된 테이블(users)를 JSON에 stringify로 변환해저장
        fs.writeFile("./src/databases/users.json", JSON.stringify(users));
        return { success: true };
    }
}

module.exports = UserStorage;