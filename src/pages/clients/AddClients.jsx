import React from 'react'
import Styles from "./Clients.module.scss";
import Header from "../../components/header/Header";
import AddClientsForm from '../../components/clients/AddClientsForm';

export default function AddClients() {
  return (
    <div className={Styles.main}>
    <Header
      title={"Add Client"}
      link="/clients/clients"
      btnName={"All clients"}
    />
    <AddClientsForm/>
  </div>
  )
}
