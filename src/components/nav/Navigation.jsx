import React from "react";
import { NavLink, Link } from "react-router-dom";
import Styles from "./Navigation.module.scss";
import { AiOutlineHome } from "react-icons/ai";
import { IoPersonAddOutline } from "react-icons/io5";
import Logo from "../../assets/logo.png";
import { HiMenu } from "react-icons/hi";
import { MdOutlineAddBusiness, MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BsWindowDock } from "react-icons/bs";

export default function Navigation() {
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
      <div className={Styles.head}>
        {/* <HiMenu className={Styles.icon} /> */}
        <Link to="/">
          <img className={Styles.logo} src={Logo} alt="logo" />
        </Link>
      </div>

      <NavLink to="/" className={Styles.link}>
        <AiOutlineHome /> Overview
      </NavLink>

      <NavLink to="clients/clients" className={Styles.link}>
        <IoPersonAddOutline /> Clients
      </NavLink>

      <NavLink to="clients/addClient" className={Styles.link}>
        <IoPersonAddOutline /> Create Client
      </NavLink>

      <NavLink to="quotation/quotations" className={Styles.link}>
        <MdOutlineAddBusiness /> Quotations
      </NavLink>

      <NavLink to="quotation/addQuotation" className={Styles.link}>
        <MdOutlineAddBusiness />
        Create Quotation
      </NavLink>

      <NavLink to="invoice/invoices" className={Styles.link}>
        <BsWindowDock /> Invoices
      </NavLink>

      <NavLink to="invoice/addInvoice" className={Styles.link}>
        <BsWindowDock />
        Create Invoice
      </NavLink>

      <div className={Styles.link} onClick={onLogOutClick}>
        <MdOutlineLogout /> Logout
      </div>
    </div>
  );
}
