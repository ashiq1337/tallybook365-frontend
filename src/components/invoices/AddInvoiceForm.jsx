import Styles from "./AddInvoiceForm.module.scss";
import React, { useEffect, useState } from "react";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";

export default function AddInvoiceForm() {
  const [data, setData] = useState({});
  const [response, error, loading, axiosFetch, message] = useAxios();
  const [
    responseClientData,
    errorClientData,
    loadingClientData,
    axiosFetchClientData,
    messageClientData,
  ] = useAxios();

  function handleChange(event) {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  }

  const addClientsAsync = (e) => {
    e.preventDefault();
    console.log(data);
    axiosFetch({
      axiosInstance: instance,
      method: "Post",
      url: configuration.invoices,
      requestConfig: data,
    });
    //document.getElementById("addInvoiceForm").reset();
  };

  const getClientsData = () => {
    axiosFetchClientData({
      axiosInstance: instance,
      method: "Get",
      url: configuration.clients,
    });
  };

  useEffect(() => {
    getClientsData();
  }, []);

  return (
    <div className={Styles.main}>
      <form onSubmit={addClientsAsync} id="addInvoiceForm">
        <input
          type="text"
          placeholder="Enter user id"
          name="user_id"
          onChange={handleChange}
        />
        <br />
        <label>Client info</label>

        <select name="client_id" onChange={handleChange}>
        <option value="" disabled selected>Select client</option>
          {responseClientData?.data?.map((user, i) => (
            <option key={i} value={user.client_id}>
              {user.client_id}
            </option>
          ))}
        </select>

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

        <br />
        <label>Invoice info</label>

        <input
          type="text"
          placeholder="Enter title"
          name="title"
          onChange={handleChange}
        />

        <input
          type="number"
          placeholder="Enter job_no"
          name="job_no"
          onChange={handleChange}
        />

        <input
          type="date"
          placeholder="Enter date"
          name="date"
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
        <br />
        <label>Terms and condition</label>
        <textarea
          name="t_and_c"
          cols="30"
          rows="10"
          onChange={handleChange}
        ></textarea>

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
