import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles.css";
import { Box, CircularProgress, TableHead, Typography } from "@mui/material";
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
  const [datiTabella, setDatiTabella] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [listBrawlers, setListBrawlers] = useState();
  const [listMaps, setListMaps] = useState();
  const [listModalita, setListModalita] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  async function deleteRow(numeroRiga) {
    setIsLoading(true);
    await fetch("http://localhost:5000/api/v1/delete_row", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(numeroRiga),
    });
  }

  async function getTableData() {
    const response = await fetch("http://localhost:5000/api/v1/get_data", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setDatiTabella(data.data);
    setIsLoading(false);
  }

  async function getData() {
    const brawler = await fetch("http://localhost:5000/api/v1/brawler_list", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const responseBrawler = await brawler.json();
    setListBrawlers(responseBrawler);
    const maps = await fetch("http://localhost:5000/api/v1/mods_maps_list", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const responseMaps = await maps.json();
    setListMaps(responseMaps);
  }

  useEffect(() => {
    getTableData();
    getData();
  }, []);

  return (
    <>
      <h1>Hey from HomePage</h1>
      <p>Eccoci sul sitello di Brawl Stars dei mu!</p>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "300px",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        Object.keys(datiTabella).length > 0 && (
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
        )
      )}
      <Modal
        setOpen={setOpen}
        open={open}
        brawlers={listBrawlers}
        maps={listMaps}
      />
    </>
  );
}
