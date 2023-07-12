import React from "react";
import Styles from "./Vendors.module.scss";
import Header from "../../components/header/Header";
import AddVendorsForm from "../../components/vendor/AddVendorsForm";

export default function AddVendors() {
  return (
    <div className={Styles.main}>
      <Header title={"Create Vendor"} />
      <AddVendorsForm />
    </div>
  );
}
