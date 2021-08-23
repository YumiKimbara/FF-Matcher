import { Card, Button, TextField } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import InputAdornment from "@material-ui/core/InputAdornment";

import classes from "./ForgotPw.module.css";

const ForgotPw = () => {
  return (
    <>
      <div className={classes.cardWrapper}>
        <Card className={classes.card}>
          <h3>Reset password</h3>
          <div className={classes.content}>
            <form>
              <div>
                <TextField
                  variant="filled"
                  placeholder="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <MailOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
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
