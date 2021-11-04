import { useState } from 'react'
import PlayerImage from './PlayerImage'
import { message } from './Message'
import { connect } from 'react-redux'
import playersActions from '../redux/actions/playersActions'

const NewPlayer = ({ setModal, createPlayer, editMode, playerData, editPlayer }) => {
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
            let response = await createPlayer(newPlayer)
            if (response.data.success) {
                message('success', 'Jugador creado exitosamente')
                setModal(false)
            } else {
                message('error', response.data.error)
            }
        } catch (error) {
            message('error', error.message)
        }
    }

    const editUser = async () => {
        if (!Object.keys(newPlayer).length) {
            message('info', 'No tienes cambios para guardar')
        } else {
            try {
                let response = await editPlayer(playerData._id, newPlayer, 'form')
                if (response.data.success) {
                    message('success', 'Cambios guardados.')
                } else {
                    message('error', response.data.error)
                }
            } catch (error) {
                message('error', error.message)
            }
        }
    }

    return (
        <div className="newPlayer">
            <div className="modal">
                <img className="closeIcon" src="/assets/close.png" alt="Close Icon" onClick={() => setModal(false)} />
                <h2>Seleccione un avatar</h2>
                <div className="picturesContainer">
                    {pictures.map(picture => <PlayerImage key={picture} picture={picture} player={newPlayer} setNewPlayer={setNewPlayer} editMode user={playerData} />)}
                </div>
                <label htmlFor="username">Nombre de Usuario</label>
                <input id="username" name="username" onChange={inputHandler} defaultValue={editMode && playerData.username} />
                <label htmlFor="cash">{editMode ? 'Dinero Actual' : 'Dinero Inicial'}</label>
                <input id="cash" name="cash" disabled={editMode ? false : true} defaultValue={editMode ? playerData.cash : formatter.format(10000)} onChange={inputHandler} />
                <div className="startButton" onClick={editMode ? () => editUser() : () => addUser()}>{editMode ? 'Guardar cambios' : 'Crear Usuario'}</div>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    createPlayer: playersActions.createPlayer,
    editPlayer: playersActions.editPlayer
}

export default connect(null, mapDispatchToProps)(NewPlayer)