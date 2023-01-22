import { Link } from "react-router-dom"
import './index.scss'

export const Navbar = () => {
    return (
        <div className='navbar'>
            <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'ticket'}>Nuevo Ticket</Link></li>
            <li><Link to={'consult'}>Consultar Ticket</Link></li>
            </ul>
        </div>
    )
}