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

  const fetchQuestionsfromDB = async () => {
    try {
      const { data } = await api.fetchQuestionsData();
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
        setCurrentQuestion(item);
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
