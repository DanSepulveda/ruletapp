import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { message } from '../components/Message'
import NewPlayer from '../components/NewPlayer'
import PlayerCard from '../components/PlayerCard'

const Players = () => {
    const [registeredPlayers, setRegisteredPlayers] = useState([])
    const [players, setPlayers] = useState([])
    const [modal, setModal] = useState(false)

    const getUsers = async () => {
        try {
            let response = await axios.get('http://localhost:4000/api/users')
            if (response.data.success) {
                setRegisteredPlayers(response.data.response)
            } else {
                message('error', response.data.error)
            }
        } catch (error) {
            message('error', error.message)
        }
    }

    const deleteUser = (id) => {
        setRegisteredPlayers(registeredPlayers.filter(player => player._id !== id))
    }

    useEffect(() => {
        document.title = "RuletApp - Jugadores"
        getUsers()
    }, [])

    const nameClass = !players.length ? "startButton disabled" : "startButton"

    return (
        <section className="playersSection">
            <h1>Seleccionar jugadores</h1>
            <div className="playersContainer">
                <div className="card">
                    <img className="plusImage" src="/assets/plus.png" alt="" onClick={() => setModal(true)} />
                </div>
                {players.map(player => <PlayerCard key={player._id} player={player} />)}
                {registeredPlayers.map(player => <PlayerCard key={player._id} player={player} deletePlayer={deleteUser} />)}
                {modal && <NewPlayer setModal={setModal} setPlayers={setPlayers} players={players} />}
            </div>
            <Link to='/juego' className={nameClass}><span>Comenzar Juego</span></Link>
        </section>
    )
}

export default Players