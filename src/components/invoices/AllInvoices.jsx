import Styles from "./AllInvoices.module.scss";
import React, { useEffect, useState } from "react";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import useToggler from "../../hooks/useToggler";
import { VscPreview } from "react-icons/vsc";

export default function AllInvoices() {
  const navigate = useNavigate();
  const [response, error, loading, axiosFetch, message] = useAxios();
  const [
    responseDelete,
    errorDelete,
    loadingDelete,
    axiosFetchDelete,
    messageDelete,
  ] = useAxios();
  const [getData, setGetData] = useToggler();
  const [pageNumber, setPageNumber] = useState(1); //pagination page number.
  const [pageLimit, setPageLimit] = useState(20); //pagination item limit.

  const getInvoices = () => {
    axiosFetch({
      axiosInstance: instance,
      method: "Get",
      url: `${configuration.invoices}?page=${pageNumber}&limit=${pageLimit}`,
    });
  };

  const deleteInvoice = (invoiceId) => {
    if (confirm("Do you want to delete the invoice?")) {
      axiosFetchDelete({
        axiosInstance: instance,
        method: "delete",
        url: `${configuration.invoices}/${invoiceId}`,
      });
      setGetData();
    }
  };

  useEffect(() => {
    getInvoices();
  }, [getData, pageNumber, pageLimit]);

  function viewDetailsClickHandler(invoiceId) {
    navigate(`/invoice/${invoiceId}`);
  }

  function preview(Id) {
    {
      navigate(`/preview/Invoice/invoices/${Id}`);
    }
  }

  const tableRow = response?.data?.map((invoice, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td className={Styles.leftAlign}>{invoice.title}</td>
      <td>{invoice.client_address}</td>
      <td>{invoice.job_no}</td>
      <td>

        <VscPreview
          className={Styles.icon}
          onClick={() => preview(invoice?._id)}
        />
      </td>
      <td>
        <MdEdit
          className={Styles.icon}
          onClick={() => {
            viewDetailsClickHandler(invoice?._id);
          }}
        />
      </td>
      <td>
        <MdDelete
          className={Styles.deleteIcon}
          onClick={() => {
            deleteInvoice(invoice?._id);
          }}
        />
      </td>
    </tr>
  ));

  return (
    <div className={Styles.main}>
      {!response?.data?.length && !loading && <p>no data found</p>}
      {loading && <p>Loading...</p>}
      {(response?.data?.length > 0 && !loading && !error ) && (
        <div className={Styles.container}>
        <div className={Styles.tableContainer}>
          <table>
            <tbody>
              <tr>
                <th>Ser</th>
                <th className={Styles.leftAlign}>Name</th>
                <th>Address</th>
                <th>Job no</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
              {tableRow}
            </tbody>
          </table>
        </div>
        <div className={Styles.btnContainer}>
            <button
              disabled={pageNumber <= 1}
              className={Styles.btn}
              onClick={() => {
                setPageNumber(pageNumber - 1);
              }}
            >
              Previous
            </button>
            <p className={Styles.currentPg}>Page: {pageNumber}</p>
            <button
              disabled={!response?.data?.length || response?.data?.length < pageLimit}
              className={Styles.btn}
              onClick={() => {
                setPageNumber(pageNumber + 1);
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
