import React from "react";
import Styles from "./AddWorkorder.module.scss";
import Header from "../../components/header/Header";
import AddWorkorderForm from "../../components/workorders/AddWorkorderForm";

export default function AddWorkorder() {
  return (
    <div className={Styles.main}>
      <Header
        title={"Create Purchase order"}
        link="/workorder/workorders"
        btnName={"All workorders"}
      />
      <AddWorkorderForm />
    </div>
  );
}
