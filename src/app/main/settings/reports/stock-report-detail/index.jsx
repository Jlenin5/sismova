import { useTranslation } from 'react-i18next'
import FuseLoading from '@fuse/core/FuseLoading'
import FusePageCarded from '@fuse/core/FusePageCarded'
import { useDeepCompareEffect } from '@fuse/hooks'
import Button from '@mui/material/Button'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import withReducer from 'app/store/withReducer'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import _ from '@lodash'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import { getStockReport, selectStockReport } from '../store/stockReportDetailSlice'
import reducer from '../store'
import StockReportHeader from './StockReportHeader'
import InfoDetail from './InfoDetail'
import Warehouses from './Warehouses'

const schema = yup.object().shape({
  name: yup
    .string()
    .required('You must enter a product name')
    .min(5, 'The product name must be at least 5 characters'),
})

function StockReport(props) {
  const dispatch = useDispatch()
  const product = useSelector(selectStockReport)
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  const navigate = useNavigate()
  const { t } = useTranslation()

  const routeParams = useParams()
  const [noProduct, setNoProduct] = useState(false)
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  })
  const { reset, watch } = methods
  const form = watch()

  useDeepCompareEffect(() => {
    const { id } = routeParams
    dispatch(getStockReport(Number(id))).then((action) => {
      if (!action.payload) {
        setNoProduct(true)
      }
    })
  }, [dispatch, routeParams, setNoProduct])

  useEffect(() => {
    if (!product) {
      return
    }
    reset(product)
  }, [product, reset, dispatch])

  useEffect(() => {
    return () => {
      setNoProduct(false)
    }
  }, [dispatch])

  const returnProducts = () => {
    navigate(-1)
  }

  if (noProduct) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          {t('product_not_found')}
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          onClick={returnProducts}
          color="inherit"
        >
          {t('go_back')}
        </Button>
      </motion.div>
    )
  }

  if(_.isEmpty(form) || !product || (product && Number(routeParams.id) !== product.id && routeParams.id !== 'new')) {
    return <FuseLoading />
  }

  return (
    <FormProvider {...methods}>
      <StockReportHeader />
      <Warehouses />
      <InfoDetail />
    </FormProvider>
  )
}

export default withReducer('ReportsSC', reducer)(StockReport)