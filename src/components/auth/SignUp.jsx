import Styles from "./SignUp.module.scss";
// import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className={Styles.main}>
      {/* <img className={Styles.img} src={Logo} alt="logo" /> */}
      <p className={Styles.logoText}>TallyBook365</p>
      <br />
      <div className={Styles.container}>
        <p className={Styles.title}>SIGNUP</p>
        <br />
        <form>
          <input type="text" placeholder="Enter your name" />
          <input type="text" placeholder="Enter your phone number" />
          <input type="password" placeholder="Enter your password" />
          <input type="password" placeholder="Confirm your password" />
          <button>SignUp</button>
        </form>
        <small>
          Already have an account?{" "}
          <Link to="/login" className={Styles.link}>
            Login
          </Link>
        </small>
      </div>
    </div>
  );
}
