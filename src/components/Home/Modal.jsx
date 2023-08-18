import {
  DialogContent,
  DialogTitle,
  Dialog,
  DialogActions,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Box,
} from "@mui/material";
import host from '../../constant'
import { useEffect, useState } from "react";

export default function Modal({ setOpen, open, brawlers, maps, getData }) {
  const [nameBrawler, setNameBrawler] = useState("");
  const [gadget, setGadget] = useState("");
  const [abilita, setAbilita] = useState("");
  const [mappa, setMappa] = useState("");
  const [modalita, setModalita] = useState("");
  const [coppia, setCoppia] = useState("");
  const [nuovaRiga, setNuovaRiga] = useState({});

  const handleBrawler = (event) => {
    setNameBrawler(event.target.value);
  };
  const handleGadget = (event) => {
    setGadget(event.target.value);
  };
  const handleAbilita = (event) => {
    setAbilita(event.target.value);
  };
  const handleMappa = (event) => {
    setMappa(event.target.value);
  };
  const handleModalita = (event) => {
    setModalita(event.target.value);
  };
  const handleCoppia = (event) => {
    setCoppia(event.target.value);
  };

  const resetModal = () => {
    setNameBrawler("");
    setAbilita("");
    setMappa("");
    setModalita("");
    setGadget("");
    setCoppia("");
  };

  const handleClose = () => {
    resetModal();
    setOpen(false);
  };

  useEffect(() => {
    setNuovaRiga({
      Brawler: nameBrawler,
      Modalita: modalita,
      Mappa: mappa,
      Gadget: gadget,
      "Abilita stellare": abilita,
      Coppia: coppia,
    });
  }, [nameBrawler, modalita, mappa, gadget, abilita, coppia]);

  async function addNewRow() {
    await fetch(`${host}add_row`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuovaRiga),
    });
    resetModal();
    getData();
  }

  return (
    brawlers &&
    maps && (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Aggiungi riga"}</DialogTitle>
        <DialogContent>
          <Box sx={{ minWidth: 200, m: 1, width: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Brawler</InputLabel>
              <Select
                labelId="brawler"
                id="brawler"
                value={nameBrawler}
                onChange={handleBrawler}
                label="Brawler"
                defaultValue=""
              >
                {Object.keys(brawlers.id)?.map((b) => (
                  <MenuItem key={b} value={b}>{b}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="modalità">Modalità</InputLabel>
              <Select
                labelId="modalità"
                id="demo-simple-select"
                label="Modalità"
                onChange={handleModalita}
                value={modalita}
              >
                {Object.keys(maps.name)?.map((m) => (
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="mappa">Mappa</InputLabel>
              <Select
                labelId="mappa"
                id="demo-simple-select"
                label="Mappa"
                onChange={handleMappa}
                value={mappa}
                disabled={!modalita}
              >
                {maps.name[modalita]?.map((m) => (
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {brawlers && (
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="gadget">Gadget</InputLabel>
                <Select
                  disabled={!nameBrawler}
                  labelId="gadget"
                  id="demo-simple-select"
                  label="Gadget"
                  value={gadget}
                  onChange={handleGadget}
                >
                  {brawlers.gadget[nameBrawler]?.split(",").map((g) => (
                    <MenuItem key={g} value={g.trim()}>{g}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="abilità">Abilità stellare</InputLabel>
              <Select
                disabled={!nameBrawler}
                labelId="abilità"
                id="demo-simple-select"
                label="Abilità stellare"
                onChange={handleAbilita}
                value={abilita}
              >
                {brawlers.starPowers[nameBrawler]?.split(",").length > 0 &&
                  brawlers.starPowers[nameBrawler]
                    ?.split(",")
                    .map((a) => <MenuItem key={a} value={a.trim()}>{a}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="coppia">Coppia</InputLabel>
              <Select
                labelId="coppia"
                id="demo-simple-select"
                label="Coppia"
                onChange={handleCoppia}
                value={coppia}
              >
                {Object.keys(brawlers.id)
                  .filter((b) => b !== nameBrawler)
                  ?.map((b) => (
                    <MenuItem key={b} value={b}>{b}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Chiudi</Button>
          <Button onClick={addNewRow} autoFocus>
            Aggiungi
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
}
