import { formatter } from "./Calc"

const ResultRow = ({ user }) => {
    return (
        <tr className={user.winner ? "winnerRow" : "looserRow"}>
            <td>{user?.playerId?.username || 'Usuario eliminado'}</td>
            <td>{formatter.format(user.previousCash)}</td>
            <td>{formatter.format(user.bet)}</td>
            <td>{user.betColor}</td>
            <td>{user.winner ? "Ganador" : "Perdedor"}</td>
            <td>{formatter.format(user.lostOrProfit)}</td>
            <td>{formatter.format(user.previousCash + user.lostOrProfit)}</td>
        </tr>
    )
}


export default ResultRow