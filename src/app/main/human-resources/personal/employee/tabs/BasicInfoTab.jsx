import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Autocomplete from '@mui/material/Autocomplete'
import { Controller, useFormContext } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getDocuments } from 'src/app/main/settings/controls/store/documentSlice'
import { getWorkAreas } from '../../../ocupations/store/waSlice'
import { getJobPositions } from '../../../ocupations/store/jpSlice'

const BasicInfoTab = () => {
  const dispatch = useDispatch()
  const [doct, setDoct] = useState([])
  const [wa, setWA] = useState([])
  const [jp, setJP] = useState([])
  const methods = useFormContext()
  const { control, formState } = methods
  const { errors } = formState
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(getDocuments()).then(r => setDoct(r.payload))
    dispatch(getWorkAreas()).then(r => setWA(r.payload.data))
    dispatch(getJobPositions()).then(r => setJP(r.payload.data))
  }, [dispatch])

  return (
    <div>
      <div className="flex -mx-4">
        <Controller
          name="first_name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              error={!!errors.name}
              required
              helperText={errors?.name?.message}
              label={t('first_name')}
              autoFocus
              id="name"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Controller
          name="second_name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              label={t('second_name')}
              value={field.value || ''}
              id="name"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Controller
          name="surname"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              error={!!errors.name}
              required
              helperText={errors?.name?.message}
              label={t('surname')}
              id="name"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Controller
          name="second_surname"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              error={!!errors.name}
              required
              helperText={errors?.name?.message}
              label={t('second_surname')}
              id="name"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>

      <div className="flex -mx-4">
        <Controller
          name="document_type"
          control={control}
          render={({ field }) => (
            <FormControl className="mt-8 mb-16 mx-4" fullWidth>
              <InputLabel id="document_type">{t('document_type')}</InputLabel>
              <Select
                {...field}
                labelId="document_type"
                label={t('document_type')}
              >
                <MenuItem value={1}>{t('dni')}</MenuItem>
                <MenuItem value={2}>{t('ruc')}</MenuItem>
                <MenuItem value={3}>{t('ce')}</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="document_number"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              error={!!errors.name}
              required
              helperText={errors?.name?.message}
              label={t('n_document')}
              id="name"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              label={t('e_mail')}
              value={field.value || ''}
              id="name"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              label={t('cell_phone')}
              value={field.value || ''}
              id="name"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>

      <div className="flex -mx-4">
        <Controller
          name="work_area_id"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              freeSolo
              id="tags-outlined"
              required
              options={wa}
              getOptionLabel={(option) => option.name}
              onChange={(_, data) => {
                onChange(data)
                methods.setValue("work_area_id", data?.id || null)
                return data
              }}
              value={wa.find((option) => option.id === value) || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('work_area')}
                />
              )}
              className="mt-8 mb-16 mx-4"
              fullWidth
            />
          )}
        />
        <Controller
          name="job_position_id"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              freeSolo
              id="tags-outlined"
              required
              options={jp}
              getOptionLabel={(option) => option.name}
              onChange={(_, data) => {
                onChange(data)
                methods.setValue("job_position_id", data?.id || null)
                return data
              }}
              value={jp.find((option) => option.id === value) || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('job_position')}
                />
              )}
              className="mt-8 mb-16 mx-4"
              fullWidth
            />
          )}
        />
        <Controller
          multiple
          name="gender"
          control={control}
          render={({ field }) => (
            <FormControl className="mt-8 mx-4" fullWidth>
              <InputLabel id="gender">{t('sex')}</InputLabel>
              <Select
                {...field}
                labelId="gender"
                id="demo-simple-select"
                label={t('sex')}
              >
                <MenuItem value={0}>{t('male')}</MenuItem>
                <MenuItem value={1}>{t('female')}</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <Controller
          multiple
          name="status"
          control={control}
          render={({ field }) => (
            <FormControl className="mt-8 mx-4" fullWidth>
              <InputLabel id="status">{t('state')}</InputLabel>
              <Select
                {...field}
                labelId="status"
                id="demo-simple-select"
                label={t('state')}
              >
                <MenuItem value={1}>{t('active')}</MenuItem>
                <MenuItem value={0}>{t('inactive')}</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      </div>
    </div>
  )
}

export default BasicInfoTab