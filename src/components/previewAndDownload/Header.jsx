import React from "react";
import logo from "../../assets/LetterHeadHeader.png";
import classes from "./Header.module.scss";

export default function Header() {
  return (
    <>
        <div className={classes.header}>
          <img className={classes.img} src={logo} alt="header" />
        </div>
    </>
  );
}
