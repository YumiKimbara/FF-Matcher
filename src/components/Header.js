import classes from "./Header.module.css";
import { useDispatch } from "react-redux";

import { Link, useLocation } from "react-router-dom";
import { signupActions } from "../store/signup";
import { loginActions } from "../store/login";
import { Button } from "@material-ui/core";

const Header = () => {
  let location = useLocation();
  const dispatch = useDispatch();

  const openSignupHandler = () => {
    dispatch(signupActions.openSignupPage());
  };

  const openLoginHandler = () => {
    dispatch(loginActions.openLoginPage());
  };

  const clearModalsHandler = () => {
    dispatch(signupActions.closeSignupPage());
    dispatch(loginActions.closeLoginPage());
  };

  const authData = [
    { id: "signup", title: "Sign up", handler: openSignupHandler },
    { id: "login", title: "Log in", handler: openLoginHandler },
  ];

  return (
    <>
      <div className={classes.header}>
        <Link to="/">
          <h1 className={classes.logo} onClick={clearModalsHandler}>
            FF diagnosis
          </h1>
        </Link>
        <div className={classes.signupLogin}>
          {authData.map((i) => (
            <div>
              <Link
                to={{
                  pathname: `/${i.id}`,
                  state: { background: location },
                }}
              >
                <Button className={classes.signup} onClick={i.handler}>
                  {i.title}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
