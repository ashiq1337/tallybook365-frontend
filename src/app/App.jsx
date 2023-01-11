import Routers from "../routes/routers";
import { ToastContainer } from "react-toastify";
export default function App() {
  //clears the local storage if the tab closes
  function clearStorage() {
    let session = sessionStorage.getItem("register");
    if (session == null) {
      localStorage.clear();
    }
    sessionStorage.setItem("register", 1);
  }
  window.addEventListener("load", clearStorage);
  
  return (
    <>
      <Routers />
      <ToastContainer />
    </>
  );
}
