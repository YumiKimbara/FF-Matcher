import { Button, Modal, Fade, TextField } from "@material-ui/core";
// import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockIcon from "@material-ui/icons/Lock";
import InputAdornment from "@material-ui/core/InputAdornment";
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { useSelector, useDispatch } from "react-redux";
// import { signupActions } from "../store/signup";
// import { loginActions } from "../store/login";
import classes from "./Modals.module.css";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";

const LoginModal = () => {
  const history = useHistory();
  const location = useLocation();
  // const dispatch = useDispatch();
  //@@@
  // いま（コンポーネントのrendering時に）/loginにいるかどうか (boolean)
  const toLogIn = useRouteMatch("/login")?.isExact ?? false;

  console.log(useRouteMatch("/login")?.isExact ?? false);

  // const signup = useSelector((state) => state.signup.showSignup);
  // const login = useSelector((state) => state.login.showLogin);

  // const closeSignupHandler = () => {
  //   dispatch(signupActions.closeSignupPage());
  // };

  // const closeLoginHandler = () => {
  //   dispatch(loginActions.closeLoginPage());
  // };

  //go back to the '/' path, so always background in the app.js will be '/' path.
  // const back = (e) => {
  //   //@@@stoppropagationをしているのに、modal内をクリックしてもgobackしてしまう。
  //   e.stopPropagation();
  //   history.goBack();
  // };
  //@@@backdropにイベントあってもmodalをクリックしたらそこでイベントが起こる。
  //親の中に兄弟としておいておけばクリックしても大丈夫。
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      data-testid="this is auth"
      className={classes.modal}
      //@@@loginにいたらopnいなかったらclose
      //signup -> signupに変更する。
      open={toLogIn}
      onClose={() => {
        history.goBack();
      }}
      closeAfterTransition
      // BackdropComponent={Backdrop}
      // BackdropProps={{
      //   timeout: 500,
      // }}
    >
      {/* <Fade in={toLogIn}> */}
      <div className={(classes.cardWrapper, classes.modalBg)}>
        <div className={classes.SignupContent}>
          <form
            className={classes.form}
            action="/login"
            method="POST"
            noValidate
            autoComplete="off"
          >
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
                type="password"
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
            <Link
              to={{
                pathname: "/forgotpw",
                //state.backgroundを上書きしたいができない。
                state: { sample: location },
              }}
            >
              <p
                onClick={() => {
                  // back();
                  // closeLoginHandler();
                  console.log(location);
                }}
                className={classes.forgotPw}
              >
                forgot your password?
              </p>
            </Link>
            <div className={classes.button}>
              <Button type="submit" variant="outlined">
                Log in
              </Button>
            </div>
          </form>
        </div>
      </div>
      {/* </Fade> */}
    </Modal>
  );
};

export default LoginModal;
