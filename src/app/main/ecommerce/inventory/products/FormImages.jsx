import axios from 'axios';
import { DialogContent, DialogActions, Button } from '@mui/material';
import { orange } from '@mui/material/colors';
import { lighten, styled } from '@mui/material/styles';
import clsx from 'clsx';
import FuseUtils from '@fuse/utils';
import { Controller, useFormContext } from 'react-hook-form';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postImage } from '../store/imagesSlice';

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
}));

function dataURLtoFile(dataurl, filename) {
  try {
    var arr = dataurl.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  } catch (error) {
    console.error('Error converting dataurl to file:', error);
    return null;
  }
}

const FormImages = () => {

  const dispatch = useDispatch()
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
  const { control, watch, getValues } = methods;
  const formImages = watch('formImages')

  const handleSubmit = async () => {
    const formData = new FormData();
    formImages.forEach((media) => {
      // const file = dataURLtoFile(media.primPath, `image_${index}`)
      formData.append('primId', media.primId)
      formData.append('primPath', media.primPath)
      formData.append('extension', media.extension)
      formData.append('productId', 1)
    });
    try {
      const response = await axios.post('https://sismova.tech/backsis/public/api/postimage', formImages, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error al enviar archivos:', error);
    }
  }

  return (
    <DialogContent>
      <Root>
        <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
          <Controller
            name="formImages"
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
                  onChange={ async (e) => {
                    function readFileAsync() {
                      return new Promise((resolve, reject) => {
                        const file = e.target.files[0]
                        if(!file) {
                          return
                        }
                        const reader = new FileReader()
                        reader.onload = () => {
                          const extension = getFileExtension(file.name)
                          resolve({
                            primId: FuseUtils.generateGUID(),
                            primPath: URL.createObjectURL(file),
                            productId: 1,
                            extension: extension,
                          })
                        }
                        reader.onerror = reject
                        reader.readAsBinaryString(file)
                      })
                    }
                    function getFileExtension(filename) {
                      return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
                    }
                    const newImage = await readFileAsync()
                    onChange([newImage, ...value])
                  } }
                />
                <FuseSvgIcon size={32} color="action">
                  heroicons-outline:upload
                </FuseSvgIcon>
              </Box>
            )}
          />
          <Controller
            name="featuredImageId"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) =>
              formImages.map((media) => (
                <div
                  onClick={() => onChange(media.primId)}
                  onKeyDown={() => onChange(media.primId)}
                  role="button"
                  tabIndex={0}
                  className={clsx(
                    'productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg',
                    media.primId === value && 'featured'
                  )}
                  key={media.primId}
                >
                  <FuseSvgIcon className="productImageFeaturedStar2">heroicons-solid:x</FuseSvgIcon>
                  <img className="max-w-none w-auto h-full" src={media.primPath} alt="product" />
                </div>
              ))
            }
          />
        </div>
      </Root>
      <DialogActions>
        <button onClick={handleSubmit}>Guardar</button>
      </DialogActions>
    </DialogContent>
  )
}

export default FormImages;
