import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Styles from "./EditInvoice.module.scss";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";
import useToggler from "../../hooks/useToggler";
import { MdAddCircle, MdDelete } from "react-icons/md";

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
  const [inputList, setInputList] = useState([
    { particulars: "", quantity: "", day: "", unitPrice: "", totalPrice: "" },
  ]);
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
    //checking if response has its values
    if (response.data) {
      //setting data to data
      setData(response?.data);
      //setting items values to inputlist to view on client site
      setInputList(response?.data?.items);
    }
  }, [response]);

  useEffect(() => {
    //setting items data into the data object
    setData({ ...data, items: inputList });
  }, [inputList]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { particulars: "", quantity: "", day: "", unitPrice: "", totalPrice: "" },
    ]);
  };

  // items...
  const itemsAddInObject = inputList.map((x, i) => {
    return (
      <div className={Styles.itemsContainer} key={i}>
        <input
          name="particulars"
          placeholder="Enter Particulars"
          value={x.particulars}
          onChange={(e) => handleInputChange(e, i)}
        />
        <input
          name="quantity"
          placeholder="Enter Last quantity"
          value={x.quantity}
          onChange={(e) => handleInputChange(e, i)}
        />
        <input
          name="day"
          placeholder="Enter day"
          value={x.day}
          onChange={(e) => handleInputChange(e, i)}
        />
        <input
          name="unitPrice"
          placeholder="Enter unit price"
          value={x.unitPrice}
          onChange={(e) => handleInputChange(e, i)}
        />
        <input
          name="totalPrice"
          placeholder="Enter total price"
          value={x.totalPrice}
          onChange={(e) => handleInputChange(e, i)}
        />
        <div className={Styles.btnBox}>
          {inputList.length !== 1 && (
            <MdDelete
              className={Styles.remove}
              onClick={() => handleRemoveClick(i)}
            />
          )}
          {inputList.length - 1 === i && (
            <MdAddCircle className={Styles.add} onClick={handleAddClick} />
          )}
        </div>
      </div>
    );
  });

  return (
    <div className={Styles.main}>
      {loading && <p>Loading</p>}
      {response && !loading && !error && (
        <form onSubmit={editInvoiceAsync}>
          <input
            type="text"
            placeholder="Enter User id"
            name="user_id"
            onChange={handleChange}
            value={data?.user_id}
            readOnly
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
            placeholder="Enter job no"
            name="job_no"
            onChange={handleChange}
            value={data?.job_no}
          />

          <input
            type="text"
            placeholder="Enter Brand name"
            name="brand"
            onChange={handleChange}
            value={data?.brand}
          />
          <input
            type="text"
            placeholder="Enter Job type"
            name="job_type"
            onChange={handleChange}
            value={data?.job_type}
          />

          <input
            type="date"
            placeholder="Enter date"
            name="date"
            onChange={handleChange}
            value={data?.date?.slice(0, 10)}
          />
          <br />
          <label>Add items</label>
          {itemsAddInObject}
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
