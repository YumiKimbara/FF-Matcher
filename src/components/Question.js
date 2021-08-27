import { useEffect } from "react";
import { Card, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { questionsActions } from "../store/questions";

import * as api from "../api/index";

import classes from "./Question.module.css";

const chocobo = "/images/chocobo.png";
const moogle = "/images/moogle.png";

const Question = () => {
  const questions = useSelector((state) => state.questions.fetchedData);
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

  let num = 0;

  return (
    <>
      {console.log(questions)}
      {questions.length >= 1 && (
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
                <p>{questions[num].body}</p>
                <div>
                  <div className={classes.qButton}>
                    <Button
                      name={questions[0].next[0].ancient}
                      variant="outlined"
                      onClick={(e) => {
                        num++;
                        console.log(e.target.closest("button").name);
                      }}
                    >
                      {questions[0].options[0].label}
                    </Button>
                  </div>
                  <div className={classes.qButton}>
                    <Button variant="outlined">
                      {questions[0].options[1].label}
                    </Button>
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
