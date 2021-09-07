import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Detail from "./components/DetailItem";
import MyListPoce from "./components/MyListPoce";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/detail/:id" exact component={Detail} />
          <Route path="/about" component={About} />
          <Route path="/my-listpoce" component={MyListPoce} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
