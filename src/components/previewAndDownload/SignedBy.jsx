import React from "react";
import signature from "../../assets/signature.png";
import classes from "./SignedBy.module.scss";
//import logo from "../../assets/LetterHeadFooter.png";

export default function SignedBy() {
  return (
    <div className={classes.owner}>
      <img className={classes.img} src={signature} alt="signature" />
      <h4>Authorized By:</h4>
      <p>Kazi Md Asif</p>
      <p>Managing Director</p>
    </div>
  );
}
