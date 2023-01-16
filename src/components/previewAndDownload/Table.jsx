import React from "react";
import classes from "./Table.module.scss";

export default function Table({ lists, productionCost, advance = 0, valueAddedTax}) {
  //Calculate other amounts with grand total
  let agencyFees = productionCost * 0.1;
  let subTotal = productionCost + agencyFees;
  let vat = subTotal * valueAddedTax ;
  let gTotal = subTotal + vat;
  let due = 0;
  if (advance) {
    due = gTotal - advance;
  } else {
    due = gTotal;
  }

  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <tbody>
          <tr>
            <th>Sl</th>
            <th>Particulars</th>
            <th>Quantity</th>
            <th>Day</th>
            <th>Unit Price (BDT)</th>
            <th>Total (BDT)</th>
          </tr>

          {lists.map((list, i) => (
            <tr key={i}>
              <td className={classes.itemCentered}>{i + 1} </td>
              <td>{list?.particulars}</td>
              <td className={classes.itemCentered}>{list?.quantity}</td>
              <td className={classes.itemCentered}>{list?.day}</td>
              <td className={classes.itemRight}>{list?.unitPrice}</td>
              <td className={classes.itemRight}>{list?.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <div className={classes.calculation1}>
          <p>
            <b>Total Production Cost</b>
          </p>
          <p>
            <b>{(Math.round(productionCost * 100) / 100).toFixed(2)}</b>
          </p>
        </div>
        <div className={classes.calculation}>
          <p>Agency Management Fees 10%</p>
          <p>{(Math.round(agencyFees * 100) / 100).toFixed(2)}</p>
        </div>
        <div className={classes.calculation}>
          <p>
            <b>Sub Total</b>
          </p>
          <p>
            <b>{(Math.round(subTotal * 100) / 100).toFixed(2)}</b>
          </p>
        </div>
        <div className={classes.calculation}>
          <p>VAT {valueAddedTax * 100} %</p>
          <p>{(Math.round(vat * 100) / 100).toFixed(2)}</p>
        </div>
        <div className={classes.calculation}>
          <p>
            <b>Grand Total Amount</b>
          </p>
          <p>
            <b>{Math.round(gTotal).toFixed(2)}</b>
          </p>
        </div>
        {advance ? (
          <div className={classes.calculation}>
            <p>Advance Payment</p>
            <p>{(Math.round(advance * 100) / 100).toFixed(2)}</p>
          </div>
        ) : null}
        {due ? (
          <div className={classes.calculationDue}>
            <p>
              <b>Due / Total Payable Amount</b>
            </p>
            <p>
              <b>{Math.round(due).toFixed(2)}</b>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
