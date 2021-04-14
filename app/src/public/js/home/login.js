"use strict!"

const { post } = require("../../../../app");

const id = document.querySelector("#id"),
    password = document.querySelector("#password"),
    loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", function() {
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
    });
});

// function login() {
//     const req = {
//         id: id.value,
//         password: password.value,
//     };
//     console.log(req);
// }
