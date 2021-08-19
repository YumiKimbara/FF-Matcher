import { Card, Button } from "@material-ui/core";

import classes from "./Login.module.css";

const Login = () => {
  return (
    <>
      <div className={classes.cardWrapper}>
        <Card className={classes.card}>
          <div className={classes.loginContent}>
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
              Login
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Login;
