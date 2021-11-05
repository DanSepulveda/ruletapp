import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ResultTable from "../components/ResultTable"
import { message } from "../components/Message"
import { connect } from "react-redux"
import gamesActions from "../redux/actions/gamesActions"
import { randomNumber, getColor, percentPerColor } from "../components/Calc"
import { MdPerson } from 'react-icons/md'
import { IoMdMoon } from 'react-icons/io'
import playersActions from "../redux/actions/playersActions"
import Swal from "sweetalert2"

const Home = ({ games, newGameReq, createNewGame, getWeather, chosenPlayers, cleanGame, addCash }) => {
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
        window.scrollTo(0, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const bet = (winnerColor) => {
        let players = []
        chosenPlayers.map(user => {
            let betCash = user.cash > 1000 ? conservativeBet ? randomNumber(3, 7) : randomNumber(8, 15) : 100
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
            players.push(data)
            return true
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
            createGame()
        } else {
            setStart(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newGameReq])

    const confirmation = () => {
        Swal.fire({
            title: '¿Desea finalizar el día?',
            text: "Todos los jugadores recibirán $10.000",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const updateUsers = async () => {
                    try {
                        let response = await addCash()
                        let messageToShow
                        if (response.data.success) {
                            messageToShow = ['Completado', 'Todos los jugadores recibieron $10.000', 'success']
                        } else {
                            messageToShow = ['Ocurrió un problema', 'Intente más tarde', 'error']
                        }
                        Swal.fire(messageToShow[0], messageToShow[1], messageToShow[2])
                    } catch (error) {
                        Swal.fire('Ocurrió un problema', 'Intente más tarde', 'error')
                    }
                }
                updateUsers()
            }
        })

    }

    return (
        <main className="mainContainer">
            <div className="buttonSection">
                <Link to='/jugadores' className="startButton"><span className="buttonContent"><MdPerson /> Ver jugadores</span></Link>
                <span className="buttonContent startButton" onClick={confirmation}><IoMdMoon /> Finalizar Día</span>
            </div>
            <div className="resumeContainer">
                <h3>Porcentaje de Verde: {percentPerColor(games, 'Verde')}%</h3>
                <h3>Porcentaje de Negro: {percentPerColor(games, 'Negro')}%</h3>
                <h3>Porcentaje de Rojo: {percentPerColor(games, 'Rojo')}%</h3>
            </div>
            <h1 className="results">Resultados</h1>
            {[...games].reverse().map((game, index) => <ResultTable key={game._id} game={game} length={games.length} index={index} />)}
        </main>
    )
}

const mapStateToProps = state => {
    return {
        games: state.games.games,
        newGameReq: state.games.newGameReq,
        players: state.players.players,
        chosenPlayers: state.players.chosenPlayers,
        cleanGame: state.games.cleanGame,
    }
}

const mapDispatchToProps = {
    createNewGame: gamesActions.createNewGame,
    getWeather: gamesActions.getWeather,
    addCash: playersActions.addCash
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)