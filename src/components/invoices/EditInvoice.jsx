import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Styles from "./EditInvoice.module.scss";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";
import useToggler from "../../hooks/useToggler";
import { MdAddCircle, MdDelete } from "react-icons/md";
import { calculateGrandTotal } from "../../utilities/utils";
import {useNavigate} from 'react-router-dom';
import Loading from "../error/Loading";

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
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  }

  const editInvoiceAsync = (e) => {
    const finalData = {...data, grand_total: calculateGrandTotal(data?.sub_total, data?.asf, data?.vat)}
    e.preventDefault();
    axiosFetchUpdate({
      axiosInstance: instance,
      method: "Patch",
      url: `${configuration.invoices}/${invoiceId}`,
      requestConfig: finalData,
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

  const handlePreview =()=>{
    navigate(`/preview/Invoice/invoices/${invoiceId}`)
  }

  const getClientsData = () => {
    axiosFetchClientData({
      axiosInstance: instance,
      method: "Get",
      url: configuration.clients,
    });
  };

  useEffect(() => {
    getInvoiceDetails();
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
    if(responseClientData?.data?.length>0){
      setSelectedClientIndex(responseClientData?.data?.findIndex(item => item.client_name === data?.client_name))
    }
  }, [responseClientData?.data]);

  useEffect(() => {
    let sum;
    // calculating total advance from data
    sum =
      Number(data?.advance1 || 0) +
      Number(data?.advance2 || 0) +
      Number(data?.advance3 || 0) +
      Number(data?.advance4 || 0);

    setData({ ...data, total_advance: sum });
  }, [data.advance1, data.advance2, data.advance3, data.advance4]);

  useEffect(() => {
    // calculating total from items
    var sum = 0;
    inputList.map((input) => {
      sum = sum + parseFloat(input.totalPrice);
    });
    //setting the sub total in data object and the items array in data object
    setData({ ...data, sub_total: sum, items: inputList });
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
          placeholder="Enter items"
          value={x.particulars}
          onChange={(e) => handleInputChange(e, i)}
        />
        <input
          type="text"
          name="details"
          placeholder="Enter details"
          value={x.details}
          onChange={(e) => handleInputChange(e, i)}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Enter Last quantity"
          value={x.quantity}
          onChange={(e) => handleInputChange(e, i)}
        />
        <input
          type="number"
          name="day"
          placeholder="Enter day"
          value={x.day}
          onChange={(e) => handleInputChange(e, i)}
        />
        <input
          type="number"
          name="unitPrice"
          placeholder="Enter unit price"
          value={x.unitPrice}
          onChange={(e) => handleInputChange(e, i)}
        />
        <input
          type="number"
          name="totalPrice"
          readOnly
          placeholder="Total price"
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
      {loading && <Loading/>}
      {response && !loading && !error && (
        <form onSubmit={editInvoiceAsync}>
          <label>Client Information</label>
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
                  bank_account: responseClientData?.data[e.target.value]?.bank_account,
                  bank_name_address: responseClientData?.data[e.target.value]?.bank_name_address,
                  swift: responseClientData?.data[e.target.value]?.swift,
                  routing_no: responseClientData?.data[e.target.value]?.routing_no,
              });
            }}
            value={selectedClientIndex}
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
          <p>{data.client_name}</p>

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
          <label>Invoice Information</label>

          <label className={Styles.inputLabel}>Title</label>
          <input
            type="text"
            placeholder="Enter Title"
            name="title"
            onChange={handleChange}
            value={data?.title}
          />

          {/* Job Number is auto generated and same as invoice number */}
          <label className={Styles.inputLabel}>Invoice Number</label>
          <input
            type="string"
            placeholder="Enter Invoice No"
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

          <label className={Styles.inputLabel}>PO Number</label>
          <input
            type="text"
            placeholder="Enter PO Number"
            name="po_number"
            onChange={handleChange}
            value={data?.po_number}
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
          {/* showing the total value  */}
          <p>
            Sub Total amount:{" "}
            {data?.sub_total ? (
              data?.sub_total
            ) : (
              <small style={{ color: "gray" }}>
                Please fill the amount section
              </small>
            )}
          </p>

          <br />
          <label>Advance</label>

          <p>
            Total Advance Amount BDT:{" "}
            {data?.total_advance ? (
              data?.total_advance
            ) : (
              <small style={{ color: "gray" }}>
                Please fill the advance amount section
              </small>
            )}
          </p>

          <label className={Styles.inputLabel}>Advance Amount 1</label>
          <input
            type="number"
            placeholder="Enter First Advance Amount"
            name="advance1"
            onChange={handleChange}
            value={data?.advance1}
          />

          <label className={Styles.inputLabel}>Advance Amount 2</label>
          <input
            type="number"
            placeholder="Enter Second Advance Amount"
            name="advance2"
            onChange={handleChange}
            value={data?.advance2}
          />

          <label className={Styles.inputLabel}>Advance Amount 3</label>
          <input
            type="number"
            placeholder="Enter Third Advance Amount"
            name="advance3"
            onChange={handleChange}
            value={data?.advance3}
          />

          <label className={Styles.inputLabel}>Advance Amount 4</label>
          <input
            type="number"
            placeholder="Enter Fourth Advance Amount"
            name="advance4"
            onChange={handleChange}
            value={data?.advance4}
          />

          <br />

          <label>Bank Account Information</label>

          <label className={Styles.inputLabel}>Bank Account</label>
          <input
            type="text"
            placeholder="Enter Bank Accoun"
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
                ? responseClientData?.data[selectedClientIndex]
                    ?.bank_name_address
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
          <div className={Styles.btnContainer}>
            <button type="submit">Save</button>
            <button className={Styles.btnPreview} onClick={handlePreview}>Preview</button>
          </div>
          <br />
          <br />
          <br />
          <br />
        </form>
      )}
    </div>
  );
}
