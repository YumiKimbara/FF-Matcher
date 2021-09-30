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
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emptyError, setEmptyError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 201) {
          history.goBack("/");
          fetchSessionfromDB();
        } else {
          fetch("http://localhost:3001/signup", {
            credentials: "include",
          });
        }
        res.json().then((res) => {
          !res.error &&
            !error &&
            !emailError &&
            !passwordError &&
            !emptyError &&
            history.goBack("/");
          setError(res.error);
        });
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
          dispatch(authActions.isLoggedIn(res.data));
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    fetchSessionfromDB();
  }, [dispatch]);

  const checkSignupInfo = () => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setEmptyError("Please fill out everything.");
    } else {
      setEmptyError("");
    }

    let checkEmail =
      /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/;
    !checkEmail.test(email) && setEmailError("Email format is not correct.");
    checkEmail.test(email) && setEmailError("");

    password !== confirmPassword
      ? setPasswordError(
          "Password doesn't match with the password confirmation."
        )
      : setPasswordError("");
  };

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
              <div>
                <p
                  className={
                    (error && classes.errorMsg) ||
                    (emptyError && classes.errorMsg) ||
                    (emailError && classes.errorMsg) ||
                    (passwordError && classes.errorMsg)
                  }
                >
                  {emptyError
                    ? emptyError
                    : emailError
                    ? emailError
                    : passwordError
                    ? passwordError
                    : error
                    ? error
                    : ""}
                </p>
              </div>
              <div className={classes.button}>
                <Button
                  type="submit"
                  variant="outlined"
                  onClick={() => {
                    checkSignupInfo();
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
