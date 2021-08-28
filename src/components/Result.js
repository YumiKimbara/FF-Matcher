import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resultsActions } from "../store/results";
import * as api from "../api/index";

import classes from "./Result.module.css";

const Result = () => {
  const results = useSelector((state) => state.results.fetchedData);
  const dispatch = useDispatch();

  const ff9 = "/images/ff9.png";

  const fetchResultsfromDB = async () => {
    try {
      const { data } = await api.fetchResultData();
      dispatch(resultsActions.getResults(data));
      console.log(results);
    } catch (error) {
      console.error(error);
    }
  };

  //fetch all questions from MongoDB
  useEffect(() => {
    fetchResultsfromDB();
  }, [dispatch]);

  return (
    <>
      <div className={classes.resultWrapper}>
        <h3>Your favorite Final Fantasy is IX</h3>
        <div className={classes.imageWrapper}>
          <img className={classes.image} src={ff9} alt="ffImage" />
        </div>
        <div className={classes.story}>
          <h3 className={classes.subTitle}>Story</h3>
          <p>
            Strange events transpire on the Mist Continent, one of the four main
            lands of Gaia. The kingdom of Alexandria, ruled by Queen Brahne,
            begins their invasion of other nations under orders of Kuja, the
            "angel of death" from Terra. An accidental encounter in Alexandria
            brings Zidane, Vivi, and Garnet together, and they set out on a
            journey that leads them to discover the secrets of their past, the
            crystal, and a place to call home.
          </p>
        </div>
      </div>
    </>
  );
};

export default Result;
