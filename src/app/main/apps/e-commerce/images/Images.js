import withReducer from 'app/store/withReducer'
import reducer from '../store'
import React from 'react'

function Images() {
  return (
    <div>Images</div>
  )
}

export default withReducer('ecommerceApp', reducer)(Images)