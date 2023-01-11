import React from "react";
import Styles from "./QuotationDetails.module.scss";
import Header from "../../components/header/Header";
import EditQuotation from "../../components/quotations/EditQuotation";

export default function QuotationDetails() {
  return (
    <div className={Styles.main}>
      <Header
        title={"Edit Quotation"}
        link="/quotation/quotations"
        btnName={"All quotations"}
      />
      <EditQuotation />
    </div>
  );
}
