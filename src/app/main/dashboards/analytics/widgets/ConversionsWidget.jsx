import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { selectWidgets } from '../store/widgetsSlice';

function ConversionsWidget(props) {
  const theme = useTheme();
  const widgets = useSelector(selectWidgets);
  const { series, amount, labels } = widgets?.conversions;

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
    colors: [theme.palette.secondary.main],
    fill: {
      colors: [theme.palette.secondary.light],
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
          Ventas
        </Typography>
        {/* <div className="ml-8">
          <Chip size="small" className="font-medium text-sm" label=" 30 days" />
        </div> */}
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center m-24">
        <FuseSvgIcon size={70} className="text-red-500">
          material-outline:point_of_sale
        </FuseSvgIcon>
        <div className="flex lg:flex-col lg:ml-12">
          <div className="sale-order">
            <Typography
              className="flex items-center ml-4 lg:ml-0 lg:mt-2 text-md leading-none whitespace-nowrap"
              color="text.secondary"
            >
              <span className="font-medium text-red-500">Órdenes de venta</span>
              <span className="ml-4">25</span>
            </Typography>
          </div>
          <div className="tickets">
            <Typography
              className="flex items-center ml-4 lg:ml-0 lg:mt-2 text-md leading-none whitespace-nowrap"
              color="text.secondary"
            >
              <span className="font-medium text-red-500">Boletas</span>
              <span className="ml-4">25</span>
            </Typography>
          </div>
          <div className="invoices">
            <Typography
              className="flex items-center ml-4 lg:ml-0 lg:mt-2 text-md leading-none whitespace-nowrap"
              color="text.secondary"
            >
              <span className="font-medium text-red-500">Facturas</span>
              <span className="ml-4">25</span>
            </Typography>
          </div>
          <div className="quotes">
            <Typography
              className="flex items-center ml-4 lg:ml-0 lg:mt-2 text-md leading-none whitespace-nowrap"
              color="text.secondary"
            >
              <span className="font-medium text-red-500">Cotizaciones</span>
              <span className="ml-4">25</span>
            </Typography>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default ConversionsWidget;
