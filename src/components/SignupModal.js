import { Button, Modal, Fade, TextField } from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockIcon from "@material-ui/icons/Lock";
import InputAdornment from "@material-ui/core/InputAdornment";
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import classes from "./Modals.module.css";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";

import { authActions } from "../store/auth";

const SignupModal = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const toSignup = useRouteMatch("/signup")?.isExact ?? false;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const postSignupData = () => {
    fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }),
      //@@fetchはcookieをdefaultでは保存しないので、credentialsを設定。
      //cookieはなぜ送らないといけないの？sessionとは何か？
      credentials: "include",
    }).then((res) => {
      console.log(res);
      if (res.status === 201) {
        fetchSessionfromDB();
      }
    });
  };

  const fetchSessionfromDB = () => {
    fetch("http://localhost:3001/me", {
      method: "GET",
      //@credentialsをgetにもsetしたことによって、req.session.userの内容を表示することができた
      credentials: "include",
    }).then((res) => {
      res.json().then((res) => {
        console.log("sessiondata", res.data);
        dispatch(authActions.isLoggedIn(res.data.user));
      });
    });
  };

  useEffect(() => {
    fetchSessionfromDB();
  }, [dispatch]);

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
              //@@@@ページ遷移。reactrouterと違い擬似的なページ遷移ではない。
              //そんためリロードされて今までのjsの情報が全て消える。(stateなども)
              //現在いるURLをもとにactionのurlに続く。ただ3000でなく3001にしたい。
              //react routerとは併用しない。traditional(ページが切り替わるたびにリロードされるタイプのHP)なサイトではまだ使われている。
              // action="/signup"
              // method="POST"
              onSubmit={(e) => {
                e.preventDefault();
                postSignupData();
              }}
              noValidate
              autoComplete="off"
            >
              <div className={classes.input}>
                <TextField
                  variant="filled"
                  name="name"
                  placeholder="name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <PersonOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setName(e.target.value);
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
                  onChange={(e) => {
                    setEmail(e.target.value);
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
                  onChange={(e) => {
                    setPassword(e.target.value);
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
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
              <div className={classes.button}>
                <Button
                  type="submit"
                  variant="outlined"
                  onClick={() => {
                    // fetchSessionfromDB();
                    // console.log(sessionStatus);
                  }}
                >
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
