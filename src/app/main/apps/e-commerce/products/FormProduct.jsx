import { DialogContent, DialogActions, Button, TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'

const FormProduct = (props) => {
  const {form,generatedCode,handleChange,image,setImage,fileName,setFileName,data,handleSubmit,setForm,dataToEdit,handleClose} = props

  const encontrarPalabraEnTexto = (texto, palabra) => {
    const textoMin = texto.toLowerCase()
    const palabraMin = palabra.toLowerCase()
    if (textoMin.includes(palabraMin)) {
      const posicionPalabra = textoMin.indexOf(palabraMin)
      if (posicionPalabra !== -1) {
        return textoMin.substring(posicionPalabra)
      } else {
        return textoMin
      }
    } else {
      return texto
    }
  }

  var nuevo = ''
  if(form.prodId !== null) {
    const url = `https://sismova.tech/backsis/public/images/${form.prodImage}`
    const palabraBuscada = "blob"
    nuevo = encontrarPalabraEnTexto(url, palabraBuscada)
  }
  return (
    <DialogContent>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <FormControl sx={{ width: '40ch' }} className='fc-input-t'>
          <TextField
            disabled
            margin="dense"
            id="outlined-disabled"
            sx={{ width: '19ch' }}
            type="text"
            label="Código"
            name='prodCode'
            value={generatedCode || form.prodCode}
            onChange={handleChange}
            className='tf-code'
          />
          <TextField
            margin="dense"
            id="outlined-basic"
            label="Stock"
            type="number"
            variant="outlined"
            sx={{ width: '19ch' }}
            name='prodStock'
            value={form.prodStock}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Precio costo"
            id="outlined-start-adornment"
            sx={{ width: '19ch' }}
            InputProps={{
              startAdornment: <InputAdornment position="start">S/.</InputAdornment>,
            }}
            name='prodPurchasePrice'
            value={form.prodPurchasePrice}
            onChange={handleChange}
            className='tf-purp'
          />
          <TextField
            margin="dense"
            label="Precio venta"
            id="outlined-start-adornment"
            sx={{ width: '19ch' }}
            InputProps={{
              startAdornment: <InputAdornment position="start">S/.</InputAdornment>,
            }}
            name='prodSalePrice'
            value={form.prodSalePrice}
            onChange={handleChange}
            className='tf-salep'
          />
          <TextField
            autoFocus
            margin="dense"
            id="outlined-Required"
            variant="outlined"
            label="Nombre del producto"
            type="text"
            className='tf-name'
            fullWidth
            name='prodName'
            value={form.prodName}
            onChange={handleChange}
          />
        </FormControl>
        <div margin="dense" sx={{ m:1, width: '20ch' }} className="form-image" onClick={() => document.querySelector('.input-field').click()}>
          <input
            type="file"
            accept="image/*"
            name="prodImage"
            className="input-field"
            hidden
            onChange={(e) => {
              const selectedFile = e.target.files[0]
              if (selectedFile) {
                setFileName(selectedFile)
                setImage(URL.createObjectURL(selectedFile))
                setForm({
                  ...form,
                  prodImage: selectedFile,
                })
              }
            }}
          />
          {
          image ? (
            <img src={image} width={350} height={350} alt={fileName} />
          ) : form.prodId !== null ? 
            <img src={nuevo} width={350} height={350} /> :
            <>
              <FuseSvgIcon className="text-48" size={24} color="action">
                material-outline:
              </FuseSvgIcon>
              <p>{fileName}</p>
            </>
          }
        </div>
      </div>
      <TextField
        margin="dense"
        id="outline-multiline-static"
        label="Descripción"
        type="text"
        multiline
        rows={6}
        fullWidth
        name='prodDescription'
        value={form.prodDescription}
        onChange={handleChange}
      />
      <FormControl margin="dense" sx={{ width: '20ch' }}>
        <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name='CategoryId'
          value={form.CategoryId}
          label="Categoría"
          onChange={handleChange}
        >
          {data.map((n) => (
            <MenuItem key={n.cateId} value={n.cateId}>{n.cateName}</MenuItem>
          ))}
        </Select>
      </FormControl>
      Estado:
      <label className="switch">
        <input
          type="checkbox" 
          name='prodState'
          // value={form.prodState}
          checked={form.prodState}
          onChange={handleChange}
        />
        <span className="slider"></span>
      </label>
      <DialogActions>
        {form.prodId!==null ? <Button onClick={() => handleClose(dataToEdit.prodId)}>Eliminar</Button> : <Button onClick={()=>handleClose(0)}>Cancelar</Button>}
        <button onClick={handleSubmit}>Guardar</button>
      </DialogActions>
    </DialogContent>
  )
}

export default FormProduct
