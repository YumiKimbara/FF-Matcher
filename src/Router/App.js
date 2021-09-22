import { Switch, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../components/Header";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
import Home from "../components/Home";
import Question from "../components/Question";
import ForgotPw from "../components/ForgotPw";
import Result from "../components/Result";
// import Modals from "../components/Modals";

function App() {
  const location = useLocation();

  //if there is background, set it as a location
  let background = location.state && location.state.background;

  return (
    <>
      <Header />
      <Switch location={background || location}>
        <Route exact path="/forgotpw" component={ForgotPw} />
        <Route exact path="/" component={Home} />
        <Route exact path="/me" component={Home} />
        <Route exact path="/questions" component={Question} />
        <Route exact path="/result" component={Result} />
      </Switch>
      {background && <Route path="/login" children={<LoginModal />} />}
      {background && <Route path="/signup" children={<SignupModal />} />}
    </>
  );
}

export default App;

//@@@
//loginだけのURLだと背景がどの画面になるかわからない。search?loginみたいに書く。Routerの外にコンポーネンとを書いておく。

// /search
// /maps
// /news
// /login
