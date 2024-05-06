import withReducer from 'app/store/withReducer'
import { useState } from 'react'
import reducer from '../store'
import FusePageCarded from '@fuse/core/FusePageCarded'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import UnitTable from './UnitTable'
import UnitHeader from './UnitHeader'

const index = () => {
  const [dataToEdit, setDataToEdit] = useState(null)

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  
  return (
    <FusePageCarded
      header={
        <UnitHeader
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
      }
      content={
        <UnitTable
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default withReducer('ControlsSC', reducer)(index)