import React from "react";
import Styles from "./AddInvoice.module.scss";
import Header from "../../components/header/Header";
import AddInvoiceForm from "../../components/invoices/AddInvoiceForm";

export default function AddInvoice() {
  return (
    <div className={Styles.main}>
      <Header title={"Create Invoice"} />
      <AddInvoiceForm />
    </div>
  );
}
