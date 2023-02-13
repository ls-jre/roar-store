import { useCallback, useReducer, useEffect } from "react";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT": {
      return {
        ...initialState,
        isLoading: true,
      };
    }
    case "FETCH_SUCCESS": {
      return {
        ...initialState,
        data: action.payload,
      };
    }
    case "FETCH_ERROR": {
      return {
        ...initialState,
        isError: true,
      };
    }
  }

  return { state };
};

const useAsyncFetch = (url, { immediate = true }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const refetch = useCallback(async () => {
    if (!url) return;

    try {
      dispatch({ type: "FETCH_INIT" });
      const response = await axios.get(url);
      if (response.status === 200) {
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      }
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error });
    }
  }, [url]);

  const setData = useCallback((data) => {
    dispatch({ type: "FETCH_SUCCESS", payload: data });
  }, []);

  useEffect(() => {
    if (!immediate) return;
    refetch();
  }, [url, immediate, refetch]);

  return { ...state, refetch, setData };
};

export default useAsyncFetch;
