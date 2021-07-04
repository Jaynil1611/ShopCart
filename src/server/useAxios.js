import { useEffect, useState } from "react";
import { useProduct } from "../contexts";
import { callMockServer } from "./index";
import { actions } from "../reducers";

export default function useAxios(resource, name) {
  const { dispatch } = useProduct();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoadingStatus(true);
    (async () => {
      try {
        const {
          response: { data },
          error,
        } = await callMockServer({
          type: "get",
          url: resource,
        });
        if (!error) {
          dispatch({
            type: actions.INITIALIZE_LIST,
            payload: { name, data },
          });
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoadingStatus(false);
      }
    })();
  }, [dispatch, name, resource]);

  return { loadingStatus, error };
}
