import Routers from "../routes/routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Styles from "./App.module.scss";

export default function App() {
  //clears the local storage if the tab closes
  function clearStorage() {
    let session = sessionStorage.getItem("register");
    if (session == null) {
      localStorage.clear(); //clearing the local storage (token and other info)
      window.location.reload(false); //refreshing the page to go to login page
    }
    sessionStorage.setItem("register", 1);
  }
  window.addEventListener("load", clearStorage);

  return (
    <div className={Styles.main}>
      <Routers />
      <ToastContainer />
    </div>
  );
}
