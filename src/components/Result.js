import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resultsActions } from "../store/results";
import { questionsActions } from "../store/questions";
import { Button, Card } from "@material-ui/core";
import { Link } from "react-router-dom";
import * as api from "../api/index";

import classes from "./Result.module.css";

const Result = () => {
  const results = useSelector((state) => state.results.fetchedData);
  const resultId = useSelector((state) => state.questions.clickedId);
  const clickedId = useSelector((state) => state.questions.clickedId);
  const [result, setResult] = useState("");
  const dispatch = useDispatch();

  const fetchResultsfromDB = async () => {
    try {
      const { data } = await api.fetchResultData();
      dispatch(resultsActions.getResults(data));
    } catch (error) {
      console.error(error);
    }
  };

  //fetch all questions from MongoDB
  useEffect(() => {
    fetchResultsfromDB();
  }, [dispatch]);

  useEffect(() => {
    results.forEach((item) => {
      if (item.resultId.toString() === resultId) {
        setResult(item);
      }
    });
  }, [results]);

  const initializeClickedId = () => {
    dispatch(questionsActions.getClickedId(""));
  };

  return (
    <>
      <div className={classes.resultWrapper}>
        <h3>Your favorite Final Fantasy is {result.name}</h3>
        <div className={classes.imageWrapper}>
          <img className={classes.image} src={result.image} alt="ffImage" />
        </div>
        <Card className={classes.story} style={{ overflow: "scroll" }}>
          <h3 className={classes.subTitle}>Story</h3>
          <p>{result.description}</p>
        </Card>
        <Link to="/questions">
          <Button
            variant="outlined"
            className={classes.playButton}
            onClick={() => initializeClickedId()}
          >
            Play Again
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Result;
