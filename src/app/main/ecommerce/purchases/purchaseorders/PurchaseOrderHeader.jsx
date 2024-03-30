import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { selectPurchaseOrderSearchText, exportPurchaseOrderExcel } from '../store/purchaseordersSlice'

const PurchaseOrderHeader = ({
    data, loading, setLoading, page, rowsPerPage
  }) => {

  const dispatch = useDispatch()
  const searchText = useSelector(selectPurchaseOrderSearchText)
  const { t } = useTranslation()

  const handleExportExcel = () => {
    setLoading(true)
    dispatch(exportPurchaseOrderExcel({ page, rowsPerPage }))
      .then(response => {
        setLoading(false)
      })
}

  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-24 md:text-32 font-extrabold tracking-tight"
      >
        {t('purchase_orders')}
      </Typography>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8" 
      >
        <Button
          className=""
          variant="contained"
          component={Link}
          to="/ecommerce/purchases/purchase-order/new"
          color="filter"
          startIcon={<FuseSvgIcon>material-outline:filter_alt</FuseSvgIcon>}
        >
          {t('filters')}
        </Button>
        <Button
          className=""
          variant="contained"
          component={Link}
          to="/ecommerce/purchases/purchase-order/new"
          color="pdf"
          startIcon={<FuseSvgIcon>material-outline:insert_drive_file</FuseSvgIcon>}
        >
          {t('pdf')}
        </Button>
        <Button
          className=""
          variant="contained"
          onClick={handleExportExcel}
          color="excel"
          startIcon={<FuseSvgIcon>material-outline:insert_drive_file</FuseSvgIcon>}
        >
          {t('excel')}
        </Button>
        <Button
          className=""
          variant="contained"
          component={Link}
          to="/ecommerce/purchases/purchase-order/new"
          color="secondary"
          startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
        >
          {t('add')}
        </Button>
      </motion.div>
    </div>
  )
}

export default PurchaseOrderHeader