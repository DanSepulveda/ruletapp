import { useEffect } from "react"
import { Link } from "react-router-dom"

const Home = () => {
    useEffect(() => {
        document.title = "RuletApp - Inicio"
    }, [])

    return (
        <main className="mainContainer">
            <h1>Bienvenido a RuletApp!!</h1>
            <img className="homeImage" src='/assets/ruleta.png' alt="Ruleta" />
            <Link to='/jugadores' className="startButton"><span>Comenzar</span></Link>
        </main>
    )
}

export default Home