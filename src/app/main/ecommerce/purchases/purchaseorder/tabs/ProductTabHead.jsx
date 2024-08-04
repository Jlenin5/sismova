import { useTranslation } from 'react-i18next'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Tooltip from '@mui/material/Tooltip'
import TableHead from '@mui/material/TableHead'
import { lighten } from '@mui/material/styles'

const ProductTabHead = () => {

  const { t } = useTranslation()

  const rows = [
    {
      id: 'code',
      align: 'left',
      disablePadding: false,
      label: t('code'),
      sort: true,
    },
    {
      id: 'product',
      align: 'left',
      disablePadding: false,
      label: t('product'),
      sort: true,
    },
    {
      id: 'price',
      align: 'left',
      disablePadding: false,
      label: t('price'),
      sort: true,
    },
    {
      id: 'quantity',
      align: 'left',
      disablePadding: false,
      label: t('quantity'),
      sort: true,
    },
    {
      id: 'tax',
      align: 'left',
      disablePadding: false,
      label: t('tax'),
      sort: true,
    },
    {
      id: 'total',
      align: 'left',
      disablePadding: false,
      label: t('total'),
      sort: true,
    },
]

  return (
    <TableHead className='w-full'>
      <TableRow className="h-48 sm:h-64">
        {rows.map((row) => {
          return (
            <TableCell
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
            >
              {row.sort && (
                <Tooltip
                  placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          )
        }, this)}
      </TableRow>
    </TableHead>
  )
}

export default ProductTabHead