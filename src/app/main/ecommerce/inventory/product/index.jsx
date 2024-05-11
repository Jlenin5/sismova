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
import { getProduct, newProduct, resetProduct, selectProduct } from '../store/productSlice'
import reducer from '../store'
import ProductHeader from './ProductHeader'
import BasicInfoTab from './tabs/BasicInfoTab'
import InventoryTab from './tabs/InventoryTab'
import PricingTab from './tabs/PricingTab'
import ProductImagesTab from './tabs/ProductImagesTab'
import ShippingTab from './tabs/ShippingTab'

const schema = yup.object().shape({
  name: yup
    .string()
    .required('You must enter a product name')
    .min(5, 'The product name must be at least 5 characters'),
})

function Product(props) {
  const dispatch = useDispatch()
  const product = useSelector(selectProduct)
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  const navigate = useNavigate()
  const { t } = useTranslation()

  const routeParams = useParams()
  const [tabValue, setTabValue] = useState(0)
  const [noProduct, setNoProduct] = useState(false)
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  })
  const { reset, watch, control, onChange, formState } = methods
  const form = watch()

  useDeepCompareEffect(() => {
    function updateProductState() {
      const { id } = routeParams
      if (id === 'new') {
        dispatch(newProduct())
      } else {
        dispatch(getProduct(Number(id))).then((action) => {
          if (!action.payload) {
            setNoProduct(true)
          }
        })
      }
    }

    updateProductState()
  }, [dispatch, routeParams, setNoProduct])

  useEffect(() => {
    if (!product) {
      return
    }
    reset(product)
  }, [product, reset, dispatch])

  useEffect(() => {
    return () => {
      dispatch(resetProduct())
      setNoProduct(false)
    }
  }, [dispatch])

  const returnProducts = () => {
    navigate(-1)
  }
  
  function handleTabChange(event, value) {
    setTabValue(value)
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

  const handleKeyPress = (e) => {
    const keyCode = e.which || e.keyCode
    const isNumber = (keyCode >= 48 && keyCode <= 57) || keyCode === 46
    const isControlKey = [8, 9, 13, 27, 37, 39].includes(keyCode)
    if (!(isNumber || isControlKey)) {
      e.preventDefault()
    }
  }

  if(_.isEmpty(form) || !product || (product && Number(routeParams.id) !== product.id && routeParams.id !== 'new')) {
    return <FuseLoading />
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<ProductHeader />}
        content={
          <>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              classes={{ root: 'w-full h-64 border-b-1' }}
            >
              <Tab className="h-64" label={t('basic_info')} />
              <Tab className="h-64" label={t('images')} />
              <Tab className="h-64" label={t('prices')} />
              <Tab className="h-64" label={t('inventory')} />
              <Tab className="h-64" label={t('shipment')} />
            </Tabs>
            <div className="p-16 sm:p-24 max-w-3xl">
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <BasicInfoTab />
              </div>

              <div className={tabValue !== 1 ? 'hidden' : ''}>
                <ProductImagesTab />
              </div>

              <div className={tabValue !== 2 ? 'hidden' : ''}>
                <PricingTab singleNumber={handleKeyPress} />
              </div>

              <div className={tabValue !== 3 ? 'hidden' : ''}>
                <InventoryTab singleNumber={handleKeyPress} />
              </div>

              <div className={tabValue !== 4 ? 'hidden' : ''}>
                <ShippingTab singleNumber={handleKeyPress} />
              </div>
            </div>
          </>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  )
}

export default withReducer('inventoryEC', reducer)(Product)