import React from "react";
import signature from "../../assets/signature.png";
import classes from "./Footer.module.scss";
import logo from "../../assets/LetterHeadFooter.png";

export default function Footer({ company = "" }) {
  return (
    <div className={classes.footer}>
      <div className={classes.owner}>
        <img className={classes.img} src={signature} alt="signature" />
        <h4>Authorized By:</h4>
        <p>Kazi Md Asif</p>
        <p>Managing Director</p>
      </div>
      <div className={classes.bottom}>
        {/* <img className={classes.image} src={logo} alt="header" /> */}
      </div>
    </div>
  );
}
