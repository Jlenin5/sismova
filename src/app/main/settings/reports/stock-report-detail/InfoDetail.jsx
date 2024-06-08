import { useTranslation } from 'react-i18next'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { useFormContext } from 'react-hook-form'
import { useEffect, useState } from 'react'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Sales from './tabs/Sales'
import PurchaseOrders from './tabs/PurchaseOrders'
import Purchases from './tabs/Purchases'
import SalesReturn from './tabs/SalesReturn'
import PurchaseReturn from './tabs/PurchaseReturn'

const InfoDetail = () => {

  const methods = useFormContext()
  const { formState, watch, getValues } = methods
  const [tabValue, setTabValue] = useState(0)
  const { t } = useTranslation()

  const handleTabChange = (event, value) => {
    setTabValue(value)
  }

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  console.log(getValues())

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24 w-full min-w-0 p-24"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div className="sm:col-span-2 md:col-span-4">
        <Paper className="flex flex-col flex-auto p-10 pt-2 shadow rounded-2xl overflow-hidden">
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: 'w-full h-24 border-b-1' }}
          >
            <Tab className="h-24" label={t('sales')} />
            <Tab className="h-24" label={t('purchase_orders')} />
            <Tab className="h-24" label={t('purchases')} />
            <Tab className="h-24" label={t('sales_return')} />
            <Tab className="h-24" label={t('purchase_return')} />
          </Tabs>
          <div className="p-16 sm:p-24 max-w-full">
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              <Sales />
            </div>
            <div className={tabValue !== 1 ? 'hidden' : ''}>
              <PurchaseOrders />
            </div>
            <div className={tabValue !== 2 ? 'hidden' : ''}>
              <Purchases />
            </div>
            <div className={tabValue !== 3 ? 'hidden' : ''}>
              <SalesReturn />
            </div>
            <div className={tabValue !== 4 ? 'hidden' : ''}>
              <PurchaseReturn />
            </div>
          </div>
        </Paper>
      </motion.div>
    </motion.div>
  )
}

export default InfoDetail