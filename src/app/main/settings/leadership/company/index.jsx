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
import { URL_PUBLIC } from 'src/app/services/url';

const initialForm = {
  id: null,
  code: '',
  image: '',
  name: '',
  document_number: '',
  email: '',
  address: '',
  web_site: '',
  phone: ''
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
    if (name === 'image') {
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
    if(!form.name) {
      alert("Datos incompletos")
      return
    }
    if(form.id===null) {
      form.image = image
      const formData = new FormData()
      formData.append('image', fileName)
      for(const key in form) {
        formData.append(key, form[key])
      }
      // createData(formData, form)
    } else {
      var updateFile = ''
      if(fileName === 'Seleccionar archivo') {
        form.image = data[0].image
      } else {
        form.image = image
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
        image: data[0].image || 'nocamera.png',
        web_site: data[0].web_site || '',
      }
      setForm(updatedDataToEdit)
    } else {
      setForm(initialForm)
    }
  }, [data])

  var nuevo = ''
  if(form.id !== null) {
    const url = `${URL_PUBLIC}images/company/${form.image}`
    const palabraBuscada = "blob"
    nuevo = encontrarPalabraEnTexto(url, palabraBuscada)
  }
  
  return (
    data.map((n) => (
        <div className="ctn-g-company inline-block p-24 sm:p-40 text-left print:p-0 w-full" key={n.id}>
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
                    name='code'
                    sx={{ width: '20ch' }}
                    value={form ? form.code : ''}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    id="outlined-Required"
                    variant="outlined"
                    label="R.U.C."
                    type="text"
                    className='tf-input tf-ruc'
                    name='document_number'
                    sx={{ width: '20ch' }}
                    value={form ? form.document_number : ''}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    id="outlined-Required"
                    variant="outlined"
                    label="Celular"
                    type="text"
                    className='tf-input tf-phone'
                    name='phone'
                    sx={{ width: '20ch' }}
                    value={form ? form.phone : ''}
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
                    name='name'
                    value={form ? form.name : ''}
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
                    name='address'
                    value={form ? form.address : ''}
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
                    name='email'
                    value={form ? form.email : ''}
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
                    name='web_site'
                    value={form ? form.web_site : ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="card-ctn-right">
                  <div margin="dense" sx={{ m:1, width: '20ch' }} className="form-image" onClick={() => document.querySelector('.input-field').click()}>
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      className="input-field"
                      hidden
                      onChange={(e) => {
                        const selectedFile = e.target.files[0]
                        if (selectedFile) {
                          setFileName(selectedFile)
                          setImage(URL.createObjectURL(selectedFile))
                          setForm({
                            ...form,
                            image: selectedFile,
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