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
    createPlayer: (newPlayer) => {
        return async (dispatch) => {
            let response = await axios.post(`${host}/api/users`, newPlayer)
            if (!response.data.success) {
                throw new Error(response.data.error);
            }
            dispatch({ type: "CREATE_PLAYER", payload: response.data.response })
            return response
        }
    },
    deletePlayer: (id) => {
        return async (dispatch) => {
            let response = await axios.delete(`${host}/api/user/${id}`)
            if (!response.data.success) {
                throw new Error(response.data.error);
            }
            dispatch({ type: "DELETE_PLAYER", payload: id })
            return response
        }
    },
    editPlayer: (id, newData) => {
        return async (dispatch) => {
            let response = await axios.put(`${host}/api/user/${id}`, newData)
            if (!response.data.success) {
                throw new Error(response.data.error);
            }
            dispatch({ type: "EDIT_PLAYER", payload: { id, newData, user: response.data.response } })
            return response
        }
    },

}

export default playersActions;
