import { useTranslation } from 'react-i18next'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Tooltip from '@mui/material/Tooltip'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from '@mui/system'
import TableHead from '@mui/material/TableHead'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { lighten } from '@mui/material/styles'
import { delEmployeeMulti } from '../store/employeesSlice'

function EmployeeTableHead(props) {
  const dispatch = useDispatch()
  const numSelected = props.ids.length
  const [selectedEmployeeMenu, setSelectedEmployeeMenu] = useState(null)
  const { t } = useTranslation()

  const rows = [
    {
      id: 'id',
      align: 'left',
      disablePadding: false,
      label: '',
      sort: false,
    },
    {
      id: 'empFirstName',
      align: 'left',
      disablePadding: false,
      label: t('name'),
      sort: true,
    },
    {
      id: 'empEmail',
      align: 'left',
      disablePadding: false,
      label: t('e_mail'),
      sort: true,
    },
    {
      id: 'empDocument',
      align: 'left',
      disablePadding: false,
      label: t('n_document'),
      sort: true,
    },
    {
      id: 'empPhone',
      align: 'left',
      disablePadding: false,
      label: t('cell_phone'),
      sort: true,
    },
    {
      id: 'empGender',
      align: 'left',
      disablePadding: false,
      label: t('sex'),
      sort: true,
    },
    {
      id: 'empState',
      align: 'left',
      disablePadding: false,
      label: t('state'),
      sort: true,
    },
    {
      id: 'actions',
      align: 'left',
      disablePadding: false,
      label: t('actions'),
      sort: true,
    },
  ]

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property)
  }

  function openSelectedEmployeeMenu(event) {
    setSelectedEmployeeMenu(event.currentTarget)
  }

  function closeSelectedEmployeeMenu() {
    setSelectedEmployeeMenu(null)
  }

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        <TableCell
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? lighten(theme.palette.background.default, 0.4)
                : lighten(theme.palette.background.default, 0.02),
          }}
          padding="none"
          className="w-40 md:w-64 text-center z-99"
        >
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < props.rowCount}
            checked={props.rowCount !== 0 && numSelected === props.rowCount}
            onChange={props.onSelectAllClick}
          />
          {numSelected > 0 && (
            <Box
              className="flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1"
              sx={{
                background: (theme) => theme.palette.background.default,
              }}
            >
              <IconButton
                aria-owns={selectedEmployeeMenu ? 'selectedEmployeeMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedEmployeeMenu}
                size="large"
              >
                <FuseSvgIcon>heroicons-outline:dots-horizontal</FuseSvgIcon>
              </IconButton>
              <Menu
                id="selectedEmployeeMenu"
                anchorEl={selectedEmployeeMenu}
                open={Boolean(selectedEmployeeMenu)}
                onClose={closeSelectedEmployeeMenu}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      dispatch(delEmployeeMulti(props.ids))
                      props.onMenuItemClick()
                      closeSelectedEmployeeMenu()
                    }}
                  >
                    <ListItemIcon className="min-w-40">
                      <FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
                    </ListItemIcon>
                    <ListItemText primary={t('delete')} />
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          )}
        </TableCell>
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
              sortDirection={props.order.id === row.id ? props.order.direction : false}
            >
              {row.sort && (
                <Tooltip
                  placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
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

export default EmployeeTableHead