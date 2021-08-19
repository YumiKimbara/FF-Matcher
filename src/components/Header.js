import classes from "./Header.module.css";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className={classes.header}>
        <Link to="/">
          <h1 className={classes.logo}>This is header</h1>
        </Link>
        <Link to="/signin">
          <h1>Signin</h1>
        </Link>
      </div>
    </>
  );
};

export default Header;
