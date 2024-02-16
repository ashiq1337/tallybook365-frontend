import React from "react";
import signature from "../../assets/signature.png";
import classes from "./SignedBy.module.scss";

export default function SignedBy() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))

  return (
    <div className={classes.owner}>
      <img className={classes.img}
        src={userInfo?.signature ? userInfo?.signature :signature}
        alt="signature" />
      <h4>Authorized By:</h4>
      <p>{userInfo?.name ? userInfo?.name : "No data found"}</p>
      <p>{userInfo?.designation ? userInfo?.designation : "No data found"}</p>
    </div>
  );
}
