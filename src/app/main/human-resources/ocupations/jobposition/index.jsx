import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import reducer from '../store'
import { useState } from 'react'
import JPHeader from './JPHeader'
import JPTable from './JPTable'

const index = () => {
  const [dataToEdit, setDataToEdit] = useState(null)

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))

  return (
    <FusePageCarded
      header = {
        <JPHeader
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
      }
      content = {
        <JPTable
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
      }
      scroll = {isMobile ? 'normal': 'content'}
    />
  )
}

export default withReducer('OcupationHR', reducer)(index)