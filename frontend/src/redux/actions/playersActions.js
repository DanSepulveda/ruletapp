import axios from "axios";

const host = 'http://localhost:4000'

const playersActions = {
    getPlayers: () => {
        return async (dispatch) => {
            let response = await axios.get(`${host}/api/users`);
            if (!response.data.success) {
                throw new Error("Ocurrió un problema. Intente más tarde.");
            }
            dispatch({ type: "GET_PLAYERS", payload: response.data.response });
        };
    },
    getOnePlayer: (userId) => {
        return (dispatch) => {
            dispatch({ type: "GET_PLAYER", payload: userId })
        }
    }
}

export default playersActions;
