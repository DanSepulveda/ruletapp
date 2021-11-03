import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ResultTable from "../components/ResultTable"
import axios from 'axios'
import { message } from "../components/Message"

const Home = () => {
    const [games, setGames] = useState([])
    const [loader, setLoader] = useState(true)

    const getGames = async () => {
        try {
            let response = await axios.get('http://localhost:4000/api/games')
            if (response.data.success) {
                setGames(response.data.response)
            } else {
                message('error', response.data.error)
            }
        } catch (error) {
            message('error', error.message)
        }
        setLoader(false)
    }

    useEffect(() => {
        document.title = "RuletApp - Inicio"
    }, [])

    return (
        <main className="mainContainer">
            <h2>Resultados</h2>
            {games.map(game => <ResultTable key={game._id} />)}
            {/* <Link to='/jugadores' className="startButton"><span>Comenzar</span></Link> */}
        </main>
    )
}

export default Home