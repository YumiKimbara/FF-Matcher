import { Card, Button } from "@material-ui/core";
import classes from "./ForgotPw.module.css";

const ForgotPw = () => {
  return (
    <>
      <div className={classes.cardWrapper}>
        <Card className={classes.card}>
          <h3>Reset password</h3>
          <div className={classes.content}>
            <form>
              <input
                className={classes.input}
                type="text"
                placeholder="email"
              />
            </form>
            <div className={classes.button}>
              <Button variant="outlined">Reset Password</Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ForgotPw;
