import React, { useEffect, useState } from "react";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";
import Styles from "./AllQuotations.module.scss";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import useToggler from "../../hooks/useToggler";
import { VscPreview } from "react-icons/vsc";
import { GrDocument } from "react-icons/gr";
import { AiOutlinePlus, AiOutlineDatabase } from "react-icons/ai";

export default function AllQuotations() {
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
  const [pageMonth, setPageMonth] = useState(); //pagination month number.
  const [pageYear, setPageYear] = useState(); //pagination year limit.

  const getQuotations = () => {
    axiosFetch({
      axiosInstance: instance,
      method: "Get",
      url: `${configuration.quotations}?page=${pageNumber}&limit=${pageLimit}`,
    });
  };

  const deleteQuotation = (quotationId) => {
    if (confirm("Do you want to delete the quotation?")) {
      axiosFetchDelete({
        axiosInstance: instance,
        method: "delete",
        url: `${configuration.quotations}/${quotationId}`,
      });
      setGetData();
    }
  };

  useEffect(() => {
    getQuotations();
  }, [getData, pageNumber, pageLimit]);

  function viewDetailsClickHandler(quotationId) {
    navigate(`/quotation/${quotationId}`);
  }
  function preview(Id) {
    navigate(`/preview/Estimate/quotes/${Id}`);
  }
  function navigateToPage(Id, url) {
    navigate(`/${url}/${Id}`);
  }

  const tableRow = response?.data?.map((quote, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td className={Styles.leftAlign}>{quote?.title}</td>
      <td>{quote?.date?.slice(0, 10)}</td>
      <td>{quote?.client_name}</td>
      <td>{quote?.grand_total.toLocaleString()}.00</td>
      <td>
        {quote?.purchaseOrder_id.length != 0 ? (
          <AiOutlineDatabase
            className={Styles.icon}
            onClick={() => navigateToPage(quote?._id, "workorder/workorders")}
          />
        ) : (
          <AiOutlinePlus
            className={Styles.icon}
            onClick={() => navigateToPage(quote?._id, "workorder/addWorkorder")}
          />
        )}
      </td>
      <td>
        {quote?.chalan_id ? (
          <GrDocument
            className={Styles.icon}
            onClick={() => navigateToPage(quote?.chalan_id, "chalan")}
          />
        ) : (
          <AiOutlinePlus
            className={Styles.icon}
            onClick={() => navigateToPage(quote?._id, "chalan/addChalan")}
          />
        )}
      </td>
      <td>
        {quote?.invoice_id ? (
          <GrDocument
            className={Styles.icon}
            onClick={() => navigateToPage(quote?.invoice_id, "invoice")}
          />
        ) : (
          <AiOutlinePlus
            className={Styles.icon}
            onClick={() => navigateToPage(quote?._id, "invoice/addInvoice")}
          />
        )}
      </td>
      <td>
        <VscPreview
          className={Styles.icon}
          onClick={() => preview(quote?._id)}
        />
      </td>
      <td>
        <MdEdit
          className={Styles.icon}
          onClick={() => {
            viewDetailsClickHandler(quote?._id);
          }}
        />
      </td>
      <td>
        <MdDelete
          className={Styles.deleteIcon}
          onClick={() => {
            deleteQuotation(quote?._id);
          }}
        />
      </td>
    </tr>
  ));
  return (
    <div className={Styles.main}>
      hello
      {!response?.data?.length && !loading && <p>No data found</p>}
      {loading && <p>Loading...</p>}
      {(response?.data?.length > 0 && !loading && !error ) && (
        <div className={Styles.container}>
          <div className={Styles.tableContainer}>
            <table>
              <tbody>
                <tr>
                  <th>Ser</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Client</th>
                  <th>Amount</th>
                  <th>Purchase</th>
                  <th>Chalan</th>
                  <th>Invoice</th>
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
            <div style={{ display: "flex", gap: "10px" }}>
              <p className={Styles.currentPg}>Page limit: {pageLimit}</p>
              <p className={Styles.currentPg}>Page: {pageNumber}</p>
            </div>
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
