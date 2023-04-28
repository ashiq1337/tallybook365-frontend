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
      <div className={Styles.left}>
        {!response?.data?.length && <h3>{response?.data?.name}</h3>}
        {!response?.data?.length && <p>Role: {response?.data?.role}</p>}
        {!response?.data?.length && (
          <p>Company: {response?.data?.mother_company}</p>
        )}
        {!response?.data?.length && <p>Email: {response?.data?.email}</p>}
      </div>
      <div className={Styles.right}>
        <img src="" alt="" />
        {!response?.data?.length && <h4>{response?.data?.mother_company}</h4>}
        {!response?.data?.length && (
          <h5>
            Company Remaining Amount:{" "}
            <span className={Styles.amount}>
              {response?.data?.company?.company_remaining_amount}
            </span>{" "}
          </h5>
        )}
      </div>
    </div>
  );
}
