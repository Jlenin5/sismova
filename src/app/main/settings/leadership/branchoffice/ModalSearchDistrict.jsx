import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useEffect, useState } from 'react';

const url = 'https://sismova.tech/backsis/public/api/';

const ModalSearchDistrict = ({ onClose, open }) => {
  const [dep, setDep] = useState([]);
  const [prov, setProv] = useState([]);
  const [dist, setDist] = useState([]);
  const [filteredProv, setFilteredProv] = useState([]);
  const [filteredDist, setFilteredDist] = useState([]);
  const [selectedDep, setSelectedDep] = useState(null);

  const getDepartments = async () => {
    const response = await axios.get(url + 'dep');
    setDep(response.data);
  };

  const getProvinces = async () => {
    const response = await axios.get(url + 'prov');
    setProv(response.data);
  };

  const getDistricts = async () => {
    const response = await axios.get(url + 'dis');
    setDist(response.data);
  };

  const filterProv = (event, value) => {
    if(value !== null) {
      const filteredProvinces = value ? prov.filter((r) => r.Department === value.id) : [];
      setFilteredProv(filteredProvinces);
      setFilteredDist([]);
    } else {
      setFilteredProv([]);
      setFilteredDist([]);
    }
  };

  const filterDist = (event, value) => {
    if(value !== null) {
      const filteredDistricts = dist.filter((r) => r.Province === value.id);
      setFilteredDist(filteredDistricts);
    } else {
      setFilteredDist([]);
    }
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    getProvinces();
    getDepartments();
    getDistricts();
  }, []);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogContent>
        <Autocomplete
          freeSolo
          id="combo-box-department"
          options={dep}
          getOptionLabel={(option) => option.depName}
          onChange={filterProv}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Buscar Departamento" />
          )}
        />
        <Autocomplete
          freeSolo
          id="combo-box-province"
          options={filteredProv}
          getOptionLabel={(option) => option.provName}
          onChange={filterDist}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Buscar Provincia" />
          )}
        />
        <Autocomplete
          freeSolo
          id="combo-box-district"
          options={filteredDist.map((option) => option.disName)}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Buscar Distrito" />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleClose}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalSearchDistrict;