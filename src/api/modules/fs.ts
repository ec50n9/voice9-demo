import { createSubRequest } from "..";

const request = createSubRequest("/fs-api");

export enum FSLoginType {
  "sip" = 1,
  "webrtc" = 2,
  "mobile" = 3,
}

export enum FSWorkType {
  "normal" = 1,
  "auto" = 2,
}

export const login = (options: {
  agentKey: string;
  passwd: string;
  loginType: FSLoginType;
  workType: FSWorkType;
  webHook?: string;
}) =>
  request("/index/login", {
    body: options,
  });

const obj2params = (obj: Recordable) =>
  Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join("&");

export const callLog = (options: { pageNum: number; pageSize: number }) =>
  request(`/agentcall/callLog?${obj2params(options)}`, {});
