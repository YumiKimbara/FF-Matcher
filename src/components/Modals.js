import { Button, Modal, Backdrop, Fade } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { signinActions } from "../store/signin";
import classes from "./Modals.module.css";

const Modals = () => {
  const dispatch = useDispatch();
  const signin = useSelector((state) => state.signin.showSignin);

  const closeSigninHandler = () => {
    dispatch(signinActions.closeSigninPage());
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={signin}
        onClose={closeSigninHandler}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={signin}>
          <div className={(classes.cardWrapper, classes.modalBg)}>
            <div className={classes.SigninContent}>
              <form className={classes.form}>
                <input
                  className={classes.input}
                  type="text"
                  placeholder="name"
                />
                <input
                  className={classes.input}
                  type="text"
                  placeholder="email"
                />
                <input
                  className={classes.input}
                  type="text"
                  placeholder="password"
                />
                <input
                  className={classes.input}
                  type="text"
                  placeholder="password confirmation"
                />
              </form>
              <Button className={classes.button} variant="outlined">
                Signin
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default Modals;
