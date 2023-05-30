import React from "react";
import Styles from "./VendorDetails.module.scss";
import Header from "../../components/header/Header";
import EditVendor from "../../components/vendor/EditVendor";

export default function VendorDetails() {
  return (
    <div className={Styles.main}>
      <Header
        title={"Edit Vendor"}
        link="/invoice/invoices"
        btnName={"All clients"}
      />
      {/* <EditVendor /> */}
    </div>
  );
}
