import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { getMaxId } from '../../store/productSlice'

// const url = 'https://sismova.tech/backsis/public/api/sn'

function InventoryTab(props) {
  const dispatch = useDispatch()
  const [prNumber, setPrNumber] = useState(null)
  const [dSN, setDSN] = useState([])
  const methods = useFormContext()
  const { control, watch, setValue } = methods
  // const SerialNumber = watch('SerialNumber')
  // const prodNumber = watch('prodNumber')
  const { t } = useTranslation()

  // const getSN = async () => {
  //   return await axios.get(url)
  // }

  useEffect(() => {
    // getSN().then(r => setDSN(r.data))
    dispatch(getMaxId()).then(r => setPrNumber(r.payload.ultimo_id))
  },[dispatch])

  useEffect(() => {
    // if (prNumber !== null) {
    //   var addProdNumber = 0
    //   if (prodNumber === '00000') {
    //     addProdNumber = (Number(prNumber) + 1).toString().padStart(5, '0')
    //   } else {
    //     addProdNumber = prodNumber
    //   }
    //   setValue('prodNumber', addProdNumber)
    // }  
  }, [prNumber, setValue])

  // const snFilter = dSN.find(r => r.id === SerialNumber)

  return (
    <div>
      <div className="flex -mx-4">
        {/* <Controller
          name="SerialNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              label={t('serie')}
              autoFocus
              id="serie"
              variant="outlined"
              fullWidth
              disabled
              value={snFilter?.snSerie || ''}
            />
          )}
        /> */}
      </div>

      <Controller
        name="stock_alert"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label={t('stock')}
            id="stock"
            variant="outlined"
            type="text"
            onKeyPress={props.singleNumber}
            fullWidth
          />
        )}
      />
 
      <Controller
        name="unit_id"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label={t('unit_of_measurement')}
            id="unit"
            variant="outlined"
            type="text"
            onKeyPress={props.singleNumber}
            fullWidth
          />
        )}
      />
    </div>
  )
}

export default InventoryTab