import { Navbar } from "../../components/Navbar/Navbar"
import {useState, useEffect, ChangeEvent} from "react"
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
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handlePage = (_:any, newPage: number) => {
        setPage(newPage)
    }

    const handleRowsPerPage = (e: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(Number(e.target.value))
        setPage(0)
    }
    
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
            },
            {
                id: "124",
                state: "state",
                subject: "1234",
                department: "1423",
                createdAt,
                updatedAt
            },
            {
                id: "1244",
                state: "sta4te",
                subject: "12344",
                department: "14423",
                createdAt,
                updatedAt
            },
            {
                id: "12442",
                state: "sta4te",
                subject: "12344",
                department: "14423",
                createdAt,
                updatedAt
            },
            {
                id: "12r442",
                state: "sta4te",
                subject: "12344",
                department: "14423",
                createdAt,
                updatedAt
            },
            {
                id: "1244fg2",
                state: "sta4te",
                subject: "12344",
                department: "14423",
                createdAt,
                updatedAt
            },
            {
                id: "1244fewg2",
                state: "sta4te",
                subject: "12344",
                department: "14423",
                createdAt,
                updatedAt
            },
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
                            Filtros
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