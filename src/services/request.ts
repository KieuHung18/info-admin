import { backendUrl } from "./url";

const backendRequest = async (
  method = "GET" || "POST" || "DELETE" || "OPTIONS",
  path = "",
  payload?: any,
  isFile?: boolean
) => {
  const url = backendUrl + path;
  const options: RequestInit = {
    method: method,
  };
  if (!isFile) {
    options.headers = {
      "Content-Type": "application/json",
    };
  }
  if (payload) {
    options.body = payload;
  }
  let fetchData: any, error: any;
  await fetch(url, options)
    .then(async (res) => {
      if (res.status != 404) {
        return res.json();
      } else {
        throw new Error("Apis not found");
      }
    })
    .then((data: any) => {
      fetchData = data?.response;
      error = data?.error;
    })
    .catch((err) => {
      alert(err);
    });
  return [fetchData, error];
};

export { backendRequest };
