const playersReducer = (
    state = { players: [], chosenPlayers: [] },
    action
) => {
    switch (action.type) {
        case "GET_PLAYERS":
            return {
                ...state,
                players: action.payload,
                chosenPlayers: action.payload.filter(player => player.active),
            };
        case "CREATE_PLAYER":
            return {
                ...state,
                players: [...state.players, action.payload],
                chosenPlayers: [...state.chosenPlayers, action.payload]
            };
        case "DELETE_PLAYER":
            return {
                ...state,
                players: state.players.filter(player => player._id !== action.payload),
                chosenPlayers: state.chosenPlayers.filter(player => player._id !== action.payload)
            };
        case "EDIT_PLAYER":
            return {
                ...state,
                players: state.players.map(player => {
                    let result
                    if (player._id === action.payload.id) {
                        result = { ...player, active: action.payload.newData.active }
                    } else {
                        result = player
                    }
                    return result
                }),
                chosenPlayers: action.payload.newData.active
                    ? [...state.chosenPlayers, action.payload.user]
                    : state.chosenPlayers.filter(player => player._id !== action.payload.id)
            };
        case "CHANGE_DATA":
            return {
                ...state,
                players: state.players.map(player => {
                    let result
                    if (player._id === action.payload.id) {
                        result = action.payload.user
                    } else {
                        result = player
                    }
                    return result
                })
            };
        default:
            return state;
    }
};

export default playersReducer;
