import React from "react";
import signature from "../../assets/signature.png";
import classes from "./Footer.module.scss";

export default function Footer({ company = "" }) {
  return (
    <div className={classes.footer}>
      <div className={classes.owner}>
        <div>
          <img src={signature} alt="signature" />
          <div>
            <h4>Authorized By:</h4>
            <p>Kazi Md Asif</p>
            <p>Managing Director</p>
          </div>
        </div>
      </div>
      {/* <div className={classes.client}>
        <h4>Approved By:</h4>
        <p>{company}</p>
      </div> */}
      <div className={classes.footerColor}>Hello</div>
    </div>
  );
}
