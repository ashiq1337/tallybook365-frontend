import Styles from "./AddChalanForm.module.scss";
import React, { useEffect, useState } from "react";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";
import { MdAddCircle, MdDelete } from "react-icons/md";

export default function AddChalanForm() {
  const [data, setData] = useState({});
  const [response, error, loading, axiosFetch, message] = useAxios();
  const [responseSelf, errorSelf, loadingSelf, axiosFetchSelf, messageSelf] =
    useAxios();
  const [
    responseClientData,
    errorClientData,
    loadingClientData,
    axiosFetchClientData,
    messageClientData,
  ] = useAxios();
  const [selectedClientIndex, setSelectedClientIndex] = useState();

  const [inputList, setInputList] = useState([
    { particulars: "", quantity: "", day: "", unitPrice: "", totalPrice: "" },
  ]);

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

  useEffect(() => {
    getClientsData();
    getSelf();
  }, []);

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
          placeholder="Enter Particular"
          value={x.particulars}
          onChange={(e) => handleInputChange(e, i)}
        />
        <input
          name="quantity"
          placeholder="Enter Last Quantity"
          value={x.quantity}
          onChange={(e) => handleInputChange(e, i)}
        />
        <input
          name="day"
          placeholder="Enter Day"
          value={x.day}
          onChange={(e) => handleInputChange(e, i)}
        />
        <input
          name="unitPrice"
          placeholder="Enter Unit Price"
          value={x.unitPrice}
          onChange={(e) => handleInputChange(e, i)}
        />
        <input
          name="totalPrice"
          placeholder="Enter Total Price"
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
      <form onSubmit={addClientsAsync} id="addChalanForm">
        <input
          type="text"
          placeholder="Enter User ID"
          // name="user_id"
          // onChange={handleChange}
          // value={responseSelf ? responseSelf?.data?.user_id : ""}
          // readOnly
        />
        <br />
        <label>Client Information</label>
        <select
          name="client_id"
          // onChange={(e) => {
          //   setSelectedClientIndex(e.target.value);
          //   setData({
          //     ...data,
          //     user_id: responseSelf?.data?.user_id,
          //     client_id: responseClientData?.data[e.target.value]?.client_id,
          //     client_name:
          //       responseClientData?.data[e.target.value]?.client_name,
          //     client_address:
          //       responseClientData?.data[e.target.value]?.client_address,
          //   });
          // }}
          defaultValue=""
          required
        >
          <option value="" disabled>
            Select client
          </option>
          {/* {responseClientData?.data?.map((user, i) => (
            <option key={i} value={i}>
              {user.client_id}
            </option>
          ))} */}
        </select>

        {/* <label className={Styles.chalanFormLabel}>Client's Name</label> */}
        <input
          type="text"
          placeholder="Enter Client's Name"
          name="client_name"
          // readOnly
          // onChange={handleChange}
          // value={
          //   selectedClientIndex
          //     ? responseClientData?.data[selectedClientIndex]?.client_name
          //     : ""
          // }
        />
        <input
          type="text"
          placeholder="Enter Client's Address"
          name="client_address"
          // readOnly
          // onChange={handleChange}
          // value={
          //   selectedClientIndex
          //     ? responseClientData?.data[selectedClientIndex]?.client_address
          //     : ""
          // }
        />

        <br />
        <label>Invoice Information</label>

        <input
          type="text"
          placeholder="Enter Title"
          name="title"
          onChange={handleChange}
        />

        <input
          type="number"
          placeholder="Enter Job No"
          name="job_no"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter Brand Name"
          name="brand"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter Job Type"
          name="job_type"
          onChange={handleChange}
        />
        <input
          type="date"
          placeholder="Enter Date"
          name="date"
          onChange={handleChange}
        />
        <br />
        <label>Add items</label>
        {itemsAddInObject}

        {/* <br /> */}
        {/* <label>Advance</label> */}

        {/* <input
          type="text"
          placeholder="Enter due amount"
          name="due"
          onChange={handleChange}
        /> */}

        {/* <input
          type="number"
          placeholder="Enter advance amount"
          name="advance"
          onChange={handleChange}
        /> */}

        <br />
        <label>Bank Account Information</label>
        <input
          type="text"
          placeholder="Enter Bank Account"
          name="bank_account"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter Branch Name & Address"
          name="bank_name_address"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter Swift No"
          name="swift"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter Routing No"
          name="routing_no"
          onChange={handleChange}
        />
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
