import Styles from "./AddChalanForm.module.scss";
import React, { useEffect, useState } from "react";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";
import { MdAddCircle, MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";

export default function AddChalanForm() {
  const { quotationId } = useParams();
  const [data, setData] = useState({
    mother_company: localStorage.getItem("motherCompany"), //storing the mother company from local storage
    quote_id: quotationId, //storing the quotation id from param
  });
  const [response, error, loading, axiosFetch, message] = useAxios();
  const [
    responseJobNo,
    errorJobNo,
    loadingJobNo,
    axiosFetchJobNo,
    messageJobNo,
  ] = useAxios(); //for getting recent job no
  const [responseSelf, errorSelf, loadingSelf, axiosFetchSelf, messageSelf] =
    useAxios();
  const [
    responseClientData,
    errorClientData,
    loadingClientData,
    axiosFetchClientData,
    messageClientData,
  ] = useAxios();

  const [
    responseQuotationInfo,
    errorQuotationInfo,
    loadingQuotationInfo,
    axiosFetchQuotationInfo,
    messageQuotationInfo,
  ] = useAxios(); //for getting quotation info
  
  const [selectedClientIndex, setSelectedClientIndex] = useState();

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

  function handleChange(event) {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  }

  const createChalanAsync = (e) => {
    e.preventDefault();

    //console.log(data);
    axiosFetch({
      axiosInstance: instance,
      method: "Post",
      url: configuration.chalans,
      requestConfig: data,
    });
  };

  useEffect(() => {
    // calculating total from items
    var sum = 0;
    inputList.map((input, i) => {
      sum = sum + parseInt(input.totalPrice);
    });
    //setting the grand total in data object and the items array in data object
    setData({ ...data, grand_total: sum, items: inputList });
  }, [inputList]);

  const getClientsData = () => {
    axiosFetchClientData({
      axiosInstance: instance,
      method: "Get",
      url: configuration.clients,
    });
  };

  const getSelf = () => {
    axiosFetchSelf({
      axiosInstance: instance,
      method: "Get",
      url: configuration.self,
    });
  };

  const getJobNo = () => {
    axiosFetchJobNo({
      axiosInstance: instance,
      method: "Get",
      url: configuration.chalanJobNo,
    });
  };

  const getQuotationInfo = () => {
    axiosFetchQuotationInfo({
      axiosInstance: instance,
      method: "Get",
      url: `${configuration.quotations}/${quotationId}`,
    });
  };

  useEffect(() => {
    getClientsData();
    getSelf();
    getJobNo();
    getQuotationInfo();
  }, []);

  useEffect(() => {
    setData({
      ...data,
      title: responseQuotationInfo?.data?.title,
      brand: responseQuotationInfo?.data?.brand,
      job_type: responseQuotationInfo?.data?.job_type,
    });
    
  }, [responseQuotationInfo]);

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
          placeholder="Total Price"
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
      <form onSubmit={createChalanAsync} id="addChalanForm">
        {/* <label className={Styles.inputLabel}>User ID</label>
        <input
          type="text"
          placeholder="Enter User ID"
          name="user_id"
          onChange={handleChange}
          value={responseSelf ? responseSelf?.data?.user_id : ""}
          readOnly
        />
        <br /> */}
        <label>Client Information</label>

        <label className={Styles.inputLabel}>Client's Name</label>
        <select
          name="client_name"
          onChange={(e) => {
            setSelectedClientIndex(e.target.value);
            setData({
              ...data,
              user_id: responseSelf?.data?.user_id, //storing the user id from self/showMe api
              job_no: responseJobNo?.data, //storing job number
              client_id: responseClientData?.data[e.target.value]?._id,
              client_name:
                responseClientData?.data[e.target.value]?.client_name,
              client_address:
                responseClientData?.data[e.target.value]?.client_address,
              bank_account:
                responseClientData?.data[e.target.value]?.bank_account,
              bank_name_address:
                responseClientData?.data[e.target.value]?.bank_name_address,
              swift: responseClientData?.data[e.target.value]?.swift,
              routing_no: responseClientData?.data[e.target.value]?.routing_no,
            });
          }}
          defaultValue=""
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

        {/* <label className={Styles.inputLabel}>Client's Id</label>
        <input
          type="text"
          placeholder="Enter Client's ID"
          name="client_id"
          readOnly
          onChange={handleChange}
          value={
            selectedClientIndex
              ? responseClientData?.data[selectedClientIndex]?._id
              : ""
          }
        /> */}

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
              : ""
          }
        />

        <br />
        <label>Add Chalan Information</label>

        <label className={Styles.inputLabel}>Title</label>
        <input
          type="text"
          placeholder="Enter Title"
          name="title"
          onChange={handleChange}
          value={responseQuotationInfo?.data?.title}
        />

        <label className={Styles.inputLabel}>Job No</label>
        <input
          type="string"
          placeholder="Enter Job No"
          name="job_no"
          onChange={handleChange}
          value={responseJobNo?.data}
          readOnly
        />

        <label className={Styles.inputLabel}>Brand Name</label>
        <input
          type="text"
          placeholder="Enter Brand Name"
          name="brand"
          onChange={handleChange}
          value={responseQuotationInfo?.data?.brand}
        />

        <label className={Styles.inputLabel}>Job Type</label>
        <input
          type="text"
          placeholder="Enter Job Type"
          name="job_type"
          onChange={handleChange}
          value={responseQuotationInfo?.data?.job_type}
        />

        <label className={Styles.inputLabel}>Date</label>
        <input
          type="date"
          placeholder="Enter Date"
          name="date"
          onChange={handleChange}
        />
        <br />
        <label>Add items</label>
        {itemsAddInObject}

        <br />
        {/* showing the total value  */}
        <p>
          Total amount:{" "}
          {data?.grand_total ? (
            data?.grand_total
          ) : (
            <small style={{ color: "gray" }}>
              Please fill the amount section
            </small>
          )}
        </p>

        {/* <br /> 
        <label>Advance</label> 

        <input
          type="text"
          placeholder="Enter due amount"
          name="due"
          onChange={handleChange}
        /> 

        <input
          type="number"
          placeholder="Enter advance amount"
          name="advance"
          onChange={handleChange}
        /> */}

        <br />
        <label>Bank Account Information</label>
        <label className={Styles.inputLabel}>Bank Account</label>
        <input
          type="text"
          placeholder="Enter Bank Account No"
          name="bank_account"
          onChange={handleChange}
          value={
            selectedClientIndex
              ? responseClientData?.data[selectedClientIndex]?.bank_account
              : ""
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
              : ""
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
              : ""
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
              : ""
          }
        />
        <br />
        <br />
        <label>Percentage</label>
        <label className={Styles.inputLabel}>ASF Percentage</label>
        <input
          type="number"
          placeholder="Enter ASF Percentage"
          name="asf"
          onChange={handleChange}
        />

        <label className={Styles.inputLabel}>VAT Percentage</label>
        <input
          type="number"
          placeholder="Enter VAT Percentage"
          name="vat"
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Terms & Conditions</label>

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
