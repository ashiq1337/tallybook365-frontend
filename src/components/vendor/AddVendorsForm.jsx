import Styles from "./AddVendorsForm.module.scss";
import React, { useState } from "react";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";

export default function AddVendorsForm() {
  const [data, setData] = useState({
    mother_company: localStorage.getItem("motherCompany"), //storing the mother company from local storage
  });
  const [response, error, loading, axiosFetch, message] = useAxios();

  function handleChange(event) {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  }

  const addVendorAsync = (e) => {
    e.preventDefault();
    console.log(data);
    axiosFetch({
      axiosInstance: instance,
      method: "Post",
      url: configuration.vendors,
      requestConfig: data,
    });
  };

  return (
    <div className={Styles.main}>
      <form onSubmit={addVendorAsync}>
        {/* <br /> */}
        <label>Vendor Information</label>

        {/* <label className={Styles.inputLabel}>Vendor's ID</label>
        <input
          type="text"
          placeholder="Enter Vendor's ID"
          name="vendor_id"
          onChange={handleChange}
        /> */}

        <label className={Styles.inputLabel}>Vendor's Name</label>
        <input
          type="text"
          placeholder="Enter Vendor's Name"
          name="vendor_name"
          onChange={handleChange}
        />

        <label className={Styles.inputLabel}>Vendor's Address</label>
        <input
          type="text"
          placeholder="Enter Vendor's Address"
          name="vendor_address"
          onChange={handleChange}
        />

        <label className={Styles.inputLabel}>Vendor's Contact Number</label>
        <input
          type="text"
          placeholder="Enter Vendor's Contact Number"
          name="vendor_contact_no"
          onChange={handleChange}
        />
        <br />
        <label>Vendor Representative</label>

        <label className={Styles.inputLabel}>Vendor Representative 1</label>
        <input
          type="text"
          placeholder="Enter Vendor Representative 1"
          name="vendor_representative1"
          onChange={handleChange}
        />

        <label className={Styles.inputLabel}>
          Vendor Representative 1 Number
        </label>
        <input
          type="text"
          placeholder="Enter Vendor Representative 1 Number"
          name="vendor_representative1_no"
          onChange={handleChange}
        />

        <label className={Styles.inputLabel}>Vendor Representative 2</label>
        <input
          type="text"
          placeholder="Enter Vendor Representative 2"
          name="vendor_representative2"
          onChange={handleChange}
        />

        <label className={Styles.inputLabel}>
          Vendor Representative 2 Number
        </label>
        <input
          type="text"
          placeholder="Enter Vendor representative 2 Number"
          name="vendor_representative2_no"
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
