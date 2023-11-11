import { orange } from '@mui/material/colors'
import { lighten, styled } from '@mui/material/styles'
import clsx from 'clsx'
import FuseUtils from '@fuse/utils'
import { Controller, useFormContext } from 'react-hook-form'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import Box from '@mui/material/Box'
import { useState } from 'react'

const Root = styled('div')(({ theme }) => ({
  '& .productImageFeaturedStar2': {
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
      '& .productImageFeaturedStar2': {
        opacity: 0.8,
      },
    },
    '&.featured': {
      pointerEvents: 'none',
      boxShadow: theme.shadows[3],
      '& .productImageFeaturedStar2': {
        opacity: 1,
      },
      '&:hover .productImageFeaturedStar2': {
        opacity: 1,
      },
    },
  },
}))

const FormImages = () => {

  const [imageName, setImageName] = useState(null)
  const [fileName, setFileName] = useState('')
  const [countImage, setCountImage] = useState([])
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
    setCountImage([...countImage, {
      id: count + 1,
      url: imageName
    }])
  }
  const methods = useFormContext();
  const { control } = methods;
  console.log(imageName)

  return (
    <Root>
      <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
        <Controller
          name="images"
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
                onChange={(e) => {
                  const selectedFile = e.target.files[0]
                  if(selectedFile) {
                    setFileName(selectedFile)
                    setImageName(URL.createObjectURL(selectedFile))
                    // setCountImage([1])
                    increment()
                  }
                  // onChange([newImage, ...value])
                }}
              />
              <FuseSvgIcon size={32} color="action">
                heroicons-outline:upload
              </FuseSvgIcon>
            </Box>
          )}
        />
        {/* {countImage.map((media) => (
          <div
            onClick={() => onChange(media.id)}
            onKeyDown={() => onChange(media.id)}
            role="button"
            tabIndex={0}
            className={clsx(
              'productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg',
              // media.id === value && 'featured'
            )}
            key={media.id}
            >
              <FuseSvgIcon className="productImageFeaturedStar2">heroicons-solid:star</FuseSvgIcon>
              <img className="max-w-none w-auto h-full" src={media.url ? media.url : ''} alt="" />
          </div>
        ))} */}
        <Controller
          name="featuredImageId"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) =>
            countImage.map((media) => (
              <div
                onClick={() => onChange(media.id)}
                onKeyDown={() => onChange(media.id)}
                role="button"
                tabIndex={0}
                className={clsx(
                  'productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg',
                  media.id === value && 'featured'
                )}
                key={media.id}
              >
                <FuseSvgIcon className="productImageFeaturedStar2">heroicons-solid:star</FuseSvgIcon>
                <img className="max-w-none w-auto h-full" src={media.url} alt="product" />
              </div>
            ))
          }
        />
      </div>
    </Root>
  )
}

export default FormImages