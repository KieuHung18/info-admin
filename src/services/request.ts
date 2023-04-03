const backendUrl = process.env.REACT_APP_BACKEND_URL;

const backendRequest = async (
  method = "GET" || "POST" || "DELETE" || "OPTIONS",
  path = "",
  payload?: any
) => {
  const url = backendUrl + path;
  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (payload) {
    options.body = payload;
  }
  let fetchData: any, error: any;
  await fetch(url, options)
    .then(async (res) => res.json())
    .then((data) => {
      fetchData = data;
    })
    .catch((err) => {
      error = err;
    });
  return [fetchData, error];
};

export { backendRequest };
