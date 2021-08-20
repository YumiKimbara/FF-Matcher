import classes from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { signinActions } from "../store/signin";
import { loginActions } from "../store/login";
import { Button } from "@material-ui/core";

const Header = () => {
  const dispatch = useDispatch();

  const signin = useSelector((state) => state.signin.showSignin);
  const login = useSelector((state) => state.login.showLogin);

  const openSigninHandler = () => {
    dispatch(signinActions.openSigninPage());
  };

  const openLoginHandler = () => {
    dispatch(loginActions.openLoginPage());
  };

  return (
    <>
      <div className={classes.header}>
        <Link to="/">
          <h1 className={classes.logo}>FF Logo</h1>
        </Link>
        <div className={classes.signinLogin}>
          <Button className={classes.signin} onClick={openSigninHandler}>
            Sign in
          </Button>
          <Button className={classes.login} onClick={openLoginHandler}>
            <h1>Log in</h1>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
