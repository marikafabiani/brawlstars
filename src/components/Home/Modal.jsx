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

export default function Modal({ setOpen, open }) {
  //   const handleChange = (event: SelectChangeEvent) => {
  //     setAge(event.target.value);
  //   };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Aggiungi riga"}</DialogTitle>
      <DialogContent>
        <Box sx={{ minWidth: 120, m: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Brawler</InputLabel>
            <Select
              labelId="brawler"
              id="brawler"
              //   onChange={handleChange}
              label="Brawler"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="modalità">Modalità</InputLabel>
            <Select
              labelId="modalità"
              id="demo-simple-select"
              label="Modalità"
              //   onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="mappa">Mappa</InputLabel>
            <Select
              labelId="mappa"
              id="demo-simple-select"
              label="Mappa"
              //   onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="gadget">Gadget</InputLabel>
            <Select
              labelId="gadget"
              id="demo-simple-select"
              label="Gadget"
              //   onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="abilità">Abilità stellare</InputLabel>
            <Select
              labelId="abilità"
              id="demo-simple-select"
              label="Abilità stellare"
              //   onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="coppia">Coppia</InputLabel>
            <Select
              labelId="coppia"
              id="demo-simple-select"
              label="Coppia"
              //   onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Chiudi</Button>
        <Button onClick={handleClose} autoFocus>
          Aggiungi
        </Button>
      </DialogActions>
    </Dialog>
  );
}
