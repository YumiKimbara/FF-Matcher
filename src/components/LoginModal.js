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
  const [error, setError] = useState("");
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const sessionStatus = useSelector((state) => state.auth.fetchedSession);

  const toLogIn = useRouteMatch("/login")?.isExact ?? false;

  const postLoginData = () => {
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 201) {
          fetchSessionfromDB();
        } else {
          fetch("http://localhost:3001/login", {
            credentials: "include",
          }).then((res) => {
            res.json().then((res) => {
              setError(res.error);
            });
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const fetchSessionfromDB = () => {
    fetch("http://localhost:3001/me", {
      credentials: "include",
    })
      .then((res) => {
        res.json().then((res) => {
          console.log("sessiondata", res.data);
          dispatch(authActions.isLoggedIn(res.data.user));
        });
      })
      .catch((err) => {
        console.log("err", err);
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
      open={toLogIn}
      onClose={() => {
        history.goBack();
      }}
      closeAfterTransition
    >
      <Fade in={toLogIn}>
        <div className={(classes.cardWrapper, classes.modalBg)}>
          <div className={classes.SignupContent}>
            <form
              className={classes.form}
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
              {/* <Link
                to={{
                  pathname: "/forgotpw",
                  //state.backgroundを上書きしたいができない。
                }}
              >
                <p className={classes.forgotPw}>forgot your password?</p>
              </Link> */}
              <div>
                <p className={error && classes.errorMsg}>{error}</p>
              </div>
              <div className={classes.button}>
                <Button
                  type="submit"
                  variant="outlined"
                  onClick={() => {
                    typeof sessionStatus === "object" && history.goBack("/");
                  }}
                >
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
