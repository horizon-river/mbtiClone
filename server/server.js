const express = require("express");
const cors = require("cors");

const app = express();

const port = 5000;

const characters = [
  {
    name: "콘",
    content: "https://kakaofriendsmbti.netlify.app/images/ENFJ.png",
    mbti: "ENFJ", // for , for of [구글 에서 검색]
  },
  {
    name: "빠냐",
    content: "https://kakaofriendsmbti.netlify.app/images/ESTJ.png",
    mbti: "ESTJ",
  },
  {
    name: "앙몬드",
    content: "https://kakaofriendsmbti.netlify.app/images/INFP.png",
    mbti: "INFP",
  },
  {
    name: "어피치",
    content: "https://kakaofriendsmbti.netlify.app/images/ENTP.png",
    mbti: "ENTP",
  },
  {
    name: "죠르디",
    content: "https://kakaofriendsmbti.netlify.app/images/ISFJ.png",
    mbti: "ISFJ",
  },
];

app.use(cors());

app.get("/", (req, res) => {
  res.send("안녕하세요~!");
});

// ESTJ
// 내부 값을 비교해서 큰값이 찍히도록
app.get("/mbti", (req, res) => {
  const mbti = req.query;

  let answer = "";

  for (const key in mbti) {
    const 객체 = mbti[key];

    // Destructring
    const [왼쪽mbti, 오른쪽mbti] = Object.keys(객체);
    const [왼쪽값, 오른쪽값] = Object.values(객체);

    if (왼쪽값 > 오른쪽값) {
      answer += 왼쪽mbti;
    } else {
      answer += 오른쪽mbti;
    }
  }

  const [캐릭터결과] = characters.filter((item) => {
    return item.mbti === answer;
  });

  res.send(캐릭터결과);

  answer = "";
});

app.listen(port, () => {
  console.log("서버가 실행되었습니다.");
});
