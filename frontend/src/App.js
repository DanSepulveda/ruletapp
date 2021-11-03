import "./App.css";
import Home from './pages/Home'
import Players from './pages/Players'
import Temp from "./components/Temp";
import NotFound from "./pages/NotFound";
import { message } from "./components/Message";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import gamesActions from "./redux/actions/gamesActions";
import playersActions from "./redux/actions/playersActions";

const App = (props) => {
  const [loader, setLoader] = useState(true)

  const getData = async () => {
    try {
      await props.getGames()
      await props.getPlayers()
      setLoader(false)
    } catch (error) {
      message('error', error.message)
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loader) {
    return (
      <div className="loader">
        <img className="loaderImage" src='/assets/ruleta.png' alt="Ruleta" />
        <h1>Iniciando aplicación...</h1>
      </div>
    )
  }

  return (
    <>
      <Temp />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/jugadores" component={Players} />
          <Route path="/notfound" component={NotFound} />
          <Redirect to="/notfound" />
        </Switch>
      </BrowserRouter>
    </>
  );
};

const mapDispatchToProps = {
  getGames: gamesActions.getGames,
  getPlayers: playersActions.getPlayers
}

export default connect(null, mapDispatchToProps)(App);
