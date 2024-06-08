import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormContext } from 'react-hook-form'
import SaleHeader from './header/SaleHeader'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import FuseScrollbars from '@fuse/core/FuseScrollbars'

const Sales = () => {

  const methods = useFormContext()
  const dispatch = useDispatch()
  const { getValues } = methods
  const { t } = useTranslation()

  const handleExportPdf = () => {
  }

  const handleExportExcel = () => {
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 border-blue-500 shadow-0"
        >
          <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>
          <Input
            placeholder={t('search')}
            className="flex flex-1"
            disableUnderline
            fullWidth
            // value={searchText}
            inputProps={{
              'aria-label': 'Search',
            }}
            // onChange={(ev) => dispatch(setProductSearchText(ev))}
          />
        </Paper>
        <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
          <Button
            className=""
            variant="contained"
            onClick={handleExportPdf}
            color="pdf"
            startIcon={<FuseSvgIcon>material-outline:insert_drive_file</FuseSvgIcon>}
          >
            {t('pdf')}
          </Button>
          <Button
            className=""
            variant="contained"
            onClick={handleExportExcel}
            color="excel"
            startIcon={<FuseSvgIcon>material-outline:insert_drive_file</FuseSvgIcon>}
          >
            {t('excel')}
          </Button>
        </div>
      </div>
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <SaleHeader />
          <TableBody>
            {getValues().sales.map((n) => {
              return (
                <TableRow
                  className="h-72"
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={n.id}
                >
                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.code}
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.date}
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.client}
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.warehouse}
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.branch_office}
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.company}
                  </TableCell>
                  
                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.quantity}
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.total}
                  </TableCell>

                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </FuseScrollbars>
    </>
  )
}

export default Sales