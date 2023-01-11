import React from "react";
import Header from "../../components/header/Header";
import AllQuotations from "../../components/quotations/AllQuotations";
import Styles from "./Quotations.module.scss";

export default function Quotations() {
  return (
    <div className={Styles.main}>
      <Header
        title={"All Quotations"}
        link="/quotation/addQuotation"
        btnName={"Add quotation"}
      />
      <AllQuotations />
    </div>
  );
}
