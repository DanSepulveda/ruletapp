const ResultRow = ({ user, color }) => {
    return (
        <tr>
            <td>{user.playerId.username}</td>
            <td>{user.playerId.cash}</td>
            <td>{user.bet}</td>
            <td>{user.winner ? "Ganador" : "Perdedor"}</td>
            <td>
                {user.winner
                    ? user.bet
                    : user.playerId.cash - user.bet
                }
            </td>
            <td></td>
        </tr>
    )
}


export default ResultRow