import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="notFound">
            <img src='/assets/lost.png' alt='' style={{ width: '30%' }} />
            <h2 style={{ marginBottom: '2vh' }}>esta página no existe</h2>
            <Link to="/" className="startButton">Volver a Inicio</Link>
        </div>
    )
}
export default NotFound