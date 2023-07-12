import Styles from "./Header.module.scss";
import Clock from "./Clock";
import Avatar from "../../assets/avatar.png";
export default function Header({ title }) {
  return (
    <div className={Styles.main}>
      <div>
        <h3>{title}</h3>
        {/* <Clock /> */}
      </div>
      <div className={Styles.right}>
        {/* <img className={Styles.dp} src={Avatar} alt="dp" /> */}
      </div>
    </div>
  );
}
