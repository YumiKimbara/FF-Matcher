import { Button } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

import classes from "./Home.module.css";

import { useSelector } from "react-redux";

const images = [
  {
    id: 1,
    img: "/images/ff1.png",
  },
  {
    id: 2,
    img: "/images/ff2.png",
  },
  {
    id: 3,
    img: "/images/ff3.png",
  },
  {
    id: 4,
    img: "/images/ff4.png",
  },
  {
    id: 5,
    img: "/images/ff5.png",
  },
  {
    id: 6,
    img: "/images/ff6.png",
  },
  {
    id: 7,
    img: "/images/ff7.png",
  },
  {
    id: 8,
    img: "/images/ff8.png",
  },
  {
    id: 9,
    img: "/images/ff9.png",
  },
  {
    id: 10,
    img: "/images/ff10.png",
  },
  {
    id: 11,
    img: "/images/ff11.png",
  },
  {
    id: 12,
    img: "/images/ff12.png",
  },
  {
    id: 13,
    img: "/images/ff13.png",
  },
  {
    id: 14,
    img: "/images/ff14.png",
  },
  {
    id: 15,
    img: "/images/ff15.png",
  },
];

const useStyles = makeStyles((theme) =>
  createStyles({
    resizedCarousel: {
      [theme.breakpoints.down("sm")]: {
        padding: "5px",
      },
    },
  })
);

const Home = () => {
  const sessionStatus = useSelector((state) => state.auth.fetchedSession);
  const materialUIClasses = useStyles();

  localStorage.setItem("login", JSON.stringify(sessionStatus));
  const loginValue = JSON.parse(localStorage.getItem("login"));

  return (
    <>
      <div className={classes.homeWrapper}>
        <div>
          <h3>Find Your Favorite Final Fantasy </h3>
        </div>
        <Carousel
          navButtonsProps={{
            classes: {
              root: materialUIClasses.resizedCarousel,
            },
          }}
        >
          {images.map((image) => {
            return (
              <div className={classes.imageWrapper} key={image.id}>
                <img
                  className={classes.image}
                  key={image.id}
                  src={image.img}
                  alt="ff1"
                />
              </div>
            );
          })}
        </Carousel>
        {loginValue ? (
          <div className={classes.button}>
            <Link to={loginValue ? "/questions" : "/"}>
              <Button variant="outlined">Start</Button>
            </Link>
          </div>
        ) : (
          <div className={(classes.button, classes.buttonDisabled)}>
            <Button className={classes.tooltip} variant="outlined">
              Start
              <span className={classes.tooltiptext}>
                Please sign up or log in to play.
              </span>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
