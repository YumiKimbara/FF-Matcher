import classes from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { authActions } from "../store/auth";

import { Link, useLocation } from "react-router-dom";
import { questionsActions } from "../store/questions";
import { Button } from "@material-ui/core";

const Header = () => {
  const sessionStatus = useSelector((state) => state.auth.fetchedSession);
  const errorStatus = useSelector((state) => state.auth.error);

  const history = useHistory();

  //console.log("sessionStatus", sessionStatus);

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
          method: "GET",
          headers: { "content-type": "application/json" },
          credentials: "include",
        }).then((res) => {
          res.json().then((res) => {
            console.log("logout", res);
            dispatch(authActions.isLoggedIn(res.data));
            console.log("sessionStatus logout", sessionStatus);
          });
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <>
      <div className={classes.header}>
        <Link to="/">
          <h1
            className={classes.logo}
            onClick={() => {
              initializeClickedId();
              console.log(sessionStatus);
            }}
          >
            FF MATCHER
          </h1>
        </Link>
        {typeof sessionStatus !== "object" && (
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
        {typeof sessionStatus === "object" && (
          <div>
            <div>
              <Button
                type="submit"
                onClick={() => {
                  postLogoutData();
                  dispatch(authActions.isError(""));
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
