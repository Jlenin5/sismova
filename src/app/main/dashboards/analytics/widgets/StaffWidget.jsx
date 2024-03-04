import { useTranslation } from 'react-i18next'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'

const StaffWidget = () => {

  const { t } = useTranslation()

  return (
    <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
      <div className="flex items-start justify-between m-24 mb-0">
        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
          {t('staff')}
        </Typography>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center m-24">
        <FuseSvgIcon size={70} className="text-red-500">
          heroicons-outline:user-group
        </FuseSvgIcon>
        <div className="flex lg:flex-col lg:ml-12">
          <div className="employees">
            <Typography
              className="flex items-center ml-4 lg:ml-0 lg:mt-2 text-md leading-none whitespace-nowrap"
              color="text.secondary"
            >
              <span className="font-medium text-red-500">
                {t('employees')}
              </span>
              <span className="ml-4">below target</span>
            </Typography>
          </div>
          <div className="users">
            <Typography
              className="flex items-center ml-4 lg:ml-0 lg:mt-2 text-md leading-none whitespace-nowrap"
              color="text.secondary"
            >
              <span className="font-medium text-red-500">
                {t('users')}
              </span>
              <span className="ml-4">below target</span>
            </Typography>
          </div>
          <div className="clients">
            <Typography
              className="flex items-center ml-4 lg:ml-0 lg:mt-2 text-md leading-none whitespace-nowrap"
              color="text.secondary"
            >
              <span className="font-medium text-red-500">
                {t('clients')}
              </span>
              <span className="ml-4">below target</span>
            </Typography>
          </div>
          <div className="providers">
            <Typography
              className="flex items-center ml-4 lg:ml-0 lg:mt-2 text-md leading-none whitespace-nowrap"
              color="text.secondary"
            >
              <span className="font-medium text-red-500">
                {t('providers')}
              </span>
              <span className="ml-4">below target</span>
            </Typography>
          </div>
        </div>
      </div>
    </Paper>
  )
}

export default StaffWidget