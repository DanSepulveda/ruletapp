const gamesReducer = (
    state = { games: [], newGameReq: true },
    action
) => {
    switch (action.type) {
        case "GET_GAMES":
            return {
                ...state,
                games: action.payload,
            };
        case "NEW_GAME_REQ":
            return {
                ...state,
                newGameReq: !state.newGameReq,
            };
        case "CREATE_GAME":
            return {
                ...state,
                games: [...state.games, action.payload],
            };
        default:
            return state;
    }
};

export default gamesReducer;
