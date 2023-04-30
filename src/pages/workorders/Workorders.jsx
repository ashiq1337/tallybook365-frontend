import React from "react";
import Styles from "./Workorders.module.scss";
import Header from "../../components/header/Header";
import AllWorkorders from "../../components/workorders/AllWorkorders";

export default function Workorders() {
  return (
    <div className={Styles.main}>
      <Header
        title={"All Purchase Orders"}
        link="/workorder/addWorkorder"
        btnName={"Add workorder"}
      />
      <AllWorkorders />
    </div>
  );
}
