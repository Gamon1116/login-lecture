"use strict";

const db = require("../config/db")

class UserStorage {

    static getUserInfo(id) {
        //mysql 은 promise를 지원하지않으므로 직접만듦
        //Promise 안에 있는 구문이 성공하게되면 resolve를 실행시키고 실패하게되면 reject를실행시킨다
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM asd WHERE id = ?;";
            // 첫번째 파라미터로 에러가 날아오고 두번째로 데이터가 날아옴
            //쿼리문에 id = ? 과 첫번째 파라미터 [id]는 보안상의 이유로 작성되는 코드로 ?위치로 [id]가 들어가게됨
            db.query(query, [id], (err, data) => {
                //실패시 에러던짐
                if (err) reject(`${err}`);
                //그렇지 않으면 resolve
                else resolve(data[0]);
            });
        });
    };


    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            //위 로그인과 다르게 insert 쿼리문으로 저장으로 바꿔주고 value에 ?는 위 주석의 [id]와 같음
            const query = "INSERT INTO asd(id, name, password) VALUES(?, ?, ?);";
            //첫번째 파라미터로 쿼리문을 던지고 두번째로 쿼리문안에 대입될 변수를 넣어줌 세번째로 에러를 받음
            db.query(
                query,
                [userInfo.id, userInfo.name, userInfo.password],
                //회원가입이기 때문에 data를 받을게 없기 때문에 위와는 다르게 data가 빠져도 상관없음
                (err) => {
                    //실패시 에러던짐 그냥 if (err) reject(err);로 하면 err가 object객체 이므로 문자열로 변환하여 던짐
                    //실제 개발시에는 이렇게 하면안됨;
                    if (err) reject(`${err}`);
                    //그렇지 않으면 resolve({ success: ture }) 를 던짐
                    else resolve({ success: true });
                });
        });
    }
}

module.exports = UserStorage;