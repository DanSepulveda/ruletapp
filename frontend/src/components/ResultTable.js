import ResultRow from "./ResultRow"

const ResultTable = ({ game, length, index }) => {
    return (
        <div className="gameResultContainer">
            {index === 0 && <h2>Última Ronda</h2>}
            <div className="tableHeader">
                <h2>Color Ganador: <span className={`${game.winnerColor.toLowerCase()}`}>{game.winnerColor}</span></h2>
                <h2>Juego N° {length - index}</h2>
            </div>
            <table className="tableResult">
                <thead>
                    <tr>
                        <th>Jugador</th>
                        <th>Dinero antes de apuesta</th>
                        <th>Dinero apostado</th>
                        <th>Color apuesta</th>
                        <th>¿Gana?</th>
                        <th>Ganancia / Pérdida</th>
                        <th>Dinero Actual</th>
                    </tr>
                </thead>
                <tbody>
                    {game.players.map(player => <ResultRow key={player._id} user={player} />)}
                </tbody>
            </table>
        </div>
    )
}

export default ResultTable