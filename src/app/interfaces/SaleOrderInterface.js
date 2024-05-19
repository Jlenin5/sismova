const SaleOrderInterface = {
  id: null,
  code: '00000002',
  warehouse_id: 1,
  client_id: 1,
  employee_id: 1,
  date: new Date(),
  due_date: new Date(),
  discount: 0.00,
  sub_total: 0.00,
  tax: 1,
  tax_total: 0.00,
  shipping: 0.00,
  discount: 0.00,
  sub_total: 0.00,
  total: 0.00,
  status: 1,
  is_approved: 1,
  date_approved: new Date(),
  warehouses: [],
  clients: [],
  employees: [],
  sale_order_details: []
}

export default SaleOrderInterface