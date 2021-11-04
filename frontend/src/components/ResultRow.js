const ResultRow = ({ user, color }) => {
    return (
        <tr>
            <td>{user?.playerId?.username || 'Usuario eliminado'}</td>
            <td>{user?.playerId?.cash || '-'}</td>
            <td>{user?.playerId ? user.bet : '-'}</td>
            <td>{user?.playerId ? user?.winner ? "Ganador" : "Perdedor" : '-'}</td>
            <td>
                {user?.playerId
                    ? user?.winner
                        ? user?.bet || '-'
                        : user?.playerId?.cash - user?.bet
                    : '-'
                }
            </td>
            <td></td>
        </tr>
    )
}


export default ResultRow