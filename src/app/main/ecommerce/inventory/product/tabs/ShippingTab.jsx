import { useTranslation } from 'react-i18next'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { Controller, useFormContext } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const ShippingTab = (props) => {
  const methods = useFormContext()
  const { control } = methods
  const { t } = useTranslation()

  return (
    <div>
      <div className="flex -mx-4">
        <Controller
          name="width"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              label={t('width')}
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
          name="height"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              label={t('height')}
              id='height'
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
          name="depth"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              label={t('depth')}
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
          name="weight"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              label={t('weight')}
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

        <Controller
          name="web_site"
          control={control}
          render={({ field }) => (
            <FormControl className="mt-8 mx-4" fullWidth>
              <InputLabel id="web_site">{t('visible_on_web')}</InputLabel>
              <Select
                {...field}
                labelId="web_site"
                id="demo-simple-select"
                label={t('visible_on_web')}
              >
                <MenuItem value={1}>{t('visible')}</MenuItem>
                <MenuItem value={0}>{t('not_visible')}</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      </div>

    </div>
  )
}

export default ShippingTab