import { useState, useEffect } from "react";

const useAxios = () => {
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); //different!
  const [controller, setController] = useState();
  const [message, setMessage] = useState("");

  const axiosFetch = async (configObj) => {
    const { axiosInstance, method, url, requestConfig = {} } = configObj;
    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: ctrl.signal,
      });
      setResponse(res); //storing response in state
      setMessage(res?.data?.msg); //storing message in state
    } catch (err) {
      setMessage(err?.response?.data?.msg);
      setError(err.message);
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
