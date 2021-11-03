import Swal from 'sweetalert2'
import axios from 'axios'
import { MdDelete, MdModeEditOutline, MdCheckCircleOutline, MdCheckCircle } from 'react-icons/md';
import { useState } from 'react'
import { message } from './Message';

const PlayerCard = ({ player, deletePlayer, handlePlayer }) => {
    const [selected, setSelected] = useState(false)

    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    })

    const deleteUser = async () => {
        try {
            let response = await axios.delete(`http://localhost:4000/api/user/${player._id}`)
            if (response.data.success) {
                deletePlayer(player._id)
            }
        } catch (error) {
            message('error', error.message)
        }
    }

    const confirmation = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser()
                Swal.fire(
                    'Eliminado',
                    `Se ha eliminado a ${player.username}`,
                    'success'
                )
            }
        })
    }

    const selectHandler = (action) => {
        setSelected(!selected)
        handlePlayer(player, action)

    }

    const nameClass = selected ? "card selectedCard" : "card"

    return (
        <div className={nameClass}>
            {selected
                ? <MdCheckCircle className="selectedTrue" onClick={() => selectHandler('remove')} />
                : <MdCheckCircleOutline className="selectedIcon" onClick={() => selectHandler('add')} />
            }
            <div className="picture" style={{ backgroundImage: `url('${player.image}')` }}></div>
            <h3>Nombre</h3>
            <h4>{player.username}</h4>
            <h3>Dinero</h3>
            <h4>{formatter.format(player.cash)}</h4>
            <div className="icons">
                <MdModeEditOutline className="editIcon" />
                <MdDelete className="deleteIcon" onClick={confirmation} />
            </div>
        </div>
    )
}

export default PlayerCard