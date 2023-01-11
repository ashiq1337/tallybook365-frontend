import React from 'react'
import Styles from "./Clients.module.scss";
import Header from "../../components/header/Header";
import AllClients from '../../components/clients/AllClients';

export default function Clients() {
  return (
    <div className={Styles.main}>
    <Header
      title={"All Clients"}
      link="/clients/addClient"
      btnName={"Add clients"}
    />
    <AllClients/>
  </div>
  )
}
