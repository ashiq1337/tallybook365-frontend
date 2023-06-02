import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Styles from "./EditQuotation.module.scss";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";
import useToggler from "../../hooks/useToggler";
import { MdAddCircle, MdDelete } from "react-icons/md";

export default function EditQuotation() {
  const { quotationId } = useParams();
  const [response, error, loading, axiosFetch, message] = useAxios();
  const [
    responseUpdate,
    errorUpdate,
    loadingUpdate,
    axiosFetchUpdate,
    messageUpdate,
  ] = useAxios();
  const [data, setData] = useState({});

  const [
    responseClientData,
    errorClientData,
    loadingClientData,
    axiosFetchClientData,
    messageClientData,
  ] = useAxios(); //for getting client info
  const [selectedClientIndex, setSelectedClientIndex] = useState(); //for storing selected client index from the select menu

  const [inputList, setInputList] = useState([
    {
      particulars: "",
      details: "",
      quantity: "",
      day: "",
      unitPrice: "",
      totalPrice: "",
    },
  ]);
  const [getData, setGetData] = useToggler();

  function handleChange(event) {
    console.log(data)
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  }

  const editQuotationAsync = (e) => {
    e.preventDefault();
    console.log(data);
    axiosFetchUpdate({
      axiosInstance: instance,
      method: "Patch",
      url: `${configuration.quotations}/${quotationId}`,
      requestConfig: data,
    });
    setGetData();
  };

  const getQuotationDetails = () => {
    axiosFetch({
      axiosInstance: instance,
      method: "Get",
      url: `${configuration.quotations}/${quotationId}`,
    });
  };
  const getClientsData = () => {
    axiosFetchClientData({
      axiosInstance: instance,
      method: "Get",
      url: configuration.clients,
    });
  };
  
  useEffect(() => {
    getQuotationDetails();
    getClientsData();
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
    // calculating total from items
    var sum = 0;
    inputList.map((input, i) => {
      sum = sum + parseInt(input.totalPrice);
    });
    //setting the grand total in data object and the items array in data object
    setData({ ...data, grand_total: sum, items: inputList });
  }, [inputList]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;

    //summation of total in a single row
    let rowSum =
      (inputList[index]?.quantity ? inputList[index]?.quantity : 1) *
      (inputList[index]?.day ? inputList[index]?.day : 1) *
      (inputList[index]?.unitPrice ? inputList[index]?.unitPrice : 1);

    //saving total price in list
    list[index]["totalPrice"] = rowSum;

    //updating input list
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
      {
        particulars: "",
        details: "",
        quantity: "",
        day: "",
        unitPrice: "",
        totalPrice: "",
      },
    ]);
  };

  // items...
  const itemsAddInObject = inputList.map((x, i) => {
    return (
      <div className={Styles.itemsContainer} key={i}>
        <input
          type="text"
          name="particulars"
          placeholder="Enter Items"
          value={x.particulars}
          onChange={(e) => handleInputChange(e, i)}
        />
        <input
          type="text"
          name="details"
          placeholder="Enter Details"
          value={x.details}
          onChange={(e) => handleInputChange(e, i)}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Enter Quantity"
          value={x.quantity}
          onChange={(e) => handleInputChange(e, i)}
        />
        <input
          type="number"
          name="day"
          placeholder="Enter Day"
          value={x.day}
          onChange={(e) => handleInputChange(e, i)}
        />
        <input
          type="number"
          name="unitPrice"
          placeholder="Enter Unit Price"
          value={x.unitPrice}
          onChange={(e) => handleInputChange(e, i)}
        />
        <input
          type="number"
          name="totalPrice"
          readOnly
          placeholder="Enter Total Price"
          value={inputList[i]?.totalPrice}
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
      <form onSubmit={editQuotationAsync}>
        {/* <label className={Styles.inputLabel}>User ID</label>
        <input
          type="text"
          placeholder="Enter User ID"
          name="user_id"
          onChange={handleChange}
          value={data?.user_id}
          readOnly
        />
        <br /> */}
        <label>Client Information</label>

        {/* <label className={Styles.inputLabel}>Client</label>
        <input
          type="text"
          placeholder="Enter Client"
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
        /> */}

        <label className={Styles.inputLabel}>Client's Name</label>
        <select
          name="client_name"
          onChange={(e) => {
            setSelectedClientIndex(e.target.value);
            setData({
              ...data,
              client_id: responseClientData?.data[e.target.value]?._id,
              client_name:
                responseClientData?.data[e.target.value]?.client_name,
              client_address:
                responseClientData?.data[e.target.value]?.client_address,
            });
          }}
          defaultValue={data?.client_name}
          required
        >
          <option value="" disabled>
            Select Client
          </option>
          {responseClientData?.data?.map((user, i) => (
            <option key={i} value={i}>
              {user.client_name}
            </option>
          ))}
        </select>

        <label className={Styles.inputLabel}>Client's Id</label>
        <input
          type="text"
          placeholder="Enter Client's ID"
          name="client_id"
          readOnly
          onChange={handleChange}
          value={
            selectedClientIndex
              ? responseClientData?.data[selectedClientIndex]?._id
              : data?.client_id
          }
        />

        <label className={Styles.inputLabel}>Client's Address</label>
        <input
          type="text"
          placeholder="Enter Client's Address"
          name="client_address"
          readOnly
          onChange={handleChange}
          value={
            selectedClientIndex
              ? responseClientData?.data[selectedClientIndex]?.client_address
              : data?.client_address
          }
        />


        <br />
        <label>Add Quotation Information</label>
        <label className={Styles.inputLabel}>Title</label>
        <input
          type="text"
          placeholder="Enter Title"
          name="title"
          onChange={handleChange}
          value={data?.title}
        />
        <label className={Styles.inputLabel}>Job No</label>
        <input
          type="string"
          placeholder="Enter Job No"
          name="job_no"
          onChange={handleChange}
          value={data?.job_no}
          readOnly
        />
        <label className={Styles.inputLabel}>Brand Name</label>
        <input
          type="text"
          placeholder="Enter Brand Name"
          name="brand"
          onChange={handleChange}
          value={data?.brand}
        />
        <label className={Styles.inputLabel}>Job Type</label>
        <input
          type="text"
          placeholder="Enter Job Type"
          name="job_type"
          onChange={handleChange}
          value={data?.job_type}
        />
        <label className={Styles.inputLabel}>Date</label>
        <input
          type="date"
          name="date"
          onChange={handleChange}
          value={data?.date?.slice(0, 10)}
        />
        <br />
        <label>Add items</label>
        {itemsAddInObject}
        <br />
        <label>Payment Information</label>
        <label className={Styles.inputLabel}>Bank Account</label>
        <input
          type="text"
          placeholder="Enter Bank Account No"
          name="bank_account"
          onChange={handleChange}
          value={
            selectedClientIndex
              ? responseClientData?.data[selectedClientIndex]?.bank_account
              : data?.bank_account
          }
        />
        <label className={Styles.inputLabel}>Bank Name & Address</label>
        <input
          type="text"
          placeholder="Enter Bank Name & Address"
          name="bank_name_address"
          onChange={handleChange}
          value={
            selectedClientIndex
              ? responseClientData?.data[selectedClientIndex]?.bank_name_address
              : data?.bank_name_address
          }
        />
        <label className={Styles.inputLabel}>Swift No</label>
        <input
          type="text"
          placeholder="Enter Swift No"
          name="swift"
          onChange={handleChange}
          value={
            selectedClientIndex
              ? responseClientData?.data[selectedClientIndex]?.swift
              : data?.swift
          }
        />
        <label className={Styles.inputLabel}>Routing No</label>
        <input
          type="text"
          placeholder="Enter Routing No"
          name="routing_no"
          onChange={handleChange}
          value={
            selectedClientIndex
              ? responseClientData?.data[selectedClientIndex]?.routing_no
              : data?.routing_no
          }
        />
        <br />
        <label>Percentage</label>
        <label className={Styles.inputLabel}>ASF Percentage</label>
        <input
          type="number"
          placeholder="Enter ASF Percentage"
          name="asf"
          value={data?.asf}
          onChange={handleChange}
        />
        <label className={Styles.inputLabel}>VAT Percentage</label>
        <input
          type="number"
          placeholder="Enter VAT Percentage"
          name="vat"
          onChange={handleChange}
          value={data?.vat}
        />
        <br />
        <label>Terms & Conditions</label>
        <textarea
          name="t_and_c"
          cols="30"
          rows="10"
          onChange={handleChange}
          value={data?.t_and_c}
        ></textarea>
        <p>{message}</p>
        <p>{messageUpdate}</p>
        <button type="submit">Save</button> <br />
        <br />
        <br />
        <br />
      </form>
    </div>
  );
}
