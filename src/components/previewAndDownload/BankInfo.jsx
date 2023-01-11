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
      <div className={classes.bankInfo}>
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
        {/* <p>Bank Account No : 3102923941001</p>
        <p>Bank Name and Address : The city Bank Limited</p>
        <p>Banani Branch, Dhaka 1212, Bangladesh</p>
        <p>Swift Code : CIBLBDDH</p>
        <p>Routing Number : 225260438 </p> */}
      </div>
    </>
  );
}
