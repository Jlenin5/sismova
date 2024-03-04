import es from 'app/configs/navigation-i18n/es'
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { selectWidgets } from '../store/widgetsSlice';

function Impressions(props) {
  const theme = useTheme();
  const widgets = useSelector(selectWidgets);
  const { series, amount, labels } = widgets?.impressions;

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
    colors: [theme.palette.success.main],
    fill: {
      colors: [theme.palette.success.light],
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
  };

  return (
    <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
      <div className="flex items-start justify-between m-24 mb-0">
        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
          {es.dashboard.analystic.purchase.purchase}
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
            <span className="font-medium text-red-500">{es.dashboard.analystic.purchase.purchase_order}</span>
            <span className="ml-4">40</span>
          </Typography>
        </div>
      </div>
    </Paper>
  );
}

export default Impressions;
