import { Button, Modal, Backdrop, Fade, Card } from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockIcon from "@material-ui/icons/Lock";

import { useSelector, useDispatch } from "react-redux";
import { signinActions } from "../store/signin";
import { loginActions } from "../store/login";
import classes from "./Modals.module.css";
import { Link } from "react-router-dom";

const Modals = () => {
  const dispatch = useDispatch();
  const signin = useSelector((state) => state.signin.showSignin);
  const login = useSelector((state) => state.login.showLogin);

  const closeSigninHandler = () => {
    dispatch(signinActions.closeSigninPage());
  };

  const closeLoginHandler = () => {
    dispatch(loginActions.closeLoginPage());
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={signin ? signin : login}
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
              <form className={classes.form}>
                {signin && (
                  <div>
                    <PersonOutlineIcon />
                    <input
                      className={classes.input}
                      type="text"
                      placeholder="name"
                    />
                  </div>
                )}
                <div>
                  <MailOutlineIcon />
                  <input
                    className={classes.input}
                    type="text"
                    placeholder="email"
                  />
                </div>
                <div>
                  <LockIcon />
                  <input
                    className={classes.input}
                    type="text"
                    placeholder="password"
                  />
                </div>
                {signin && (
                  <div>
                    <LockIcon />
                    <input
                      className={classes.input}
                      type="text"
                      placeholder="password confirmation"
                    />
                  </div>
                )}
              </form>
              {login && (
                <Link to="/forgotpw">
                  <p className={classes.forgotPw}>forgot your password?</p>
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
