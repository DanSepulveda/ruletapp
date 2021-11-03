const playersReducer = (
    state = { players: [] },
    action
) => {
    switch (action.type) {
        case "GET_PLAYERS":
            return {
                ...state,
                players: action.payload,
            };
        default:
            return state;
    }
};

export default playersReducer;
