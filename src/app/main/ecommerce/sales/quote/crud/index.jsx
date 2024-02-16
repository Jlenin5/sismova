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
import { Link, useParams } from 'react-router-dom'
import _ from '@lodash'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import { getQuote, newQuote, resetQuote, selectQuote } from '../../store/quoteSlice'
import reducer from '../../store'
import QuoteHead from './QuoteHead'
import BasicInfoTab from './tabs/BasicInfoTab'
// import InventoryTab from './tabs/InventoryTab'
// import PricingTab from './tabs/PricingTab'
import ProductsTab from './tabs/ProductsTab'
// import ShippingTab from './tabs/ShippingTab'

const schema = yup.object().shape({
  name: yup
    .string()
    .required('You must enter a product name')
    .min(5, 'The product name must be at least 5 characters'),
})

const Quote = (props) => {
  const dispatch = useDispatch()
  const product = useSelector(selectQuote)
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))

  const routeParams = useParams()
  const [tabValue, setTabValue] = useState(0)
  const [noQuote, setNoQuote] = useState(false)
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
        dispatch(newQuote())
      } else {
        dispatch(getQuote(Number(id))).then((action) => {
          if (!action.payload) {
            setNoQuote(true)
          }
        })
      }
    }

    updateProductState()
  }, [dispatch, routeParams, setNoQuote])

  useEffect(() => {
    if (!product) {
      return
    }
    reset(product)
  }, [product, reset, dispatch])

  useEffect(() => {
    return () => {
      dispatch(resetQuote())
      setNoQuote(false)
    }
  }, [dispatch])

  function handleTabChange(event, value) {
    setTabValue(value)
  }
  if (noQuote) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          No hay tal cotización!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/ecommerce/sales/quotes"
          color="inherit"
        >
          Ir a la página de cotizaciones
        </Button>
      </motion.div>
    )
  }

  const handleKeyPress = (e) => {
    const keyCode = e.which || e.keyCode
    const isNumber = (keyCode >= 48 && keyCode <= 57) 
    const isControlKey = [8, 9, 13, 27, 37, 39].includes(keyCode)
    if (!(isNumber || isControlKey)) {
      e.preventDefault()
    }
  }

  if (_.isEmpty(form) || !product || (product && Number(routeParams.id) !== product.id && routeParams.id !== 'new')) {
    return <FuseLoading />
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<QuoteHead />}
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
              <Tab className="h-64" label="Información básica" />
              <Tab className="h-64" label="Productos" />
              {/* <Tab className="h-64" label="Precios" />
              <Tab className="h-64" label="Inventario" />
              <Tab className="h-64" label="Envío" /> */}
            </Tabs>
            <div className="p-16 sm:p-24 w-full">
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <BasicInfoTab />
              </div>

              <div className={tabValue !== 1 ? 'hidden' : ''}>
                <ProductsTab />
              </div>

              <div className={tabValue !== 2 ? 'hidden' : ''}>
                {/* <PricingTab singleNumber={handleKeyPress} /> */}
              </div>

              <div className={tabValue !== 3 ? 'hidden' : ''}>
                {/* <InventoryTab singleNumber={handleKeyPress} /> */}
              </div>

              <div className={tabValue !== 4 ? 'hidden' : ''}>
                {/* <ShippingTab singleNumber={handleKeyPress} /> */}
              </div>
            </div>
          </>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  )
}

export default withReducer('SalesEC', reducer)(Quote)