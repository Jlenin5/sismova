import './company.scss'
import _ from '@lodash'
import withReducer from 'app/store/withReducer'
import reducer from '../store'
import { useDispatch } from 'react-redux';
import { DialogContent, DialogActions, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import { getCompany, putCompany } from '../store/CompanySlice'
import { useEffect, useState } from 'react';

const initialForm = {
  comId: null,
  comCode: '',
  comImage: '',
  comName: '',
  comRUC: '',
  comEmail: '',
  comAddress: '',
  comWebSite: '',
  comPhone: ''
}

function Index() {

  const dispatch = useDispatch()
  const [form, setForm] = useState(initialForm)
  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState("Seleccionar archivo")
  const [data,setData] = useState([])

  const updateData = (db, updateFile) => {
    // let newData = data.map((el) => (el.prodId === db.prodId ? db : el))
    // setData(newData)
    // console.log(updateFile)
    putCompany(db, updateFile)
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    if (name === 'comImage') {
      if (e.target.files[0]) {
        setFileName(e.target.files[0].name)
        setImage(URL.createObjectURL(e.target.files[0]))
      } else {
        setFileName('Archivo no seleccionado')
        setImage(URL.createObjectURL('https://sismova.tech/backsis/public/images/company/nocamera.png'))
      }
    }
    setForm({
      ...form,
      [name]: value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!form.comName) {
      alert("Datos incompletos")
      return
    }
    if(form.comId===null) {
      form.comImage = image
      const formData = new FormData()
      formData.append('comImage', fileName)
      for(const key in form) {
        formData.append(key, form[key])
      }
      // createData(formData, form)
    } else {
      var updateFile = ''
      if(fileName === 'Seleccionar archivo') {
        form.comImage = data[0].comImage
      } else {
        form.comImage = image
        updateFile = fileName
      }
      updateData(form, updateFile)
    }
  }

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

  useEffect(() => {
    dispatch(getCompany())
    .then((response) => {
      setData(response.payload)
    })
  }, [dispatch])

  useEffect(() => {
    if(data && data.length > 0) {
      const updatedDataToEdit = {
        ...data[0],
        comImage: data[0].comImage || 'nocamera.png',
        comWebSite: data[0].comWebSite || '',
      }
      setForm(updatedDataToEdit)
    } else {
      setForm(initialForm)
    }
  }, [data])

  var nuevo = ''
  if(form.comId !== null) {
    const url = `https://sismova.tech/backsis/public/images/company/${form.comImage}`
    const palabraBuscada = "blob"
    nuevo = encontrarPalabraEnTexto(url, palabraBuscada)
  }
  
  return (
    data.map((n) => (
        <div className="ctn-g-company inline-block p-24 sm:p-40 text-left print:p-0 w-full" key={n.comId}>
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ bounceDamping: 0 }}
          >
            <div className="card-content">
              <div className="card-box-company">
                <div className="card-ctn-left">
                  <TextField
                    disabled
                    margin="dense"
                    id="outlined-Required"
                    variant="outlined"
                    label="Código"
                    type="text"
                    className='tf-input tf-code'
                    name='comCode'
                    sx={{ width: '20ch' }}
                    value={form ? form.comCode : ''}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    id="outlined-Required"
                    variant="outlined"
                    label="R.U.C."
                    type="text"
                    className='tf-input tf-ruc'
                    name='comRUC'
                    sx={{ width: '20ch' }}
                    value={form ? form.comRUC : ''}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    id="outlined-Required"
                    variant="outlined"
                    label="Celular"
                    type="text"
                    className='tf-input tf-phone'
                    name='comPhone'
                    sx={{ width: '20ch' }}
                    value={form ? form.comPhone : ''}
                    onChange={handleChange}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="outlined-Required"
                    variant="outlined"
                    label="Razón social"
                    type="text"
                    className='tf-input'
                    fullWidth
                    name='comName'
                    value={form ? form.comName : ''}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    id="outlined-Required"
                    variant="outlined"
                    label="Dirección"
                    type="text"
                    className='tf-input'
                    fullWidth
                    name='comAddress'
                    value={form ? form.comAddress : ''}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    id="outlined-Required"
                    variant="outlined"
                    label="Correo electrónico"
                    type="text"
                    className='tf-input tf-email'
                    sx={{ width: '31ch' }}
                    name='comEmail'
                    value={form ? form.comEmail : ''}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    id="outlined-Required"
                    variant="outlined"
                    label="Sitio web"
                    type="text"
                    className='tf-input tf-website'
                    sx={{ width: '31ch' }}
                    name='comWebSite'
                    value={form ? form.comWebSite : ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="card-ctn-right">
                  <div margin="dense" sx={{ m:1, width: '20ch' }} className="form-image" onClick={() => document.querySelector('.input-field').click()}>
                    <input
                      type="file"
                      accept="image/*"
                      name="comImage"
                      className="input-field"
                      hidden
                      onChange={(e) => {
                        const selectedFile = e.target.files[0]
                        if (selectedFile) {
                          setFileName(selectedFile)
                          setImage(URL.createObjectURL(selectedFile))
                          setForm({
                            ...form,
                            comImage: selectedFile,
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
              </div>
              <div className="box-button">
                <button onClick={handleSubmit}>Guardar</button>
              </div>
            </div>
          </motion.div>
        </ div>
      )
    )
  )
}

export default withReducer('companySetting', reducer)(Index)