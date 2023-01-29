import { Paper, styled, Table, TableBody, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import TableCell, { tableCellClasses }  from '@mui/material/TableCell'
import { ChangeEvent } from "react";
import { ticket } from "../../pages/SearchTickets/SearchTickets";
import { getDate, getHour } from "../../utils";
import './index.scss'
interface Props {
    rows: Array<ticket>
    page: number,
    rowsPerPage: number,
    handlePage: (e:any, newPage: number) => void,
    handleRowsPerPage: (e: ChangeEvent<HTMLInputElement>) => void,
    ROWS_PER_PAGE?: Array<number>
}

export function CustomizedTable({
    rows,
    page,
    rowsPerPage,
    handlePage,
    handleRowsPerPage,
    ROWS_PER_PAGE = [5, 10, 25]
}:Props) {
    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length);


    return (
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Ticket #</StyledTableCell>
              <StyledTableCell align="center">Creado</StyledTableCell>
              <StyledTableCell align="center">Actualizado</StyledTableCell>
              <StyledTableCell align="center">Estado</StyledTableCell>
              <StyledTableCell align="center">Asunto</StyledTableCell>
              <StyledTableCell align="center">Departamento</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="center"><div className="tableCell">{getDate(row.createdAt)}</div></StyledTableCell>
                <StyledTableCell align="center"><div className="tableCell noWrap">{`${getDate(row.updatedAt)} - ${getHour(row.updatedAt)}`}</div></StyledTableCell>
                <StyledTableCell align="center"><div className="tableCell">{row.state}</div></StyledTableCell>
                <StyledTableCell align="center"><div className="tableCell noWrap">{row.subject}</div></StyledTableCell>
                <StyledTableCell align="center"><div className="tableCell">{row.department}</div></StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
                </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
                <TablePagination
                    rowsPerPageOptions={[...ROWS_PER_PAGE]}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handlePage}
                    onRowsPerPageChange={handleRowsPerPage}
                />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    );
  }
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  }));