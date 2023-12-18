import _ from '@lodash'
import { useEffect, useState } from 'react'
import { getUsers } from '../store/UserSlice'
import { motion } from 'framer-motion'
import FuseScrollbars from '@fuse/core/FuseScrollbars'
import FuseLoading from '@fuse/core/FuseLoading'
import Typography from '@mui/material/Typography'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import UserTableHead from './UserTableHead'

const Users = (props) => {
  const {data, setData,} = props
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  })
  
  useEffect(() => {
    getUsers()
    .then((response) => {
      setData(response)
      setLoading(false)
    })
    .catch((error) => {
      console.error('Error al obtener usuarios', error)
      setLoading(false)
    })
  }, [])

  function handleRequestSort(event, property) {
    const id = property
    let direction = 'desc'
    if (order.id === property && order.direction === 'desc') {
      direction = 'asc'
    }
    setOrder({
      direction,
      id,
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    )
  }

  // if (data.length === 0) {
  //   return (
  //     <motion.div
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1, transition: { delay: 0.1 } }}
  //       className="flex flex-1 items-center justify-center h-full"
  //     >
  //       <Typography color="text.secondary" variant="h5">
  //         No hay usuarios
  //       </Typography>
  //     </motion.div>
  //   )
  // }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <UserTableHead
            // selectedProductIds={selected}
            order={order}
            // onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            // rowCount={data.length}
            // onMenuItemClick={handleDeselect}
            // deleteMultiple={deleteMultiple}
          />
          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    case 'categories': {
                      return o.categories[0]
                    }
                    default: {
                      return o[order.id]
                    }
                  }
                },
              ],
              [order.direction]
            )
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                // const isSelected = selected.indexOf(n.id) !== -1
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    // aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    // selected={isSelected}
                    // onClick={(event) => handleClick(n)}
                    // onClick={() => handleClickOpen( setDataToEdit(n) )}
                  >
                    {/* <TableCell className="w-40 md:w-64 text-center" padding="none">
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.id)}
                      />
                    </TableCell> */}
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.name}
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      {n.password}
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      {n.state ? (
                        <FuseSvgIcon className="text-green" size={20}>
                          heroicons-outline:check-circle
                        </FuseSvgIcon>
                      ) : (
                        <FuseSvgIcon className="text-red" size={20}>
                          heroicons-outline:minus-circle
                        </FuseSvgIcon>
                      )}
                    </TableCell>
                  </TableRow>
                )
              }
            )}
          </TableBody>
        </Table>
      </FuseScrollbars>
    </div>
  )
}

export default Users
