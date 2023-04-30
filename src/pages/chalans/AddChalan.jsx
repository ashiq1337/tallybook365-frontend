import React from "react";
import Styles from "./AddChalan.module.scss";
import Header from "../../components/header/Header";
import AddChalanForm from "../../components/chalans/AddChalanForm";

export default function AddChalan() {
  return (
    <div className={Styles.main}>
      <Header
        title={"Create Chalan"}
        link="/chalan/chalans"
        btnName={"All chalans"}
      />
      <AddChalanForm />
    </div>
  );
}
