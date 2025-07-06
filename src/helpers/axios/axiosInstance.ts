import { authKey } from "@/constants/authKey";
import { setTokenAccess } from "@/services/actions/setTokenAccess";
import { getNewAccessToken } from "@/services/auth.services";
import { IGenericErrorResponse } from "@/types";
import { getFormLocalStorage, setLocalStorage } from "@/utils/local-storage";
import axios, { AxiosResponse } from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Helper function to get token from cookies
const getTokenFromCookies = () => {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith(`${authKey}=`)
  );
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    let accessToken = getFormLocalStorage(authKey);

    // If not found in localStorage, try cookies as fallback
    if (!accessToken) {
      accessToken = getTokenFromCookies();
    }

    // console.log(accessToken);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const responseObject = {
      data: response?.data?.data,
      meta: response?.data?.data,
    };
    return responseObject;
  } as any,
  async function (error) {
    const config = error.config;
    console.log(error);
    if (error?.response?.status === 500 && !config.sent) {
      config.sent = true;
      const response = await getNewAccessToken();
      const accessToken = response?.data?.accessToken;
      config.headers["Authorization"] = accessToken;
      setLocalStorage(authKey, accessToken);
      setTokenAccess(accessToken);
      return instance(config);
    } else {
      const responseObject: IGenericErrorResponse = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Something went wrong!!!",
        errorMessages: error?.response?.data?.message,
      };
      // Any status codes that fall outside the range of 2xx cause this function to trigger
      // Do something with response error
      return responseObject;
    }
  }
);

export { instance };
