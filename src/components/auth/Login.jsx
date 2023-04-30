import Styles from "./Login.module.scss";
import { useEffect, useLayoutEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";
import { configuration } from "../../configurations/configurations";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [response, error, loading, axiosFetch, message] = useAxios();

  function handleChange(event) {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  }

  function onLoginSubmitHandlerAsync(e) {
    e.preventDefault();
    axiosFetch({
      axiosInstance: instance,
      method: "Post",
      url: configuration.loginUser,
      requestConfig: data,
    });
  }

  //storing token in local storage
  useLayoutEffect(() => {
    //console.log(response?.data?.token);
    if (response?.data?.token && !error) {
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem(
        "motherCompany",
        response?.data?.user?.mother_company
      );
      navigate("/");
    }
  }, [loading]);

  //navigating a logged in user from login page to home page
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className={Styles.main}>
      {/* <img className={Styles.img} src={Logo} alt="logo" /> */}
      <p className={Styles.logoText}>TallyBook365</p>
      <br />
      <div className={Styles.container}>
        <p className={Styles.title}>LOGIN</p>
        <br />
        <form onSubmit={onLoginSubmitHandlerAsync}>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            onChange={handleChange}
          />
          <small className={Styles.msg}>{message}</small>
          <button
            type="submit"
            disabled={loading}
            style={loading ? { background: "gray" } : null}
          >
            Login
          </button>
        </form>

        <small>
          Don't have an account?{" "}
          <Link to="/signup" className={Styles.link}>
            SignUp
          </Link>{" "}
        </small>
      </div>
    </div>
  );
}
