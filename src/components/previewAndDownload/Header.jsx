import React from "react";
import logo from "../../assets/cpro.png";
import classes from "./Header.module.scss";

export default function Header() {
  return (
    <>
      <header>
        <div className={classes.header}>
          <img className={classes.img} src={logo} alt="content pro logo" />

          <div className={classes.header2}>
            <h3>ContentPro Interactive Limited</h3>
            <div>
              <p>House-73 , Road-02 , Block-A</p>
              <p>Niketon, Gulshan, Dhaka - 1212.</p>
              <p>Phone: +880 1847069232</p>
              <p>www.contentprobd.com</p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
