import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const ShippingTab = (props) => {
  const methods = useFormContext();
  const { control } = methods;

  return (
    <div>
      <div className="flex -mx-4">
        <Controller
          name="prodWidth"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              label="Anchura"
              autoFocus
              id="width"
              InputProps={{
                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
              }}
              type="text"
              onKeyPress={props.singleNumber}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          name="prodHeight"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              label="Altura"
              id="height"
              InputProps={{
                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
              }}
              type="text"
              onKeyPress={props.singleNumber}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          name="prodDepth"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              label="Profundidad"
              id="depth"
              InputProps={{
                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
              }}
              type="text"
              onKeyPress={props.singleNumber}
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>


      <div className="flex -mx-4">
        <Controller
          name="prodWeight"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              label="Peso"
              id="weight"
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              type="text"
              onKeyPress={props.singleNumber}
              variant="outlined"
              fullWidth
            />
          )}
        />
        
        <Controller
          name="prodState"
          control={control}
          render={({ field }) => (
            <FormControl className="mt-8 mx-4" fullWidth>
              <InputLabel id="prodState">Estado</InputLabel>
              <Select
                {...field}
                labelId="prodState"
                id="demo-simple-select"
                label="Estado"
              >
                <MenuItem value={1}>Activo</MenuItem>
                <MenuItem value={0}>Inactivo</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="prodWebHome"
          control={control}
          render={({ field }) => (
            <FormControl className="mt-8 mx-4" fullWidth>
              <InputLabel id="prodWebHome">Visibilidad en web</InputLabel>
              <Select
                {...field}
                labelId="prodWebHome"
                id="demo-simple-select"
                label="Visibilidad en web"
              >
                <MenuItem value={1}>Visible</MenuItem>
                <MenuItem value={0}>No visible</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      </div>

    </div>
  );
}

export default ShippingTab