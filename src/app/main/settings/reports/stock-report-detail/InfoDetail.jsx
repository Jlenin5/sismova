import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { useFormContext } from 'react-hook-form'

const InfoDetail = () => {

  const methods = useFormContext()
  const { formState, watch, getValues } = methods

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
        <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start justify-between">
            <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
              Github Issues Summary
            </Typography>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-24 w-full mt-32 sm:mt-16">
          </div>
        </Paper>
      </motion.div>
    </motion.div>
  )
}

export default InfoDetail