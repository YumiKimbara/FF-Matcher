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
  const questions = useSelector((state) => state.questions.fetchedData);
  const clickedId = useSelector((state) => state.questions.clickedId);
  const [questionNum, setQuestionNum] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

  const dispatch = useDispatch();

  //@@@questionsのstateが更新されない。(mongoDBからデータを引っ張りたい。)
  //@@@内部関数が呼び出されてない。からconsole.logが出ない。

  //---関数は下記のようにかける---
  //ノーマルな関数
  // function normalFunction() {
  //   return 1;
  // }

  //アロー関数
  // const arrowFunction = () => {
  //   return 1;
  // };

  //アロー関数省略形
  // const directReturnArrowFunction = () => 1;

  //アロー関数内に内部関数がある。外側の関数が処理される時に内部関数も処理される。
  // const arrowFunctionReturnsFunction = () => {
  //   return () => {
  //     return 1;
  //   };
  // };

  // const a = arrowFunctionReturnsFunction();

  // console.log(a);

  //内部関数のあるアロー関数の省略形
  // const shortArrowFunctionReturnsFunction = () => () => 1;

  // const fetchQuestionsfromDB = () => async (dispatch) => {
  const fetchQuestionsfromDB = async () => {
    try {
      const { data } = await api.fetchData();
      // const { data2 } = await api.fetchHomeData();
      // console.log(data2);

      dispatch(questionsActions.getQuestions(data));
    } catch (error) {
      console.error(error);
    }
  };

  //fetch all questions from MongoDB
  useEffect(() => {
    fetchQuestionsfromDB();
  }, [dispatch]);

  useEffect(() => {
    setCurrentQuestion(questions[0]);
  }, [questions]);

  useEffect(() => {
    questions.forEach((item, i) => {
      if (item._id === clickedId) {
        console.log(clickedId);
        setCurrentQuestion(item);
      } else {
        console.log(clickedId);
      }
    });
  }, [questionNum, clickedId]);

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
                <h2>Question {questionNum}</h2>
              </div>
              <div className={classes.cardContent}>
                <p>{currentQuestion.body}</p>
                <div>
                  <div className={classes.qButton}>
                    {currentQuestion.next[0].includes("result") && (
                      <Link to="/result">
                        <Button
                          name={currentQuestion.next[0]}
                          variant="outlined"
                          onClick={(e) => {
                            dispatch(
                              questionsActions.getClickedId(
                                e.target.closest("button").name
                              )
                            );
                          }}
                        >
                          {currentQuestion.options[0].label}
                        </Button>
                      </Link>
                    )}
                    {!currentQuestion.next[0].includes("result") && (
                      <Button
                        name={currentQuestion.next[0]}
                        variant="outlined"
                        onClick={(e) => {
                          dispatch(
                            questionsActions.getClickedId(
                              e.target.closest("button").name
                            )
                          );
                          setQuestionNum(questionNum + 1);
                        }}
                      >
                        {currentQuestion.options[0].label}
                      </Button>
                    )}
                  </div>
                  <div className={classes.qButton}>
                    {currentQuestion.next[1].includes("result") && (
                      <Link to="/result">
                        <Button
                          name={currentQuestion.next[1]}
                          variant="outlined"
                          onClick={(e) => {
                            dispatch(
                              questionsActions.getClickedId(
                                e.target.closest("button").name
                              )
                            );
                          }}
                        >
                          {currentQuestion.options[1].label}
                        </Button>
                      </Link>
                    )}
                    {!currentQuestion.next[1].includes("result") && (
                      <Button
                        name={currentQuestion.next[1]}
                        variant="outlined"
                        onClick={(e) => {
                          dispatch(
                            questionsActions.getClickedId(
                              e.target.closest("button").name
                            )
                          );
                          setQuestionNum(questionNum + 1);
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
