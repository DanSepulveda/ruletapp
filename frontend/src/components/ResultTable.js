const ResultTable = ({ game }) => {
    return (
        <div className="gameResultContainer">
            <h2>Ganador: <span className={`${game.winnerColor.toLowerCase()}`}>{game.winnerColor}</span></h2>
        </div>
    )
}

export default ResultTable