import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Styles from "./EditVendor.module.scss";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";
import useToggler from "../../hooks/useToggler";

export default function EditVendor() {
  const { vendorId } = useParams();
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

  const editVendorAsync = (e) => {
    e.preventDefault();
    //console.log(data);
    axiosFetchUpdate({
      axiosInstance: instance,
      method: "Patch",
      url: `${configuration.vendors}/${vendorId}`,
      requestConfig: data,
    });
    setGetData();
  };

  const getVendorDetails = () => {
    axiosFetch({
      axiosInstance: instance,
      method: "Get",
      url: `${configuration.vendors}/${vendorId}`,
    });
  };

  useEffect(() => {
    getVendorDetails();
  }, [getData]);

  useEffect(() => {
    setData(response.data);
  }, [response]);

  return (
    <div className={Styles.main}>
      <form onSubmit={editVendorAsync}>
        {/* <br /> */}
        <label>Vendor Information</label>
        {/* <label className={Styles.inputLabel}>Vendor's ID</label>
        <input
          type="text"
          placeholder="Enter Vendor's ID"
          name="vendor_id"
          onChange={handleChange}
          value={data?.vendor_id}
        /> */}

        <label className={Styles.inputLabel}>Vendor's Name</label>
        <input
          type="text"
          placeholder="Enter Vendor's Name"
          name="vendor_name"
          onChange={handleChange}
          value={data?.vendor_name}
        />

        <label className={Styles.inputLabel}>Vendor's Address</label>
        <input
          type="text"
          placeholder="Enter Vendor's Address"
          name="vendor_address"
          onChange={handleChange}
          value={data?.vendor_address}
        />

        <label className={Styles.inputLabel}>Vendor's Contact Number</label>
        <input
          type="text"
          placeholder="Enter Vendor's Contact Number"
          name="vendor_contact_no"
          onChange={handleChange}
          value={data?.vendor_contact_no}
        />

        <br />
        <label>Vendor Representative</label>

        <label className={Styles.inputLabel}>Vendor Representative 1</label>
        <input
          type="text"
          placeholder="Enter Vendor Representative 1"
          name="vendor_representative1"
          onChange={handleChange}
          value={data?.vendor_representative1}
        />

        <label className={Styles.inputLabel}>
          Vendor Representative 1 Number
        </label>
        <input
          type="text"
          placeholder="Enter Vendor Representative 1 Number"
          name="vendor_representative1_no"
          onChange={handleChange}
          value={data?.vendor_representative1_no}
        />

        <label className={Styles.inputLabel}>Vendor Representative 2</label>
        <input
          type="text"
          placeholder="Enter Vendor Representative 2"
          name="vendor_representative2"
          onChange={handleChange}
          value={data?.vendor_representative2}
        />

        <label className={Styles.inputLabel}>
          Vendor Representative 2 Number
        </label>
        <input
          type="text"
          placeholder="Enter Vendor Representative 2 Number"
          name="vendor_representative2_no"
          onChange={handleChange}
          value={data?.vendor_representative2_no}
        />

        <br />
        <label>Bank Account Information</label>

        <label className={Styles.inputLabel}>Bank Account</label>
        <input
          type="text"
          placeholder="Enter Bank Account"
          name="bank_account"
          onChange={handleChange}
          value={data?.bank_account}
        />

        <label className={Styles.inputLabel}>Bank Name & Address</label>
        <input
          type="text"
          placeholder="Enter Bank Name & Address"
          name="bank_name_address"
          onChange={handleChange}
          value={data?.bank_name_address}
        />

        <label className={Styles.inputLabel}>Swift No</label>
        <input
          type="text"
          placeholder="Enter Swift No"
          name="swift"
          onChange={handleChange}
          value={data?.swift}
        />

        <label className={Styles.inputLabel}>Routing No</label>
        <input
          type="text"
          placeholder="Enter Routing No"
          name="routing_no"
          onChange={handleChange}
          value={data?.routing_no}
        />
        <p>{message}</p>
        <p>{messageUpdate}</p>
        <button type="submit">Save</button>
        <br />
        <br />
        <br />
        <br />
      </form>
    </div>
  );
}
