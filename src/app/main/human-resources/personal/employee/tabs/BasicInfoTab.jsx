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
    dispatch(getWorkAreas()).then(r => setWA(r.payload))
    dispatch(getJobPositions()).then(r => setJP(r.payload))
  }, [dispatch])

  return (
    <div>
      <div className="flex -mx-4">
        <Controller
          name="empFirstName"
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
          name="empSecondName"
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
          name="empSurname"
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
          name="empSecondSurname"
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
          name="DocumentType"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControl className="mt-8 mb-16 mx-4" fullWidth>
              <InputLabel id="DocumentType">{t('document')}</InputLabel>
              <Select
                labelId="DocumentType"
                label={t('document')}
                value={value}
                onChange={(event) => onChange(event.target.value)}
              >
                {
                  doct.map(r =>
                    <MenuItem value={r.id} key={r.id}>{r.doctAbbreviation}</MenuItem>
                  )
                }
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="empDocument"
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
          name="empEmail"
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
          name="empPhone"
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
          name="WorkArea"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              freeSolo
              id="tags-outlined"
              required
              options={wa}
              getOptionLabel={(option) => option.waName}
              onChange={(_, data) => {
                onChange(data)
                methods.setValue("WorkArea", data?.id || null)
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
          name="JobPosition"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              freeSolo
              id="tags-outlined"
              required
              options={jp}
              getOptionLabel={(option) => option.jpName}
              onChange={(_, data) => {
                onChange(data)
                methods.setValue("JobPosition", data?.id || null)
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
          name="empGender"
          control={control}
          render={({ field }) => (
            <FormControl className="mt-8 mx-4" fullWidth>
              <InputLabel id="prodWebHome">{t('sex')}</InputLabel>
              <Select
                {...field}
                labelId="prodWebHome"
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
          name="empState"
          control={control}
          render={({ field }) => (
            <FormControl className="mt-8 mx-4" fullWidth>
              <InputLabel id="prodWebHome">{t('state')}</InputLabel>
              <Select
                {...field}
                labelId="prodWebHome"
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