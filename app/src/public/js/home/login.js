"use strict!"

const id = document.querySelector("#id"),
    password = document.querySelector("#password"),
    loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", function() {
    
    if (!id.value) return alert("아이디를 입력해주세요.");
//  password가 없으면
    if (!password.value) return alert("비밀번호를 입력해주십시오.");
    
    const req = {
        id: id.value,
        password: password.value,
    }

    fetch("/login", {
        //json으로감싸서 stringify으로 문자열로 바꿈 ""안으로 들어감
        method: "POST",
        headers: {
            //내가보내는 타입 명시
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    }).then((res) => res.json())
        .then((res) => {
            if (res.success) {
                location.href = "/";    //로그인에 성공하면 / <<기본경로로이동
            }else{
                if (res.err) return alert(res.err);
                alert(res.msg); //실패메세지 alert로띄움
            }
            
        })
        .catch((err) => {
            console.error("로그인 중 에러가 발생하였습니다.");
        });
    
});

// function login() {
//     const req = {
//         id: id.value,
//         password: password.value,
//     };
//     console.log(req);
// }
