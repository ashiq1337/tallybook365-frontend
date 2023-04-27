import React, { useEffect } from "react";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";
import Styles from "./CurrentMonthTotal.module.scss";

export default function CurrentMonthTotal() {
  const [response, error, loading, axiosFetch, message] = useAxios();
  const getSelfInfo = () => {
    axiosFetch({
      axiosInstance: instance,
      method: "Get",
      url: configuration.currentMonthTotal,
    });
  };

  useEffect(() => {
    getSelfInfo();
  }, []);

  const tableRow = response?.data?.lastSixMonthsDues?.map((singleMonthsData, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{singleMonthsData}</td>
    </tr>
  ));

  return (
    <div className={Styles.main}>
      <div className={Styles.topSection}>
        <div className={Styles.left}>
          {!response?.data?.length && (
            <p>{response?.data?.runningMonthQuoteTotal}</p>
          )}
        </div>
        <div className={Styles.right}>
          {!response?.data?.length && (
            <p>{response?.data?.runningMonthInvoiceTotal}</p>
          )}
        </div>
        
      </div>
      <br />
      <h3>Last Six Months Dues:</h3>
      <br />
      <div className={Styles.bottomSection}>
        <div className={Styles.tableContainer}>
          <table>
            <tbody>
              <tr>
                <th>Ser</th>
                <th>Details</th>
              </tr>
              {tableRow}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
