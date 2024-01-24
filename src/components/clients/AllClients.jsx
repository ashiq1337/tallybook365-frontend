import Styles from "./AllClients.module.scss";
import React, { useEffect } from "react";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";
import { MdEdit, MdDelete } from "react-icons/md";
import useToggler from "../../hooks/useToggler";
import { useNavigate } from "react-router-dom";

export default function AllClients() {
  const [response, error, loading, axiosFetch, message] = useAxios();
  const [
    responseDelete,
    errorDelete,
    loadingDelete,
    axiosFetchDelete,
    messageDelete,
  ] = useAxios();
  const [getData, setGetData] = useToggler();
  const navigate = useNavigate();

  const getClients = () => {
    axiosFetch({
      axiosInstance: instance,
      method: "Get",
      url: configuration.clients,
    });
  };

  const deleteClient = (clientId) => {
    if (confirm("Do you want to delete the invoice?")) {
      axiosFetchDelete({
        axiosInstance: instance,
        method: "delete",
        url: `${configuration.clients}/${clientId}`,
      });
      setGetData();
    }
  };

  useEffect(() => {
    getClients();
  }, [getData]);

  function viewDetailsClickHandler(clientId) {
    navigate(`/clients/${clientId}`);
  }

  const tableRow = response?.data?.map((client, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td className={Styles.leftAlign}>{client.client_name}</td>
      <td>{client.client_address}</td>
      <td>{client.client_contact_no}</td>
      <td>
        <MdEdit
          className={Styles.icon}
          onClick={() => {
            viewDetailsClickHandler(client?._id);
          }}
        />
      </td>
      <td>
        <MdDelete
          className={Styles.deleteIcon}
          onClick={() => {
            deleteClient(client?._id);
          }}
        />
      </td>
    </tr>
  ));
  return (
    <div className={Styles.main}>
      {/* {!response?.data?.length && <p>no data found</p>} */}
      {!loading ? (
        <div className={Styles.tableContainer}>
          <table>
            <tbody>
              <tr>
                <th>Ser</th>
                <th className={Styles.leftAlign}>Name</th>
                <th>Address</th>
                <th>Contact</th>
                <th></th>
                <th></th>
              </tr>
              {tableRow}
            </tbody>
          </table>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
