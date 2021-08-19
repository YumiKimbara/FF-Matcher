import classes from "./Header.module.css";

import { Link } from "react-router-dom";

// const bgImage = "/images/bg-image.jpeg";
// style={{ backgroundImage: `url(${bgImage})` }}

const Header = () => {
  return (
    <>
      <div className={classes.header}>
        <Link to="/">
          <h1>This is header</h1>
        </Link>
      </div>
    </>
  );
};

export default Header;
