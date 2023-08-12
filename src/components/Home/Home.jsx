import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import datiTabella from "../../data/brawl_data.json";
import brawlers from "../../data/brawler_list.json";
import gadgets from "../../data/gadgets_list.json";
import maps from "../../data/mods_maps_list.json";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
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

  async function deleteRow(numeroRiga) {
    await fetch("http://localhost:5000/api/delete_row", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "no-cors",
      body: JSON.stringify(numeroRiga),
    });
  }

  console.log("ciao");

  return (
    <>
      <h1>Hey from HomePage</h1>
      <p>Eccoci sul sitello di Brawl Stars dei mu!</p>
      {Object.keys(datiTabella).length > 0 && (
        <TableContainer>
          <Table
            sx={{ margin: "20px", width: "97%" }}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                {Object.keys(datiTabella[0])?.map((column) => (
                  <StyledTableCell>{column}</StyledTableCell>
                ))}
                <StyledTableCell>Elimina</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableCell
                colSpan={6}
                align="center"
                sx={{ verticalAlign: "middle" }}
                onClick={handleClickOpen}
              >
                <div className="addRow" style={{ cursor: "pointer" }}>
                  <AddIcon sx={{ color: "#3B747D" }} />
                  <Typography
                    variant="h6"
                    sx={{ display: "inline", color: "#3B747D" }}
                  >
                    Aggiungi
                  </Typography>
                </div>
              </StyledTableCell>
              {Object.keys(datiTabella)?.map((column) => (
                <StyledTableRow key={column}>
                  {Object.values(datiTabella[column]).map((row) => (
                    <StyledTableCell component="td" key={row}>
                      {row}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell component="td">
                    <DeleteIcon
                      sx={{ color: "#3B747D" }}
                      onClick={() => {
                        deleteRow(column.toString());
                      }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              <StyledTableRow></StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
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
