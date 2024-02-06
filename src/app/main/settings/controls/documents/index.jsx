import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import reducer from '../store'
import { useState } from 'react'
import DocHeader from './DocHeader'
import DocTable from './DocTable'

const index = () => {
  const [dataToEdit, setDataToEdit] = useState(null)

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))

  return (
    <FusePageCarded
      header = {
        <DocHeader
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
      }
      content = {
        <DocTable
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
      }
      scroll = {isMobile ? 'normal': 'content'}
    />
  )
}

export default withReducer('ControlsSC', reducer)(index)