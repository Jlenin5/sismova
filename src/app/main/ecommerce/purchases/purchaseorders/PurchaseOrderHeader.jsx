import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { getPurhcaseOrders, selectPurchaseOrderSearchText, exportPurchaseOrderPDF, exportPurchaseOrderExcel } from '../store/purchaseordersSlice'
import PurchaseOrderFilter from './PurchaseOrderFilter'
import { useState } from 'react'

const PurchaseOrderHeader = ({
    data, loading, setLoading, page, rowsPerPage
  }) => {

  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  // const searchText = useSelector(selectPurchaseOrderSearchText)
  const { t } = useTranslation()

  const handleChange = () => {
    if(open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  const handleFilters = (search) => {
    setLoading(true)
    setSearchText(search)
    dispatch(getPurhcaseOrders({ page, rowsPerPage, searchText })).then(() => {
      setLoading(false)
    })
  }

  const handleExportPdf = () => {
    // setLoading(true)
    dispatch(exportPurchaseOrderPDF({ page, rowsPerPage, searchText })).then(() => {
      // setLoading(false)
    })
  }

  const handleExportExcel = () => {
    setLoading(true)
    dispatch(exportPurchaseOrderExcel({ page, rowsPerPage, searchText })).then(() => {
      setLoading(false)
    })
  }

  return (
    <div className="flex flex-col w-full">
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
          className="flex flex-wrap w-full sm:w-auto sm:flex-row sm:space-y-0 flex-1 items-center justify-end space-x-8" 
        >
          <Button
            className=""
            variant="contained"
            onClick={handleChange}
            color="filter"
            startIcon={<FuseSvgIcon>material-outline:filter_alt</FuseSvgIcon>}
          >
            {t('filters')}
          </Button>
          <Button
            className=""
            variant="contained"
            onClick={handleExportPdf}
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
            to="/e-commerce/purchases/purchase-order/new"
            color="secondary"
            startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
          >
            {t('add')}
          </Button>
        </motion.div>
      </div>
      
      <PurchaseOrderFilter
        open={open}
        page={page}
        rowsPerPage={rowsPerPage}
        setLoading={setLoading}
        handleFilters={handleFilters}
      />
    </div>
  )
}

export default PurchaseOrderHeader