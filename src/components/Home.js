import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";
import Signin from "./Signin";
import Login from "./Login";

import { useSelector } from "react-redux";

const ff1 = "/images/ff1.png";

const Home = () => {
  const signin = useSelector((state) => state.signin.showSignin);
  const login = useSelector((state) => state.login.showLogin);

  return (
    <>
      <div className={classes.homeWrapper}>
        <div>
          <h3>Find Your Favorite Final Fantasy </h3>
        </div>
        <div className={classes.imageWrapper}>
          <img className={classes.image} src={ff1} alt="ff1" />
        </div>
        <div>
          <Link to="/question">
            <Button variant="outlined">Start</Button>
          </Link>
        </div>
      </div>
      {signin && <Signin />}
      {login && <Login />}
    </>
  );
};

export default Home;
