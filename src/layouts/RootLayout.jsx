import { Outlet } from "react-router-dom";
import Navigation from "../components/nav/Navigation";
import Styles from "./RootLayout.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useToggler from "../hooks/useToggler";

export default function RootLayout() {
  const navigate = useNavigate();
  const [viewMenu, setViewMenu] = useToggler();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [localStorage.getItem("token")]);

  return (
    <div className={Styles.main}>
      <div className={Styles.left} style={viewMenu ? { width: "50px" } : null}>
        <Navigation closeBtn={setViewMenu}/>
      </div>
      <div className={Styles.right}>
        {localStorage.getItem("token") && <Outlet />}
      </div>
    </div>
  );
}
