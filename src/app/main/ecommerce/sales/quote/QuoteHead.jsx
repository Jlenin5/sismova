import { useTranslation } from 'react-i18next'
import { forceUpdate } from 'react'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { useFormContext } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import _ from '@lodash'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { deleteQuote, putQuote, getMaxId, postQuote } from '../store/quoteSlice'
import { useEffect, useState } from 'react'

const QuoteHead = () => {

  const dispatch = useDispatch()
  const methods = useFormContext()
  const { formState, watch, getValues } = methods
  const [maxId, setMaxId] = useState([])
  const { isValid, dirtyFields } = formState
  const routeParams = useParams()
  const { id } = routeParams
  // const featuredImageId = watch('featuredImageId')
  // const productImages = watch('product_images')
  const theme = useTheme()
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(getMaxId()).then(r => setMaxId(r.payload))
  }, [dispatch])
  
  const handleSaveProduct = async () => {
    if(getValues().id === null) {
      const quoteData = getValues()
      quoteData.id = maxId.ultimo_id + 1
      console.log(quoteData)
      // dispatch(postQuote(quoteData))
    } else {
      const quoteData = getValues()
      console.log(quoteData)
      // dispatch(putQuote(getValues()))
    }
    // returnProducts()
  }

  function handleRemoveProduct() {
    dispatch(deleteQuote(getValues().id)).then(() => {
      returnProducts()
    })
  }

  const returnProducts = () => {
    navigate(-1)
  }

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32">
      <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            onClick={returnProducts}
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === 'ltr'
                ? 'heroicons-outline:arrow-sm-left'
                : 'heroicons-outline:arrow-sm-right'}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">{t('quotes')}</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="hidden sm:flex"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          >
            {/* {productImages.length > 0 && featuredImageId ? (
              <img
                className="w-32 sm:w-48 rounded"
                src={findImage(_.find(productImages, { featured: featuredImageId }).primPath)}
                alt={prodName}
              />
            ) : (
              <img
                className="w-32 sm:w-48 rounded"
                src="assets/images/apps/ecommerce/product-image-placeholder.png"
                alt={prodName}
              />
            )} */}
          </motion.div>
          <motion.div
            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {t('quote')}
            </Typography>
            <Typography variant="caption" className="font-medium">
              {t('quote_details')}
            </Typography>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        {
          id !== 'new' ?
          <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            color="secondary"
            onClick={handleRemoveProduct}
            startIcon={<FuseSvgIcon className="hidden sm:flex">heroicons-outline:trash</FuseSvgIcon>}
          >
            {t('delete')}
          </Button>
          : ''
        }
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="verified"
          disabled={_.isEmpty(dirtyFields) || isValid}
          onClick={handleSaveProduct}
        >
          {t('save')}
        </Button>
      </motion.div>
    </div>
  )
}

export default QuoteHead