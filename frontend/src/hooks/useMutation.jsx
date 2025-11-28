import { useCallback, useContext, useState } from "react";
import toast from "react-hot-toast";
import apiFetch from "./apiFetch";
import { GlobalContext } from "../App";

export default function useMutation(fetchData) {
  const [data, setData] = useState({});
  const { setLoading, loading } = useContext(GlobalContext);
  const callApi = useCallback(
    async (endpoint, method = "POST", body = null, headers = {}) => {
      setLoading(true);
      try {
        const result = await apiFetch(endpoint, method, body, headers);
        setData(result);
        if (result?.message) {
          if (typeof result?.message === "string") {
            toast.success(result?.message);
          } else {
            const {
              message,
              type,
              duration,
              position,
              dissmissable,
              style,
              icon,
              iconTheme,
            } = result.message;
            toast?.[type](message, {
              style: style || {
                border: "1px solid #713200",
                padding: "16px",
                color: "#713200",
              },
              iconTheme: iconTheme || {
                primary: "#713200",
                secondary: "#FFFAEE",
              },
              icon: icon,
              duration: duration * 1000 || 3000,
              position: position || "top-right",
            });
          }
        }
        fetchData && fetchData();
        return result;
      } catch (err) {
        console.error("Mutation Error:", err);
        let parsedError;
        try {
          parsedError = JSON.parse(err.message);
        } catch (parseError) {
          parsedError = null;
        }
        if (parsedError) {
          const {
            message,
            type = "error",
            duration,
            position,
            dissmissable,
            style,
            icon,
            iconTheme,
          } = parsedError;
          toast?.[type](message, {
            style: style || {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
            iconTheme: iconTheme || {
              primary: "#713200",
              secondary: "#FFFAEE",
            },
            icon,
            duration: (duration || 3) * 1000,
            position: position || "top-right",
          });
        } else {
          toast.error(err.message || "Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    },
    [fetchData, setLoading]
  );

  return { data, callApi, loading };
}
