export const configuration = {
  //baseUrl: "http://localhost:8080",
  baseUrl: "https://tallybook365-production.up.railway.app",

  registerUser: "/api/v1/auth/register",
  loginUser: "/api/v1/auth/login",
  logoutUser: "/api/v1/auth/logout",

  quotations: "/api/v1/quotes",
  clients: "/api/v1/clients",
  vendors:"/api/v1/vendors",
  invoices: "/api/v1/invoices",
  chalans: "/api/v1/chalans",
  purchaseOrders: "/api/v1/purchaseorders",

  self: "/api/v1/showme",
  currentMonthTotal: "/api/v1/companies/sixmonthtotal",
  preview: "/api/v1",

  quotationJobNo: "/api/v1/quotes/getquoteserialnumber",
  invoiceJobNo: "/api/v1/invoices/getinvoiceserialnumber",
  chalanJobNo: "/api/v1/chalans/getchalanserialnumber",
  purchaseOrderJobNo: "/api/v1/purchaseorders/getpurchaseorderserialnumber",
  purchaseOrdersByQuote: "/api/v1/purchaseorders/getpurchaseordersbyquote",
  getQuotationByMonth: "/api/v1/quotes/getquotesbymonth?",
};
