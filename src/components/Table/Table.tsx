import { Paper, styled, Table, TableBody, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import TableCell, { tableCellClasses }  from '@mui/material/TableCell'
import { ticket } from "../../pages/SearchTickets/SearchTickets";
import { getDate, getHour } from "../../utils";

interface Props {
    rows: Array<ticket>
}

export function CustomizedTable({
    rows
}:Props) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Ticket #</StyledTableCell>
              <StyledTableCell align="right">Creado</StyledTableCell>
              <StyledTableCell align="right">Actualizado</StyledTableCell>
              <StyledTableCell align="right">Estado</StyledTableCell>
              <StyledTableCell align="right">Asunto</StyledTableCell>
              <StyledTableCell align="right">Departamento</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="right">{getDate(row.createdAt)}</StyledTableCell>
                <StyledTableCell align="right">{`${getDate(row.updatedAt)} - ${getHour(row.updatedAt)}`}</StyledTableCell>
                <StyledTableCell align="right">{row.state}</StyledTableCell>
                <StyledTableCell align="right">{row.subject}</StyledTableCell>
                <StyledTableCell align="right">{row.department}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                    colSpan={3}
                    count={rows.length}
                    rowsPerPage={5}
                    page={1}
                    SelectProps={{
                        inputProps: {
                            'aria-label': 'tickets por pagina'
                        },
                        native: true
                    }}
                    onPageChange={()=>{}}
                    onRowsPerPageChange={()=>{}}
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
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));