import React from "react";
import Styles from "./Invoices.module.scss";
import Header from "../../components/header/Header";
import AllInvoices from "../../components/invoices/AllInvoices";

export default function Invoices() {
  return (
    <div className={Styles.main}>
      <Header title={"All Invoices"} />
      <AllInvoices />
    </div>
  );
}
