import React, { useEffect } from "react";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";
import Styles from "./AllQuotations.module.scss";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import useToggler from "../../hooks/useToggler";
import Preview from "../previewAndDownload/Preview";


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

  const getQuotations = () => {
    axiosFetch({
      axiosInstance: instance,
      method: "Get",
      url: configuration.quotations,
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
  }, [getData]);

  useEffect(()=>{console.log(response?.data)},[response?.data])

  function viewDetailsClickHandler(quotationId) {
    navigate(`/quotation/${quotationId}`);
  }
  const tableRow = response?.data?.map((quote, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{quote.title}</td>
      <td>{quote.date?.slice(0, 10)}</td>
      <td>{quote.client_name}</td>
      <td>
        <Preview data={quote}/>
      </td>
      <td>
        <MdEdit
          className={Styles.editIcon}
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
      {!response?.data?.length && <p>no data found</p>}
      <div className={Styles.tableContainer}>
        <table>
          <tbody>
            <tr>
              <th>Ser</th>
              <th>Title</th>
              <th>Date</th>
              <th>Client</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
            {tableRow}
            {/* {console.log(response)}
             */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
