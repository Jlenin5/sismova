import { useTranslation } from 'react-i18next'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'

const PurchaseWidget = (props) => {

  const { t } = useTranslation()

  return (
    <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
      <div className="flex items-start justify-between m-24 mb-0">
        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
          {t('purchases')}
        </Typography>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center m-24">
        <FuseSvgIcon size={70} className="text-red-500">
          material-outline:add_shopping_cart
        </FuseSvgIcon>
        <div className="flex lg:flex-col lg:ml-12">
          <Typography
            className="flex items-center ml-4 lg:ml-0 lg:mt-2 text-md leading-none whitespace-nowrap"
            color="text.secondary"
          >
            <span className="font-medium text-red-500">{t('purchase_orders')}</span>
            <span className="ml-4">40</span>
          </Typography>
        </div>
      </div>
    </Paper>
  )
}

export default PurchaseWidget