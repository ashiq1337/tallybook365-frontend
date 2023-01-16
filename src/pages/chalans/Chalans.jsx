import React from "react";
import Styles from "./Chalans.module.scss";
import Header from "../../components/header/Header";
import AllChalans from "../../components/chalans/AllChalans";

export default function Chalans() {
  return (
    <div className={Styles.main}>
      <Header
        title={"All Chalans"}
        link="/chalan/addChalan"
        btnName={"Add chalan"}
      />
      <AllChalans />
    </div>
  );
}
