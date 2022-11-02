import React from "react";
import "./App.css";

import axios from "axios";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

const ProgressBar = (props) => {
  // 총너비 / 총스텝길이 * 현재스텝
  const width = (480 / 5) * props.step;
  return (
    <div className="progressBar">
      <div className="percent" style={{ width: width }}></div>
    </div>
  );
};

const Question = (props) => {
  return (
    <div className="imgBox">
      <img src={props.image} alt="이미지" />
    </div>
  );
};

const Answer = (props) => {
  const { setDispatchType } = React.useContext(StoreContext);

  return (
    <button
      className="btn"
      onClick={() => {
        setDispatchType({
          code: "답변",
          params: {
            value: props.value,
          },
        });
      }}
    >
      {props.text}
    </button>
  );
};

function Main() {
  const { setDispatchType } = React.useContext(StoreContext);

  const navigation = useNavigate();

  React.useEffect(() => {
    const checkMbti = JSON.parse(localStorage.getItem("mbti"));
    const checkPage = Number(localStorage.getItem("page"));

    if (checkMbti !== null && checkPage !== null) {
      if (window.confirm("이어서 하시겠습니까?")) {
        setDispatchType({
          code: "이어서",
          params: {
            checkMbti: checkMbti,
            checkPage: checkPage,
          },
        });
      } else {
        setDispatchType({
          code: "이어서안함",
          params: {
            value: 0,
          },
        });
      }
    }
  });

  return (
    <div className="topBox">
      <div className="innerBox">
        <div>
          <img
            src="https://kakaofriendsmbti.netlify.app/static/media/00.88f71908.png"
            alt="이미지"
          />
        </div>
        <button
          className="btn"
          onClick={() => {
            navigation("/sub1");
          }}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}

function Sub1() {
  localStorage.removeItem("mbti");
  localStorage.removeItem("page");

  return (
    <div className="topBox">
      <div className="innerBox">
        <ProgressBar step={1} />
        <Question image="https://kakaofriendsmbti.netlify.app/images/01-01.png" />
        <div className="btnBox">
          <Answer text="당연하지! 어디서 할지 고민 중이야!" value="E" />
          <br />
          <Answer text="그냥 맛있는거 먹으러 갈까 생각 중이야!" value="I" />
        </div>
      </div>
    </div>
  );
}

function Sub2() {
  return (
    <div className="topBox">
      <div className="innerBox">
        <ProgressBar step={2} />
        <Question image="https://kakaofriendsmbti.netlify.app/images/02-01.png" />
        <div className="btnBox">
          <Answer text="영화 완전 재밌었어! 너도 한번 봐봐!" value="S" />
          <br />
          <Answer
            text="좀비가 너무 리얼했어. 실제 상황이면 난 바로 죽었을거야..."
            value="N"
          />
        </div>
      </div>
    </div>
  );
}

function Sub3() {
  return (
    <div className="topBox">
      <div className="innerBox">
        <ProgressBar step={3} />
        <Question image="https://kakaofriendsmbti.netlify.app/images/03-01.png" />
        <div className="btnBox">
          <Answer text="무슨 꽃 샀어? 향은 좋아?" value="T" />
          <br />
          <Answer text="왜 우울해? 무슨 일 있어?" value="F" />
        </div>
      </div>
    </div>
  );
}

function Sub4() {
  return (
    <div className="topBox">
      <div className="innerBox">
        <ProgressBar step={4} />
        <Question image="https://kakaofriendsmbti.netlify.app/images/04-01.png" />
        <div className="btnBox">
          <Answer
            text="지금 PPT 만드는 중이니까 아마 한 2시간 뒤면 끝날거 같아!"
            value="J"
          />
          <br />
          <Answer text="모르겠어. 근데 지금 PPT 만들고 있어!" value="P" />
        </div>
      </div>
    </div>
  );
}

function Sub5() {
  return (
    <div className="topBox">
      <div className="innerBox">
        <ProgressBar step={5} />
        <Question image="https://kakaofriendsmbti.netlify.app/images/05-01.png" />
        <div className="btnBox">
          <Answer
            text="그래! 역시 사람 많고 유명한 벚꽃 명소가 예쁘겠지 어디로 갈까?"
            value="E"
          />
          <br />
          <Answer text="그래! 사람 적은 벚꽃 명소 한 번 찾아볼까?" value="I" />
        </div>
      </div>
    </div>
  );
}

function Result() {
  const navigation = useNavigate();

  const { state } = useLocation();
  const [result, setResult] = React.useState(undefined);

  // axios
  const getMBTIResult = async () => {
    await axios({
      url: "http://localhost:5000/mbti",
      method: "get", // GET , POST
      responseType: "json",
      params: state,
    })
      .then(({ data }) => {
        console.log(data);
        setResult(data);
      })
      .catch((e) => {
        console.log("에러!!!", e);
      });
  };

  React.useEffect(() => {
    getMBTIResult();
  }, []);

  if (result === undefined) {
    return <div></div>;
  }

  return (
    <div className="answerBox">
      <img className="result-img" src={result.content} alt="결과화면" />
      <button
        className="btn"
        onClick={() => {
          navigation("/sub1");
        }}
      >
        다시하기
      </button>
    </div>
  );
}

const StoreContext = React.createContext({});

function App() {
  const navigation = useNavigate();

  const [dispatch, setDispatchType] = React.useState({
    code: null,
    params: null,
  });

  const [mbti, setMbti] = React.useState([
    {
      I: 0, // 내향
      E: 0, // 외향
    },
    {
      S: 0, // 현실
      N: 0, // 이상주의
    },
    {
      T: 0, // 이성
      F: 0, // 감성
    },
    {
      P: 0, // 즉흥
      J: 0, // 계획
    },
  ]);

  const zeroMbti = [
    {
      I: 0, // 내향
      E: 0, // 외향
    },
    {
      S: 0, // 현실
      N: 0, // 이상주의
    },
    {
      T: 0, // 이성
      F: 0, // 감성
    },
    {
      P: 0, // 즉흥
      J: 0, // 계획
    },
  ];

  let [page, setPage] = React.useState(1);

  React.useEffect(() => {
    switch (dispatch.code) {
      /**
       *  mbti state 값을 바꾸는 로직 구현
       *
       */
      case "답변":
        const { value } = dispatch.params;

        const newMbti = [...mbti];

        const findIndex = newMbti.findIndex((item) => {
          return item[value] !== undefined;
        });

        newMbti[findIndex][value]++;
        setMbti(newMbti);

        /**
         * 페이지 이동
         */

        const nextPage = (page += 1);
        setPage(nextPage);

        if (nextPage === 6) {
          setPage(1);
          navigation("/result", {
            state: mbti,
          });
          setMbti(zeroMbti);
        } else {
          navigation(`/sub${nextPage}`);
        }

        localStorage.setItem("mbti", JSON.stringify(mbti));
        localStorage.setItem("page", page);

        break;
      case "이어서":
        const { checkMbti, checkPage } = dispatch.params;
        setMbti(checkMbti);
        setPage(checkPage);
        navigation(`/sub${page}`);
        break;
      default:
        break;
    }
    // 의존성
  }, [dispatch]);

  return (
    <StoreContext.Provider value={{ setDispatchType }}>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/sub1" element={<Sub1 />} />
        <Route exact path="/sub2" element={<Sub2 />} />
        <Route exact path="/sub3" element={<Sub3 />} />
        <Route exact path="/sub4" element={<Sub4 />} />
        <Route exact path="/sub5" element={<Sub5 />} />
        <Route exact path="/result" element={<Result />} />
      </Routes>
    </StoreContext.Provider>
  );
}
export default App;
