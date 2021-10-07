import classes from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { authActions } from "../store/auth";

import { Link, useLocation } from "react-router-dom";
import { questionsActions } from "../store/questions";
import { Button } from "@material-ui/core";

const Header = () => {
  const sessionStatus = useSelector((state) => state.auth.fetchedSession);

  const history = useHistory();

  let location = useLocation();
  const dispatch = useDispatch();

  const initializeClickedId = () => {
    dispatch(questionsActions.getClickedId(""));
  };

  const authData = [
    { id: "signup", title: "Sign up" },
    { id: "login", title: "Log in" },
  ];

  const postLogoutData = () => {
    fetch("http://localhost:3001/logout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        fetch("http://localhost:3001/logout", {
          headers: { "content-type": "application/json" },
          credentials: "include",
        }).then((res) => {
          res.json().then((res) => {
            dispatch(authActions.isLoggedIn(""));
          });
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  localStorage.setItem("login", JSON.stringify(sessionStatus));
  const loginValue = JSON.parse(localStorage.getItem("login"));

  return (
    <>
      <div className={classes.header}>
        <Link to="/">
          <h1
            className={classes.logo}
            onClick={() => {
              initializeClickedId();
              localStorage.removeItem("result");
            }}
          >
            FF MATCHER
          </h1>
        </Link>

        {typeof loginValue !== "object" && (
          <div className={classes.signupLogin}>
            {authData.map((i) => (
              <div key={i.id}>
                <Link
                  to={{
                    pathname: `/${i.id}`,
                    state: { background: location },
                  }}
                >
                  <Button className={classes.signup}>{i.title}</Button>
                </Link>
              </div>
            ))}
          </div>
        )}
        {typeof loginValue === "object" && (
          <div>
            <div>
              <Button
                type="submit"
                onClick={() => {
                  localStorage.setItem("login", sessionStatus);
                  localStorage.removeItem("result");
                  postLogoutData();
                  history.replace("/");
                }}
              >
                Log out
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
