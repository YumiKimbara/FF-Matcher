import classes from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation } from "react-router-dom";
import { authActions } from "../store/auth";
import { questionsActions } from "../store/questions";
import { Button } from "@material-ui/core";

const Header = () => {
  const clickedId = useSelector((state) => state.questions.clickedId);
  const auth = useSelector((state) => state.auth.checkAuth);

  let location = useLocation();
  const dispatch = useDispatch();

  const initializeClickedId = () => {
    dispatch(questionsActions.getClickedId(""));
  };

  const authData = [
    { id: "signup", title: "Sign up" },
    { id: "login", title: "Log in" },
  ];

  return (
    <>
      <div className={classes.header}>
        <Link to="/">
          <h1 className={classes.logo} onClick={() => initializeClickedId()}>
            FF MATCHER
          </h1>
        </Link>
        {!auth && (
          <div className={classes.signupLogin}>
            {authData.map((i) => (
              <div>
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
            {auth && (
              <div>
                <form action="/logout" method="POST">
                  <div>
                    <Button type="submit">Log out</Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
