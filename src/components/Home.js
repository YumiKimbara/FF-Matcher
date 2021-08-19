import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import classes from "./Home.module.css";

const ff1 = "/images/ff1.png";

const Home = () => {
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
    </>
  );
};

export default Home;
