import { useTranslation } from 'react-i18next'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { getSaleOrders } from '../store/saleordersSlice'
import { useDispatch } from 'react-redux'

const SaleOrderFilter = ({ open, page, rowsPerPage, setLoading, handleFilters }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  // const handleFilters = (searchText) => {
  //   setLoading(true)
  //   dispatch(getSaleOrders({ page, rowsPerPage, searchText })).then(() => {
  //     setLoading(false)
  //   })
  // }

  const styleFlex = open ? '' : 'flex-none'

  return (
    <div className={`flex mb-12 w-auto m-auto ${styleFlex}`} >
      <Paper>
        {open && (
          <div spacing={2} className="flex flex-wrap m-16 gap-16 justify-center">
            <TextField
              id="outlined-basic"
              label={t('reference')}
              variant="outlined"
              onChange={(e) => handleFilters(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label={t('currency')}
              variant="outlined"
              onChange={(e) => handleFilters(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label={t('supplier')}
              variant="outlined"
              onChange={(e) => handleFilters(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label={t('user')}
              variant="outlined"
              onChange={(e) => handleFilters(e.target.value)}
            />
          </div>
        )}
      </Paper>
    </div>
  )
}

export default SaleOrderFilter