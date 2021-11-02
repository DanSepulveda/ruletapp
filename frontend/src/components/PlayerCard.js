const PlayerCard = ({ player }) => {
    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    })

    return (
        <div>
            <div></div>
            <h2>Nombre: {player.name}</h2>
            <h3>Dinero: {formatter.format(player.cash)}</h3>
        </div>
    )
}

export default PlayerCard