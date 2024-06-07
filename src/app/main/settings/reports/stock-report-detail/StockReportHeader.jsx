import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { useFormContext } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import _ from '@lodash'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { useState } from 'react'
import { URL_PUBLIC } from 'src/app/services/url'

const StockReportHeader = (props) => {
  const dispatch = useDispatch()
  const methods = useFormContext()
  const { formState, watch, getValues } = methods
  const { isValid, dirtyFields } = formState
  const routeParams = useParams()
  const { id } = routeParams
  const featured = watch('featured')
  const product_images = watch('product_images')
  const name = watch('name')
  const theme = useTheme()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const returnProducts = () => {
    navigate(-1)
  }

  const findWordInText = (texto, palabra) => {
    const minText = texto.toLowerCase()
    const minWord = palabra.toLowerCase()
    if (minText.includes(minWord)) {
      const wordPosition = minText.indexOf(minWord)
      if (wordPosition !== -1) {
        return minText.substring(wordPosition)
      } else {
        return minText
      }
    } else {
      return texto
    }
  }

  const findImage = (findImage) => {
    const url = `${URL_PUBLIC}images/products/${findImage}`
    const palabraBuscada = "blob"
    return findWordInText(url, palabraBuscada)
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
            <span className="flex mx-4 font-medium">{t('stock_report')}</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="hidden sm:flex"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          >
            {product_images.length > 0 && featured ? (
              <img
                className="w-32 sm:w-48 rounded"
                src={findImage(_.find(product_images, { featured: featured }).path)}
                alt={name}
              />
            ) : (
              <img
                className="w-32 sm:w-48 rounded"
                src="assets/images/apps/ecommerce/product-image-placeholder.png"
                alt={name}
              />
            )}
          </motion.div>
          <motion.div
            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {name}
            </Typography>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default StockReportHeader