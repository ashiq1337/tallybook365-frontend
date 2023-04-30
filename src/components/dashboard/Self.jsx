import React, { useEffect, useLayoutEffect } from "react";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";
import Styles from "./Self.module.scss";

export default function Self() {
  const [response, error, loading, axiosFetch, message] = useAxios();
  const getSelfInfo = () => {
    axiosFetch({
      axiosInstance: instance,
      method: "Get",
      url: configuration.self,
    });
  };

  useEffect(() => {
    getSelfInfo();
  }, []);

  useEffect(() => {
    if (response?.data?.mother_company && !error) {
      //storing the mother company of the user
      localStorage.setItem("motherCompany", response?.data?.mother_company);
    }
  }, [loading]);

  return (
    <div className={Styles.main}>
      <div className={Styles.box}>
        {response?.data ? (
          <div className={Styles.userInfoContainer}>
            <img
              className={Styles.dp}
              src="https://www.contentprobd.com/assets/asif.46c65779.jpg"
              alt="dp"
            />
            <div className={Styles.userInfo}>
              <h3>{response?.data?.name}</h3>
              <p>Role: {response?.data?.role}</p>
              <p>Company: {response?.data?.mother_company}</p>
              <p>Email: {response?.data?.email}</p>
            </div>
          </div>
        ) : (
          <div>
            <p>No data found</p>
          </div>
        )}
      </div>
      <div className={Styles.box}>
        {response?.data ? (
          <div className={Styles.companyInfoContainer}>
            <img
              className={Styles.companyLogo}
              src="https://www.contentprobd.com/assets/logoBlack.9e46d4c9.png"
              alt="logo"
            />
            <h4>{response?.data?.mother_company}</h4>
            <h5>
              Company Remaining Amount:&nbsp;
              <span className={Styles.amount}>
                {response?.data?.company?.company_remaining_amount}
              </span>
            </h5>
          </div>
        ) : (
          <div>
            <p>No data found</p>
          </div>
        )}
      </div>
    </div>
  );
}
