import { backendUrl } from "./url";

const backendRequest = async (
  method = "GET" || "POST" || "DELETE" || "OPTIONS",
  path = "",
  payload?: any,
  isFile?: boolean
) => {
  const url = backendUrl + path;
  let authentication = "";

  const auth = localStorage.getItem("authentication");

  if (auth) {
    authentication = auth;
  }
  const options: RequestInit = {
    headers: {
      authentication: authentication,
    },
    method: method,
    credentials: "include",
  };

  if (!isFile) {
    options.headers = {
      "Content-Type": "application/json",
      authentication: authentication,
    };
  }

  if (payload) {
    options.body = payload;
  }
  let fetchData: any, error: any;
  await fetch(url, options)
    .then(async (res) => res.json())
    .then((data: any) => {
      fetchData = data?.response;
      error = data?.error;
    })
    .catch((err) => {
      error = err;
    });
  return [fetchData, error];
};
export { backendRequest };
