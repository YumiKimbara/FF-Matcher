import classes from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { signinActions } from "../store/signin";
import { Button } from "@material-ui/core";

const Header = () => {
  const dispatch = useDispatch();

  const signin = useSelector((state) => state.signin.showSignin);

  const openSigninHandler = () => {
    dispatch(signinActions.openSigninPage());
    console.log(signin);
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
          <h1 className={classes.login}>Log in</h1>
        </div>
      </div>
    </>
  );
};

export default Header;
