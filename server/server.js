const express = require("express");
const cors = require("cors");

const app = express();

const port = 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("안녕하세요~!");
});

// ESTJ
// 내부 값을 비교해서 큰값이 찍히도록
app.get("/mbti", (req, res) => {
  const mbti = req.query;

  let answer = "";

  for (const item in mbti) {
    const key = Object.keys(mbti[item]);

    if (mbti[item][key[0]] > mbti[item][key[1]]) {
      answer += key[0];
    } else {
      answer += key[1];
    }
  }

  res.send(answer);

  answer = "";
});

app.listen(port, () => {
  console.log("서버가 실행되었습니다.");
});
