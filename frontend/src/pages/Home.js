import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ResultTable from "../components/ResultTable"
import axios from 'axios'
import { message } from "../components/Message"
import { connect } from "react-redux"
import gamesActions from "../redux/actions/gamesActions"

const Home = ({ games, newGameReq, players, createNewGame, getWeather }) => {
    const fetchWeather = async () => {
        try {
            let response = await getWeather()
            if (response.status === 200) {
                let tomorrowTemp = (response.data.DailyForecasts[2].Temperature.Maximum.Value - 32) / 1.8
                let afterTomorrowTemp = (response.data.DailyForecasts[3].Temperature.Maximum.Value - 32) / 1.8
                console.log(tomorrowTemp, afterTomorrowTemp)
            } else {
                throw new Error('Problemas para obtener el clima. Intente más tarde.')
            }
        } catch (error) {
            message('error', error.message)
        }
    }

    useEffect(() => {
        document.title = "RuletApp - Inicio"
        fetchWeather()
    }, [])

    const createGame = async () => {
        try {
            let response = createNewGame()
            // setNewGame({ players: [], winnerColor: '' })
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
        console.log('hola')
    }, [newGameReq])



    return (
        <main className="mainContainer">
            <h2>Resultados</h2>
            {games.map((game, index) => <h1 key={index}>hola</h1>)}
            {/* {games.map(game => <ResultTable key={game._id} />)} */}
            {/* <Link to='/jugadores' className="startButton"><span>Comenzar</span></Link> */}
        </main>
    )
}

const mapStateToProps = state => {
    return {
        games: state.games.games,
        newGameReq: state.games.newGameReq,
        players: state.players.players,
    }
}

const mapDispatchToProps = {
    createGame: gamesActions.createNewGame,
    getWeather: gamesActions.getWeather
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)