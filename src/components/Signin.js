import { Card, Button } from "@material-ui/core";

import classes from "./Signin.module.css";

const Signin = () => {
  return (
    <>
      <div className={classes.cardWrapper}>
        <Card className={classes.card}>
          <div className={classes.SigninContent}>
            <form className={classes.form}>
              <input className={classes.input} type="text" placeholder="name" />
              <input
                className={classes.input}
                type="text"
                placeholder="email"
              />
              <input
                className={classes.input}
                type="text"
                placeholder="password"
              />
            </form>
            <Button className={classes.button} variant="outlined">
              Signin
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Signin;
