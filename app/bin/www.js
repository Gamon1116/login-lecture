"use strict";

const app= require("../app")
//process.env.PORT는 env에 등록된 port가 있으면 그것을 실행 없다면 3000을 실행 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("서버가동");
});