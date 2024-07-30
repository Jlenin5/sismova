const PurchaseOrderInterface = {
  id: null,
  code: '',
  description: '',
  company_id: null,
  branch_office_id: null,
  warehouse_id: null,
  supplier_id: null,
  employee_id: null,
  supplier_document: '',
  sub_total: 0.00,
  total: 0.00,
  status: 1,
  is_approved: 1,
  is_paid: 1,
  supplier_document_date: new Date(),
  currency: 1,
  exchange_rate: 1,
  companies: [],
  branch_offices: [],
  warehouses: [],
  suppliers: [],
  employees: [],
  purchase_order_details: []
}

export default PurchaseOrderInterface