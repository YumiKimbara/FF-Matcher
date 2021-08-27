import { useEffect, useState } from "react";
import { Card, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { questionsActions } from "../store/questions";
import { Link } from "react-router-dom";

import * as api from "../api/index";

import classes from "./Question.module.css";

const chocobo = "/images/chocobo.png";
const moogle = "/images/moogle.png";

const Question = () => {
  const [id, setId] = useState("");
  const [questionNum, setQuestionNum] = useState(0);
  const questions = useSelector((state) => state.questions.fetchedData);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const dispatch = useDispatch();

  //@@@questionsのstateが更新されない。(mongoDBからデータを引っ張りたい。)
  //内部関数が呼び出されてない。からconsole.logが出ない。
  // const fetchQuestionsfromDB = () => async (dispatch) => {
  const fetchQuestionsfromDB = async () => {
    try {
      const { data } = await api.fetchData();
      dispatch(questionsActions.getQuestions(data));
    } catch (error) {
      console.error(error);
    }
  };

  //fetch all questions from MongoDB
  useEffect(() => {
    fetchQuestionsfromDB();
  }, [dispatch]);

  const checkId = () => {
    console.log(id);
    questions.forEach((item, i) => {
      if (item._id === id) {
        return setCurrentQuestion(item);
      }
    });
  };

  return (
    <>
      {questions.length >= 1 && currentQuestion && (
        <div>
          <div>
            <img className={classes.chocobo} src={chocobo} alt="chocobo" />
          </div>
          <div>
            <img className={classes.moogle} src={moogle} alt="moogle" />
          </div>
          <div className={classes.cardWrapper}>
            <Card className={classes.card}>
              <div className={classes.title}>
                <h2>Question 1</h2>
                <p>1/10</p>
              </div>
              <div className={classes.cardContent}>
                <p>{currentQuestion.body}</p>
                <div>
                  <div className={classes.qButton}>
                    <Button
                      name={currentQuestion.next[0]}
                      variant="outlined"
                      onClick={(e) => {
                        setId(e.target.closest("button").name);
                        checkId();
                      }}
                    >
                      {currentQuestion.options[0].label}
                    </Button>
                  </div>
                  <div className={classes.qButton}>
                    {id === "10" && (
                      <Link to="/">
                        <Button
                          name={currentQuestion.next[1]}
                          variant="outlined"
                          onClick={(e) => {
                            setId(e.target.closest("button").name);
                            checkId();
                          }}
                        >
                          {currentQuestion.options[1].label}
                        </Button>
                      </Link>
                    )}
                    {id !== "10" && (
                      <Button
                        name={currentQuestion.next[1]}
                        variant="outlined"
                        onClick={(e) => {
                          setId(e.target.closest("button").name);
                          checkId();
                        }}
                      >
                        {currentQuestion.options[1].label}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default Question;

//@@@ドキュメント: 質問1、選択し、次の質問
//onClickの() => {}は関数をオブジェクト型で渡している
//CORS error: ブラウザのセキュリティの制限からくるエラー。
//-> ドメインが異なるとき(現在のドメインとAPIのドメイン)、に起こる。
//-> errorを解除するにはをAPI側で許可を出さないといけない。(みているWebページのドメインからなら繋いでも良いよという許可)
//->

// body: "Which period do you prefer?";
// next: [
//   { ancient: "6128355f1335e758d971fd8d" },
//   { modern: "612857331335e758d971fd8e" },
// ];
// options: [
//   { id: "ancient", label: "Ancient" },
//   { id: "modern", label: "Modern" },
// ];
