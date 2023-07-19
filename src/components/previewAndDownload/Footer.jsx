import React from "react";
//import signature from "../../assets/signature.png";
import classes from "./Footer.module.scss";
import logo from "../../assets/LetterHeadFooter.png";

export default function Footer() {
  return (
    <div className={classes.bottom}>
      <img className={classes.image} src={logo} alt="header" />
    </div>
  );
}
