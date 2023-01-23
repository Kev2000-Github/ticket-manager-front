import { Link } from "react-router-dom"
import './index.scss'
import logo from '../../resources/logo-name.png'
export const Navbar = () => {
    return (
        <div className='navbar'>
            <img src={logo} alt="logo" className="navbarLogo" />
            <ul>
                <Link to={'/'}><li>Home</li></Link>
                <Link to={'ticket'}><li>Nuevo Ticket</li></Link>
                <Link to={'consult'}><li>Consultar Ticket</li></Link>
            </ul>
        </div>
    )
}