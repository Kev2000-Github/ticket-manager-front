import { Navbar } from "../../components/Navbar/Navbar"
import {useState, useEffect} from "react"
import { CustomizedTable } from "../../components/Table/Table"
import './index.scss'

export type ticket = {
    id: string,
    state: string,
    subject: string,
    department: string,
    createdAt: Date,
    updatedAt: Date
}

export const SearchTickets = () => {
    const[tickets, setTickets] = useState<Array<ticket>>([])

    useEffect(() => {
        const createdAt = new Date()
        const updatedAt = new Date()
        const data = [
            {
                id: "123",
                state: "state",
                subject: "123",
                department: "123",
                createdAt,
                updatedAt
            }
        ]
        setTickets(data)
    },[])

    return (
        <div className="SearchTicketsBody">
            <Navbar/>
            <div className="SearchTickets">
                <div className="Container">
                    <div className="header">
                        <p>
                            Mostrando 1 - 3 de 3 Tickets
                        </p>
                        <div className="buttonRow">
                            <button className="themedButton">
                                Abiertos
                            </button>
                            <button className="themedButton">
                                Cerrados
                            </button>
                            <button className="themedButton">
                                Refrescar
                            </button>
                        </div>
                    </div>
                    <div className="body">
                        <CustomizedTable rows={tickets}/>
                    </div>
                </div>
            </div>
        </div>
    )
}