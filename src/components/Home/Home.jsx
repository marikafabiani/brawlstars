import React from "react";
import { styled } from "@mui/material/styles";
import brawls from "../../brawl_data.json";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import "./styles.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function HomePage() {
  return (
    <>
      <h1>Hey from HomePage</h1>
      <p>Eccoci sul sitello di Brawl Stars dei mu!</p>
      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
            {Object.keys(brawls).map((column) => (
              <StyledTableRow key={column}>
                <StyledTableCell component="th" variant="head">
                  {column}
                </StyledTableCell>
                {Object.values(brawls[column]).map((row) => (
                  <StyledTableCell component="td">{row}</StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
