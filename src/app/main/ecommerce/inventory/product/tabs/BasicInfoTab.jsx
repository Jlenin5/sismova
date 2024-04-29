import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import Autocomplete from '@mui/material/Autocomplete'
import { Controller, useFormContext } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getCategories } from '../../store/categorySlice'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const url = 'https://sismova.tech/backsis/public/api/bo'

const BasicInfoTab = () => {
  const dispatch = useDispatch()
  const [dCate, setDCate] = useState([])
  const [dBO, setDBO] = useState([])
  const methods = useFormContext()
  const { control, formState } = methods
  const { errors } = formState
  const { t } = useTranslation()

  const getBO = async () => {
    return await axios.get(url)
  }

  useEffect(() => {
    getBO().then(r => setDBO(r.data))
    dispatch(getCategories()).then((r) => setDCate(r.payload))
  }, [dispatch])

  return (
    <div>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label={t('name')}
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <CKEditor
              editor={ClassicEditor}
              data={value}
              onChange={(event, editor) => {
                const data = editor.getData();
                onChange(data);
              }}
            />
              {errors?.prodDescription && (
                <p>{errors.prodDescription.message}</p>
              )}
          </>
        )}
      />

      {/* <Controller
        name="categories"
        control={control}
        render={({ field: { onChange, value } }) => {
          const availableCategories = dCate.filter(
            (category) => !value.some((selected) => selected.id === category.id)
          )
          return (
            <Autocomplete
              multiple
              className="mt-8 mb-16"
              fullWidth
              id="tags-outlined"
              options={availableCategories}
              getOptionLabel={(option) => option.cateName}
              onChange={(_, data) => {
                onChange(data)
                return data
              }}
              value={value}
              renderInput={(params) => (
                <TextField
                {...params}
                label={t('multiple_category_selection')}
                  placeholder={t('append')}
                  />
              )}
            />
          )
        }}
      /> */}

      {/* <Controller
        name="branch_offices"
        control={control}
        render={({ field: { onChange, value } }) => {
          const availableBO = dBO.filter(
            (bo) => !value.some((selected) => selected.id === bo.id)
          )
          return (
            <Autocomplete
              multiple
              className="mt-8 mb-16"
              fullWidth
              id="tags-outlined"
              options={availableBO}
              getOptionLabel={(option) => option.boName}
              onChange={(_, data) => {
                onChange(data)
                return data
              }}
              value={value}
              renderInput={(params) => (
                <TextField
                {...params}
                label={t('multiple_branch_selection')}
                  placeholder={t('append')}
                  />
              )}
            />
          )
        }}
      /> */}
    </div>
  )
}

export default BasicInfoTab