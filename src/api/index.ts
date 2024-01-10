const baseURL = "https://27.128.175.127:9443";

const baseOptions = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

type CustomRequestInit = Omit<RequestInit, "body"> & {
  body?: Recordable;
};

export const request = async (url: string, options: CustomRequestInit) => {
  const newURL = `${baseURL}${url}`;

  const newOptions: RequestInit = {
    ...baseOptions,
    ...options,
    body: options.body && JSON.stringify(options.body),
    method: options.method ?? options.body ? "POST" : baseOptions.method,
  };

  const res = await fetch(newURL, newOptions);

  return res.json();
};

export const createSubRequest =
  (subBaseURL: string) =>
  (
    url: Parameters<typeof request>[0],
    options: Parameters<typeof request>[1]
  ) =>
    request(`${subBaseURL}${url}`, options);
