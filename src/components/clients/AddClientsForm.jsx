import Styles from "./AddClientsForm.module.scss";
import React, { useState } from "react";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";

export default function AddClientsForm() {
  const [data, setData] = useState({});
  const [response, error, loading, axiosFetch, message] = useAxios();

  function handleChange(event) {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  }

  const addClientsAsync = (e) => {
    e.preventDefault();
    console.log(data)
    axiosFetch({
      axiosInstance: instance,
      method: "Post",
      url: configuration.clients,
      requestConfig: data,
    });
  };

  return (
    <div className={Styles.main}>
      <form onSubmit={addClientsAsync}>
        <br />
        <label>Client info</label>
        <input
          type="text"
          placeholder="Enter Client id"
          name="client_id"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Enter client name"
          name="client_name"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Enter Client's address"
          name="client_address"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter client contact number"
          name="client_contact_no"
          onChange={handleChange}
        />
        <br />
        <label>Client representative</label>
        <input
          type="text"
          placeholder="Enter client representative 1"
          name="client_representitive1"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter client representative 1 number"
          name="client_representitive1_no"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter client representative 1"
          name="client_representitive2"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter client representative 1 number"
          name="client_representitive2_no"
          onChange={handleChange}
        />
        <br />
        <label>Bank Account info</label>
        <input
          type="text"
          placeholder="Enter bank account"
          name="bank_account"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter bank name address"
          name="bank_name_address"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter swift no"
          name="swift"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter routing no"
          name="routing_no"
          onChange={handleChange}
        />
        <p>{message}</p>
        <button type="submit">Save</button>
        <br />
        <br />
        <br />
        <br />
      </form>
    </div>
  );
}
