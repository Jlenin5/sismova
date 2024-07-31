const PurchaseOrderInterface = {
  id: null,
  code: '',
  description: '',
  company_id: null,
  branch_office_id: null,
  warehouse_id: null,
  supplier_id: null,
  supplier_document: '',
  currency_id: null,
  exchange_rate: 1,
  discount: 0.00,
  approved: 0,
  paid: 0,
  status: 1,
  date_approved: null,
  supplier_document_date: null,
  user_approved_id: null,
  migrate_purchase: 0,
  migrate_kardex: 0,
  currencies: [],
  companies: [],
  branch_offices: [],
  warehouses: [],
  suppliers: [],
  purchase_order_details: []
}

export default PurchaseOrderInterface