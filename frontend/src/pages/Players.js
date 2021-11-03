import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { message } from '../components/Message'
import NewPlayer from '../components/NewPlayer'
import PlayerCard from '../components/PlayerCard'
import { MdAddCircleOutline } from 'react-icons/md';

const Players = () => {
    const [registeredPlayers, setRegisteredPlayers] = useState([])
    const [players, setPlayers] = useState([])
    const [modal, setModal] = useState(false)
    const [loader, setLoader] = useState(true)

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
        setLoader(false)
    }

    const deleteUser = (id) => {
        setRegisteredPlayers(registeredPlayers.filter(player => player._id !== id))
    }

    const handlePlayer = (user, action) => {
        if (action === 'add') {
            setPlayers([...players, user])
        } else {
            setPlayers(players.filter(player => player._id !== user._id))
        }
    }

    useEffect(() => {
        document.title = "RuletApp - Jugadores"
        getUsers()
    }, [])

    const nameClass = !players.length ? "startButton disabled" : "startButton"

    if (loader) {
        return <h1>Cargando</h1>
    }

    return (
        <section className="playersSection">
            <h1>Seleccionar jugadores ({players.length})</h1>
            <div className="playersContainer">
                <div className="card">
                    <MdAddCircleOutline className="plusIcon" onClick={() => setModal(true)} />
                </div>
                {[...registeredPlayers].reverse().map(player => <PlayerCard key={player._id} player={player} deletePlayer={deleteUser} handlePlayer={handlePlayer} />)}
                {modal && <NewPlayer setModal={setModal} setRegisteredPlayers={setRegisteredPlayers} registeredPlayers={registeredPlayers} />}
            </div>
            <Link to='/juego' className={nameClass}><span>Comenzar Juego</span></Link>
        </section>
    )
}

export default Players