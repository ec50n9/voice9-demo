import { createSubRequest } from "..";

const request = createSubRequest("/cc-api/index");

export const login = (options: { username: string; passwd: string }) =>
  request("/login", {
    body: options,
  });
