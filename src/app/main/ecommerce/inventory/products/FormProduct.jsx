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

  const handleKeyPress = (e) => {
    const keyCode = e.which || e.keyCode
    const isNumber = (keyCode >= 48 && keyCode <= 57) 
    const isControlKey = [8, 9, 13, 27, 37, 39].includes(keyCode)
    if (!(isNumber || isControlKey)) {
      e.preventDefault()
    }
  }

  var nuevo = ''
  if(form.prodId !== null) {
    const url = `https://sismova.tech/backsis/public/images/${form.prodImage}`
    const palabraBuscada = "blob"
    nuevo = encontrarPalabraEnTexto(url, palabraBuscada)
  }
  
  return (
    <DialogContent className='ctn-info-product'>
      <div className="form-product">
        <div className='ctn-image-form' style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div margin="dense" sx={{ m:1, width: '20ch' }} className="form-image" onClick={() => document.querySelector('.input-field').click()}>
            <input
              type="file"
              accept="image/*"
              name="prodImage"
              className="input-field"
              hidden
              onChange={(e) => {
                const selectedFile = e.target.files[0]
                console.log(selectedFile)
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
          <FormControl className='tf-input tf-category-1' margin="dense" fullWidth>
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
          <div className="ctn-box-active">
            <div className="tf-input tf-state-1">
              Estado:
              <label className="switch">
                <input
                  type="checkbox" 
                  name='prodState'
                  checked={form.prodState}
                  onChange={handleChange}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="tf-input tf-webhome-1">
              Activo en web:
              <label className="switch">
                <input
                  type="checkbox" 
                  name='prodWebHome'
                  checked={form.prodWebHome}
                  onChange={handleChange}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="ctn-inputs-form">
          <TextField
            autoFocus
            margin="dense"
            id="outlined-Required"
            variant="outlined"
            label="Nombre del producto"
            type="text"
            fullWidth
            name='prodName'
            value={form.prodName}
            onChange={handleChange}
            className='tf-input tf-name'
          />
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
            className='tf-input tf-code'
          />
          <TextField
            margin="dense"
            id="outlined-basic"
            label="Stock"
            type="number"
            onKeyPress={handleKeyPress}
            variant="outlined"
            sx={{ width: '19ch' }}
            name='prodStock'
            value={form.prodStock}
            onChange={handleChange}
            className='tf-input'
          />
          <TextField
            margin="dense"
            label="Precio costo"
            type="number"
            onKeyPress={handleKeyPress}
            id="outlined-start-adornment"
            sx={{ width: '19ch' }}
            InputProps={{
              startAdornment: <InputAdornment position="start">S/.</InputAdornment>,
            }}
            name='prodPurchasePrice'
            value={form.prodPurchasePrice}
            onChange={handleChange}
            className='tf-input tf-purp'
          />
          <TextField
            margin="dense"
            label="Precio venta"
            type="number"
            onKeyPress={handleKeyPress}
            id="outlined-start-adornment"
            sx={{ width: '19ch' }}
            InputProps={{
              startAdornment: <InputAdornment position="start">S/.</InputAdornment>,
            }}
            name='prodSalePrice'
            value={form.prodSalePrice}
            onChange={handleChange}
            className='tf-input tf-salep'
          />
          <TextField
            margin="dense"
            label="Ancho"
            type="number"
            onKeyPress={handleKeyPress}
            id="outlined-start-adornment"
            sx={{ width: '19ch' }}
            InputProps={{
              startAdornment: <InputAdornment position="start">m</InputAdornment>,
            }}
            name='prodWidth'
            value={form.prodWidth}
            onChange={handleChange}
            className='tf-input tf-salep'
          />
          <TextField
            margin="dense"
            label="Alto"
            type="number"
            onKeyPress={handleKeyPress}
            id="outlined-start-adornment"
            sx={{ width: '19ch' }}
            InputProps={{
              startAdornment: <InputAdornment position="start">m</InputAdornment>,
            }}
            name='prodHeight'
            value={form.prodHeight}
            onChange={handleChange}
            className='tf-input tf-salep'
          />
          <TextField
            margin="dense"
            label="Largo"
            type="number"
            onKeyPress={handleKeyPress}
            id="outlined-start-adornment"
            sx={{ width: '19ch' }}
            InputProps={{
              startAdornment: <InputAdornment position="start">m</InputAdornment>,
            }}
            name='prodLong'
            value={form.prodLong}
            onChange={handleChange}
            className='tf-input tf-salep'
          />
          <TextField
            margin="dense"
            label="Peso"
            type="number"
            onKeyPress={handleKeyPress}
            id="outlined-start-adornment"
            sx={{ width: '19ch' }}
            InputProps={{
              startAdornment: <InputAdornment position="start">kg</InputAdornment>,
            }}
            name='prodWeight'
            value={form.prodWeight}
            onChange={handleChange}
            className='tf-input tf-salep'
          />
          <FormControl className='tf-input tf-category' margin="dense" fullWidth>
            <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name='CategoryId'
              value={form.CategoryId}
              label="Categoría"
              onChange={handleChange}
              className='select-category'
            >
              {data.map((n) => (
                <MenuItem key={n.cateId} value={n.cateId}>{n.cateName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="tf-input tf-state">
            Estado:
            <label className="switch">
              <input
                type="checkbox" 
                name='prodState'
                checked={form.prodState}
                onChange={handleChange}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="tf-input tf-webhome">
            Activo en web:
            <label className="switch">
              <input
                type="checkbox" 
                name='prodWebHome'
                checked={form.prodWebHome}
                onChange={handleChange}
              />
              <span className="slider"></span>
            </label>
          </div>
          <TextField
            margin="dense"
            id="outline-multiline-static"
            label="Descripción"
            type="text"
            multiline
            rows={14}
            fullWidth
            name='prodDescription'
            value={form.prodDescription}
            onChange={handleChange}
            className='tf-input tf-description'
          />
        </div>
      </div>
      <div className='ctn-buttons-form'>
        {
          form.prodId!==null ?
          <button className='btn-form btn-candel' onClick={() => handleClose(dataToEdit.prodId)}>Eliminar</button>
          :
          <button className='btn-form btn-candel' onClick={()=>handleClose(0)}>Cancelar</button>
        }
        <button className='btn-form btn-submit' onClick={handleSubmit}>Guardar</button>
      </div>
    </DialogContent>
  )
}

export default FormProduct