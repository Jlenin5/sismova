import { orange } from '@mui/material/colors'
import { lighten, styled } from '@mui/material/styles'
import clsx from 'clsx'
import FuseUtils from '@fuse/utils'
import { Controller, useFormContext } from 'react-hook-form'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import Box from '@mui/material/Box'
import ModalSelect from './ModalSelect'
import { useState } from 'react'
import ErrorDelete from './ErrorDelete'
import { URL_PUBLIC } from 'src/app/services/url'

const Root = styled('div')(({ theme }) => ({
  '& .productImageFeaturedStar': {
    position: 'absolute',
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0,
  },

  '& .productImageUpload': {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },

  '& .productImageItem': {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    '&:hover': {
      '& .productImageFeaturedStar': {
        opacity: 0.8,
      },
    },
    '&.featured': {
      // pointerEvents: 'none',
      boxShadow: theme.shadows[3],
      '& .productImageFeaturedStar': {
        opacity: 1,
      },
      '&:hover .productImageFeaturedStar': {
        opacity: 1,
      },
    },
  },
}))

function ProductImagesTab(props) {
  const methods = useFormContext()
  const [open, setOpen] = useState(false)
  const [openError, setOpenError] = useState(false)
  const [sendId, setSendId] = useState(null)
  const { control, watch, setValue } = methods
  const product_images = watch('product_images') || []
  const featured = watch('featured')
  const [clickNumber, setClickNumber] = useState(null)

  const handleChange = (newImages) => {
    setValue('product_images', newImages)
  }

  const handleClickOpen = (featured) => {
    setOpen(true)
    setSendId(featured)
    setClickNumber(clickNumber)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseError = () => {
    setOpenError(false);
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

  const handleRemoveImage = (itemImage) => {
    let findImage = product_images.find((image) => image.featured === itemImage)
    if(featured === findImage.featured) {
      setOpenError(true)
    } else {
      let updatedImages = product_images.filter((image) => image.featured !== itemImage)
      handleChange(updatedImages)
      setClickNumber(null)
    }
  }

  var nuevo = []
  for(let i=0; i<product_images.length; i++) {
    const url = `${URL_PUBLIC}images/products/${product_images[i].path}`
    const palabraBuscada = "blob"
    nuevo.push(findWordInText(url, palabraBuscada))
  }

  return (
    <Root>
      <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
        <Controller
          name="product_images"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Box
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              component="label"
              htmlFor="button-file"
              className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
            >
              <input
                accept="image/*"
                className="hidden"
                id="button-file"
                type="file"
                onChange={async (e) => {
                  function readFileAsync() {
                    return new Promise((resolve, reject) => {
                      const file = e.target.files[0]
                      if (!file) {
                        return
                      }
                      const reader = new FileReader()

                      reader.onload = () => {
                        resolve({
                          featured: FuseUtils.generateGUID(),
                          path: URL.createObjectURL(file),
                        })
                      }

                      reader.onerror = reject

                      reader.readAsBinaryString(file)
                    })
                  }

                  const newImage = await readFileAsync()
                  const updatedImages = [...value, newImage]
                  onChange(updatedImages)
                  handleChange(updatedImages)
                }}
              />
              <FuseSvgIcon size={32} color="action">
                heroicons-outline:upload
              </FuseSvgIcon>
            </Box>
          )}
        />
        {product_images.map((media, index) => (
          <div
            onClick={() => handleClickOpen(media.featured)}
            role="button"
            tabIndex={0}
            className={clsx(
              'productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg',
              media.featured === clickNumber || media.featured === featured ? 'featured' : ''
            )}
            key={media.featured}
          >
            <FuseSvgIcon className="productImageFeaturedStar">heroicons-solid:star</FuseSvgIcon>
            <img className="max-w-none w-auto h-full" src={nuevo[index]} alt="product" />
          </div>
        ))}
      </div>
      <ModalSelect
        open={open}
        onClose={handleClose}
        sendId={sendId}
        setSendId={setSendId}
        clickNumber={clickNumber}
        setClickNumber={setClickNumber}
        onRemoveImage={handleRemoveImage}
      />
      <ErrorDelete
        handleClose={handleCloseError}
        open={openError}
      />
    </Root>
  )
}

export default ProductImagesTab