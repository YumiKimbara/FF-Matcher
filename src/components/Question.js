import { Card, Button } from "@material-ui/core";

import classes from "./Question.module.css";

const Question = () => {
  return (
    <>
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
