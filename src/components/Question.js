import { useState, useEffect } from "react";
import { Card, Button } from "@material-ui/core";

import classes from "./Question.module.css";

const Question = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/questions")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonData) => setUsers(jsonData));
  });
  return (
    <>
      {console.log(users)}
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
