import React, { useEffect } from "react";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";
import Styles from "./Self.module.scss";
import Avatar from "../../assets/avatar.png";
import CompanyLogo from "../../assets/cpro.png";
import { getAmountsWithCommas } from "../../utilities/utils";
import Loading from "../error/Loading";

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
    if (response?.data && !error && !loading) {
      //storing the data of the user
      localStorage.setItem("motherCompany", response?.data?.mother_company);
      localStorage.setItem("userInfo", JSON.stringify(response?.data));
    }
  }, [response?.data]);

  return (
    <div className={Styles.main}>
      <div className={Styles.box}>
        {loading && <Loading/>}
        {!response?.data && !loading && <p>No data found</p>}
        {response?.data && !loading && !error &&(
          <div className={Styles.userInfoContainer}>
            <img
              className={Styles.dp}
              src={response?.data?.profile_image ? response?.data?.profile_image : Avatar}
              alt="profile_picture"
            />
            <div className={Styles.userInfo}>
              <h3>{response?.data?.name}</h3>
              <p>Designation: {response?.data?.designation}</p>
              <p>Company: {response?.data?.mother_company}</p>
              <p>Email: {response?.data?.email}</p>
            </div>
          </div>
        )}
      </div>
      <div className={Styles.box}>
        {loading && <Loading/>}
        {!response?.data && !loading && <p>No data found</p>}
        {response?.data && !loading && !error && (
          <div className={Styles.companyInfoContainer}>
            <img
              className={Styles.companyLogo}
              src={CompanyLogo}
              alt="logo"
            />
            <h4>{response?.data?.mother_company}</h4>
            <h5>
              Company Remaining Amount:&nbsp;
              <span className={Styles.amount}>
                {getAmountsWithCommas(response?.data?.company?.company_remaining_amount)}
              </span>
            </h5>
          </div>
        )}
      </div>
    </div>
  );
}
