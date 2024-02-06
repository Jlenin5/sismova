import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getImages = asyncThunkWithAxios('prim', 'get', 'inventoryEC/images/getImages', 'get')
export const putImage = asyncThunkWithAxios('updateprim', 'post', 'inventoryEC/images/putImage', 'postFormData')
export const postImage = asyncThunkWithAxios('postprim', 'post', 'inventoryEC/images/postImage', 'postFormData')
export const deleteImage = asyncThunkWithAxios('deleteprim', 'delete', 'inventoryEC/images/deleteImage', 'delete')
export const delImageMulti = asyncThunkWithAxios('delprimmulti', 'delete', 'inventoryEC/images/delImageMulti', 'deletemulti')

const imageAdapter = createEntityAdapter({})

export const { selectAll: selectImage, selectById: selectImageById } =
  imageAdapter.getSelectors((state) => state.inventoryEC.image)

const imageSlice = createSlice({
  name: 'inventoryEC/images',
  initialState: imageAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setImageSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getImages.fulfilled]: imageAdapter.setAll,
    [putImage.fulfilled]: (state, action) => imageAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postImage.fulfilled]: (state, action) => action.payload,
    [deleteImage.fulfilled]: imageAdapter.removeOne,
    [delImageMulti.fulfilled]: imageAdapter.removeMany,
  },
})

export const { setImageSearchText } = imageSlice.actions

export const selectImageSearchText = ({ inventoryEC }) => inventoryEC.image.searchText

export default imageSlice.reducer