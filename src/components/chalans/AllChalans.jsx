import Styles from "./AllChalans.module.scss";
import React, { useEffect } from "react";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import useToggler from "../../hooks/useToggler";
import Preview from "../previewAndDownload/Preview";

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

  const getChalans = () => {
    axiosFetch({
      axiosInstance: instance,
      method: "Get",
      url: configuration.chalans,
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
  }, [getData]);

  useEffect(() => {
    console.log(response?.data);
  }, [response?.data]);

  function viewDetailsClickHandler(chalanId) {
    navigate(`/chalan/${chalanId}`);
  }

  const tableRow = response?.data?.map((chalan, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{chalan.title}</td>
      <td>{chalan.client_address}</td>
      <td>{chalan.job_no}</td>
      <td>
        <Preview data={chalan} title="Chalan" />
      </td>
      <td>
        <MdEdit
          className={Styles.editIcon}
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
