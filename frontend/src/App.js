import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from './pages/Home'
import Players from './pages/Players'
// import Error404 from "./pages/404";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route path="/notfound" component={Error404} /> */}
        <Route path="/jugadores" component={Players} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
