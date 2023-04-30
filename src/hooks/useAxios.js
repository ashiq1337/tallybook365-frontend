import { useState, useEffect } from "react";
import { toast } from 'react-toastify';

const useAxios = () => {
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); //different!
  const [controller, setController] = useState();
  const [message, setMessage] = useState("");

  const customId = "custom-id-yes"; //random id for not showing toast multiple rerenders

  const axiosFetch = async (configObj) => {
    const { axiosInstance, method, url, requestConfig = {} } = configObj;
    try {
      setLoading(true);
      toast.loading("Please wait...", { toastId: customId})
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: ctrl.signal,
      });

      setResponse(res); //storing response in state
      setMessage(res?.data?.msg); //storing message in state

      toast.update(customId, { render: "Success", type: "success", isLoading: false, autoClose: 2000, }); //toasting success message

    } catch (err) {
      //console.log(err.response);
      setMessage(err?.response?.data?.msg);
      setError(err.message);
      toast.update(customId, { render: err?.response?.data?.msg, type: "error", isLoading: false, autoClose: 2000, });  //toasting error message

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //console.log("useAxios controller", controller);

    // useEffect cleanup function
    return () => controller && controller.abort();
  }, [controller]);

  return [response, error, loading, axiosFetch, message];
};

export default useAxios;
