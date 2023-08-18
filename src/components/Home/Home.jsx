import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import host from '../../constant'
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  
  async function deleteRow(numeroRiga) {
    setIsLoading(true);
    await fetch(`${host}delete_row`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(numeroRiga),
    });
    getTableData()
  }

  async function getTableData() {
    const response = await fetch(`${host}get_data`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setDatiTabella(data.data);
    setIsLoading(false);
  }

  async function getData() {
    const brawler = await fetch(`${host}brawler_list`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const responseBrawler = await brawler.json();
    setListBrawlers(responseBrawler);
    const maps = await fetch(`${host}mods_maps_list`, {
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
      <Typography variant="h3">Brawlmu</Typography>
      <Typography variant="body1">Questo è l'elenco dei brawler che hai salvato.</Typography>
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
              sx={{ margin: "20px", width: "98%" }}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  {Object.keys(datiTabella[0])?.map((column) => (
                    <StyledTableCell key={column}>{column}</StyledTableCell>
                  ))}
                  <StyledTableCell>Elimina</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              <StyledTableRow>
                <StyledTableCell
                  colSpan={7}
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
                </StyledTableRow>
                {Object.keys(datiTabella)?.map((column) => (
                  <StyledTableRow key={column}>
                    {Object.values(datiTabella[column]).map((row, index) => (
                      <StyledTableCell key={`${row}-${index}`}>
                        {row}
                      </StyledTableCell>
                    ))}
                    <StyledTableCell>
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
        getData={getTableData}
      />
    </>
  );
}
