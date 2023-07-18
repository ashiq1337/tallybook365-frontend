import React from "react";
import classes from "./Table.module.scss";
import { ToWords } from "to-words";

export default function Table({
  lists,
  productionCost,
  advance = 0,
  valueAddedTax = 0,
  asf = 0,
}) {
  const toWords = new ToWords();

  //Calculate other amounts with grand total
  let agencyFees = productionCost * (asf / 100);
  let subTotal = productionCost + agencyFees;
  let vat = subTotal * (valueAddedTax / 100);
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
        <thead>
          <tr>
            <th>Sl</th>
            <th>Items</th>
            <th>Details</th>
            <th>Quantity</th>
            <th>Day</th>
            <th>Unit Price (BDT)</th>
            <th>Total (BDT)</th>
          </tr>
        </thead>

        <tbody>
          {lists.map((list, i) => (
            <tr key={i}>
              <td className={classes.itemCentered}>{i + 1} </td>
              <td>{list?.particulars}</td>
              <td>{list?.details}</td>
              <td className={classes.itemCentered}>{list?.quantity}</td>
              <td className={classes.itemCentered}>{list?.day}</td>
              <td className={classes.itemRight}>{list?.unitPrice}</td>
              <td className={classes.itemRight}>{list?.totalPrice}</td>
            </tr>
          ))}
        </tbody>
        <tr className={classes.itemRight}>
          <td colSpan={6}>Total Production Cost</td>
          <td>{(Math.round(productionCost * 100) / 100).toFixed(2)}</td>
        </tr>
        <tr className={classes.itemRight}>
          <td colSpan={6}>Agency Management Fees {asf}%</td>
          <td>{(Math.round(agencyFees * 100) / 100).toFixed(2)}</td>
        </tr>
        <tr className={classes.itemRight}>
          <td colSpan={6}>Sub Total</td>
          <td>{(Math.round(subTotal * 100) / 100).toFixed(2)}</td>
        </tr>
        <tr className={classes.itemRight}>
          <td colSpan={6}>VAT {valueAddedTax} %</td>
          <td>{(Math.round(vat * 100) / 100).toFixed(2)}</td>
        </tr>
        <tr className={classes.itemRight}>
          <td colSpan={6}>Grand Total Amount</td>
          <td>{Math.round(gTotal).toFixed(2)}</td>
        </tr>
        {advance ? (
          <tr className={classes.itemRight}>
            <td colSpan={6}>Advance Payment</td>
            <td>{(Math.round(advance * 100) / 100).toFixed(2)}</td>
          </tr>
        ) : null}
        {due ? (
          <tr className={classes.itemRight}>
            <td colSpan={6}>Due / Total Payable Amount</td>
            <td>{Math.round(due).toFixed(2)}</td>
          </tr>
        ) : null}
      </table>
      <div>
        {/* <div className={classes.calculation1}>
          <p>
            <b>Total Production Cost</b>
          </p>
          <p>
            <b>{(Math.round(productionCost * 100) / 100).toFixed(2)}</b>
          </p>
        </div> */}
        {/* <div className={classes.calculation}>
          <p>Agency Management Fees {asf}%</p>
          <p>{(Math.round(agencyFees * 100) / 100).toFixed(2)}</p>
        </div> */}
        {/* <div className={classes.calculation}>
          <p>
            <b>Sub Total</b>
          </p>
          <p>
            <b>{(Math.round(subTotal * 100) / 100).toFixed(2)}</b>
          </p>
        </div> */}
        {/* <div className={classes.calculation}>
          <p>VAT {valueAddedTax} %</p>
          <p>{(Math.round(vat * 100) / 100).toFixed(2)}</p>
        </div> */}
        {/* <div className={classes.calculation}>
          <p>
            <b>Grand Total Amount</b>
          </p>
          <p>
            <b>{Math.round(gTotal).toFixed(2)}</b>
          </p>
        </div> */}
        {/* {advance ? (
          <div className={classes.calculation}>
            <p>Advance Payment</p>
            <p>{(Math.round(advance * 100) / 100).toFixed(2)}</p>
          </div>
        ) : null} */}
        {/* {due ? (
          <div className={classes.calculationDue}>
            <p>
              <b>Due / Total Payable Amount</b>
            </p>
            <p>
              <b>{Math.round(due).toFixed(2)}</b>
            </p>
          </div>
        ) : null} */}
      </div>
      <br />
      <p>
        <b>In word:</b> BDT {toWords.convert(Math.round(gTotal).toFixed(2))}{" "}
        only.
      </p>
    </div>
  );
}
