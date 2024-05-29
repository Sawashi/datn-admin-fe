// components/AuthProvider.tsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@components/redux/store";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated
    const accessToken = cookie.get("accessToken");
    if (!accessToken) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
