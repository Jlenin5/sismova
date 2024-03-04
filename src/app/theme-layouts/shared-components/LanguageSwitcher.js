import Button from '@mui/material/Button'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeLanguage, selectCurrentLanguage, selectLanguages } from 'app/store/i18nSlice'
import es from 'app/configs/navigation-i18n/es'
import en from 'app/configs/navigation-i18n/en'
import i18n from 'i18next'

function LanguageSwitcher(props) {
  const currentLanguage = useSelector(selectCurrentLanguage)
  const languages = useSelector(selectLanguages)
  const [menu, setMenu] = useState(null)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   switch (currentLanguage.id) {
  //     case 'es':
  //       i18n.addResourceBundle('es', 'translation', es, true, false)
  //       break
  //     case 'en':
  //       i18n.addResourceBundle('en', 'translation', en, true, false)
  //       break
  //     default:
  //       break
  //   }
  // }, [currentLanguage.id])

  const langMenuClick = (event) => {
    setMenu(event.currentTarget)
  }

  const langMenuClose = () => {
    setMenu(null)
  }

  function handleLanguageChange(lng) {
    dispatch(changeLanguage(lng.id))
    // console.log(lng)

    // switch (lng.id) {
    //   case 'es':
    //     i18n.addResourceBundle('es', 'translation', es, true, false)
    //     break
    //   case 'en':
    //     i18n.addResourceBundle('en', 'translation', en, true, false)
    //     break
    //   default:
    //     break
    // }

    langMenuClose()
  }

  // const storedLanguage = localStorage.getItem('languageId')
  // if (storedLanguage) {
  //   dispatch(changeLanguage(storedLanguage))
  // }

  useEffect(() => {
    // Cambia el idioma después de que la renderización haya terminado
    const storedLanguage = localStorage.getItem('languageId');
    if (storedLanguage) {
      handleLanguageChange({ id: storedLanguage });
    }
  }, [])

  return (
    <>
      <Button className="h-40 w-64" onClick={langMenuClick}>
        <img
          className="mx-4 min-w-20"
          src={`assets/images/flags/${currentLanguage.flag}.svg`}
          alt={currentLanguage.title}
        />

        <Typography className="mx-4 font-semibold uppercase" color="text.secondary">
          {currentLanguage.id}
        </Typography>
      </Button>

      <Popover
        open={Boolean(menu)}
        anchorEl={menu}
        onClose={langMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: 'py-8',
        }}
      >
        {languages.map((lng) => (
          <MenuItem key={lng.id} onClick={() => handleLanguageChange(lng)}>
            <ListItemIcon className="min-w-40">
              <img
                className="min-w-20"
                src={`assets/images/flags/${lng.flag}.svg`}
                alt={lng.title}
              />
            </ListItemIcon>
            <ListItemText primary={lng.title} />
          </MenuItem>
        ))}
      </Popover>
    </>
  )
}

export default LanguageSwitcher