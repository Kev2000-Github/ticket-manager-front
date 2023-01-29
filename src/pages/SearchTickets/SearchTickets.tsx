import { Navbar } from "../../components/Navbar/Navbar"
import {useState, useEffect, ChangeEvent} from "react"
import { CustomizedTable } from "../../components/Table/Table"
import './index.scss'
import { sendRequest } from "../../utils"
import { config } from "../../config"

export type ticket = {
    id: string,
    state: string,
    subject: string,
    department: string,
    createdAt: Date,
    updatedAt: Date
}

const filterOpen = "?state=2"
const filterClose = "?state=1"

export const SearchTickets = () => {
    const[tickets, setTickets] = useState<Array<ticket>>([])
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(5)
    const [filter, setFilter] = useState<string>("")
    useEffect(() => {
        getTickets()
    },[filter])

    const getTickets = async () => {
        const link = `${config.BACK_URL}/ticket${filter}`
        const tickets = await sendRequest.GET(link)
        if(tickets){
            const ticketsParsed = tickets.map(ticket => {
                const ticketParsed = {
                    id: `${ticket.id}`,
                    state: ticket.state.name,
                    subject: ticket.subject,
                    department: ticket.department.name,
                    createdAt: new Date(ticket.created_at),
                    updatedAt: new Date(ticket.updated_at)
                }
                return ticketParsed
            })
            setTickets(ticketsParsed)
        }
    }

    const handlePage = (_:any, newPage: number) => {
        setPage(newPage)
    }

    const handleRowsPerPage = (e: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(Number(e.target.value))
        setPage(0)
    }

    const handleFilter = (e:React.MouseEvent<HTMLElement>) => {
        //@ts-ignore
        const filterString = `?state=${e.target.name}`
        const newFilter = filter === filterString ? "" : filterString
        setFilter(newFilter)
    }

    return (
        <div className="SearchTicketsBody">
            <Navbar/>
            <div className="SearchTickets">
                <div className="Container">
                    <div className="header">
                        <p>
                            Filtros
                        </p>
                        <div className="buttonRow">
                            <button 
                                name="1"
                                className="themedButton"
                                onClick={handleFilter}>
                                Abiertos
                            </button>
                            <button
                                name="2"
                                className="themedButton"
                                onClick={handleFilter}>
                                Cerrados
                            </button>
                            <button
                                className="themedButton"
                                onClick={() => getTickets()}>
                                Refrescar
                            </button>
                        </div>
                    </div>
                    <div className="body">
                        <CustomizedTable 
                            rows={tickets}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            handlePage={handlePage}
                            handleRowsPerPage={handleRowsPerPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}