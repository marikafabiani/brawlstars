import React from "react";
import { styled } from "@mui/material/styles";
import brawls from "../../brawl_data.json";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import "./styles.css";
import { TableHead } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3B747D",
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function HomePage() {
  return (
    <>
      <h1>Hey from HomePage</h1>
      <p>Eccoci sul sitello di Brawl Stars dei mu!</p>
      <TableContainer>
        <Table
          sx={{ margin: "20px", width: "97%" }}
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <TableRow>
              {Object.keys(brawls[0]).map((column) => (
                <StyledTableCell>{column}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(brawls).map((column) => (
              <StyledTableRow key={column}>
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
