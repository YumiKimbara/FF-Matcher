import classes from "./Header.module.css";
import { useDispatch } from "react-redux";

import { Link, useLocation } from "react-router-dom";
import { signinActions } from "../store/signin";
import { loginActions } from "../store/login";
import { Button } from "@material-ui/core";

const Header = () => {
  let location = useLocation();
  const dispatch = useDispatch();

  const openSigninHandler = () => {
    dispatch(signinActions.openSigninPage());
  };

  const openLoginHandler = () => {
    dispatch(loginActions.openLoginPage());
  };

  const clearModalsHandler = () => {
    dispatch(signinActions.closeSigninPage());
    dispatch(loginActions.closeLoginPage());
  };

  const authData = [
    { id: "signin", title: "Signin", handler: openSigninHandler },
    { id: "login", title: "Login", handler: openLoginHandler },
  ];

  return (
    <>
      <div className={classes.header}>
        <Link to="/">
          <h1 className={classes.logo} onClick={clearModalsHandler}>
            Logo
          </h1>
        </Link>
        {authData.map((i) => (
          <div>
            <div className={classes.signinLogin}>
              <Link
                to={{
                  pathname: `/${i.id}`,
                  state: { background: location },
                }}
              >
                <Button className={classes.signin} onClick={i.handler}>
                  {i.title}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Header;
