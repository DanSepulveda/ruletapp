const playersReducer = (
    state = { players: [], chosenPlayers: [], chosenPlayer: {} },
    action
) => {
    switch (action.type) {
        case "GET_PLAYERS":
            return {
                ...state,
                players: action.payload,
                chosenPlayers: action.payload,
            };
        case "GET_PLAYER":
            return {
                ...state,
                chosenPlayer: state.players.filter(player => player._id === action.payload),
            };
        default:
            return state;
    }
};

export default playersReducer;
