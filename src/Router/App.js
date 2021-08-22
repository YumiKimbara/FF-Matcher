import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "../components/Header";
import Home from "../components/Home";
import Question from "../components/Question";
import Signin from "../components/Signin";
import ForgotPw from "../components/ForgotPw";
import Result from "../components/Result";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/forgotpw" component={ForgotPw} />
          <Route exact path="/" component={Home} />
          <Route exact path="/question" component={Question} />
          <Route exact path="/result" component={Result} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
