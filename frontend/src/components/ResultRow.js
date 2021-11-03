import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import playersActions from '../redux/actions/playersActions'

const ResultRow = ({ user, getOnePlayer, chosenPlayer, color }) => {
    const [player, setPlayer] = useState({})

    useEffect(() => {
        getOnePlayer(user.playerId)
    }, [])

    return (
        <tr>
            <td>{user.playerId.username}</td>
            <td>{user.playerId.cash}</td>
            <td>{user.bet}</td>
            <td>{user.winner ? "Ganador" : "Perdedor"}</td>
            <td>
                {user.winner
                    ? user.bet
                    : user.playerId.cash - user.bet
                }
            </td>
            <td></td>
        </tr>
    )
}

const mapStateToProps = state => {
    return {
        chosenPlayer: state.players.chosenPlayer
    }
}

const mapDispatchToProps = {
    getOnePlayer: playersActions.getOnePlayer
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultRow)