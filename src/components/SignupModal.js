import { Button, Modal, Fade, TextField } from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockIcon from "@material-ui/icons/Lock";
import InputAdornment from "@material-ui/core/InputAdornment";
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { useSelector, useDispatch } from "react-redux";

import classes from "./Modals.module.css";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";

const SignupModal = () => {
  const history = useHistory();
  const location = useLocation();
  const toSignup = useRouteMatch("/signup")?.isExact ?? false;

  //console.log(useRouteMatch("/signup")?.isExact ?? false);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={toSignup}
      onClose={() => {
        history.goBack();
      }}
      closeAfterTransition
    >
      <Fade in={toSignup}>
        <div className={(classes.cardWrapper, classes.modalBg)}>
          <div className={classes.SignupContent}>
            <form
              className={classes.form}
              action="/signup"
              method="POST"
              noValidate
              autoComplete="off"
            >
              <div className={classes.input}>
                <TextField
                  variant="filled"
                  name="name"
                  placeholder="name"
                  name="name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <PersonOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className={classes.input}>
                <TextField
                  variant="filled"
                  placeholder="email"
                  name="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <MailOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className={classes.input}>
                <TextField
                  type="password"
                  variant="filled"
                  placeholder="password"
                  name="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className={classes.input}>
                <TextField
                  variant="filled"
                  type="password"
                  placeholder="password confirmation"
                  name="confirmPassword"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className={classes.button}>
                <Button type="submit" variant="outlined">
                  Sign up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default SignupModal;
