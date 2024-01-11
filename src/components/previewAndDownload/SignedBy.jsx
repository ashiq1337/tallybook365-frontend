import React, { useContext } from "react";
import signature from "../../assets/signature.png";
import classes from "./SignedBy.module.scss";
import { AuthContext } from "../../context/context";
//import logo from "../../assets/LetterHeadFooter.png";

export default function SignedBy() {
  const userInfo = useContext(AuthContext)
  console.log(userInfo.userInfo)
  return (
    <div className={classes.owner}>
      <img className={classes.img}
        src={userInfo.userInfo.signature ? userInfo.userInfo.signature :signature}
        alt="signature" />
      <h4>Authorized By:</h4>
      <p>{userInfo.userInfo.name ? userInfo.userInfo.name : "Kazi Md Asif"}</p>
      <p>{userInfo.userInfo.designation ? userInfo.userInfo.designation : "Managing Director"}</p>
    </div>
  );
}
