import { Card, Button } from "@material-ui/core";

import classes from "./Question.module.css";

const Question = () => {
  return (
    <>
      <div className={classes.cardWrapper}>
        <Card className={classes.card}>
          <h2>Question 1</h2>
          <p>1/10</p>
          <div className={classes.cardContent}>
            <p>Which period do you want to go?</p>
            <div>
              <Button className={classes.button} variant="outlined">
                Ancient
              </Button>
              <Button className={classes.button} variant="outlined">
                Modern
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Question;
