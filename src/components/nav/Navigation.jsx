import React from "react";
import { NavLink, Link } from "react-router-dom";
import Styles from "./Navigation.module.scss";
import { HiMenu } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import {
  BiUserPlus,
  BiTask,
  BiHome,
  BiDockLeft,
  BiLogOut,
  BiUser,
  BiFolder,
  BiFolderPlus,
  BiFile,
} from "react-icons/bi";
import { IoPeopleOutline, IoPeopleSharp } from "react-icons/io5";

export default function Navigation({ closeBtn }) {
  const navigate = useNavigate();

  function onLogOutClick() {
    if (confirm("Do you want to logout?")) {
      localStorage.clear();
      navigate("/login");
    } else {
      return;
    }
  }

  return (
    <div className={Styles.main}>
      <div className={Styles.linkContainer}>
        <div className={Styles.head}>
          <HiMenu
            className={Styles.icon}
            onClick={() => {
              closeBtn();
            }}
          />
          <Link to="/" className={Styles.logoText}>
            TallyBook365
          </Link>
        </div>

        <NavLink to="/" className={Styles.link}>
          <BiHome /> Overview
        </NavLink>

        <NavLink to="clients/clients" className={Styles.link}>
          <BiUser /> Clients
        </NavLink>

        <NavLink to="clients/addClient" className={Styles.link}>
          <BiUserPlus /> Create Client
        </NavLink>

        <NavLink to="vendors/vendors" className={Styles.link}>
          <IoPeopleOutline /> Vendors
        </NavLink>

        <NavLink to="vendors/addVendor" className={Styles.link}>
          <IoPeopleSharp /> Create Vendor
        </NavLink>

        <NavLink to="quotation/quotations" className={Styles.link}>
          <BiFolder /> Quotations
        </NavLink>

        <NavLink to="quotation/addQuotation" className={Styles.link}>
          <BiFolderPlus /> Create Quotation
        </NavLink>

        <NavLink to="invoice/invoices" className={Styles.link}>
          <BiTask />All Invoices
        </NavLink>

        <NavLink to="chalan/chalans" className={Styles.link}>
          <BiDockLeft />All Chalans
        </NavLink>

        <NavLink to="workorder/workorders" className={Styles.link}>
          <BiFile /> All Purchase orders
        </NavLink>

        <div className={Styles.link} onClick={onLogOutClick}>
          <BiLogOut /> Logout
        </div>
      </div>
    </div>
  );
}
