import Header from "../components/header/Header";
import Styles from "./Landing.module.scss";
export default function Landing() {
  return (
    <div className={Styles.main}>
      <Header title={"Overview"} link="/" btnName={"Home"} />
      
    </div>
  );
}
