import ResultRow from "./ResultRow"

const ResultTable = ({ game }) => {
    return (
        <div className="gameResultContainer">
            <h2>Color Ruleta: <span className={`${game.winnerColor.toLowerCase()}`}>{game.winnerColor}</span></h2>
            <table className="tableResult">
                <thead>
                    <tr>
                        <th>Jugador</th>
                        <th>Dinero antes de apusta</th>
                        <th>Dinero apostado</th>
                        <th>¿Gana?</th>
                        <th>Ganancia / Pérdida</th>
                        <th>Dinero Actual</th>
                    </tr>
                </thead>
                <tbody>
                    {game.players.map(player => <ResultRow key={player._id} user={player} color={game.winnerColor} />)}
                </tbody>
            </table>
        </div>
    )
}

export default ResultTable