import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Styles from "./EditClient.module.scss";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";
import useToggler from "../../hooks/useToggler";

export default function EditClient() {
  const { clientId } = useParams();
  const [response, error, loading, axiosFetch, message] = useAxios();
  const [
    responseUpdate,
    errorUpdate,
    loadingUpdate,
    axiosFetchUpdate,
    messageUpdate,
  ] = useAxios();
  const [data, setData] = useState({});
  const [getData, setGetData] = useToggler();

  function handleChange(event) {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  }

  const editClientsAsync = (e) => {
    e.preventDefault();
    console.log(data);
    axiosFetchUpdate({
      axiosInstance: instance,
      method: "Patch",
      url: `${configuration.clients}/${clientId}`,
      requestConfig: data,
    });
    setGetData();
  };

  const getClientDetails = () => {
    axiosFetch({
      axiosInstance: instance,
      method: "Get",
      url: `${configuration.clients}/${clientId}`,
    });
  };

  useEffect(() => {
    getClientDetails();
  }, [getData]);

  useEffect(() => {
    setData(response.data);
  }, [response]);

  return (
    <div className={Styles.main}>
      <form onSubmit={editClientsAsync}>
        <br />
        <label>Client Information</label>
        <label className={Styles.inputLabel}>Client's ID</label>
        <input
          type="text"
          placeholder="Enter Client's ID"
          name="client_id"
          onChange={handleChange}
          value={data?.client_id}
        />

        <label className={Styles.inputLabel}>Client's Name</label>
        <input
          type="text"
          placeholder="Enter Client's Name"
          name="client_name"
          onChange={handleChange}
          value={data?.client_name}
        />

        <label className={Styles.inputLabel}>Client's Address</label>
        <input
          type="text"
          placeholder="Enter Client's Address"
          name="client_address"
          onChange={handleChange}
          value={data?.client_address}
        />

        <label className={Styles.inputLabel}>Client's Contact Number</label>
        <input
          type="text"
          placeholder="Enter Client's Contact Number"
          name="client_contact_no"
          onChange={handleChange}
          value={data?.client_contact_no}
        />

        <br />
        <label>Client Representative</label>

        <label className={Styles.inputLabel}>Client Representative 1</label>
        <input
          type="text"
          placeholder="Enter Client Representative 1"
          name="client_representitive1"
          onChange={handleChange}
          value={data?.client_representitive1}
        />

        <label className={Styles.inputLabel}>
          Client Representative 1 Number
        </label>
        <input
          type="text"
          placeholder="Enter Client Representative 1 Number"
          name="client_representitive1_no"
          onChange={handleChange}
          value={data?.client_representitive1_no}
        />

        <label className={Styles.inputLabel}>Client Representative 2</label>
        <input
          type="text"
          placeholder="Enter Client Representative 2"
          name="client_representitive2"
          onChange={handleChange}
          value={data?.client_representitive2}
        />

        <label className={Styles.inputLabel}>
          Client Representative 2 Number
        </label>
        <input
          type="text"
          placeholder="Enter Client Representative 2 Number"
          name="client_representitive2_no"
          onChange={handleChange}
          value={data?.client_representitive2_no}
        />

        <br />
        <label>Bank Account Information</label>

        <label className={Styles.inputLabel}>Bank Account</label>
        <input
          type="text"
          placeholder="Enter Bank Account"
          name="bank_account"
          onChange={handleChange}
          value={data?.bank_account}
        />

        <label className={Styles.inputLabel}>Bank Name & Address</label>
        <input
          type="text"
          placeholder="Enter Bank Name & Address"
          name="bank_name_address"
          onChange={handleChange}
          value={data?.bank_name_address}
        />

        <label className={Styles.inputLabel}>Swift No</label>
        <input
          type="text"
          placeholder="Enter Swift No"
          name="swift"
          onChange={handleChange}
          value={data?.swift}
        />

        <label className={Styles.inputLabel}>Routing No</label>
        <input
          type="text"
          placeholder="Enter Routing No"
          name="routing_no"
          onChange={handleChange}
          value={data?.routing_no}
        />
        <p>{message}</p>
        <p>{messageUpdate}</p>
        <button type="submit">Save</button>
        <br />
        <br />
        <br />
        <br />
      </form>
    </div>
  );
}
