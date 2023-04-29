import React from "react";
import Styles from "./ChalanDetails.module.scss";
import Header from "../../components/header/Header";
import EditChalan from "../../components/chalans/EditChalan";

export default function ChalanDetails() {
  return (
    <div className={Styles.main}>
      <Header
        title={"Edit Chalan"}
        link="/chalan/chalans"
        btnName={"All chalans"}
      />
      <EditChalan />
    </div>
  );
}
