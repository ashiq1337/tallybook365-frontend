import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./Header.module.scss";

export default function Header({ title, link, btnName }) {
  const navigate = useNavigate();

  function buttonClickHandler() {
    navigate(link);
  }

  const [date, setDate] = useState(new Date("en-IN"));

  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className={Styles.main}>
      <div>
        <h3>{title}</h3>
        {/* <small className={Styles.date}>{new Date().toLocaleString()}</small> */}
        <small className={Styles.date}>{date.toLocaleString("en-IN")}</small>
      </div>
      <div className={Styles.right}>
        {/* <p>Hello, </p> */}
        <img
          className={Styles.dp}
          src="https://www.contentprobd.com/assets/asif.46c65779.jpg"
          alt="dp"
        />
      </div>
    </div>
  );
}
