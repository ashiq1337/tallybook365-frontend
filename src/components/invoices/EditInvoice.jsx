import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Styles from "./EditInvoice.module.scss";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";
import { toast } from "react-toastify";
import useToggler from "../../hooks/useToggler";

export default function EditInvoice() {
  const { invoiceId } = useParams();
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

  const editInvoiceAsync = (e) => {
    e.preventDefault();
    console.log(data);
    axiosFetchUpdate({
      axiosInstance: instance,
      method: "Patch",
      url: `${configuration.invoices}/${invoiceId}`,
      requestConfig: data,
    });
    setGetData();
  };

  const getInvoiceDetails = () => {
    axiosFetch({
      axiosInstance: instance,
      method: "Get",
      url: `${configuration.invoices}/${invoiceId}`,
    });
  };

  useEffect(() => {
    getInvoiceDetails();
  }, [getData]);

  useEffect(() => {
    setData(response.data);
  }, [response]);

  return (
    <div className={Styles.main}>
      {loading && <p>Loading</p>}
      {response && !loading && !error && (
        <form onSubmit={editInvoiceAsync}>
          <input
            type="text"
            placeholder="Enter user id"
            name="user_id"
            onChange={handleChange}
            value={data?.user_id}
          />
          <br />
          <label>Client info</label>

          <input
            type="text"
            placeholder="Enter client id"
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

          <br />
          <label>Invoice info</label>

          <input
            type="text"
            placeholder="Enter title"
            name="title"
            onChange={handleChange}
            value={data?.title}
          />

          <input
            type="number"
            placeholder="Enter job_no"
            name="job_no"
            onChange={handleChange}
            value={data?.job_no}
          />

          <input
            type="date"
            placeholder="Enter date"
            name="date"
            onChange={handleChange}
            value={data?.date?.slice(0, 10)}
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
          <br />
          <label>Terms and condition</label>
          <textarea
            name="t_and_c"
            cols="30"
            rows="10"
            onChange={handleChange}
            value={data?.t_and_c}
          ></textarea>

          <p>{message}</p>
          <p>{messageUpdate}</p>
          <button type="submit">Save</button>
          <br />
          <br />
          <br />
          <br />
        </form>
      )}
    </div>
  );
}
