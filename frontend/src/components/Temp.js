import { useState, useEffect } from 'react'
import axios from 'axios'
import { message } from './Message'

const Temp = ({ players }) => {
    const [time, setTime] = useState(5)
    const [conservativeBet, setConservativeBet] = useState(false)
    const [newGame, setNewGame] = useState({
        players: [],
        winnerColor: ''
    })

    let formattedTime = new Date(time * 1000).toISOString().substr(14, 5)

    const createGame = async () => {
        try {
            let response = await axios.post('http://localhost:4000/api/games', newGame)
            if (response.data.success) {
                message('success', 'Partida guardada')
                setNewGame({ players: [], winnerColor: '' })
            } else {
                message('error', response.data.error)
            }
        } catch (error) {
            message('error', error.message)
        }
    }

    const getWeather = async () => {
        try {
            let response = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/60449?apikey=14A2YVwlmMm7UGT4emqoLMAVtejUAvzZ&details=false`)
            let tomorrowTemp = (response.data.DailyForecasts[2].Temperature.Maximum.Value - 32) / 1.8
            let afterTomorrowTemp = (response.data.DailyForecasts[3].Temperature.Maximum.Value - 32) / 1.8
            if (tomorrowTemp > 20 && afterTomorrowTemp > 20) {
                setConservativeBet(true)
            }
        } catch (error) {
            message('error', error.message)
        }
    }

    useEffect(() => {
        getWeather()
    }, [])

    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const getColor = () => {
        let number = randomNumber(1, 100)
        let chosenColor = ''
        if (number <= 2) {
            chosenColor = 'green'
        } else if (number <= 51) {
            chosenColor = 'red'
        } else {
            chosenColor = 'black'
        }
        return chosenColor
    }

    const bet = (user, winnerColor) => {
        let betCash = user.cash >= 1000 ? conservativeBet ? randomNumber(3, 7) * user.cash : randomNumber(8, 15) : user.cash
        let betColor = getColor()
        if (betColor === winnerColor) {
            setNewGame({
                winnerColor,
                players: [...newGame.players, { playerId: user._id, bet: betCash, winner: true }]
            })
        } else {
            setNewGame({
                winnerColor,
                players: [...newGame.players, { playerId: user._id, bet: betCash, winner: false }]
            })
        }
    }

    useEffect(() => {
        if (time === 0) {
            let chosenColor = getColor()
            players.map(player => bet(player, chosenColor))
            // createGame()
        }
    }, [time])


    setTimeout(() => {
        if (time === 0) {
            setTime(5)
        } else {
            setTime(time - 1)
        }
    }, 1000)

    return (
        <div className="temp">
            <h1>Próxima ronda dentro de {formattedTime}</h1>
        </div>
    )
}

export default Temp