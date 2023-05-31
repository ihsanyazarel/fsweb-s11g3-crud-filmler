import { useState } from "react";
import axios from "axios";

export const REQ_TYPES = Object.freeze({
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
});

const useAxios = (initialValue = []) => {
  const [data, setData] = useState(initialValue);

  const doRequest = ({
    endpoint,
    reqType,
    payload,
  }) => {
    return axios
      .create({
        baseURL: "http://localhost:9000"
      })
      [reqType](endpoint, payload)
      .then((res) => {
        setData(res.data);
        return res.data;
      })
      .catch((err) => {
        setData(initialValue);
      })
      .finally(() => {});
  };

  return [doRequest, data];
};

export default useAxios;
