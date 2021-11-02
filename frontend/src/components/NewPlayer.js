import { useState } from 'react'
import axios from 'axios'
import PlayerImage from './PlayerImage'

const NewPlayer = ({ setModal }) => {
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
        let response = await axios.post('http://localhost:4000/api/newuser', newPlayer)
        console.log(response.data)
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