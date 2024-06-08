import { useTranslation } from 'react-i18next'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { useFormContext } from 'react-hook-form'

const Warehouses = () => {

  const { t } = useTranslation()
  const methods = useFormContext()
  const { getValues } = methods

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24 w-full min-w-0 p-24"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div>
        <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden h-full">
          <div className="flex flex-col sm:flex-row items-start justify-between">
            <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
              {t('warehouse')}
            </Typography>
            <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
              {t('quantity')}
            </Typography>
          </div>
          {getValues().warehouses.map((n) => {
            return (
              <div className="flex flex-col sm:flex-row items-start justify-between" key={n.id}>
                <div>
                  {n.name}
                </div>
                <div>
                  {n.quantity}
                </div>
              </div>
            )
          })}
        </Paper>
      </motion.div>
    </motion.div>
  )
}

export default Warehouses