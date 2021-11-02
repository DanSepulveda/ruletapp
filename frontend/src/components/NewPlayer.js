import { useState } from 'react'
import axios from 'axios'
import PlayerImage from './PlayerImage'
import { message } from './Message'

const NewPlayer = ({ setModal, players, setPlayers }) => {
    const [newPlayer, setNewPlayer] = useState({})

    const pictures = ["avatar1", "avatar2", "avatar3", "avatar4", "avatar5", "avatar6"]

    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    })

    const inputHandler = (e) => {
        setNewPlayer({
            ...newPlayer,
            [e.target.name]: e.target.value
        })
    }

    const addUser = async () => {
        try {
            if (!newPlayer.username) throw new Error('Ingrese su nombre de usuario.')
            if (!newPlayer.image) throw new Error('Seleccione una imagen.')
            let response = await axios.post('http://localhost:4000/api/users', newPlayer)
            if (response.data.success) {
                message('success', 'Jugador creado exitosamente')
                setPlayers([...players, response.data.response])
                setModal(false)
            } else {
                message('error', response.data.error)
            }
        } catch (error) {
            message('error', error.message)
        }
    }

    return (
        <div className="newPlayer">
            <div className="modal">
                <img className="closeIcon" src="/assets/close.png" alt="Close Icon" onClick={() => setModal(false)} />
                <h2>Seleccione un avatar</h2>
                <div className="picturesContainer">
                    {pictures.map(picture => <PlayerImage key={picture} picture={picture} player={newPlayer} setNewPlayer={setNewPlayer} />)}
                </div>
                <label htmlFor="username">Nombre de Usuario</label>
                <input id="username" name="username" onChange={inputHandler} />
                <label htmlFor="cash">Dinero Inicial</label>
                <input id="cash" name="cash" disabled defaultValue={formatter.format(10000)} />
                <div className="startButton" onClick={addUser}>Guardar</div>
            </div>
        </div>
    )
}

export default NewPlayer