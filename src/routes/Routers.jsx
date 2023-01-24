import React from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import ErrorPage from "../components/error/ErrorPage";
import Spinner from "../components/error/Spinner";
import RootLayout from "../layouts/rootLayout";
import Landing from "../pages/Landing";
import Clients from "../pages/clients/Clients";
import AddClients from "../pages/clients/AddClients";
import ClientDetails from "../pages/clients/ClientDetails";
import Quotations from "../pages/quotations/Quotations";
import AddQuotations from "../pages/quotations/AddQuotation";
import QuotationDetails from "../pages/quotations/QuotationDetails";
import Invoices from "../pages/invoices/invoices";
import AddInvoice from "../pages/invoices/AddInvoice";
import InvoiceDetails from "../pages/invoices/InvoiceDetails";
import Chalans from "../pages/chalans/Chalans";
import AddChalan from "../pages/chalans/AddChalan";
import ChalanDetails from "../pages/chalans/ChalanDetails";
import Workorders from "../pages/workorders/Workorders";
import AddWorkorder from "../pages/workorders/AddWorkorder";
import WorkorderDetails from "../pages/workorders/WorkorderDetails";
import Preview from "../components/previewAndDownload/Preview";

export default function Routers() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<ErrorPage />}>
        <Route errorElement={<ErrorPage />} element={<RootLayout />}>
          <Route index element={<Landing />} />

          <Route errorElement={<ErrorPage />}>
            <Route path="quotation/quotations" element={<Quotations />} />
            <Route path="quotation/addQuotation" element={<AddQuotations />} />
            <Route
              path="quotation/:quotationId"
              element={<QuotationDetails />}
            />
            <Route path="quotationPreview/:quotationId" element={<Preview />} />
          </Route>

          <Route errorElement={<ErrorPage />}>
            <Route path="clients/clients" element={<Clients />} />
            <Route path="clients/addClient" element={<AddClients />} />
            <Route path="clients/:clientId" element={<ClientDetails />} />
          </Route>

          <Route errorElement={<ErrorPage />}>
            <Route path="invoice/invoices" element={<Invoices />} />
            <Route path="invoice/addInvoice" element={<AddInvoice />} />
            <Route path="invoice/:invoiceId" element={<InvoiceDetails />} />
          </Route>

          <Route errorElement={<ErrorPage />}>
            <Route path="chalan/chalans" element={<Chalans />} />
            <Route path="chalan/addChalan" element={<AddChalan />} />
            <Route path="chalan/:chalanId" element={<ChalanDetails />} />
          </Route>

          <Route errorElement={<ErrorPage />}>
            <Route path="workorder/workorders" element={<Workorders />} />
            <Route path="workorder/addWorkorder" element={<AddWorkorder />} />
            <Route
              path="workorder/:workorderId"
              element={<WorkorderDetails />}
            />
          </Route>
        </Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="reg" element={<SignUp />}></Route>
      </Route>
    )
  );
  return <RouterProvider router={router} fallbackElement={<Spinner />} />;
}
