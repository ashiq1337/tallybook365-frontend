import React from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./Header.module.scss";

export default function Header({ title, link, btnName }) {
  const navigate = useNavigate();
  function buttonClickHandler() {
    navigate(link);
  }

  return (
    <div className={Styles.main}>
      <div>
        <h3>{title}</h3>
        <small className={Styles.date}>{new Date().toLocaleString()}</small>
      </div>

      <button onClick={buttonClickHandler}>{btnName}</button>
    </div>
  );
}
