import Swal from 'sweetalert2'
import { MdDelete, MdModeEditOutline, MdCheckCircleOutline, MdCheckCircle } from 'react-icons/md';
import { useState } from 'react'
import { message } from './Message';
import { connect } from 'react-redux';
import playersActions from '../redux/actions/playersActions';
import NewPlayer from './NewPlayer';
import { formatter } from './Calc';

const PlayerCard = ({ player, deletePlayer, editPlayer }) => {
    const [modal, setModal] = useState(false)

    const deleteUser = async () => {
        try {
            await deletePlayer(player._id)
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

    const editUser = (action) => {
        if (player.cash === 0) return Swal.fire(
            'No se puede realizar esta acción.',
            'El usuario debe tener un saldo mayor a $0 para poder jugar.',
            'warning'
        )
        if (action === "remove") {
            editPlayer(player._id, { active: false })
        } else {
            editPlayer(player._id, { active: true })
        }
    }

    const nameClass = player.active ? "card selectedCard" : "card"

    return (
        <div className={nameClass}>
            {player.active
                ? <MdCheckCircle className="selectedTrue" onClick={() => editUser('remove')} />
                : <MdCheckCircleOutline className="selectedIcon" onClick={() => editUser('add')} />
            }
            <div className="picture" style={{ backgroundImage: `url('${player.image}')` }}></div>
            <h3>Nombre</h3>
            <h4>{player.username}</h4>
            <h3>Dinero</h3>
            <h4>{formatter.format(player.cash)}</h4>
            <div className="icons">
                <MdModeEditOutline className="editIcon" onClick={() => setModal(true)} />
                <MdDelete className="deleteIcon" onClick={confirmation} />
            </div>
            {modal && <NewPlayer setModal={setModal} editMode playerData={player} />}
        </div>
    )
}

const mapDispatchToProps = {
    deletePlayer: playersActions.deletePlayer,
    editPlayer: playersActions.editPlayer
}

export default connect(null, mapDispatchToProps)(PlayerCard)