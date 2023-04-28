import Styles from "./AddClientsForm.module.scss";
import React, { useState } from "react";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";

export default function AddClientsForm() {
  const [data, setData] = useState({
    mother_company: localStorage.getItem("motherCompany"), //storing the mother company from local storage
  });
  const [response, error, loading, axiosFetch, message] = useAxios();

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
      url: configuration.clients,
      requestConfig: data,
    });
  };

  return (
    <div className={Styles.main}>
      <form onSubmit={addClientsAsync}>
        <br />
        <label>Client Information</label>

        {/* <label className={Styles.inputLabel}>Client's ID</label>
        <input
          type="text"
          placeholder="Enter Client's ID"
          name="client_id"
          onChange={handleChange}
        /> */}

        <label className={Styles.inputLabel}>Client's Name</label>
        <input
          type="text"
          placeholder="Enter Client's Name"
          name="client_name"
          onChange={handleChange}
        />

        <label className={Styles.inputLabel}>Client's Address</label>
        <input
          type="text"
          placeholder="Enter Client's Address"
          name="client_address"
          onChange={handleChange}
        />

        <label className={Styles.inputLabel}>Client's Contact Number</label>
        <input
          type="text"
          placeholder="Enter Client's Contact Number"
          name="client_contact_no"
          onChange={handleChange}
        />
        <br />
        <label>Client Representative</label>

        <label className={Styles.inputLabel}>Client Representative 1</label>
        <input
          type="text"
          placeholder="Enter Client Representative 1"
          name="client_representative1"
          onChange={handleChange}
        />

        <label className={Styles.inputLabel}>
          Client Representative 1 Number
        </label>
        <input
          type="text"
          placeholder="Enter Client Representative 1 Number"
          name="client_representative1_no"
          onChange={handleChange}
        />

        <label className={Styles.inputLabel}>Client Representative 2</label>
        <input
          type="text"
          placeholder="Enter Client Representative 2"
          name="client_representative2"
          onChange={handleChange}
        />

        <label className={Styles.inputLabel}>
          Client Representative 2 Number
        </label>
        <input
          type="text"
          placeholder="Enter client representative 2 Number"
          name="client_representative2_no"
          onChange={handleChange}
        />
        <br />
        <label>Bank Account Information</label>

        <label className={Styles.inputLabel}>Bank Account</label>
        <input
          type="text"
          placeholder="Enter Bank Account"
          name="bank_account"
          onChange={handleChange}
        />

        <label className={Styles.inputLabel}>Bank Name & Address</label>
        <input
          type="text"
          placeholder="Enter Bank Name & Address"
          name="bank_name_address"
          onChange={handleChange}
        />

        <label className={Styles.inputLabel}>Swift No</label>
        <input
          type="text"
          placeholder="Enter Swift No"
          name="swift"
          onChange={handleChange}
        />

        <label className={Styles.inputLabel}>Routing No</label>
        <input
          type="text"
          placeholder="Enter Routing No"
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
