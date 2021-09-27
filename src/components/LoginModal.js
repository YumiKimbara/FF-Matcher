import { useState, useEffect } from "react";
import { Button, Modal, Fade, TextField } from "@material-ui/core";
// import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockIcon from "@material-ui/icons/Lock";
import InputAdornment from "@material-ui/core/InputAdornment";
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { useSelector, useDispatch } from "react-redux";
import classes from "./Modals.module.css";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";

import { authActions } from "../store/auth";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  //@@@
  // いま（コンポーネントのrendering時に）/loginにいるかどうか (boolean)
  const toLogIn = useRouteMatch("/login")?.isExact ?? false;

  //go back to the '/' path, so always background in the app.js will be '/' path.
  // const back = (e) => {
  //   //@@@stoppropagationをしているのに、modal内をクリックしてもgobackしてしまう。
  //   e.stopPropagation();
  //   history.goBack();
  // };
  //@@@backdropにイベントあってもmodalをクリックしたらそこでイベントが起こる。
  //@@@親の中に兄弟としておいておけばクリックしても大丈夫。

  // const fetchSessionfromDB = async () => {
  //   await fetch("http://localhost:3001/me")
  //     .then((res) => {
  //       res.json().then((data) => {
  //         console.log("sessiondata", data);
  //       });
  //       // dispatch(authActions.isLoggedIn("data"));

  //       // console.log("sessionStatus", sessionStatus);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const postLoginData = () => {
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
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
      data-testid="this is auth"
      className={classes.modal}
      //@@@loginにいたらopnいなかったらclose
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
      <Fade in={toLogIn}>
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
                postLoginData();
              }}
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
                  onChange={(e) => {
                    setEmail(e.target.value);
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <Link
                to={{
                  pathname: "/forgotpw",
                  //state.backgroundを上書きしたいができない。
                }}
              >
                <p className={classes.forgotPw}>forgot your password?</p>
              </Link>
              <div className={classes.button}>
                <Button type="submit" variant="outlined">
                  Log in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default LoginModal;
