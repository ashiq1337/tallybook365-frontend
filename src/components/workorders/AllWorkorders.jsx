import Styles from "./AllWorkorders.module.scss";
import React, { useEffect } from "react";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import useToggler from "../../hooks/useToggler";
import { AiOutlinePlus } from "react-icons/ai";
import { VscPreview } from "react-icons/vsc";

export default function AllWorkorders() {
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

  const getWorkorders = () => {
    axiosFetch({
      axiosInstance: instance,
      method: "Get",
      url: configuration.purchaseOrders,
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
  }, [getData]);

  useEffect(() => {
    console.log(response?.data);
  }, [response?.data]);

  function viewDetailsClickHandler(workorderId) {
    navigate(`/workorder/${workorderId}`);
  }

  function preview(Id) {
    {
      navigate(`/preview/Workorder/purchaseorders/${Id}`);
    }
  }

  const tableRow = response?.data?.map((workorder, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{workorder.title}</td>
      <td>{workorder.client_address}</td>
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
      {!response?.data?.length && <p>no data found</p>}
      {response && !loading && !error && (
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
      )}
    </div>
  );
}
