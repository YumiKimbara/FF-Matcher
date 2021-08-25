import {
  Button,
  Modal,
  Backdrop,
  Fade,
  Card,
  TextField,
} from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockIcon from "@material-ui/icons/Lock";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { useSelector, useDispatch } from "react-redux";
import { signinActions } from "../store/signin";
import { loginActions } from "../store/login";
import classes from "./Modals.module.css";
import { Link, useHistory, useLocation } from "react-router-dom";

const Modals = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const signin = useSelector((state) => state.signin.showSignin);
  const login = useSelector((state) => state.login.showLogin);

  const closeSigninHandler = () => {
    dispatch(signinActions.closeSigninPage());
  };

  const closeLoginHandler = () => {
    dispatch(loginActions.closeLoginPage());
  };

  //go back to the '/' path, so always background in the app.js will be '/' path.
  const back = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={signin ? signin : login}
        onClick={back}
        onClose={signin ? closeSigninHandler : closeLoginHandler}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={signin ? signin : login}>
          <div className={(classes.cardWrapper, classes.modalBg)}>
            <div className={classes.SigninContent}>
              <form className={classes.form} action="/signin" method="POST">
                {signin && (
                  <div className={classes.input}>
                    <TextField
                      variant="filled"
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
                )}
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
                {signin && (
                  <div className={classes.input}>
                    <TextField
                      variant="filled"
                      placeholder="password confirmation"
                      name="passworComfirmation"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment>
                            <LockIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                )}
              </form>
              {login && (
                <Link
                  to={{
                    pathname: "/forgotpw",
                    //state.backgroundを上書きしたいができない。
                    state: { sample: location },
                  }}
                >
                  <p
                    onClick={(back, closeLoginHandler, console.log(location))}
                    className={classes.forgotPw}
                  >
                    forgot your password?
                  </p>
                </Link>
              )}
              <div className={classes.button}>
                <Button variant="outlined">
                  {signin ? "Sign in" : "Log in"}
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default Modals;
