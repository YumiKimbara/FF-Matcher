import { useState, useEffect } from "react";
import { Button, Modal, Fade, TextField } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockIcon from "@material-ui/icons/Lock";
import InputAdornment from "@material-ui/core/InputAdornment";
import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles";

import { useDispatch } from "react-redux";
import classes from "./Modals.module.css";
import { useHistory, useRouteMatch } from "react-router-dom";

import { authActions } from "../store/auth";

const GreenTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#5b8e7d",
    },
  },
})((props) => <TextField {...props} />);

const useStyles = makeStyles((theme) =>
  createStyles({
    inputField: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.8rem",
      },
    },
  })
);

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const [emptyError, setEmptyError] = useState("");
  const toLogIn = useRouteMatch("/login")?.isExact ?? false;
  const materialUIClasses = useStyles();

  const postLoginData = async () => {
    try {
      const res = await fetch(
        // "http://localhost:3001/login",
        "https://ff-matcher-api.onrender.com/login",
        // "http://ec2-35-183-29-247.ca-central-1.compute.amazonaws.com/api/login",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
          credentials: "include",
        }
      );

      if (res.status === 201) {
        history.goBack("/");
        await fetchSessionfromDB();
      }

      const data = await res.json();
      !data.error && history.goBack("/");
      setError(data.error);
    } catch (err) {
      console.log("err", err);
    }
  };

  const fetchSessionfromDB = async () => {
    try {
      const res = await fetch(
        // "http://localhost:3001/me",
        "https://ff-matcher-api.onrender.com/me",
        // "http://ec2-35-183-29-247.ca-central-1.compute.amazonaws.com/api/me",
        {
          credentials: "include",
        }
      );

      const data = await res.text();
      if (!data) return;
      const jsonData = JSON.parse(data);
      await dispatch(authActions.isLoggedIn(jsonData.data));
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchSessionfromDB();
  }, [dispatch]);

  const checkLoginInfo = () => {
    if (email === "" || password === "") {
      setEmptyError("Please fill out everything.");
    } else {
      setEmptyError("");
    }
  };

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
      closeAfterTransition>
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
              autoComplete="off">
              <div className={classes.input}>
                <GreenTextField
                  variant="outlined"
                  placeholder="email"
                  name="email"
                  InputProps={{
                    classes: {
                      input: materialUIClasses.inputField,
                    },
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
                <GreenTextField
                  variant="outlined"
                  type="password"
                  placeholder="password"
                  name="password"
                  InputProps={{
                    classes: {
                      input: materialUIClasses.inputField,
                    },
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
              <div>
                <p
                  className={
                    (error && classes.errorMsg) ||
                    (emptyError && classes.errorMsg)
                  }>
                  {emptyError ? emptyError : error ? error : ""}
                </p>
              </div>
              <div className={classes.button}>
                <Button
                  type="submit"
                  variant="outlined"
                  onClick={() => {
                    checkLoginInfo();
                  }}>
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
