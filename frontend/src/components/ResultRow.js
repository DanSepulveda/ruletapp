import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import playersActions from '../redux/actions/playersActions'

const ResultRow = ({ user, getOnePlayer }) => {
    console.log(user)
    const [player, setPlayer] = useState({})

    useEffect(() => {
        getOnePlayer(user.playerId)
    }, [])

    return (
        <tr>
            <td>{user.playerId}</td>
            <td></td>
            <td>{user.bet}</td>
            <td>{user.winner ? "Ganador" : "Perdedor"}</td>
            <td></td>
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