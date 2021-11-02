import { useState, useEffect } from 'react'
import NewPlayer from '../components/NewPlayer'
import PlayerCard from '../components/PlayerCard'

const Players = () => {
    const [players, setPlayers] = useState([])
    const [modal, setModal] = useState(false)

    useEffect(() => {
        document.title = "RuletApp - Jugadores"
    }, [])

    return (
        <section className="playersSection">
            <h1>Agregar jugadores</h1>
            <div className="playersContainer">
                <div className="card">
                    <img className="plusImage" src="/assets/plus.png" alt="" onClick={() => setModal(true)} />
                </div>
                {players.map(player => <PlayerCard key={player._id} player={player} />)}
                {modal && <NewPlayer setModal={setModal} />}
            </div>
        </section>
    )
}

export default Players