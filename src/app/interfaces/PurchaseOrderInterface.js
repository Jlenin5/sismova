const PurchaseOrderInterface = {
  id: null,
  SerialNumber: 3,
  puorNumber: '00000',
  Currency: 1,
  Company: 1,
  BranchOffice: 1,
  Supplier: 1,
  User: 1,
  puorSubtotal: 0.00,
  puorIgv: 0.00,
  puorTotal: 0.00,
  puorStartDate: new Date(),
  puorEndDate: new Date(),
  serial_number: [],
  currencies: [],
  companies: [],
  branch_offices: [],
  suppliers: [],
  users: [],
  quote_details: []
}

export default PurchaseOrderInterface