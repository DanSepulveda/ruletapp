import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ResultTable from "../components/ResultTable"
import { message } from "../components/Message"
import { connect } from "react-redux"
import gamesActions from "../redux/actions/gamesActions"
import { randomNumber, getColor } from "../components/Calc"

const Home = ({ games, newGameReq, players, createNewGame, getWeather, chosenPlayers, cleanGame }) => {
    const [start, setStart] = useState(false)
    const [conservativeBet, setConservativeBet] = useState(false)
    const [newGame, setNewGame] = useState({
        players: [],
        winnerColor: ''
    })

    const fetchWeather = async () => {
        try {
            let response = await getWeather()
            if (response.status === 200) {
                let tomorrowTemp = (response.data.DailyForecasts[2].Temperature.Maximum.Value - 32) / 1.8
                let afterTomorrowTemp = (response.data.DailyForecasts[3].Temperature.Maximum.Value - 32) / 1.8
                if (tomorrowTemp > 20 && afterTomorrowTemp > 20) {
                    setConservativeBet(true)
                } else {
                    setConservativeBet(false)
                }
            } else {
                throw new Error('Problemas para obtener el clima. Intente más tarde.')
            }
        } catch (error) {
            message('error', error.message)
        }
    }

    useEffect(() => {
        document.title = "RuletApp - Inicio"
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const bet = (winnerColor) => {
        let players = []
        chosenPlayers.map(user => {
            let betCash = user.cash >= 1000 ? conservativeBet ? randomNumber(3, 7) : randomNumber(8, 15) : 100
            betCash = Math.round(betCash * user.cash / 100)
            let betColor = getColor()
            let winner = betColor === winnerColor ? true : false
            let lostOrProfit
            if (winnerColor === "Verde" && winner) {
                lostOrProfit = betCash * 15
            } else if (winner) {
                lostOrProfit = betCash * 2
            } else {
                lostOrProfit = -1 * betCash
            }
            let data = {
                playerId: user._id,
                betColor,
                previousCash: user.cash,
                bet: betCash,
                winner,
                lostOrProfit,
                newCash: user.cash + lostOrProfit
            }
            // let data = { playerId: user._id, bet: betCash, winner: betColor === winnerColor ? true : false }
            players.push(data)
        })
        setNewGame({
            winnerColor,
            players
        })
    }

    useEffect(() => {
        setNewGame({ players: [], winnerColor: '' })
        fetchWeather()
        let chosenColor = getColor()
        bet(chosenColor)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chosenPlayers, cleanGame])

    const createGame = async () => {
        try {
            let response = await createNewGame(newGame)
            if (response.data.success) {
                message('success', 'Partida guardada.')
            } else {
                message('error', response.data.error)
            }
        } catch (error) {
            message('error', error.message)
        }
    }

    useEffect(() => {
        if (start) {
            // createGame()
        } else {
            setStart(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newGameReq])

    return (
        <main className="mainContainer">
            <Link to='/jugadores' className="startButton"><span>Ver jugadores</span></Link>
            <h2 className="results">Resultados</h2>
            {games.map(game => <ResultTable key={game._id} game={game} />)}
        </main>
    )
}

const mapStateToProps = state => {
    return {
        games: state.games.games,
        newGameReq: state.games.newGameReq,
        players: state.players.players,
        chosenPlayers: state.players.chosenPlayers,
        cleanGame: state.games.cleanGame
    }
}

const mapDispatchToProps = {
    createNewGame: gamesActions.createNewGame,
    getWeather: gamesActions.getWeather
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)