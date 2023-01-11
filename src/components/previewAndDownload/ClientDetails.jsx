import React from "react";
import classes from "./ClientDetails.module.scss";

export default function ClientDetails({
  title,
  company,
  address,
  invoiceDate,
  jobNumber,
  brand,
  jobType,
}) {
  return (
    <div className={classes.container}>
      <section>
        <h3 className={classes.titleHeader}>Estimate - {title}</h3>
        <div className={classes.companyDetails}>
          <div className={classes.row}>
            <p className={classes.cell}>Company: {company}</p>
            <p className={classes.cell}>Address: {address}</p>
          </div>
          <div className={classes.row}>
            <p className={classes.cell}>Date: {invoiceDate}</p>
            <p className={classes.cell}>Job No: {jobNumber}</p>
          </div>
        </div>
        <div className={classes.companyDetails}>
          <div className={classes.row}>
            <p className={classes.cell}>Brand: {brand}</p>
            <p className={classes.cell}>
              Job Type: {jobType} 
            </p>
            <p className={classes.cell}>Job No: {jobNumber}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
