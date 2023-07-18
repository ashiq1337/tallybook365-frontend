import React from "react";
import Styles from "./WorkorderDetails.module.scss";
import Header from "../../components/header/Header";
import EditWorkorder from "../../components/workorders/EditWorkorder";

export default function WorkorderDetails() {
  return (
    <div className={Styles.main}>
      <Header title={"Edit Purchase Order"} />
      <EditWorkorder />
    </div>
  );
}
