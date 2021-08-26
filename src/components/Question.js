import { useEffect } from "react";
import { Card, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { questionsActions } from "../store/questions";

import * as api from "../api/index";

import classes from "./Question.module.css";

const Question = () => {
  const questions = useSelector((state) => state.questions.fetchedData);
  const dispatch = useDispatch();

  const a = api.fetchData();
  console.log(a);

  //@@@questionsのstateが更新されない。(mongoDBからデータを引っ張りたい。)
  const fetchQuestionsfromDB = () => async (dispatch) => {
    try {
      const { data } = await api.fetchData();
      console.log(data);
      dispatch(questionsActions.getQuestions(data));
    } catch (error) {
      console.log(error.message);
    }
  };

  //fetch all questions from MongoDB
  useEffect(() => {
    fetchQuestionsfromDB();
  }, [dispatch]);

  // useEffect(() => {
  //   fetch("/questions")
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //     })
  //     .then((jsonData) => setUsers(jsonData));
  // });
  return (
    <>
      {console.log(questions)}
      <div className={classes.cardWrapper}>
        <Card className={classes.card}>
          <div className={classes.title}>
            <h2>Question 1</h2>
            <p>1/10</p>
          </div>
          <div className={classes.cardContent}>
            <p>Which period do you want to go?</p>
            <div>
              <div className={classes.qButton}>
                <Button variant="outlined">Ancient</Button>
              </div>
              <div className={classes.qButton}>
                <Button variant="outlined">Modern</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Question;
