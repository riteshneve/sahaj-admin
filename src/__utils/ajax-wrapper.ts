/* eslint-disable @typescript-eslint/no-explicit-any */
import { ajax, AjaxResponse } from "rxjs/ajax";
import { Observable } from "rxjs";
import { BE_URL } from "../constants/url";
import { getTokenFromSessionStorage } from "./storage-service";
export const setCookie = (
  name: string,
  value: string | number | boolean,
  days = 7,
  path = "/"
) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    "; expires=" +
    expires +
    "; path=" +
    path;
};
export const getCookie = (name: string) => {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
};
export const deleteCookie = (name: any, path: string | undefined) => {
  setCookie(name, "", -1, path);
};
// const defaultHeaders: any = {
//  // "Access-Control-Allow-Origin":"*"
//   // "X-CSRFToken":
//   //   document.cookie &&
//   //   typeof document.cookie === "string" &&
//   //   getCookie("csrftoken")
// };
const getDefaultHeaders = () => {
  return {
    "X-Auth-Token": getTokenFromSessionStorage()
  };
};
/* This can be externalized in environment file. */
const baseUrl: any = BE_URL;
export const getJSON = (
  url: string,
  headers?: any
): Observable<AjaxResponse> => {
  return ajax.getJSON(
    baseUrl + url,
    Object.assign({}, getDefaultHeaders(), headers)
  );
};
export const get = (
  url: string,
  headers?: any,
  baseServiceURL?: any
): Observable<AjaxResponse> => {
  // ajax.get(baseUrl + url, Object.assign({}, defaultHeaders, headers));

  if (!baseServiceURL) baseServiceURL = BE_URL;
  return ajax({
    url: baseServiceURL + url,
    method: "GET",
    // body: { dummy: true },
    // crossDomain: true,
    withCredentials: true,
    headers: Object.assign({}, getDefaultHeaders(), headers)
  });
};
export const post = (url: string, body: any, headers?: any) => {
  // ajax.post(baseUrl + url, body, Object.assign({}, defaultHeaders, headers));
  
  return ajax({
    url: baseUrl + url,
    method: "POST",
    body,
    // crossDomain: true,
    withCredentials: true,
    headers: Object.assign({}, getDefaultHeaders(), headers)
  });
};
export const put = (url: string, headers?: any) => {
  // ajax.put(baseUrl + url, Object.assign({}, defaultHeaders, headers));
  return ajax({
    url: baseUrl + url,
    method: "PUT",
    // crossDomain: true,
    withCredentials: true,
    headers: Object.assign({}, getDefaultHeaders(), headers)
  });
};
export const deleteRequest = (url: string, headers?: any) => {
  // ajax.delete(baseUrl + url, Object.assign({}, defaultHeaders, headers));
  return ajax({
    url: baseUrl + url,
    method: "DELETE",
    // crossDomain: true,
    withCredentials: true,
    headers: Object.assign({}, getDefaultHeaders(), headers)
  });
};
