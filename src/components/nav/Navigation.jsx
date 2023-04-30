import React from "react";
import { NavLink, Link } from "react-router-dom";
import Styles from "./Navigation.module.scss";
import { AiOutlineHome } from "react-icons/ai";
import { IoPersonAddOutline } from "react-icons/io5";
import Logo from "../../assets/logo.png";
import { HiMenu } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import {
  BiDockBottom,
  BiUserPlus,
  BiTask,
  BiHome,
  BiDockLeft,
  BiLogOut,
  BiUser,
  BiFolder,
  BiFolderPlus,
  BiListUl,
  BiListPlus,
  BiFileBlank,
  BiFile,
} from "react-icons/bi";

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
            {/* <img className={Styles.logo} src={Logo} alt="logo" /> */}
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

        <NavLink to="quotation/quotations" className={Styles.link}>
          <BiFolder /> Quotations
        </NavLink>

        <NavLink to="quotation/addQuotation" className={Styles.link}>
          <BiFolderPlus />
          Create Quotation
        </NavLink>

        <NavLink to="invoice/invoices" className={Styles.link}>
          <BiTask />All Invoices
        </NavLink>

        {/* <NavLink to="invoice/addInvoice" className={Styles.link}>
          <BiTask />
          Create Invoice
        </NavLink> */}

        <NavLink to="chalan/chalans" className={Styles.link}>
          <BiDockLeft />All Chalans
        </NavLink>

        {/* <NavLink to="chalan/addChalan" className={Styles.link}>
          <BiDockLeft />
          Create Chalan
        </NavLink> */}

        <NavLink to="workorder/workorders" className={Styles.link}>
          <BiFile /> All Purchase orders
        </NavLink>

        <NavLink to="workorder/addWorkorder" className={Styles.link}>
          <BiFileBlank />
          Create Workorder
        </NavLink>

        <div className={Styles.link} onClick={onLogOutClick}>
          <BiLogOut /> Logout
        </div>
      </div>
    </div>
  );
}
