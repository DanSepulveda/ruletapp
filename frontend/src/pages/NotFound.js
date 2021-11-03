import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="notFound">
            <h2>esta página no existe</h2>
            <Link to="/" className="startButton">Volver a Inicio</Link>
        </div>
    )
}
export default NotFound