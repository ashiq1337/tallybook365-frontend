import React from 'react'
import Styles from "./Vendors.module.scss";
import Header from "../../components/header/Header";
import AllVendors from '../../components/vendor/AllVendors';

export default function Vendors() {
  return (
    <div className={Styles.main}>
    <Header
      title={"All Vendors"}
      link="/clients/addClient"
      btnName={"Add vendors"}
    />
    <AllVendors/>
  </div>
  )
}
