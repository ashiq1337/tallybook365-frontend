import Styles from "./AllChalans.module.scss";
import React, { useEffect , useState} from "react";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { instance } from "../../utilities/axiosInstance";
import { MdEdit, MdDelete } from "react-icons/md";
import useToggler from "../../hooks/useToggler";
import Preview from "../previewAndDownload/Preview";
import { VscPreview } from "react-icons/vsc";

export default function AllChalans() {
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

  const getChalans = () => {
    axiosFetch({
      axiosInstance: instance,
      method: "Get",
      url: `${configuration.chalans}?page=${pageNumber}&limit=${pageLimit}`,
    });
  };

  const deleteChalan = (chalanId) => {
    if (confirm("Do you want to delete the chalan?")) {
      axiosFetchDelete({
        axiosInstance: instance,
        method: "delete",
        url: `${configuration.chalans}/${chalanId}`,
      });
      setGetData();
    }
  };

  useEffect(() => {
    getChalans();
  }, [getData, pageNumber, pageLimit]);

  function viewDetailsClickHandler(chalanId) {
    navigate(`/chalan/${chalanId}`);
  }

  function preview(Id) {
    {
      navigate(`/preview/Chalan/chalans/${Id}`);
    }
  }

  const tableRow = response?.data?.map((chalan, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{chalan.title}</td>
      <td>{chalan.client_address}</td>
      <td>{chalan.job_no}</td>
      <td>
        <VscPreview
          className={Styles.icon}
          onClick={() => preview(chalan?._id)}
        />
      </td>
      <td>
        <MdEdit
          className={Styles.icon}
          onClick={() => {
            viewDetailsClickHandler(chalan?._id);
          }}
        />
      </td>
      <td>
        <MdDelete
          className={Styles.deleteIcon}
          onClick={() => {
            deleteChalan(chalan?._id);
          }}
        />
      </td>
    </tr>
  ));

  return (
    <div className={Styles.main}>
      {!response?.data?.length && !loading && <p>No data found</p>}
      {loading && <p>Loading...</p>}
      {(response?.data?.length > 0 && !loading && !error ) && (
        <div className={Styles.container}>
          <div className={Styles.tableContainer}>
            <table>
              <tbody>
                <tr>
                <th>Ser</th>
                <th>Name</th>
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
              disabled={!response?.data?.length }
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
