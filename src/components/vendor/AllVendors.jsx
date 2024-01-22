import Styles from "./AllVendors.module.scss";
import React, { useEffect } from "react";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";
import { MdEdit, MdDelete } from "react-icons/md";
import useToggler from "../../hooks/useToggler";
import { useNavigate } from "react-router-dom";

export default function AllVendors() {
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
      url: configuration.vendors,
    });
  };

  const deleteClient = (vendorId) => {
    if (confirm("Do you want to delete the invoice?")) {
      axiosFetchDelete({
        axiosInstance: instance,
        method: "delete",
        url: `${configuration.vendors}/${vendorId}`,
      });
      setGetData();
    }
  };

  useEffect(() => {
    getClients();
  }, [getData]);

  function viewDetailsClickHandler(vendorId) {
    navigate(`/vendors/${vendorId}`);
  }

  const tableRow = response?.data?.map((vendor, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{vendor?.vendor_name}</td>
      <td>{vendor?.vendor_address}</td>
      <td>{vendor?.vendor_contact_no}</td>
      <td>
        <MdEdit
          className={Styles.icon}
          onClick={() => {
            viewDetailsClickHandler(vendor?._id);
          }}
        />
      </td>
      <td>
        <MdDelete
          className={Styles.deleteIcon}
          onClick={() => {
            deleteClient(vendor?._id);
          }}
        />
      </td>
    </tr>
  ));
  return (
    <div className={Styles.main}>
      {response?.data?.length < 1  && !loading && <p>No data found</p>}
      {!loading && response?.data?.length >= 1 && (
        <div className={Styles.tableContainer}>
          <table>
            <tbody>
              <tr>
                <th>Ser</th>
                <th>Name</th>
                <th>Address</th>
                <th>Contact</th>
                <th></th>
                <th></th>
              </tr>
              {tableRow}
            </tbody>
          </table>
        </div>
      )}
      {loading && <p>Loading ...</p>}
    </div>
  );
}
