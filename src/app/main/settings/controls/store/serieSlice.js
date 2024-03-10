import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import asyncThunkWithAxios from 'src/app/services/api'

export const getSeries = asyncThunkWithAxios('sn', 'get', 'ControlsSC/series/getSeries', 'get')
export const getMaxId = asyncThunkWithAxios('snmax', 'get', 'ControlsSC/series/getMaxId', 'getmax')
export const putSerie = asyncThunkWithAxios('updatesn', 'put', 'ControlsSC/series/putSerie', 'put')
export const postSerie = asyncThunkWithAxios('postsn', 'post', 'ControlsSC/series/postSerie', 'post')
export const deleteSerie = asyncThunkWithAxios('deletesn', 'delete', 'ControlsSC/series/deleteSerie', 'delete')
export const delSerieMulti = asyncThunkWithAxios('delsnmulti', 'delete', 'ControlsSC/series/delSerieMulti', 'deletemulti')

const serieAdapter = createEntityAdapter({})

export const { selectAll: selectSerie, selectById: selectSerieById } =
  serieAdapter.getSelectors((state) => state.ControlsSC.serie)

const serieSlice = createSlice({
  name: 'ControlsSC/series',
  initialState: serieAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setSerieSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getSeries.fulfilled]: serieAdapter.setAll,
    [putSerie.fulfilled]: (state, action) => serieAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      }
    ),
    [postSerie.fulfilled]: serieAdapter.addOne,
    [deleteSerie.fulfilled]: serieAdapter.removeOne,
    [delSerieMulti.fulfilled]: serieAdapter.removeMany,
  },
})

export const { setSerieSearchText } = serieSlice.actions

export const selectSerieSearchText = ({ ControlsSC }) => ControlsSC.serie.searchText

export default serieSlice.reducer