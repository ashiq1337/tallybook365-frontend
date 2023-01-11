import { Outlet } from "react-router-dom";
import Navigation from "../components/nav/Navigation";
import Styles from "./RootLayout.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function RootLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [localStorage.getItem("token")]);

  return (
    <div className={Styles.main}>
      <div className={Styles.left}>
        <Navigation />
      </div>
      <div className={Styles.right}>
        {localStorage.getItem("token") && <Outlet />}
      </div>
    </div>
  );
}
