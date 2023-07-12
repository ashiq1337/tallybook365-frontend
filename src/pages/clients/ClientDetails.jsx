import React from "react";
import Styles from "./ClientDetails.module.scss";
import Header from "../../components/header/Header";
import EditClient from "../../components/clients/EditClient";

export default function ClientDetails() {
  return (
    <div className={Styles.main}>
      <Header title={"Edit Clients"} />
      <EditClient />
    </div>
  );
}
