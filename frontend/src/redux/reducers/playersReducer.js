const playersReducer = (
    state = { players: [], chosenPlayers: [] },
    action
) => {
    switch (action.type) {
        case "GET_PLAYERS":
            return {
                ...state,
                players: action.payload,
                chosenPlayers: action.payload,
            };
        default:
            return state;
    }
};

export default playersReducer;
