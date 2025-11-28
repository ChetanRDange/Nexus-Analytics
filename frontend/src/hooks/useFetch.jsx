import { useState, useEffect, useCallback } from "react";
import apiFetch from "./apiFetch";
import toast from "react-hot-toast";

const useFetch = (endpoint, options = {}, lazy = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const callApi = useCallback(
    async (newEndPoint) => {
      setLoading(true);
      setData(null);
      try {
        const result = await apiFetch(
          newEndPoint || endpoint,
          "GET",
          null,
          options.headers
        );
        setData(result);
      } catch (err) {
        toast.error(err.message || "Something went wrong!");
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    },
    [endpoint, JSON.stringify(options)]
  );

  useEffect(() => {
    if (!lazy) callApi();
  }, [callApi, options.fetchRefresh, lazy]);

  return { data, loading, callApi };
};

export default useFetch;
