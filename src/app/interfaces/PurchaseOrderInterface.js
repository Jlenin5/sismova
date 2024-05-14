const PurchaseOrderInterface = {
  id: null,
  code: '00000001',
  warehouse_id: 1,
  supplier_id: 1,
  employee_id: 1,
  supplier_document: '',
  date: new Date(),
  discount: 0.00,
  sub_total: 0.00,
  total: 0.00,
  status: 1,
  is_approved: 1,
  date_approved: new Date(),
  warehouses: [],
  suppliers: [],
  employees: [],
  purchase_order_details: []
}

export default PurchaseOrderInterface