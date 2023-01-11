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
        <label>Client info</label>
        <input
          type="text"
          placeholder="Enter Client id"
          name="client_id"
          onChange={handleChange}
          value={data?.client_id}
        />

        <input
          type="text"
          placeholder="Enter client name"
          name="client_name"
          onChange={handleChange}
          value={data?.client_name}
        />

        <input
          type="text"
          placeholder="Enter Client's address"
          name="client_address"
          onChange={handleChange}
          value={data?.client_address}
        />
        <input
          type="text"
          placeholder="Enter client contact number"
          name="client_contact_no"
          onChange={handleChange}
          value={data?.client_contact_no}
        />
        <br />
        <label>Client representative</label>
        <input
          type="text"
          placeholder="Enter client representative 1"
          name="client_representitive1"
          onChange={handleChange}
          value={data?.client_representitive1}
        />
        <input
          type="text"
          placeholder="Enter client representative 1 number"
          name="client_representitive1_no"
          onChange={handleChange}
          value={data?.client_representitive1_no}
        />
        <input
          type="text"
          placeholder="Enter client representative 1"
          name="client_representitive2"
          onChange={handleChange}
          value={data?.client_representitive2}
        />
        <input
          type="text"
          placeholder="Enter client representative 1 number"
          name="client_representitive2_no"
          onChange={handleChange}
          value={data?.client_representitive2_no}
        />
        <br />
        <label>Bank Account info</label>
        <input
          type="text"
          placeholder="Enter bank account"
          name="bank_account"
          onChange={handleChange}
          value={data?.bank_account}
        />
        <input
          type="text"
          placeholder="Enter bank name address"
          name="bank_name_address"
          onChange={handleChange}
          value={data?.bank_name_address}
        />
        <input
          type="text"
          placeholder="Enter swift no"
          name="swift"
          onChange={handleChange}
          value={data?.swift}
        />
        <input
          type="text"
          placeholder="Enter routing no"
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
