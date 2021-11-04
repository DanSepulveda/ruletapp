import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NewPlayer from '../components/NewPlayer'
import PlayerCard from '../components/PlayerCard'
import { MdAddCircleOutline } from 'react-icons/md';
import { connect } from 'react-redux'

const Players = ({ players, chosenPlayers }) => {
    const [modal, setModal] = useState(false)

    useEffect(() => {
        document.title = "RuletApp - Jugadores"
    }, [])

    // const nameClass = !chosenPlayers.length ? "startButton disabled" : "startButton"

    return (
        <section className="playersSection">
            <h1>Seleccionar jugadores ({chosenPlayers.length})</h1>
            <div className="playersContainer">
                <div className="card">
                    <MdAddCircleOutline className="plusIcon" onClick={() => setModal(true)} />
                </div>
                {[...players].reverse().map(player => <PlayerCard key={player._id} player={player} />)}
                {modal && <NewPlayer setModal={setModal} />}
            </div>
            <Link to='/' className="startButton"><span>Inicio</span></Link>
        </section>
    )
}

const mapStateToProps = state => {
    return {
        players: state.players.players,
        chosenPlayers: state.players.chosenPlayers
    }
}

export default connect(mapStateToProps)(Players)