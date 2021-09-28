import { Button } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import * as api from "../api/index";
import classes from "./Home.module.css";
import { useSelector } from "react-redux";

const ff1 = "/images/ff1.png";
const ff9 = "/images/ff9.png";

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

const Home = () => {
  const sessionStatus = useSelector((state) => state.auth.fetchedSession);

  return (
    <>
      <div className={classes.homeWrapper}>
        <div>
          <h3>Find Your Favorite Final Fantasy </h3>
        </div>
        <Carousel>
          {images.map((image) => {
            return (
              <div className={classes.imageWrapper}>
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
        <div className={classes.button}>
          <Link to={typeof sessionStatus === "object" ? "/questions" : "/"}>
            <Button
              variant="outlined"
              disabled={typeof sessionStatus !== "object" ? true : false}
            >
              Start
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
