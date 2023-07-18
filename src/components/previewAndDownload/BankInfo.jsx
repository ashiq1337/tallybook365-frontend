import React from "react";
import classes from "./BankInfo.module.scss";

export default function BankInfo({
  accountNo,
  nameAndAddress,
  swift,
  routing,
}) {
  return (
    <>
      {accountNo ? (
        <div className={classes.bankInfo}>
          <h4>Bank Account Information:</h4>
          <table className={classes.bankInfoTable}>
            <tr className={classes.bankInfoTable}>
              <th className={classes.bankInfoTable1}>Bank Account No</th>
              <th className={classes.bankInfoTable2}>:</th>
              <th className={classes.bankInfoTable}>{accountNo}</th>
            </tr>

            <tr className={classes.bankInfoTable}>
              <th className={classes.bankInfoTable1}>Bank Name and Address</th>
              <th className={classes.bankInfoTable2}>:</th>
              <th className={classes.bankInfoTable}>{nameAndAddress}</th>
            </tr>

            <tr className={classes.bankInfoTable}>
              <th className={classes.bankInfoTable1}>Swift Code</th>
              <th className={classes.bankInfoTable2}>:</th>
              <th className={classes.bankInfoTable}>{swift}</th>
            </tr>

            <tr className={classes.bankInfoTable}>
              <th className={classes.bankInfoTable1}>Routing Number</th>
              <th className={classes.bankInfoTable2}>:</th>
              <th className={classes.bankInfoTable}>{routing}</th>
            </tr>
          </table>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
