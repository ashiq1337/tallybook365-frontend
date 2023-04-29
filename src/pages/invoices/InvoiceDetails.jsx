import React from "react";
import Styles from "./InvoiceDetails.module.scss";
import Header from "../../components/header/Header";
import EditInvoice from "../../components/invoices/EditInvoice";

export default function InvoiceDetails() {
  return (
    <div className={Styles.main}>
      <Header
        title={"Edit Invoice"}
        link="/invoice/invoices"
        btnName={"All invoices"}
      />
      <EditInvoice />
    </div>
  );
}
