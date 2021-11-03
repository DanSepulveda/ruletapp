import "./App.css";
import axios from 'axios'
import Home from './pages/Home'
import Players from './pages/Players'
import Temp from "./components/Temp";
import NotFound from "./pages/NotFound";
import { message } from "./components/Message";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const App = () => {
  const [loader, setLoader] = useState(true)
  const [registeredPlayers, setRegisteredPlayers] = useState([])

  const getUsers = async () => {
    try {
      let response = await axios.get('http://localhost:4000/api/users')
      if (response.data.success) {
        setRegisteredPlayers(response.data.response)
      } else {
        message('error', response.data.error)
      }
    } catch (error) {
      message('error', error.message)
    }
    setLoader(false)
  }

  useEffect(() => {
    getUsers()
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
      <Temp players={registeredPlayers} />
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

export default App;
