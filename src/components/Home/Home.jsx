import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import brawls from "../../brawl_data.json";
import brawlers from "../../brawlers_list.json";
import gadgets from "../../gadgets_list.json";
import maps from "../../maps_list.json";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import "./styles.css";
import { TableHead, Typography } from "@mui/material";
import Modal from "./Modal";

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
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

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
                {Object.values(brawls[column]).map((row, index) => (
                  <StyledTableCell component="td" key={index}>
                    {row}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
            <StyledTableRow>
              <StyledTableCell
                colSpan={6}
                align="center"
                sx={{ verticalAlign: "middle" }}
                onClick={handleClickOpen}
              >
                <div className="addRow" style={{ cursor: "pointer" }}>
                  <AddIcon color="primary" />
                  <Typography
                    variant="h6"
                    sx={{ display: "inline" }}
                    color="primary"
                  >
                    Aggiungi
                  </Typography>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        setOpen={setOpen}
        open={open}
        brawlers={brawlers}
        gadgets={gadgets}
        maps={maps}
      />
    </>
  );
}
