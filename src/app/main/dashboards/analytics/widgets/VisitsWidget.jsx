import es from 'app/configs/navigation-i18n/es'
import { useTheme } from '@mui/material/styles'
import ReactApexChart from 'react-apexcharts'
import { useSelector } from 'react-redux'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { selectWidgets } from '../store/widgetsSlice'

function Impressions(props) {
  const theme = useTheme()
  const widgets = useSelector(selectWidgets)
  const { series, amount, labels } = widgets?.visits

  const chartOptions = {
    chart: {
      animations: {
        enabled: false,
      },
      fontFamily: 'inherit',
      foreColor: 'inherit',
      height: '100%',
      type: 'area',
      sparkline: {
        enabled: true,
      },
    },
    colors: [theme.palette.error.main],
    fill: {
      colors: [theme.palette.error.light],
      opacity: 0.5,
    },
    stroke: {
      curve: 'smooth',
    },
    tooltip: {
      followCursor: true,
      theme: 'dark',
    },
    xaxis: {
      type: 'category',
      categories: labels,
    },
  }

  return (
    <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
      <div className="flex items-start justify-between m-24 mb-0">
        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
        {es.dashboard.analystic.staff.staff}
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
              <span className="font-medium text-red-500">{es.dashboard.analystic.staff.employee}</span>
              <span className="ml-4">below target</span>
            </Typography>
          </div>
          <div className="users">
            <Typography
              className="flex items-center ml-4 lg:ml-0 lg:mt-2 text-md leading-none whitespace-nowrap"
              color="text.secondary"
            >
              <span className="font-medium text-red-500">{es.dashboard.analystic.staff.users}</span>
              <span className="ml-4">below target</span>
            </Typography>
          </div>
          <div className="clients">
            <Typography
              className="flex items-center ml-4 lg:ml-0 lg:mt-2 text-md leading-none whitespace-nowrap"
              color="text.secondary"
            >
              <span className="font-medium text-red-500">{es.dashboard.analystic.staff.clients}</span>
              <span className="ml-4">below target</span>
            </Typography>
          </div>
          <div className="providers">
            <Typography
              className="flex items-center ml-4 lg:ml-0 lg:mt-2 text-md leading-none whitespace-nowrap"
              color="text.secondary"
            >
              <span className="font-medium text-red-500">{es.dashboard.analystic.staff.providers}</span>
              <span className="ml-4">below target</span>
            </Typography>
          </div>
        </div>
      </div>
    </Paper>
  )
}

export default Impressions
