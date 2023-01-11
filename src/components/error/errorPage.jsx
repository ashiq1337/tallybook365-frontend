import { useRouteError } from "react-router-dom";
import Styles from "./ErrorPage.module.scss";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className={Styles.main}>
      <div className={Styles.container}>
        <h1 className={Styles.title}>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <br />
      </div>
    </div>
  );
}
