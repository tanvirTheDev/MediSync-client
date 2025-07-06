import { authKey } from "@/constants/authKey";
import { setLocalStorage } from "@/utils/local-storage";
import { FieldValues } from "react-hook-form";
import { setTokenAccess } from "./setTokenAccess";

export const loginPatient = async (data: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // cache: "no-cache",
      credentials: "include",
    }
  );
  const loginInfo = await res.json();
  // console.log("logininfo", loginInfo);

  if (loginInfo?.data?.accessToken) {
    // Set token in both cookies (for server-side) and localStorage (for client-side)
    setTokenAccess(loginInfo.data.accessToken, {
      redirect: "/dashboard",
    });
    setLocalStorage(authKey, loginInfo.data.accessToken);
  }
  return loginInfo;
};
