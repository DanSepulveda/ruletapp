import { useState, useEffect } from 'react'
import gamesActions from '../redux/actions/gamesActions'
import { connect } from 'react-redux'

const Temp = ({ newGameReq }) => {
    const [time, setTime] = useState(5)
    let formattedTime = new Date(time * 1000).toISOString().substr(14, 5)

    setTimeout(() => {
        if (time === 0) {
            setTime(5)
        } else {
            setTime(time - 1)
        }
    }, 1000)

    useEffect(() => {
        if (time === 0) {
            newGameReq()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time])

    return (
        <div className="temp">
            <h1>Próxima ronda dentro de {formattedTime}</h1>
        </div>
    )
}

const mapDispatchToProps = {
    newGameReq: gamesActions.newGameReq
}

export default connect(null, mapDispatchToProps)(Temp)