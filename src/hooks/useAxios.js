import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const useAxios = () => {
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); //different!
  const [controller, setController] = useState();
  const [message, setMessage] = useState("");

  const customId = "custom-id-yes"; //random id for not showing toast multiple rerenders

  const axiosFetch = async (configObj) => {
    const { axiosInstance, method, url, requestConfig = {} } = configObj;
    var customMessage = "Success";
    try {
      setLoading(true);
      toast.loading("Please wait...", { toastId: customId });
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: ctrl.signal,
      });
      setResponse(res); //storing response in state
      setMessage(res?.data?.msg); //storing message in state
      customMessage = res?.data?.msg ? res?.data?.msg : "Success"; //if there is msg it will be toasted
      toast.update(customId, {
        render: customMessage,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      }); //toasting success message
    } catch (err) {
      setMessage(err?.response?.data?.msg);
      setError(err.message);
      toast.update(customId, {
        render: err?.response?.data?.msg,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      }); //toasting error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // useEffect cleanup function
    return () => controller && controller.abort();
  }, [controller]);

  return [response, error, loading, axiosFetch, message];
};

export default useAxios;
