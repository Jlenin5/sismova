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
import { delUserMulti } from '../store/userSlice'

const rows = [
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: '',
    sort: false,
  },
  {
    id: 'userDisplayName',
    align: 'left',
    disablePadding: false,
    label: 'Usuario',
    sort: true,
  },
  {
    id: 'Employee',
    align: 'left',
    disablePadding: false,
    label: 'Nombre',
    sort: true,
  },
  {
    id: 'WorkArea',
    align: 'left',
    disablePadding: false,
    label: 'área de trabajo',
    sort: true,
  },
  {
    id: 'JobPosition',
    align: 'left',
    disablePadding: false,
    label: 'Puesto',
    sort: true,
  },
  {
    id: 'Rol',
    align: 'left',
    disablePadding: false,
    label: 'Rol',
    sort: true,
  },
]

const UserTableHead = (props) => {
  const dispatch = useDispatch()
  const numSelected = props.ids.length
  
  const [selectedCategoriesMenu, setSelectedCategoriesMenu] = useState(null)

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property)
  }

  function openSelectedCategoriesMenu(event) {
    setSelectedCategoriesMenu(event.currentTarget)
  }

  function closeSelectedCategoriesMenu() {
    setSelectedCategoriesMenu(null)
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
                aria-owns={selectedCategoriesMenu ? 'selectedCategoriesMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedCategoriesMenu}
                size="large"
              >
                <FuseSvgIcon>heroicons-outline:dots-horizontal</FuseSvgIcon>
              </IconButton>
              <Menu
                id="selectedCategoriesMenu"
                anchorEl={selectedCategoriesMenu}
                open={Boolean(selectedCategoriesMenu)}
                onClose={closeSelectedCategoriesMenu}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      dispatch(delUserMulti(props.ids))
                      props.onMenuItemClick()
                      closeSelectedCategoriesMenu()
                    }}
                  >
                    <ListItemIcon className="min-w-40">
                      <FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="Eliminar" />
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

export default UserTableHead