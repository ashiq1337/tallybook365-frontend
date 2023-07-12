import Styles from "./AllWorkorders.module.scss";
import React, { useEffect, useState } from "react";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import useToggler from "../../hooks/useToggler";
import { AiOutlinePlus } from "react-icons/ai";
import { VscPreview } from "react-icons/vsc";
import { useParams } from "react-router-dom";

export default function AllWorkorders() {
  const { quotationId } = useParams(); //using this param to get quote id
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

  const getWorkorders = () => {
    //if quote id send with the req then we will get only the po's associated with that specific quote,
    //otherwise will return all purchase orders.

    let urlForSpecificTask = ""; //specific task means when if we need for one specific quotation or all work orders

    if (quotationId) {
      urlForSpecificTask = `${configuration.purchaseOrdersByQuote}/${quotationId}`;
    } else {
      urlForSpecificTask = `${configuration.purchaseOrders}?page=${pageNumber}&limit=${pageLimit}`;
    }

    axiosFetch({
      axiosInstance: instance,
      method: "Get",
      url: urlForSpecificTask,
    });
  };

  const deleteWorkorder = (workorderId) => {
    if (confirm("Do you want to delete the workorder?")) {
      axiosFetchDelete({
        axiosInstance: instance,
        method: "delete",
        url: `${configuration.purchaseOrders}/${workorderId}`,
      });
      setGetData();
    }
  };

  useEffect(() => {
    getWorkorders();
  }, [getData, pageNumber, pageLimit]);

  function viewDetailsClickHandler(workorderId) {
    navigate(`/workorder/${workorderId}`);
  }

  function preview(Id) {
    {
      navigate(`/preview/Workorder/purchaseorders/${Id}`);
    }
  }

  function navigateToPage(Id, url) {
    navigate(`/${url}/${Id}`);
  }

  const tableRow = response?.data?.map((workorder, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{workorder.title}</td>
      <td>{workorder.vendor_address}</td>
      <td>{workorder.job_no}</td>
      <td>{workorder?.date?.slice(0, 10)}</td>
      <td>
        <VscPreview
          className={Styles.icon}
          onClick={() => preview(workorder?._id)}
        />
      </td>
      <td>
        <MdEdit
          className={Styles.icon}
          onClick={() => {
            viewDetailsClickHandler(workorder?._id);
          }}
        />
      </td>
      <td>
        <MdDelete
          className={Styles.deleteIcon}
          onClick={() => {
            deleteWorkorder(workorder?._id);
          }}
        />
      </td>
    </tr>
  ));

  return (
    <div className={Styles.main}>
      {!response?.data?.length && <p>No data found</p>}
      {quotationId && (
        <div className={Styles.createNewBtnContainer}>
          <button
            className={Styles.createNewBtn}
            onClick={() =>
              navigateToPage(quotationId, "workorder/addWorkorder")
            }
          >
            Create Purchase order{" "}
          </button>
          <small className={Styles.createNewBtnTxt}>
            Create another purchase order for this quotation
          </small>
        </div>
      )}
      <br />
      {(response && !loading && !error) ? (
        <div className={Styles.container}>
        <div className={Styles.tableContainer}>
          <table>
            <tbody>
              <tr>
                <th>Ser</th>
                <th>Name</th>
                <th>Address</th>
                <th>Job no</th>
                <th>Date</th>
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
              disabled={!response?.data?.length}
              className={Styles.btn}
              onClick={() => {
                setPageNumber(pageNumber + 1);
              }}
            >
              Next
            </button>
          </div>
          </div>
      ):  (<p>loading...</p>)}
    </div>
  );
}
