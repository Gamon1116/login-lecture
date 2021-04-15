"use strict!"

const id = document.querySelector("#id"),
    name = document.querySelector("#name"),
    password = document.querySelector("#password"),
    confirmPassword = document.querySelector("#confirm-password"),
    registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

function register() {

    if (!id.value) return alert("아이디를 입력해주세요.");

    if (password.value !== confirmPassword.value) return alert("비밀번호가 틀렸습니다");

    const req = {
        id: id.value,
        name: name.value,
        password: password.value,

    };

    fetch("/register", {
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
                location.href = "/login";    //회원가입에 성공하면 로그인페이지로 이동
            } else {
                alert(res.msg); //실패메세지 alert로띄움
            }

        })
        .catch((err) => {
            console.error("회원가입 중 에러가 발생하였습니다.");
        });
};
// function register() {
//     const req = {
//         id: id.value,
//         password: password.value,
//     };
//     console.log(req);
// }