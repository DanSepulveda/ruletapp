import axios from "axios";

const host = 'http://localhost:4000'

const gamesActions = {
  getGames: () => {
    return async (dispatch) => {
      let response = await axios.get(`${host}/api/games`);
      if (!response.data.success) {
        throw new Error("Ocurrió un problema. Intente más tarde.");
      }
      dispatch({ type: "GET_GAMES", payload: response.data.response });
    };
  },
  newGameReq: () => {
    return (dispatch) => {
      dispatch({ type: "NEW_GAME_REQ" })
    }
  },
  createNewGame: (newGame) => {
    return async (dispatch) => {
      let response = await axios.post(`${host}/api/games`, newGame)
      if (!response.data.success) {
        throw new Error("Ocurrió un problema. Intente más tarde.");
      }
      dispatch({ type: "CREATE_GAME", payload: response.data.response.game })
      dispatch({ type: "GET_PLAYERS", payload: response.data.response.players })
      return response
    }
  },
  getWeather: () => {
    return async () => {
      let response = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/60449?apikey=14A2YVwlmMm7UGT4emqoLMAVtejUAvzZ&details=false`)
      return response
    }
  },
}

export default gamesActions;
