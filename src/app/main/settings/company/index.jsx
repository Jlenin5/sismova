import './company.css'
import { DialogContent, DialogActions, Button, TextField } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';

function Index() {
  return (
    <div className="inline-block p-24 sm:p-40 text-left print:p-0 w-full overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ bounceDamping: 0 }}
      >
        <Card className="w-xl p-64 mx-auto rounded-2xl shadow print:w-auto print:rounded-none print:shadow-none print:bg-transparent">
          <CardContent className="ctn-card-cmpn">
            <div className="gp-top flex items-start">
              <div className="w-full">
                <TextField
                  autoFocus
                  margin="dense"
                  id="outlined-Required"
                  variant="outlined"
                  label="Código"
                  type="text"
                  className='tf-name'
                  name='comName'
                  sx={{ width: '30ch' }}
                  // value={form.prodName}
                  // onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  id="outlined-Required"
                  variant="outlined"
                  label="R.U.C."
                  type="text"
                  className='tf-name'
                  name='comName'
                  sx={{ width: '30ch' }}
                  // value={form.prodName}
                  // onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  id="outlined-Required"
                  variant="outlined"
                  label="Razón social"
                  type="text"
                  className='tf-name'
                  fullWidth
                  name='comName'
                  // value={form.prodName}
                  // onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  id="outlined-Required"
                  variant="outlined"
                  label="Dirección"
                  type="text"
                  className='tf-name'
                  fullWidth
                  name='comName'
                  // value={form.prodName}
                  // onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  id="outlined-Required"
                  variant="outlined"
                  label="Correo electrónico"
                  type="text"
                  className='tf-name'
                  fullWidth
                  name='comName'
                  // value={form.prodName}
                  // onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-x-16 gap-y-4 ml-auto bg-red">
                <div className="place-self-center w-96">
                  <img className="w-96" src="" alt="lozgo" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>  
      </motion.div>
    </ div>
  )
}

export default Index  