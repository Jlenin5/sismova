import './form.css'
import { useEffect, useState } from 'react'
import { Dialog, DialogTitle } from '@mui/material'
import FormProduct from './FormProduct'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { getCategories } from '../store/categoriesSlice'
import FormImages from './FormImages'
import { FormProvider, useForm } from 'react-hook-form'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const initialForm = {
  prodId: null,
  prodCode: '',
  prodImage: '',
  prodName: '',
  prodDescription: '',
  CategoryId: 1,
  prodStock: 0,
  prodPurchasePrice: 0.00,
  prodSalePrice: 0.00,
  prodState: true
}

const generateProductCode = (maxId) => {
  if (maxId === 0) {
    return 'PRD00001'
  }
  const nextId = maxId + 1
  const formattedId = String(nextId).padStart(5, '0')
  return `PRD${formattedId}`
}

function FormModal({maxId,onClose, open,createData,updateData,dataToEdit,setDataToEdit,deleteData}) {
  const [form, setForm] = useState(initialForm)
  const [generatedCode, setGeneratedCode] = useState('')
  const [data,setData] = useState([])
  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState("Seleccionar archivo")
  const theme = useTheme()
  const [value, setValue] = useState(0)
  const methods = useForm()

  const handleSubmit = (e) => {
    form.prodState = form.prodState ? 1 : 0
    e.preventDefault()
    if (!form.prodName) {
      alert('Datos incompletos')
      return
    }
    if (form.prodId === null) {
      form.prodId = maxId + 1
      form.prodImage = image
      const formData = new FormData()
      formData.append('prodImage', fileName)
      for(const key in form) {
        formData.append(key, form[key])
      }
      createData(formData, form)
    } else {
      var updateFile = ''
      if(fileName === 'Seleccionar archivo') {
        form.prodImage = dataToEdit.prodImage
      } else {
        form.prodImage = image
        updateFile = fileName
      }
      updateData(form, updateFile)
    }
    handleReset()
    onClose()
  }
  const handleReset = () => {
    setImage(null)
    setFileName("Seleccionar archivo")
    setForm(initialForm)
    setDataToEdit(null);
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    if (name === 'prodCode' && value === '') {
      const generatedCode = generateCode(maxId + 1)
      setGeneratedCode(generatedCode)
      setForm({
        ...form,
        [name]: generatedCode,
      })
    } else {
      setGeneratedCode('')
    }
    if (name === 'prodImage') {
      if (e.target.files[0]) {
        setFileName(e.target.files[0].name)
        setImage(URL.createObjectURL(e.target.files[0]))
      } else {
        setFileName('Archivo no seleccionado')
        setImage(null)
      }
    }
    setForm({
      ...form,
      [name]: value,
    })
  }

  const generateCode = (sequence) => {
    const fixedPart = 'PRD'
    const variablePart = sequence.toString().padStart(5, '0')
    return fixedPart + variablePart
  }

  useEffect(() => {
    getCategories().then((response) => {setData(response)})
    if(dataToEdit) {
      setForm(dataToEdit)
    } else {
      const productCode = generateProductCode(maxId)
      setForm({ ...initialForm, prodCode: productCode })
    }
  }, [dataToEdit, maxId])

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  const handleClose = (id) => {
    if (id === form.prodId) {
      deleteData(id);
      handleReset();
      onClose();
    } else {
      handleReset();
      onClose();
      const productCode = generateProductCode(maxId)
      setForm({ ...initialForm, prodCode: productCode })
    }
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      className='form-dialog-category'
    >
      <DialogTitle>Formulario</DialogTitle>
      <Box
        className='box-nav-form'
        sx={{
          width: 600,
          position: 'relative',
          maxHeight: 45,
          backgroundColor: 'white'
        }}
      >
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChangeTabs}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab label="Producto" {...a11yProps(0)} />
            <Tab label="Imágenes" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
          <FormProduct
            form={form}
            generatedCode={generatedCode}
            handleChange={handleChange}
            image={image}
            setImage={setImage}
            fileName={fileName}
            setFileName={setFileName}
            data={data}
            handleSubmit={handleSubmit}
            setForm={setForm}
            dataToEdit={dataToEdit}
            handleClose={handleClose}
          />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <FormProvider {...methods}>
              <FormImages />
            </FormProvider>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </Dialog>
  )
}

export default FormModal