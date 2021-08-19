import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "../components/Header";
import Home from "../components/Home";
import Question from "../components/Question";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/question" component={Question} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
